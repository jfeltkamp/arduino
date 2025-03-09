from os import walk, path, symlink

sym_path = 'images'
img_path = "/Users/jfeltkamp/Arduino_Sketches/arduino//OBELIX/"


if not path.exists(sym_path):
    img_path = path.abspath(img_path)
    symlink(img_path, sym_path)

dir_list = [path.join(dir_path,f) for (dir_path, dir_names, file_names) in walk(sym_path) for f in file_names]

print(dir_list)


