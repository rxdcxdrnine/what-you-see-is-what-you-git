from sqlalchemy.sql.expression import text


class ImageDao:
    def __init__(self, config):
        self.database = config.database

    def save_image_post(self, image_post):
        self.database.execute(
            text(
                """
            INSERT INTO post (
            type,
        	user_id,
            image_filename,
            markdown
        ) VALUES (
            'IMAGE',
        	:userId,
            :imageFilename,
            :markdown
        )
        """
            ),
            image_post,
        )

        return
