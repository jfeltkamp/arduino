import yaml
from obelix_tools import ObelixCommands


class ObelixNavigation:
    def __init__(self, obelix):
        self.position = {}
        self.obelix = obelix
        with open("navigation/index.yml") as stream:
            try:
                self.position = yaml.safe_load(stream)
                if type(self.position["base"]["home"]) is dict:
                    self.set_home(self.position["base"]["home"]["pos"])
            except yaml.YAMLError as exc:
                print(exc)

    # Set current stepper position as specified HOME position.
    def set_home(self, home):
        self.obelix.command_list_push(ObelixCommands("ard_home", f"{home['x']},{home['y']},{home['f']}", "await"))

    # Get configured positions from yml file.
    def get_navigation(self):
        return self.position

    # Navigate ti loaded position item.
    def navigate(self, nav_type, nav_id):
        if type(self.position[nav_type]) is list:
            item = self.position[nav_type][int(nav_id)]
        else:
            item = self.position[nav_type][nav_id]
        if item is not None:
            self.obelix.command_list_push(ObelixCommands("ard_goto", f"{item['pos']['x']},{item['pos']['y']},{item['pos']['f']}", "await"))
            return item['pos']
        return {}
