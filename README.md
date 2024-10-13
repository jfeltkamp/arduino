# Documentation Obelix 1.0

## ObelixCommands

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