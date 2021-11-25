import os
import random
import string
from datetime import datetime

from client.fasterrcnn_client import infer
from tasks import image_infer


class ImageService:
    def __init__(self, image_dao, config):
        self.image_dao = image_dao
        self.image_url = config.image_url
        self.origin_url = config.origin_url

    def save_image_post(self, image_post, image):

        image_post["filename"] = self.save_image(image)
        image_infer.delay(image_post)

    def save_image(self, image, N=6):

        now = datetime.now()
        date_time = now.strftime("%Y%m%d_%H%M%S")
        random_string = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in range(N)
        )
        filename = date_time + "_" + random_string + ".jpg"

        path = os.path.join(self.origin_url, filename)
        image.save(path)

        return filename
