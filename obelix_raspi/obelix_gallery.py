from os import walk, path, symlink
from obelix_config import ObelixConfig

class ObelixGallery:
    curr_path = path.dirname(path.realpath(__file__)) + '/static'
    sym_path = curr_path + '/images'
    def __init__(self):
        self.config = ObelixConfig('config.yml')
        self.real_path = path.abspath(self.config.get('paths.image_path', "/home/admin/OBELIX"))
        if not path.exists(self.sym_path) or path.realpath(self.sym_path) != self.real_path:
            symlink(self.real_path, self.sym_path)

    def get_images(self):
        files = [path.join(dir_path,f) for (dir_path, dir_names, file_names) in walk(self.sym_path) for f in file_names]
        files = ['{0}'.format(self.remove_prefix(file, self.curr_path)) for file in files]
        return files

    def remove_prefix(self, text, prefix):
        if text.startswith(prefix):
            return text[len(prefix):]
        return text
