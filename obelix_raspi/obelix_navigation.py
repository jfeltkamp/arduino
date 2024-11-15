import yaml
from obelix_tools import ObelixCommands


class ObelixNavigation:
    def __init__(self, obelix=None):
        self.position = {}
        self.obelix = obelix
        with open("navigation/index.yml") as stream:
            try:
                self.position = yaml.safe_load(stream)
                if type(self.position["base"][0]) is dict:
                    self.set_home(self.position["base"][0]["pos"])
            except yaml.YAMLError as exc:
                print(exc)

    # Set current stepper position as specified HOME position.
    def set_home(self, home):
        self.obelix.command_list_push(ObelixCommands("ard_home", f"{home['x']},{home['y']},{home['f']}", "await"))

    # Get configured positions from yml file.
    def get_navigation(self):
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
        print(file_id, data)
