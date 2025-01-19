# Cheat sheet of commands to use

## OS commands

### See current version of operationg system 
```lsb_release -a```

Returns something like:
```
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 12 (bookworm)
Release:        12
Codename:       bookworm
```

## Network

### See current network configuration
```ifconfig```

Returns something like, where you can check IP-addresses and netmasks:
```
eth0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether 2c:cf:67:89:3c:fd  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 112  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Lokale Schleife)
        RX packets 105  bytes 9175 (8.9 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 105  bytes 9175 (8.9 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.178.33  netmask 255.255.255.0  broadcast 192.168.178.255
        inet6 fe80::63d3:2545:c3c4:1abb  prefixlen 64  scopeid 0x20<link>
        inet6 fdcc:4507:3353:0:5b0f:274:9675:c74e  prefixlen 64  scopeid 0x0<global>
        inet6 2a02:3100:8760:9800:64b:516f:b6b7:7b76  prefixlen 64  scopeid 0x0<global>
        ether 2c:cf:67:89:3c:fe  txqueuelen 1000  (Ethernet)
        RX packets 1440  bytes 240753 (235.1 KiB)
        RX errors 0  dropped 671  overruns 0  frame 0
        TX packets 489  bytes 62514 (61.0 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```