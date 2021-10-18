// firebase 資料庫相關
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, update, remove, get, child } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA90qw12czw-1Sqhld4HknBD4gYeUmNMP0",
    authDomain: "maptestfirebase-72508.firebaseapp.com",
    databaseURL: "https://maptestfirebase-72508-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "maptestfirebase-72508",
    storageBucket: "maptestfirebase-72508.appspot.com",
    messagingSenderId: "222097511558",
    appId: "1:222097511558:web:673ddc6a5f33948859ed07",
    measurementId: "G-M8F1W4C480"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//新增餐廳
// function addRestaurant(name, phone, address){
//     set(ref(db, 'restaurant/'+name), {
//         rName: name,
//         rPhone: phone,
//         rAddress: address
//     });
// }

// addRestaurant('雅素齋自然人文蔬食館', '035718222', '300新竹市東區光復路二段214號');

//新增參賽者
function addContestant(name, phone, address){
    set(ref(db, 'contestant/'+name), {
        cName: name,
        cPhone: phone,
        cAddress: address
    });
}

// addContestant('梅竹山莊', '035718366', '300新竹市東區大學路50號300');

// function updateData(name, phone, address){
//     update(ref(db, 'contestant/'+name), {
//         cName: name,
//         cPhone: phone,
//         cAddress: address
//     });
// }

// updateData('梅竹山莊', '035718366', '300新竹市東區大學路50號300')

// readData
function getAddress(cName){
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'contestant/'+cName)).then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val().cAddress);
        }else{
            console.log("No data available");
        }
    })
}

// getAddress('梅竹山莊');


//地圖設定
let options = {
    center: {lat:24.82434674639735, lng:121.00141682492709},
    zoom: 12
}

//創新的地圖
let map = new google.maps.Map(document.getElementById('map'), options);

let directionsService = new google.maps.DirectionsService();
let directionsRenderer = new google.maps.DirectionsRenderer();

directionsRenderer.setMap(map);

//TODO: 改成從資料庫抓 data--------/
const L0 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-0" name="label_list" value="梅竹山莊"><label class="form-check-label" for="formCheck-1">梅竹山莊</label></div>');
const L1 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1" name="label_list" value="帝國經貿大樓"><label class="form-check-label" for="formCheck-1">帝國經貿大樓</label></div>');
const L2 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-2" name="label_list" value="新竹市東區民享街26號"><label class="form-check-label" for="formCheck-1">民享街26號</label></div>');
const L3 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-3" name="label_list" value="聯發科技總部"><label class="form-check-label" for="formCheck-1">聯發科技總部</label></div>')
const L4 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-4" name="label_list" value="河堤上的貓"><label class="form-check-label" for="formCheck-1">河堤上的貓</label></div>');
const L5 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-5" name="label_list" value="新竹市政府"><label class="form-check-label" for="formCheck-1">新竹市政府</label></div>');
const L6 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-6" name="label_list" value="新竹火車站"><label class="form-check-label" for="formCheck-1">新竹火車站</label></div>')
const L7 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-7" name="label_list" value="慈濟新竹靜思堂"><label class="form-check-label" for="formCheck-1">慈濟新竹靜思堂</label></div>');
const L8 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-8" name="label_list" value="300新竹市香山區中山路640巷435弄1號"><label class="form-check-label" for="formCheck-1">陽光別墅</label></div>');
const L9 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-9" name="label_list" value="百臻觀"><label class="form-check-label" for="formCheck-1">百臻觀</label></div>')
const L10 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-10" name="label_list" value="明新科技大學"><label class="form-check-label" for="formCheck-1">明新科技大學</label></div>')
const L11 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-11" name="label_list" value="303新竹縣湖口鄉中華路3號"><label class="form-check-label" for="formCheck-1">三陽工業股份有限公司</label></div>')
const L12 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-12" name="label_list" value="華淵電機工業股份有限公司"><label class="form-check-label" for="formCheck-1">華淵電機工業股份有限公司</label></div>')
const L13 = ('<div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-13" name="label_list" value="新竹縣立忠孝國民中學"><label class="form-check-label" for="formCheck-1">新竹縣立忠孝國民中學</label></div>')

const group1 = L0+L1+L2+L3;
const group2 = L4+L5+L6;
const group3 = L7+L8+L9;
const group4 = L10+L11+L12+L13;
//-------------------------------/

//各種 function
let checked_dest = [];

