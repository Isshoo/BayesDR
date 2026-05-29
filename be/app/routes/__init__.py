from flask import Flask

from app.routes.classify_route import classify_bp


def register_routes(app: Flask) -> None:
    app.register_blueprint(classify_bp)
