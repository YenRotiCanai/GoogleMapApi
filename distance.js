const geocoder = new google.maps.Geocoder();
const distanceService = new google.maps.DistanceMatrixService();

var origin = '新竹火車站';
var destination = '國立陽明交通大學光復校區';

distanceService.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      avoidHighways: true,
      avoidTolls: true,
    }, callback);

function callback(response, status) {
    if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
    
        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
                console.log("distance: " + distance);
                console.log("duration: " + duration);
            }
        }
    }
}