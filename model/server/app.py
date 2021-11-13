from flask import Flask
from flask_cors import CORS

import config
from views import create_endpoints
from services import ImageService
from repositories import ImageDao


class Services:
    pass


def create_app():
    app = Flask(__name__)
    CORS(app)

    # repository
    image_dao = ImageDao(config)

    # service
    services = Services()
    services.image_service = ImageService(image_dao, config)

    # view/route
    create_endpoints(app, services, config)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="localhost", port=8081, debug=True)
