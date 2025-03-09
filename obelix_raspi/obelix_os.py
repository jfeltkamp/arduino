from subprocess import Popen, PIPE

def system_cmd(action):
    if action == "restart":
        frags = ['sudo', 'systemctl', 'restart', 'arduino-raspi.service']
    elif action == "reboot":
        frags = ['sudo', 'shutdown', '-r', 'now']
    elif action == "shutdown":
        frags = ['sudo', 'shutdown', '-h', 'now']
    else:
        frags = False
    if frags:
        p = Popen(frags, stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode
        return {
            "response": output,
            "error": err,
            "code": rc
        }
    else:
        return {
            "response": "Command not found",
            "error": "Command not found",
            "code": 0
        }
