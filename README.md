# march-karte
Throw some markers from a GeoJSON input file onto a map in Leaflet.

Copyright (C) 2017 Peter L. Evans

This software is free software and comes with ABSOLUTELY NO WARRANTY.


Requirements
------------

 - a web server you control.  ;)
 - include local JavaScript content (`marches.js`) in your page header.
 - include Leaflet 1.0.3 JavaScript and CSS files (http://leafletjs.com/) in your page header:
 
         <head>
           <meta charset="utf-8"/>
           <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" type="text/css" />
           <link rel="stylesheet" href="marches.css" type="text/css" />
           <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js" type="text/javascript"></script>
           <script src="marches.js" type="text/javascript"></script>
         </head>
 
 - include the `<div id="mapid">` on the page.
 - trigger the main() function when the page is loaded.
 - store `marches.json` in the same directory as your page.

The JSON data file
------------------

This is a list of points in GeoJSON format.
https://en.wikipedia.org/wiki/GeoJSON

Use the "coordinates" element to set the latitude and longitude of markers.
Use attributes of the "properties" element to control features shown on the map.
The following are used by `marches.js` to create the pop-up labels:
  - description: the name of the march.
  - status: can be "im Aufbau" or something else, not really used for now.
  - url: a URL for an event.
  - email: an e-mail address for this event.
  - twitter: a Twitter handle, must start with "@".
I may add more as time permits.

TODO
----
 * Allow the JSON data file to have other locations.
 * Custom logo/icon for each event.

