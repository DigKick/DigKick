# Using with MicroPython

Our ESP-Board on [Adafruit](https://learn.adafruit.com/adafruit-huzzah32-esp32-feather)
Tutorial [https://wolfpaulus.com/micro-python-esp32](https://wolfpaulus.com/micro-python-esp32)

## Requirements

1. PyEnv to install Python [Installation Guide](https://github.com/pyenv/pyenv?tab=readme-ov-file#homebrew-in-macos)
2. Install Python
    * ```pyenv install -l``` to list all versions
    * Install Python ```pyenv install X.X.X```
    * Make it usable ```pyenv global X.X.X```
3. Install ESPTools [Documentation](https://docs.espressif.com/projects/esptool/en/latest/esp32/)
    * ```sudo pip install esptools```
4. Flash MicroPython to ESP [Firmware](https://micropython.org/download/ESP32_GENERIC/)
    * ``` esptool.py --chip esp32 --port <PORT> erase_flash```
    * ```esptool.py --chip esp32 --baud 460800 write_flash -z 0x1000 <Path to Firmware>```
5. Install Adafruit-Ampy with pip [https://pypi.org/project/adafruit-ampy/](https://pypi.org/project/adafruit-ampy/)
    * ```sudo pip install adafruit-ampy```

## IDE Setup

1. Install PyCharm Community Edition [https://www.jetbrains.com/pycharm/download](https://www.jetbrains.com/pycharm/download)
2. Install the MicroPython Plugin inside PyCharm [MicroPython Plugin Repo](https://github.com/JetBrains/intellij-micropython)
3. Go to Settings -> Languages & Frameworks -> MicroPython and enable support
4. Disable auto detect path
5. Enter Path to Serial-Port (/dev/cu.usbserial-***)

## Find Serial Port of Board

1. Connect the board to your Mac
2. run ```ls ~/dev/*```
3. search for something that starts with "cu.usbserial"

## Making changes

With MicroPython you have two main files on the ESP:
1. boot.py runs on boot of the board // contains setup code
2. main.py runs right after boot // contains the main loop

Change these files and push them to the ESP with Adafruit-Ampy or the IDE