"""Environment configuration"""

import os

from dotenv import load_dotenv

load_dotenv()


def get_env(key, default=None, cast=str):
    value = os.getenv(key, default)

    if value is None:
        return None

    try:
        if cast is bool:
            return value.lower() in ("true", "1", "yes", "on")
        return cast(value)
    except (ValueError, TypeError) as err:
        raise ValueError(f"Invalid value for {key}: {value}") from err


def get_required_env(key):
    value = os.getenv(key)
    if not value:
        raise ValueError(f"{key} is required but not set.")
    return value


def get_list_env(key, default=""):
    value = os.getenv(key, default)
    return [item.strip() for item in value.split(",") if item.strip()]


class Config:
    # App
    ENVIRONMENT = get_env("FLASK_ENV", "development")
    PORT = get_env("PORT", 5000, int)
    HOST = get_env("HOST", "127.0.0.1")

    # Flask
    SECRET_KEY = get_env("SECRET_KEY", "dev-secret-key-change-in-production")

    # Frontend URL (for email links)
    FRONTEND_URL = get_env("FRONTEND_URL", "http://localhost:3000")

    # CORS
    CORS_ORIGINS = get_list_env("CORS_ORIGINS", "http://localhost:3000")

    # Model
    MODEL_NAME = get_required_env("MODEL_NAME")

    # Rate Limiting (default dev)
    RATELIMIT_DEFAULT = get_env("RATELIMIT_DEFAULT", "60/minute")
    RATELIMIT_STORAGE_URI = get_env("RATELIMIT_STORAGE_URI", "memory://")
    RATELIMIT_STRATEGY = get_env("RATELIMIT_STRATEGY", "fixed-window")
    RATELIMIT_HEADERS_ENABLED = get_env("RATELIMIT_HEADERS_ENABLED", "True", bool)


class DevelopmentConfig(Config):
    ENVIRONMENT = "Development"
    DEBUG = True


class ProductionConfig(Config):
    ENVIRONMENT = "Production"
    DEBUG = False

    SECRET_KEY = get_required_env("SECRET_KEY")

    RATELIMIT_STORAGE_URI = get_env("RATELIMIT_STORAGE_URI", "redis://localhost:6379")


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}


def get_config():
    env = get_env("FLASK_ENV", "development").lower()
    return config.get(env, config["default"])
