import shutil
from os import path


def get_archive(subpath=''):
    main_path = '/Users/joachim/Arduiono/arduino/obelix_raspi/test'
    root_dir = path.join(main_path, 'testimg/nest_1/nest_2')
    file_name = subpath[:-4]
    base_name = path.join(root_dir, file_name)
    if path.isdir(base_name):
        return shutil.make_archive(
            base_name=base_name,
            format='zip',
            root_dir=root_dir,
            base_dir=file_name
        )

mypath = get_archive('nest_3.zip')
print(mypath)