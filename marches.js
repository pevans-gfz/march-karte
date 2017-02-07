"use strict";

var initmap = function() {

	var mymap = L.map('mapid').setView([51.0, 11.0], 5);

	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

	L.tileLayer(osmUrl, {
    		attribution: osmAttrib + '| March data <a href="">sciencemarchger.wordpress.com</a>',
    		maxZoom: 14,
	}).addTo(mymap);

	return mymap;
}

function makePopupHTML(feature) {
	/* Turn the properties element of the JSON into an HTML
	 * string ready to display as the pop-up content.
	 */
	var props = feature.properties;
	var str = "POPUP";
	if (feature.id) {
	    str = feature.id;
	}
	if (props.description) {
		str = '<b>' + props.description + '</b>';
	}
	/* we prefer description over id, but take the latter if that's all. */
	if (props.status) {
	    	str = str + '<br>' + props.status;
	    }
	if (props.email) {
		str = str + '<br>E-mail <a href="mailto:' + props.email + '">' + props.email + '</a>';
	}
	if (props.url) {
		str = str + '<br>Link: <a href="' + props.url + '">WWW</a>';
	}
	if (props.twitter) {
		str = str + '<br><img alt="Twitter" src="twitter-s.png" height="24" width="24" /> ';
		var handle = props.twitter;
		if (handle.substring(0, 1) == '@') {
			handle = handle.substring(1);
        		str = str + '<a href="http://www.twitter.com/' + handle + '">@' + handle + '</a>';
		} else {
			str = str + 'unknown';
		}
	}
        str = '<img alt="March logo" src="http://68.media.tumblr.com/avatar_c1a0fc2c8d69_96.png" height="48" width="48" class="march-popup-logo" />' + str
	return str;
}

function onEachFeature(feature, layer) {
        if (feature.properties) {
		var str = makePopupHTML(feature);
		//DEBUG console.log(str);
                layer.bindPopup(str);
	}
} 

var loaddata = function(url) {
	var data;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var resp = req.responseText;
			var json = JSON.parse(resp);
			data = json;
		}
	};
	req.open("GET", url, false); // Wait for result.
	req.send();

	return data;
}
var markers = function(map, data) {
	// console.log("in function markers");

	var markerOptions = {
	    radius: 8,
	    fillColor: "#00789b",
	    color: "#ffffff",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};
	var markerAufbau = {
	    radius: 8,
	    fillColor: "#77789b",
	    color: "#00789b",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};
	L.geoJSON(data, {
		pointToLayer: function(feature, latlng) {
			if (feature.properties && feature.properties.status) {
			    if (feature.properties.status == "im Aufbau") {
				return L.circleMarker(latlng, markerAufbau);
			    }
			}
			return L.circleMarker(latlng, markerOptions);
		},
		onEachFeature: onEachFeature
	}).addTo(map);
}

var main = function() {
	var mymap = initmap();
	var data = loaddata('marches.json');
	markers(mymap, data);
}
