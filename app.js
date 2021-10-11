const L0 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-0" value="梅竹山莊"><label class="form-check-label" for="formCheck-1">梅竹山莊</label></div>');
const L1 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1" value="帝國經貿大樓"><label class="form-check-label" for="formCheck-1">帝國經貿大樓</label></div>');
const L2 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-2" value="新竹市東區民享街26號"><label class="form-check-label" for="formCheck-1">民享街26號</label></div>');
const L3 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-3" value="聯發科技總部"><label class="form-check-label" for="formCheck-1">聯發科技總部</label></div>')
const L4 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-4" value="河堤上的貓"><label class="form-check-label" for="formCheck-1">河堤上的貓</label></div>');
const L5 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-5" value="新竹市政府"><label class="form-check-label" for="formCheck-1">新竹市政府</label></div>');
const L6 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-6" value="新竹火車站"><label class="form-check-label" for="formCheck-1">新竹火車站</label></div>')
const L7 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-7" value="慈濟新竹靜思堂"><label class="form-check-label" for="formCheck-1">慈濟新竹靜思堂</label></div>');
const L8 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-8" value="300新竹市香山區中山路640巷435弄1號"><label class="form-check-label" for="formCheck-1">陽光別墅</label></div>');
const L9 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-9" value="百臻觀"><label class="form-check-label" for="formCheck-1">百臻觀</label></div>')
const L10 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-10" value="明新科技大學"><label class="form-check-label" for="formCheck-1">明新科技大學</label></div>')
const L11 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-11" value="三陽工業股份有限公司"><label class="form-check-label" for="formCheck-1">三陽工業股份有限公司</label></div>')
const L12 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-12" value="華淵電機工業股份有限公司"><label class="form-check-label" for="formCheck-1">華淵電機工業股份有限公司</label></div>')
const L13 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-13" value="新竹縣立忠孝國民中學"><label class="form-check-label" for="formCheck-1">新竹縣立忠孝國民中學</label></div>')

const group1 = L0+L1+L2+L3;
const group2 = L4+L5+L6;
const group3 = L7+L8+L9;
const group4 = L10+L11+L12+L13;

var checked_dest = [];

function calc(){
    checked_dest = [];
	const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	console.log("length: " + checkboxes.length);
	
	checkboxes.forEach((checkbox) => {
		checked_dest.push(checkbox.value);
	});
	console.log(checked_dest);

    calcRoute();
}

function uncheck(){
	const chkboxs = document.querySelectorAll('input[type="checkbox"]:checked');
	chkboxs.forEach((cb)=>{
		cb.checked = false;
	});
}

function changeOrigin(){
	const origin = document.getElementById("origin").value;
	console.log(origin);
	switch(origin){
        case '0':
			document.getElementById("label_list").innerHTML = "";
			break;
		case '雅素齋自然人文蔬食館':
			document.getElementById("label_list").innerHTML = group1;
			break;
		case '井町日式蔬食料理':
			document.getElementById("label_list").innerHTML = group2;
			break;
		case '家蓁素食自助餐':
			document.getElementById("label_list").innerHTML = group3;
			break;
        case '子欣素食':
            document.getElementById("label_list").innerHTML = group4;
            break;
	}
}

//-------------------------------//

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

    // marker.addListener("click", (mapsMouseEvent)=>{
    //     if(go_label){
    //         from.value = property.name;
    //         go_label = false;
    //     }else{
    //         to.value = property.name;
    //         go_label = true;
    //     }
    //     //detailWindow.open(map, marker);
    // })
}

addMarker(R1_yashuzhai);
addMarker(R2_jingding);
addMarker(R3_jiazhen);
addMarker(R4_zixin);

function calcRoute(){

    const waypts = [];
    for(let i=0; i < checked_dest.length-1; i++){
        waypts.push({
            location: checked_dest[i],
            stopover:true
        });
    }
    console.log("waypts: " + waypts);
    console.log("origin: " + document.getElementById("origin").value);
    console.log("dest: " + checked_dest[checked_dest.length-1]);


    directionsService
    .route({
        origin:{
            query: document.getElementById("origin").value,
        },
        destination:{
            query: checked_dest[checked_dest.length-1],
        },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    })
    .then((response) => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById("collapse-1");

        summaryPanel.innerHTML = "";

        var totalDistance = 0;

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;

            summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
            totalDistance += route.legs[i].distance.value/1000;
            console.log(route.legs[i].distance.text);
            console.log("Distance: " + totalDistance);
        }

        totalDistance = Math.round(totalDistance*10)/10;
        console.log("Total Distance: " + totalDistance);
        document.getElementById("totalDistance").innerHTML = totalDistance + " km";
    })
}

function clearRoute(){
    from.value = "";
    to.value = "";
    go_label = true;
}