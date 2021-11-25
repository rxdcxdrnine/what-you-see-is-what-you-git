from datetime import datetime
from sqlalchemy.sql.expression import text


class ImageDao:
    def __init__(self, config):
        self.engine = config.engine

    def save_image_post(self, image_post):
        image_post["regDate"] = datetime.now()
        image_post["modDate"] = datetime.now()

        self.engine.execute(
            text(
                """
            INSERT INTO post (
            type,
        	user_id,
            image_filename,
            markdown,
            reg_date,
            mod_date
        ) VALUES (
            'IMAGE',
        	:userId,
            :filename,
            :markdown,
            :regDate,
            :modDate
        )
        """
            ),
            image_post,
        )

        return
