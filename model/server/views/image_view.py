import os
from datetime import datetime
import re
from flask import request, jsonify, send_from_directory


def create_endpoints(app, services, config):
    image_service = services.image_service
    image_url = config.image_url

    @app.route("/images/<path:filename>")
    def send_file(filename):
        return send_from_directory(image_url, filename)

    @app.route("/images", methods=["POST"])
    def image():
        # image_post = request.form.to_dict()
        # image = request.files.get("image")

        # image_post["imageFilename"] = save_image(image)
        # image_service.save_image_post(image_post)

        image_post = request.form.to_dict()
        image_post["image"] = request.files.get("image")
        image_service.save_image_post(image_post)

        return jsonify()

    # def save_image(image):

    #     now = datetime.now()  # current date and time

    #     extension = image.filename.split(".")[-1]
    #     date_time = now.strftime("%Y%m%d_%H%M%S")
    #     filename = date_time + "." + extension

    #     path = os.path.join(image_url, filename)
    #     image.save(path)

    #     return filename
