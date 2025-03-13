import yaml
from flask import send_from_directory
from os import path
from pathlib import Path
from obelix_config import ObelixConfig


def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text


class ObelixGallery:

    def __init__(self):
        self.config = ObelixConfig('config.yml')
        self.real_path = path.abspath(self.config.get('paths.image_path', "/home/admin/OBELIX"))

    def get_image(self, sub_path=''):
        if sub_path.endswith(('.jpg', '.jpeg', '.JPG', '.JPEG', '.h264')):
            return send_from_directory(self.real_path, sub_path, as_attachment=False)

    def get_contents(self, sub_path=''):
        if sub_path:
            return self.get_image(sub_path)
        refs = []
        for iter_path in Path(self.real_path).iterdir():
            refs.append(iter_path)
        refs = sorted(refs, key=lambda ref: ref.name, reverse=True)
        result = []
        for img_folder in refs:
            if img_folder.is_dir():
                index = path.join(self.real_path, img_folder.name, "index.yml")
                if path.exists(index):
                    with open(index, 'r') as yaml_file:
                        result.append(yaml.safe_load(yaml_file))
        return result
