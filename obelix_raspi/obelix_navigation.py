import yaml
from obelix_tools import ObelixCommands


class ObelixNavigation:
    def __init__(self, obelix):
        self.position = {}
        self.obelix = obelix
        with open("navigation/index.yml") as stream:
            try:
                self.position = yaml.safe_load(stream)
            except yaml.YAMLError as exc:
                print(exc)

    # Get configured positions from yml file.
    def get_navigation(self):
        return self.position

    # Navigate ti loaded position item.
    def navigate(self, nav_type, nav_id):
        item = self.position[nav_type][nav_id]
        if item is not None:
            self.obelix.command_list_push(ObelixCommands("ard_goto", f"{item.pos.x},{item.pos.y},{item.pos.f}", "await"))
            return item.pos
        return {}
