from datetime import datetime
from flask import request, jsonify, send_from_directory


def create_endpoints(app, services, config):
    image_service = services.image_service
    image_url = config.image_url
    origin_url = config.origin_url

    @app.route("/images/<path:filename>")
    def send_image(filename):
        return send_from_directory(image_url, filename)

    @app.route("/origins/<path:filename>")
    def send_origin(filename):
        return send_from_directory(origin_url, filename)

    @app.route("/posts/image", methods=["POST"])
    def image():
        image_post = request.form.to_dict()
        image = request.files.get("image")
        image_service.save_image_post(image_post, image)

        return jsonify(success=True)
