import os
from flask import send_from_directory
from os import walk, path
from obelix_config import ObelixConfig

class ObelixGallery:

    def __init__(self):
        self.config = ObelixConfig('config.yml')
        self.real_path = path.abspath(self.config.get('paths.image_path', "/home/admin/OBELIX"))

    def get_images(self, type):
        files = [path.join(dir_path,f) for (dir_path, dir_names, file_names) in walk(self.real_path) for f in file_names]
        files = ['/images{0}'.format(self.remove_prefix(file, self.real_path)) for file in files]
        return files

    def get_image(self, path):
        return send_from_directory(self.real_path, path, as_attachment=True)

    def remove_prefix(self, text, prefix):
        if text.startswith(prefix):
            return text[len(prefix):]
        return text
