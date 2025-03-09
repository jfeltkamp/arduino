from subprocess import call

def system_cmd(action):
    if action == "restart":
        response = call("sudo systemctl restart arduino-raspi.service")
        return { "response": response }
    elif action == "reboot":
        response = call("sudo shutdown -r now")
        return { "response": response }
    elif action == "shutdown":
        response = call("sudo shutdown -h now")
        return { "response": response }
    else:
        return { "response": "Command not found" }
