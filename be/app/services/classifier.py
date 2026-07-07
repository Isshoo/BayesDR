

import io
import os
import threading

import numpy as np
from flask import current_app
from PIL import Image
from tensorflow import keras

# Class labels
CLASS_NAMES = ["No_DR", "Mild", "Moderate", "Severe", "Proliferate_DR"]

labels = {
    "No_DR": "No Diabetic Retinopathy",
    "Mild": "Mild Diabetic Retinopathy",
    "Moderate": "Moderate Diabetic Retinopathy",
    "Severe": "Severe Diabetic Retinopathy",
    "Proliferate_DR": "Proliferative Diabetic Retinopathy",
}

# interpolation the training generators used.
RESIZE_INTERPOLATION = Image.Resampling.NEAREST

# Module-level cache 
_model = None
_feature_extractor = None
_head_layers = None
_model_lock = threading.Lock()


def load_model():
    """
    Load the trained BCNN model AND pre-build the MC Dropout sub-graphs
    (feature extractor + head layers) exactly once
    """
    global _model, _feature_extractor, _head_layers

    if _model is not None:
        return _model

    with _model_lock:
        # Double-checked locking
        if _model is not None:
            return _model

        MODEL_NAME = current_app.config.get("MODEL_NAME")
        MODEL_PATH = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "storage",
            "models",
            f"{MODEL_NAME}.h5",
        )

        try:
            print(f"Loading model from: {MODEL_PATH}")

            model = keras.models.load_model(MODEL_PATH, compile=False)
            model.compile(
                optimizer=keras.optimizers.Adam(learning_rate=1e-4),
                loss="categorical_crossentropy",
                metrics=["accuracy"],
            )

            print("✅ Model loaded and compiled successfully!")
            print(f"   Input shape: {model.input_shape}")
            print(f"   Output shape: {model.output_shape}")

            # Build the MC Dropout sub-graphs once
            # feature_extractor keeps everything up to (and including)
            # the BatchNorm layer running in inference mode.
            feature_extractor = keras.Model(
                inputs=model.input, outputs=model.get_layer("bn_1").output
            )

            # head_layers are replayed manually so we can flip Dropout to
            # training=True while keeping every other layer at inference.
            head_layers = [
                model.get_layer("dense_1"),
                model.get_layer("bayesian_dropout_1"),
                model.get_layer("dense_2"),
                model.get_layer("bayesian_dropout_2"),
                model.get_layer("dense_3"),
                model.get_layer("bayesian_dropout_3"),
                model.get_layer("output"),
            ]

            _model = model
            _feature_extractor = feature_extractor
            _head_layers = head_layers

        except Exception as e:
            print(f"❌ Error loading model: {str(e)}")
            raise

    return _model


