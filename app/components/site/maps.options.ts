export class MapsOptions {

    public zoom = 14;

    public styles = [
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -78 }
      ]
    },{
      "stylers": [
        { "saturation": -70 }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "saturation": 100 },
        { "weight": 0.7 },
        { "lightness": 2 }
      ]
    },{
      "featureType": "administrative.locality",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "administrative.country",
      "elementType": "labels.text",
      "stylers": [
        { "visibility": "off" }
      ]
    }];
}