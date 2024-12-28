# Documentation Obelix 1.0

## ObelixCommands

### Handle service 

To create a service that starts the program:
```
cd /lib/systemd/system
sudo nano arduino-raspi.service
```
Enter the following contents:

```
[Unit]
Description=Obelix Telescope
After=multi-user.target

[Service]
ExecStart=/usr/bin/python3 /home/admin/Arduino/Sketches/obelix_raspi/app.py
User=admin

[Install]
WantedBy=multi-user.target
```
To start/stop the service use following commands.
```
sudo systemctl start arduino-raspi.service
sudo systemctl stop arduino-raspi.service
```
To en-/disable the service in the boot sequence.
```
sudo systemctl enable arduino-raspi.service
sudo systemctl disable arduino-raspi.service
```
To see list with enabled/running services
```
sudo systemctl list-unit-files
```


### Start Obelix WebUI

To start the Obelix controller enter:

```
python -m flask --app webui run --debug
```

* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:5080
* Running on http://192.168.178.38:5080

Tis can run parallel to camera UI.

### Start Camera Web UI

On the Raspi terminal execute the following commands.

```
python $HOME/picamera2-WebUI/app.py
```

After that some lines with the local urls appear in the terminal. 

* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:8080
* Running on http://192.168.178.38:8080

With the last one you can call the Camera WebUI in a Browser.


### Open Stream in VLC Player

Start VLC Player and in the menu open:

``` [ Media > Open Network Stream ] ``` 

Enter the URL: http://192.168.178.38:8080/video_feed_0 and confirm.

### Use keyboard control 

To control the direction adjustment and the telescope focus, run the command.

```
python $HOME/Arduino/Sketches/astroMount_raspi/astroMount_cursor.py
```

After that you can control the direction with the cursor arrows and the focus with "PageUp" and "PageDown" keys.