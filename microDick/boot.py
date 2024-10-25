import network
import mip

wlan = network.WLAN(network.STA_IF)

def do_connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect('hiqs-iot', 'password')
        while not wlan.isconnected():
            pass

do_connect()

with open("packages.txt") as packages_file:
    for line in packages_file:
        args = line.split("==")
        print("Installing: " + args[0] + " on version: " + args[1])
        mip.install(args[0], version=args[1])


