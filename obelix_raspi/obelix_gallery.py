import yaml
import shutil
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
        if sub_path.endswith(('.zip', '.ZIP')):
            archive_path = self.get_archive(sub_path)
            return send_from_directory(self.real_path, archive_path, as_attachment=True)

    def get_contents(self, sub_path=None):
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
                    try:
                        with open(index, 'r') as yaml_file:
                            yml_content = yaml.safe_load(yaml_file)
                            yml_content['folder'] = '/gallery/' + img_folder.name
                            result.append(yml_content)
                    except yaml.YAMLError as exc:
                        print("Could net read file:", index, exc)
        return result

    def get_archive(self, subpath=''):
        file_name = subpath[:-4]
        to_be_zipped_path = path.join(self.real_path, file_name)
        if path.isdir(to_be_zipped_path):
            zipped_path = shutil.make_archive(file_name, format='zip', root_dir=to_be_zipped_path, base_dir=file_name)
            if isinstance(zipped_path, str):
                return subpath

# Debug code
# gallery = ObelixGallery()
# print(gallery.get_contents())