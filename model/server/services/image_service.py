import os
import cv2
from datetime import datetime

from client.fasterrcnn_client import infer


class ImageService:
    def __init__(self, image_dao, config):
        self.image_dao = image_dao
        self.image_url = config.image_url

    def save_image_post(self, image_post):

        image = infer(image_post["image"])
        filename = self.save_image(image)

        image_post["imageFilename"] = filename
        self.image_dao.save_image_post(image_post)

    def save_image(self, image):

        now = datetime.now()
        date_time = now.strftime("%Y%m%d_%H%M%S")
        filename = date_time + ".jpg"

        path = os.path.join(self.image_url, filename)
        cv2.imwrite(path, image)

        return filename
