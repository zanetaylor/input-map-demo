'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // Set up custom map marker icon
  var redIcon = L.icon({
    iconUrl: 'img/icon-marker.png',

    iconSize: [30, 30], // size of the icon
    iconAnchor: [16, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
  });

  // Load geoJSON
  $.getJSON("future-bikestations.geojson", function (data) {

    // Process geoJSON
    var geojson = L.geoJson(data, {
      pointToLayer: function pointToLayer(geoJsonPoint, latlng) {
        // Override default marker w/ custom icon
        return L.marker(latlng, {
          icon: redIcon
        });
      },
      // Apply map popup for each geoJSON feature
      onEachFeature: function onEachFeature(feature, layer) {
        // Reference the location by coordinates in form submissions
        $('#comment-form input[name="location"]').val(feature.geometry.coordinates.toString());
        layer.bindPopup($('#comment-wrap')[0].outerHTML);
      }
    });

    // Init Leaflet map in container, set bounds based on geoJSON features
    var map = L.map('map-wrap').fitBounds(geojson.getBounds());

    // Init map tile layer from Mapbox
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiemFuZXRheWxvciIsImEiOiJjam5qZm5meDAwZXprM3dtejhiankyczd6In0.rP6lFtDY0jTLIR2baamMeg'
    }).addTo(map);

    // Add geoJSON layer setup above
    geojson.addTo(map);
  });

  // Process comment form
  $('body').on('submit', '#comment-form', function (e) {
    e.preventDefault();

    var $form = $(this);
    $.post($form.attr('action'), $form.serialize()).then(function () {
      $form.hide().siblings('.notification').show();
    });
  });
});