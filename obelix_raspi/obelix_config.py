import os
import yaml
import traceback

class ObelixConfig:
    def __init__(self, file=None):
        self.dir = os.path.dirname(__file__)
        self.file_path = os.path.join(f"{self.dir}/config/{file}")
        try:
            self.config = yaml.safe_load(open(self.file_path))
        except:
            self.config = {}

    def get(self, prop, default=None):
        value = default
        if isinstance(prop, str):
            prop = prop.split('.')
        if isinstance(prop, list):
            result = self.get_nd(self.config, prop)
            if bool(result):
                value = result
        return value

    """
    Get nested properties recursively from dictionary.
    """
    def get_nd(self, d, keys):
        if not keys:
            return d
        return self.get_nd(d.get(keys[0], {}), keys[1:])

    """
    Set nested properties recursively in dictionary.
    """
    def set_nd(self, d, nest_props, value):
        if not nest_props:
            return value
        else:
            d[nest_props[0]] = self.set_nd(d.get(nest_props[0], {}), nest_props[1:], value)
        return d

    """
    Updates config and save config to file.
    """
    def update(self, prop, value):
        nested = prop.split(".")
        self.config = self.set_nd(self.config, nested, value)
        try:
            with open(self.file_path, 'w') as fp:
                yaml.dump(self.config, fp)
                return True
        except:
            traceback.print_exc()
            print("Failed to save config.")
            return False