document.querySelector('#calc').addEventListener('click', calc);
function calc(){
    checked_dest = [];
	const checkboxes = document.querySelectorAll('input[name="label_list"]:checked');
	console.log("length: " + checkboxes.length);
	
	checkboxes.forEach((checkbox) => {
		checked_dest.push(checkbox.value);
	});
	console.log(checked_dest);

    if(checked_dest.length > 0){
        calcRoute();
    }
}

document.querySelector('#uncheck').addEventListener('click', uncheck);
function uncheck(){
	const chkboxs = document.querySelectorAll('input[name="label_list"]:checked');
	chkboxs.forEach((cb)=>{
		cb.checked = false;
	});
}

document.querySelector('#origin').addEventListener('change', changeOrigin);
function changeOrigin(){
	const origin = document.getElementById("origin").value;
	console.log("origin:"+origin);
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

class Rest_Info{
    constructor(location, name, icon)
    {
        this.location = location,
        this.name = name,
        this.icon = icon
    }
}

//TODO: 餐廳資訊從 firebase 抓 (once)
const R1_yashuzhai = new Rest_Info({lat:24.794388261674445, lng: 121.00012480028795}, "雅素齋自然人文蔬食館","./icon/Picture1_ya.png");
const R2_jingding = new Rest_Info({lat:24.80694440021254, lng: 120.96717814114272}, "井町日式蔬食料理", "./icon/Picture2_jing.png");
const R3_jiazhen =  new Rest_Info({lat:24.799638469920698, lng: 120.95316545574171}, "家蓁素食自助餐", "./icon/Picture3_jia.png");
const R4_zixin = new Rest_Info({lat:24.871209418461, lng: 120.993891846625}, "子欣素食", "./icon/Picture4_zi.png");

// 在地圖上標出餐廳位置
let markers = [];
function addMarker(property){
    let icon = {
        url:property.icon,
        scaledSize: new google.maps.Size(100,100),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }
    const marker = new google.maps.Marker({
        map: map,
        position: property.location,
        icon: icon
    });

    markers.push(marker);

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

function setMapOnAll(map){
    for(let i=0; i<markers.length; i++){
        markers[i].setMap(map);
    }
}

document.querySelector('#changeMarker').addEventListener('click', changeMarker);
function changeMarker(){
    if(document.getElementById("changeMarker").checked){
        setMapOnAll(map);
    }else{
        setMapOnAll(null);
    }
}


// 計算各家和餐廳的距離
// function calcDistance(){
//     var axios = require('axios');

//     var distanceConfig = {
//     method: 'get',
//     url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=新竹火車站&destinations=國立陽明交通大學&key=AIzaSyBR2TL-7XibVRMbpjzkVDyLJzFQ390mAes',
//     headers: { }
//     };

//     axios(distanceConfig)
//     .then(function (response) {
//     console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//     console.log(error);
//     });
// }
// calcDistance();


// 計算推薦路線
let wayptsforRoute = [];

function calcRoute(){
    wayptsforRoute = [];
    for(let i=0; i < checked_dest.length-1; i++){
        wayptsforRoute.push({
            location: checked_dest[i],
            stopover:true
        });
    }
    // console.log("wayptsforRoute: " + wayptsforRoute);
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
        waypoints: wayptsforRoute,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    })
    .then((response) => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById("collapse-1");

        summaryPanel.innerHTML = "";

        let distance = 0;
        let totalDistance = 0;
        let fee = 0;
        let totalFee = 0;

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;

            distance = route.legs[i].distance.value/1000;
            totalDistance += distance;
            fee = Math.ceil(distance)*30;
            totalFee += fee;
            //console.log(route.legs[i].distance.text);
            //console.log("Distance: " + distance + ", fee: " + fee);

            summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + " ";
            summaryPanel.innerHTML += "NTD " + fee + "<br><br>";
            
        }

        totalDistance = Math.round(totalDistance*10)/10;
        //console.log("Total Distance: " + totalDistance);
        document.getElementById("totalDistance").innerHTML = totalDistance + " km";
        document.getElementById("totalFee").innerHTML = "NTD" + totalFee;
    })
}

document.querySelector('#extMap').addEventListener('click', extMap);
function extMap(){
    window.open("https://www.google.com.tw/maps/dir/新竹市東區中華路二段新竹火車站/30010新竹市東區大學路1001號國立陽明交通大學/新竹市東區光復路二段清華大學/新竹縣竹北市高鐵新竹站");
}