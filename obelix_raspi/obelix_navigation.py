import yaml
import glob
import os
from obelix_tools import ObelixCommands


class ObelixNavigation:
    def __init__(self, obelix=None):
        self.position = {}
        self.obelix = obelix

    # Set current stepper position as specified HOME position.
    def set_home(self, home):
        self.obelix.command_list_push(ObelixCommands("ard_home", f"{home['x']},{home['y']},{home['f']}", "await"))

    # Get configured positions from yml file.
    def get_navigation(self, fid):
        try:
            with open(f"navigation/{fid}.yml") as stream:
                self.position = yaml.safe_load(stream)
                if type(self.position["base"][0]) is dict:
                    self.set_home(self.position["base"][0]["pos"])
        except Exception as e:
            print(e)
        return self.position

    # Navigate ti loaded position item.
    def navigate(self, nav_id):
        for item in self.position["base"]:
            if item['id'] == nav_id:
                if self.obelix is not None:
                    self.obelix.command_list_push(ObelixCommands("ard_goto", f"{item['pos']['x']},{item['pos']['y']},{item['pos']['f']}", "await"))
                return item['pos']
        return {}


    def position_update(self, file_id, data):
        if "fid" in data:
            self.position = data
        try:
            with open(f"navigation/{file_id}.yml", 'w') as fp:
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
        for file in glob.glob("navigation/*.yml"):
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
            os.remove(f"./navigation/{fid}.yml")
            return { 'response': 200 }
        except Exception as e:
            print(e)
            return { 'response': 500 }
