function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });
    // mapbox://styles/mapbox/light-v10

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });
    // mapbox://styles/mapbox/dark-v10

    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });
    // mapbox://styles/mapbox/satellite-streets-v11

    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap,
        "Dark Map": darkmap,
        "Satellite": satellitemap,
        "Outdoors": outdoorsmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create the map object with options
    var map = L.map("map", {
        center: [38.6270, -90.1994],
        zoom: 5,
        layers: [lightmap, earthquakes]
        // don't need earthquakes in the layer
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);


    // *******************
// Create a legend to display information about our map
var legend = L.control({
    position: 'bottomright'
});
console.log("after bottomleft"); // this prints
// When the layer control is added, insert a div with the class of "legend"
legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    console.log(map);
    return div;
};

console.log(map);
// Add the info legend to the map
legend.addTo(map);
console.log("after legend.addTo(map)"); // this did not print

document.querySelector(".legend").innerHTML = [
    "<p class='title'>Earthquake Intensity</p>",
    "<p class='six'>Magnitude 6.0+</p>",
    "<p class='five'>Magnitude 5.0 - 5.9</p>",
    "<p class='four'>Magnitude 4.0 - 4.9</p>",
    "<p class='three'>Magnitude 3.0 - 3.9</p>",
    "<p class='two'>Magnitude 2.0 - 2.9</p>",
    "<p class='undertwo'>Less than Magnitude 2.0</p>"
].join("");


// **************************


}
console.log("base map code finished");

// function getColor(d) {
//     return d > 7 ? '#800026' :
//         d > 6 ? '#BD0026' :
//         d > 5 ? '#E31A1C' :
//         d > 4 ? '#FC4E2A' :
//         d > 3 ? '#FD8D3C' :
//         d > 2 ? '#FEB24C' :
//         d > 1 ? '#FED976' :
//                 '#FFEDA0';
// }

// function style(feature) {
//     return {
//         fillColor: getColor(features.properties.mag),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     }
// };
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", {style:style}).addTo(map);


function createMarkers(response) {

    // Pull the "features" property off of response.data
    var features = response.features;
    //console.log("features[1]")       // works
    //console.log(features[1])        // works
    // data comes from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

    // Initialize an array to hold quake markers
    var quakeMarkers = [];

    // console.log("right before for loop");       // works

    // Loop through the features array
    for (var index = 0; index < features.length; index++) {
        var feature = features[index];
        // console.log(feature);       // works


        function chooseColor(feature) {
            var mag = feature.properties.mag;
            if (mag >= 6.0) {
                return "darkred";
            }
            else if (mag >= 5.0) {
                return "red";
            }
            else if (mag >= 4.0) {
                return "orange";
            }
            else if (mag >= 3.0) {
                return "yellow";
            }
            else if (mag >= 2.0) {
                return "green";
            }
            else {
                return "lightgreen";
            }
        };



        // var legend = L.control({position: 'bottomright'});
        // legend.onAdd = function (map) {

        // var div = L.DomUtil.create('div', 'info legend');
        // labels = ['<strong>Categories</strong>'],
        // strength = ['5','4','3','2','1'];

        // for (var i = 0; i < strength.length; i++) {

        //         div.innerHTML += 
        //         labels.push(
        //             '<i class="circle" style="background:' + getColor(strength[i]) + '"></i> ' +
        //         (strength[i] ? strength[i] : '+'));

        // }
        //     div.innerHTML = labels.join('<br>');
        // return div;
        // };
        // legend.addTo(map);


        // console.log("right before quakeMarker");        // works

        // For each feature, create a marker and bind a popup with the feature's info
        // var quakeMarker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordates[0]])
        // var quakeMarker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
        var quakeMarker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { color: chooseColor(feature) })
            // var quakeMarker = L.marker([19.844, -155.371])      // manual coordinates work
            .bindPopup("<h3>Location: " + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag + "<h3>Felt: " +
                feature.properties.felt + "<h3>Coordinates: " + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0] +
                "<br><a href='" + feature.properties.url + "'>Add'l Details</a>")
            // .setRadius(50); // try a function in here to evaluate size
            .setRadius(Math.round(feature.properties.mag) * 10)
        // .fillColor("red")
        // Add the marker to the quakeMarkers array
        quakeMarkers.push(quakeMarker);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
}


// Perform an API call to the USGS API to get earthquake information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);


