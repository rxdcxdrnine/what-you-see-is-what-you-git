import os


class ImageService:
    def __init__(self, image_dao, config):
        self.image_dao = image_dao
        self.image_url = config.image_url

    def save_image_post(self, image_post):
        self.image_dao.save_image_post(image_post)
