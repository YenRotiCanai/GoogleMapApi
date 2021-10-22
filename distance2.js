// const geocoder = new google.maps.Geocoder();
// const distanceService = new google.maps.DistanceMatrixService();

let options = {
    zoom: 12,
    center: {lat:24.82434674639735, lng:121.00141682492709}
}

let map = new google.maps.Map(document.getElementById('distance_map'), options);
let directionsService2 = new google.maps.DirectionsService();
let directionsRenderer2 = new google.maps.DirectionsRenderer();
directionsRenderer2.setMap(map);

let origin = "";
let destination = "";

document.querySelector('#origin').addEventListener('change', changeMapCenter);
function changeMapCenter(){
    console.log("change ori");
}

document.querySelector('#calc_btn').addEventListener('click', calcDistance);
function calcDistance(){
    origin = document.getElementById("origin").value;
    destination = document.getElementById('destination').value;

    console.log("ori: "+ origin +", dest: "+destination);

    directionsService2
    .route({
        origin:{
            query: document.getElementById("origin").value,
        },
        destination:{
            query: document.getElementById("destination").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) =>{
        directionsRenderer2.setDirections(response);

        const route = response.routes[0];
        const infopanel = document.getElementById("dist_info_panel");
        infopanel.innerHTML = "";

        const dist = route.legs[0].distance.value/1000;
        const fee = Math.ceil(dist)*30;

        infopanel.innerHTML += "<b>距離： </b>" + route.legs[0].distance.text + "<br>";
        infopanel.innerHTML += "NTD " + fee + "<br>";
    })
    
}

