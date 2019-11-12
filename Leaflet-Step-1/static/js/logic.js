var map = L.map('map').setView([40, -120], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(map);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(json) {

  geoLayer = L.geoJson(json, {

    style: function(feature) {
      var mag = feature.properties.mag;
      if (mag >= 4.0) {
        return {
          color: "red",
          fillOpacity: 1
        }; 
      }
      else if (mag >= 3.0) {
        return {
          color: "orange",
          fillOpacity: 1
        };
      } else if (mag >= 2.0) {
        return {
          color: "yellow",
          fillOpacity: 1
        };
      } else {
        return {
          color: "green",
          fillOpacity: 1
        }
      }
    },

    onEachFeature: function(feature, layer) {

      var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
        "<br><b>Location:</b> " + feature.properties.place +
        "<br><a href='" + feature.properties.url + "'>More info</a>";

      layer.bindPopup(popupText, {
        closeButton: true,
        offset: L.point(0, -20)
      });
      layer.on('click', function() {
        layer.openPopup();
      });
    },

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: Math.round(feature.properties.mag) * 3,
      });
    },
  }).addTo(map);

  // TRYING TO ADD A LEGEND

  function getColor(d) {
    return d === '4'  ? "#de2d26" :
           d === '3'  ? "#377eb8" :
           d === '2' ? "#4daf4a" :
           d === '1' ? "#984ea3" :
                        "#ff7f00";
}


  

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    strength = ['5','4','3','2','1'];

    for (var i = 0; i < strength.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(strength[i]) + '"></i> ' +
            (strength[i] ? strength[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);


});