var go_label = new Boolean(true);

//地圖設定
var options = {
    center: {lat:24.82434674639735, lng:121.00141682492709},
    zoom: 12
}

//創新的地圖
var map = new google.maps.Map(document.getElementById('map'), options);

var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

directionsRenderer.setMap(map);

class Rest_Info{
    constructor(location, name, icon)
    {
        this.location = location,
        this.name = name,
        this.icon = icon
    }
}

//餐廳
const R1_yashuzhai = new Rest_Info({lat:24.794388261674445, lng: 121.00012480028795}, "雅素齋自然人文蔬食館","/icon/Picture1_ya.png");
const R2_jingding = new Rest_Info({lat:24.80694440021254, lng: 120.96717814114272}, "井町日式蔬食料理", "/icon/Picture2_jing.png");
const R3_jiazhen =  new Rest_Info({lat:24.799638469920698, lng: 120.95316545574171}, "家蓁素食自助餐", "/icon/Picture3_jia.png");
const R4_zixin = new Rest_Info({lat:24.871209418461, lng: 120.993891846625}, "子欣素食", "/icon/Picture4_zi.png");

const from = document.getElementById('from');
const to = document.getElementById('to');

function addMarker(property){
    var icon = {
        url:property.icon,
        scaledSize: new google.maps.Size(100,100),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }
    const marker = new google.maps.Marker({
        map: map,
        position: property.location,
        icon: icon
    })

    //show restaurant name above the marker
    // const detailWindow = new google.maps.InfoWindow({
    //     content: property.name
    // });

    marker.addListener("click", (mapsMouseEvent)=>{
        if(go_label){
            from.value = property.name;
            go_label = false;
        }else{
            to.value = property.name;
            go_label = true;
        }
        //detailWindow.open(map, marker);
    })
}

addMarker(R1_yashuzhai);
addMarker(R2_jingding);
addMarker(R3_jiazhen);
addMarker(R4_zixin);

function calcRoute(){
    directionsService
    .route({
        origin:{
            query: document.getElementById("from").value,
        },
        destination:{
            query: document.getElementById("to").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
        directionsRenderer.setDirections(response);
    })
}

function clearRoute(){
    from.value = "";
    to.value = "";
    go_label = true;
}