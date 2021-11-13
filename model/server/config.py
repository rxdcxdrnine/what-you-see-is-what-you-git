import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import url

load_dotenv()

database = {
    "drivername": "mysql+mysqlconnector",
    "host": os.getenv("DATABASE_HOST"),
    "port": os.getenv("DATABASE_PORT"),
    "username": os.getenv("DATABASE_USER"),
    "password": os.getenv("DATABASE_PASSWORD"),
    "database": os.getenv("DATABASE_NAME"),
}

image_url = os.getenv("IMAGE_URL")

database = create_engine(url.URL(**database))
