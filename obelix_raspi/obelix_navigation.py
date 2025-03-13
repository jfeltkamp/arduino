import yaml
import glob
import os
from obelix_tools import ObelixCommands


class ObelixNavigation:
    def __init__(self, obelix=None):
        self.obelix = obelix
        self.file_path = os.path.dirname(__file__)
        self.location = self.get_navigation('index')

    # Set current stepper position as specified HOME position.
    def set_home(self, home):
        self.obelix.command_list_push(ObelixCommands("ard_home", f"{home['x']},{home['y']},{home['f']}", "await"))

    # Get configured positions from yml file.
    def get_navigation(self, fid):
        try:
            abs_file_path = os.path.join(self.file_path, f"navigation/{fid}.yml")
            with open(abs_file_path) as stream:
                self.location = yaml.safe_load(stream)
                if type(self.location["base"][0]) is dict:
                    self.set_home(self.location["base"][0]["pos"])
        except Exception as e:
            print(e)
        return self.location

    # Navigate ti loaded position item.
    def navigate(self, nav_id):
        for item in self.location["base"]:
            if item['id'] == nav_id:
                if self.obelix is not None:
                    self.obelix.command_list_push(ObelixCommands("ard_goto", f"{item['pos']['x']},{item['pos']['y']},{item['pos']['f']}", "await"))
                return item['pos']
        return {}


    def position_update(self, file_id, data):
        if "fid" in data:
            self.location = data
        try:
            abs_file_path = os.path.join(self.file_path, f"navigation/{file_id}.yml")
            with open(abs_file_path, 'w') as fp:
                yaml.dump(data, fp)
            return {
                'response': 200,
                'message': f"Position updated successfully"
            }
        except yaml.YAMLError as exc:
            print(exc)
            return {
                'response': 500,
                'message': f"Position updated failed"
            }

    def read_yaml_header(self, data):
        extract = {}
        if "fid" in data:
            extract['fid'] = data['fid']
            extract['addr'] = extract['fid']
        else:
            return False
        if "geo" in data:
            if "addr" in data['geo']:
                extract['addr'] = data['geo']['addr']
        return extract


    def get_location_list(self):
        location_list = []
        abs_file_path = os.path.join(self.file_path, "navigation/*.yml")
        for file in glob.glob(abs_file_path):
            try:
                with open(file) as stream:
                    content = yaml.safe_load(stream)
                    header = self.read_yaml_header(content)
                    if header:
                        location_list.append(header)
            except Exception as e:
                print(e)
        return location_list

    def delete_location(self, fid):
        try:
            abs_file_path = os.path.join(self.file_path, f"navigation/{fid}.yml")
            os.remove(abs_file_path)
            return { 'response': 200 }
        except Exception as e:
            print(e)
            return { 'response': 500 }
