const geocoder = new google.maps.Geocoder();
const distanceService = new google.maps.DistanceMatrixService();

// let map = new google.maps.Map(document.getElementById('distance_map'), options);

let origin = "";
let destination = "";

document.querySelector('#calc_btn').addEventListener('click', calcDistance);
function calcDistance(){
    origin = document.getElementById("origin").value;
    destination = document.getElementById('destination').value;

    console.log("ori: "+ origin +", dest: "+destination);

    distanceService.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          avoidHighways: true,
          avoidTolls: true,
        }, callback);
}

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