def preprocess_image(image_bytes):
    """
    Preprocess the uploaded image for model prediction.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))

        if img.mode != "RGB":
            img = img.convert("RGB")

        img = img.resize((224, 224), RESIZE_INTERPOLATION)

        img_array = np.array(img, dtype=np.float32)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        print(
            f"   Image stats: min={img_array.min():.4f}, "
            f"max={img_array.max():.4f}, mean={img_array.mean():.4f}"
        )

        return img_array

    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}") from None


def mc_dropout_predict(img_array, n_iterations=25):
    """
    Perform MC Dropout inference using the CACHED feature extractor and
    head layers built once in load_model()

    BatchNorm stays in inference mode (via feature_extractor's
    training=False call); only the Dropout layers in the head are
    stochastic across the n_iterations passes.
    """
    features = _feature_extractor(img_array, training=False)

    mc_predictions = []
    for _ in range(n_iterations):
        x = features
        for layer in _head_layers:
            if "dropout" in layer.name:
                x = layer(x, training=True)  # stochastic
            else:
                x = layer(x, training=False)  # deterministic
        mc_predictions.append(x.numpy()[0])

    return np.array(mc_predictions)


def predict_with_uncertainty(image_bytes, n_iterations=25):
    """
    Make a prediction with Monte Carlo Dropout uncertainty estimation.

    Args:
        image_bytes: Raw bytes of the uploaded image
        n_iterations: Number of stochastic forward passes (default: 25).

    Returns:
        Dictionary with prediction + uncertainty metrics.
    """
    try:
        load_model()

        img_array = preprocess_image(image_bytes)

        print("🔄 Running standard prediction (training=False)...")
        standard_pred = _model.predict(img_array, verbose=0)[0]
        print(
            f"   Standard prediction: {CLASS_NAMES[np.argmax(standard_pred)]} "
            f"({np.max(standard_pred):.2%})"
        )

        print(f"🔄 Running MC Dropout (n={n_iterations})...")
        mc_predictions = mc_dropout_predict(img_array, n_iterations)

        mean_prediction = np.mean(mc_predictions, axis=0)
        std_prediction = np.std(mc_predictions, axis=0)

        predicted_class = int(np.argmax(mean_prediction))
        predicted_class_name = CLASS_NAMES[predicted_class]
        confidence = float(mean_prediction[predicted_class])

        class_uncertainty = float(std_prediction[predicted_class])
        overall_uncertainty = float(np.mean(std_prediction))
        predictive_entropy = float(
            -np.sum(mean_prediction * np.log(mean_prediction + 1e-10))
        )

        confidence_level = (
            "High" if confidence >= 0.8 else "Medium" if confidence >= 0.6 else "Low"
        )
        uncertainty_level = (
            "Low"
            if overall_uncertainty <= 0.05
            else "Medium"
            if overall_uncertainty <= 0.10
            else "High"
        )

        print("\n📊 Prediction Results:")
        print(f"   Class: {predicted_class_name}")
        print(f"   Confidence: {confidence:.2%}")
        print(f"   Uncertainty: {overall_uncertainty:.4f}")
        print(f"   Entropy: {predictive_entropy:.4f}")

        return {
            "predicted_class": predicted_class,
            "class_name": predicted_class_name,
            "class_label": labels[predicted_class_name],
            "confidence": confidence,
            "confidence_level": confidence_level,
            "uncertainty": overall_uncertainty,
            "class_uncertainty": class_uncertainty,
            "predictive_entropy": predictive_entropy,
            "uncertainty_level": uncertainty_level,
            "probabilities": [float(p) for p in mean_prediction],
            "std_deviations": [float(s) for s in std_prediction],
            "class_names": CLASS_NAMES,
            "n_iterations": n_iterations,
            "reliable_prediction": confidence >= 0.7 and overall_uncertainty <= 0.10,
        }

    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        raise


def get_prediction_explanation(result):
    """Generate a human-readable explanation of the prediction. (Unchanged.)"""
    explanation = f"Diagnosis: {result['class_label']}\n"
    explanation += (
        f"Confidence: {result['confidence']:.1%} ({result['confidence_level']})\n"
    )
    explanation += (
        f"Uncertainty: {result['uncertainty']:.4f} ({result['uncertainty_level']})\n\n"
    )

    if result["reliable_prediction"]:
        explanation += (
            "✅ This is a reliable prediction (high confidence, low uncertainty).\n"
        )
    else:
        explanation += "⚠️ This prediction has "
        if result["confidence"] < 0.7:
            explanation += "low confidence"
        if result["confidence"] < 0.7 and result["uncertainty"] > 0.10:
            explanation += " and "
        if result["uncertainty"] > 0.10:
            explanation += "high uncertainty"
        explanation += ". Consider additional medical evaluation.\n"

    probs = result["probabilities"]
    top_3_indices = np.argsort(probs)[-3:][::-1]

    explanation += "\nTop 3 Predictions:\n"
    for idx in top_3_indices:
        explanation += f"  {CLASS_NAMES[idx]}: {probs[idx]:.1%}\n"

    return explanation