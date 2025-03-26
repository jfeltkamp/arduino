import shutil
from os import path


def get_archive(subpath=''):
    fold_path = "/Users/joachim/Arduiono/arduino/obelix_raspi/test"
    file_name = subpath[:-4]
    real_path = path.join(fold_path, file_name)
    if path.isdir(real_path):
        return shutil.make_archive(file_name, format='zip', root_dir=fold_path, base_dir=file_name)

mypath = get_archive('testimg.zip')
print(mypath)