import os
import cv2
from PIL import Image
from celery import Celery
from datetime import datetime

import config
from repositories import ImageDao

from client.fasterrcnn_client import infer

celery = Celery("tasks", broker=config.broker_url, backend=config.celery_result_backend)

image_dao = ImageDao(config)


@celery.task
def image_infer(image_post):

    filename = image_post["filename"]
    image = Image.open(config.origin_url + filename)

    result = infer(image)
    filename = save_image(result, filename)
    image_dao.save_image_post(image_post)


def save_image(image, filename):

    path = os.path.join(config.image_url, filename)
    cv2.imwrite(path, image)

    return filename
