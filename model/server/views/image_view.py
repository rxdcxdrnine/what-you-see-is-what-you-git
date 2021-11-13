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

    @app.route("/posts/image", methods=["POST"])
    def image():
        image_post = request.form.to_dict()
        image_post["image"] = request.files.get("image")
        image_service.save_image_post(image_post)

        return jsonify(success=True)
