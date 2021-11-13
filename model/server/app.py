from flask import Flask
from sqlalchemy import create_engine, text

import config
from views.image_view import create_endpoints
from services import ImageService
from repositories.image_dao import ImageDao


class Services:
    pass


def create_app():
    app = Flask(__name__)

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
