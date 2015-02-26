Kipyo-Sentence
=========

A Simple, tracking and geofencing protocol for android devices, like nmea sentences. Sentences include device id, location, provider, date, speed, and bearing

###### Device id,   Which device did create and sent this sentence ?
A unique device identifier
###### Provider, How did device obtain location
Gps provider, network, fused
###### Location, Where is the device
Location of device, latitude and longitude
###### Date,  When did device obtain location
Fix time of location
###### Speed, What's speed of device ?
meters/second
###### Bearing, What's bearing of device ?

### $KPYT
It's kipyo tracking sentence. When devices get location, creates this sentence
```javascript
/**
 * Device id  : DEVICE_ID_123
 * Provider   : fused:root
 * Latitude   : 38.428428
 * Longitude  : 27.133139
 * Date       : 1424992557
 * Speed      : 10
 * Bearing    : 5
 */
 var sentence = '$KPYT,DEVICE_ID_123,fused:root,38.428428,27.133139,1424992557,10,5';
```