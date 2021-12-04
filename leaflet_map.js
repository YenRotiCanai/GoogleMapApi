// var map = L.map('map').setView([24.82434674639735, 121.00141682492709], 13);

// var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 20
// }).addTo(map);

// 測試資料
let rrJSON = '{"1":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"},"2":{"順序":"1","GPS座标":"24.7981541, 121.0017048","lat":"24.798154","lng":"121.001705","名字":"新竹市立建功高級中學","地址":"300新竹市東區建功二路17號","距離":"1.0 km","身份證":"X198011548","電話":"954955118"},"3":{"順序":"7","GPS座标":"24.7817484, 121.0205401","lat":"24.781748","lng":"121.02054","名字":"新竹老爺酒店","地址":"300新竹市東區光復路一段227號","距離":"3.1 km","身份證":"X198011554","電話":"954955124"},"4":{"順序":"4","GPS座标":"24.7722707, 121.0232623","lat":"24.772271","lng":"121.023262","名字":"聯發科技總部","地址":"300新竹市東區篤行一路1號","距離":"5.0 km","身份證":"X198011551","電話":"954955121"},"5":{"順序":"11","GPS座标":"24.775045, 121.000251","lat":"24.775045","lng":"121.000251","名字":"乾坤科技股份有限公司","地址":"308新竹縣寶山鄉研發二路2號","距離":"4.0 km","身份證":"X198011558","電話":"954955128"},"6":{"順序":"3","GPS座标":"24.778253, 120.994819","lat":"24.778253","lng":"120.994819","名字":"聯詠科技股份有限公司科技大樓","地址":"308新竹縣寶山鄉創新一路1之2號","距離":"4.4 km","身份證":"X198011550","電話":"954955120"},"7":{"順序":"10","GPS座标":"24.7807936, 120.9978601","lat":"24.780794","lng":"120.99786","名字":"瑞昱半導體股份有限公司二廠","地址":"300新竹市東區園區二路9號","距離":"4.3 km","身份證":"X198011557","電話":"954955127"},"8":{"順序":"2","GPS座标":"24.7815839, 120.9995382","lat":"24.781584","lng":"120.999538","名字":"緯創資通股份有限公司","地址":"300新竹市東區新安路5號","距離":"2.6 km","身份證":"X198011549","電話":"954955119"},"9":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"},"10":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"},"11":{"順序":"5","GPS座标":"24.798897, 120.9788137","lat":"24.798897","lng":"120.978814","名字":"新竹市立動物園","地址":"300新竹市東區食品路66號","距離":"2.6 km","身份證":"X198011552","電話":"954955122"},"12":{"順序":"15","GPS座标":"24.793853, 120.9709649","lat":"24.793853","lng":"120.970965","名字":"財團法人食品工業發展研究所","地址":"300新竹市東區食品路331號","距離":"3.6 km","身份證":"X198011562","電話":"954955132"},"13":{"順序":"16","GPS座标":"24.7970702, 120.9553915","lat":"24.79707","lng":"120.955392","名字":"新竹市農會","地址":"300新竹市香山區中山路598號","距離":"6.0 km","身份證":"X198011563","電話":"954955133"},"14":{"順序":"6","GPS座标":"24.7901418, 120.9656076","lat":"24.790142","lng":"120.965608","名字":"新竹市立育賢國民中學","地址":"300新竹市東區南大路569號","距離":"4.9 km","身份證":"X198011553","電話":"954955123"},"15":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"},"16":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"},"17":{"順序":"14","GPS座标":"24.8103007, 120.9834718","lat":"24.810301","lng":"120.983472","名字":"新竹區監理所新竹市監理站","地址":"300新竹市東區自由路10號","距離":"3.5 km","身份證":"X198011561","電話":"954955131"},"18":{"順序":"8","GPS座标":"24.8129363, 120.9797227","lat":"24.812936","lng":"120.979723","名字":"三民國中","地址":"300新竹市東區中央路345號","距離":"3.1 km","身份證":"X198011555","電話":"954955125"},"19":{"順序":"12","GPS座标":"24.8122159, 120.9644956","lat":"24.812216","lng":"120.964496","名字":"森SPACE 共享辦公室\/場地租借","地址":"300新竹市北區經國路二段100號11樓","距離":"4.5 km","身份證":"X198011559","電話":"954955129"},"20":{"順序":"13","GPS座标":"24.8105599, 120.9512026","lat":"24.81056","lng":"120.951203","名字":"德龍商店(新竹水潤餅)","地址":"300新竹市北區成功路326號","距離":"6.3 km","身份證":"X198011560","電話":"954955130"},"21":{"順序":"9","GPS座标":"24.8044995, 120.9655154","lat":"24.804499","lng":"120.965515","名字":"新竹都城隍廟","地址":"300新竹市北區中山路75號","距離":"4.8 km","身份證":"X198011556","電話":"954955126"},"22":{"順序":"0","GPS座标":"24.794374, 121.0001793","lat":"24.794374","lng":"121.000179","名字":"雅素齋自然人文蔬食館","地址":"300新竹市東區光復路二段214號","距離":"0 km","身份證":"X198011547","電話":"954955117"}}';

// 地圖樣式
var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

// 把 json 轉成 javascript object
let rrObj = JSON.parse(rrJSON);

let colors = ['red','blue','yellow','green','orange','purple']; // 線的顏色
let cont_name = ""; // 參賽者名字
let group_name = "";    // 路線分組名字
let rest_name = rrObj[1].名字;  //餐廳名字
let rest_count = 0; // 餐廳計數器（用來統計是不是跑完一輪了，因為起點和終點都是餐廳，所以計數器=2的時候，代表跑完一輪）

let routes_latlng = []; // gps 群組
let routes_cont_name = [];   // 路線群組裡的參賽者名字
let routes_count = 0;   // 路線計數器
let routes_group = [];  // 路線陣列
let all_routes = L.layerGroup();    // 包含全部路線的圖層群組(layerGroup)

// 存放圖層的變數，後面會陸續增加
let overlays = {
    '所有路線':all_routes
};

// 算出地圖邊界
let max_lat = rrObj[1].lat;
let min_lat = rrObj[1].lat;
let max_lng = rrObj[1].lng;
let min_lng = rrObj[1].lng;


for(var i in rrObj){
    cont_name = rrObj[i].名字;  // 取得參賽者名字
    if(cont_name == rest_name) rest_count++;    // 如果參賽者名字和餐廳名字一樣，餐廳計數器+1

    // 把 gps 和 名字都放到各自的陣列裡
    routes_latlng.push([Number(rrObj[i].lat), Number(rrObj[i].lng)]);
    routes_cont_name.push(cont_name);

    // 計算地圖邊界
    max_lat = Math.max(max_lat, rrObj[i].lat);
    min_lat = Math.min(min_lat, rrObj[i].lat);
    max_lng = Math.max(max_lng, rrObj[i].lng);
    min_lng = Math.min(min_lng, rrObj[i].lng);

    // 如果跑完一輪了
    if(rest_count == 2){

        // 新增一個路線圖層
        routes_group[routes_count] = L.layerGroup();

        // 把每一個地點都加上一個圖標(marker)，除了加到目前的圖層以外，還要加到最大的圖層裡(all_routes)
        for(var j=0; j<routes_latlng.length; j++){
            L.marker([ routes_latlng[j][0], routes_latlng[j][1] ]).bindPopup(j+" "+routes_cont_name[j]).addTo(routes_group[routes_count]).addTo(all_routes);
        }

        // 劃線，然後加到圖層裡
        L.polyline(routes_latlng, {color: colors[routes_count]}).addTo(routes_group[routes_count]).addTo(all_routes);

        // 圖層命名
        group_name = "路線 " + (routes_count+1);
        overlays = Object.assign({[group_name]:routes_group[routes_count]}, overlays);

        // 重置參數
        rest_count = 0;
        routes_latlng = [];
        routes_cont_name = [];
        routes_count ++;
    }
}

// 宣告地圖，預設圖層為(all_routes)
var map = L.map('map',{
    center: [24.82434674639735, 121.00141682492709],
    zoom: 13,
    layers: [CartoDB_Voyager, all_routes]
});

// 增加圖層，順便排序
var layerControl = L.control.layers(overlays, null, {collapsed:false, sortLayers:true}).addTo(map);

// 用邊界來把地圖置中
let bounds = [[min_lat,min_lng],[max_lat,max_lng]];
map.fitBounds(bounds)



// 其他 function

let regArea = "";
let regRouteNum = 0;
let regSheetID = "";

let mapArea = "";
let mapRouteNum = 0;
let mapSheetID = "";


// 登錄資料表
document.getElementById("regBtn").addEventListener('click', ()=>{
    
    //取使用者輸入
    regArea = document.getElementById("regArea").value;
    regRouteNum = document.getElementById("regRouteNum").value;
    regSheetID = document.getElementById("regSheetID").value;

    //轉成 json 格式
    let data = JSON.stringify({area: regArea, routeNum: regRouteNum, sheetID: regSheetID});
    console.log(data);

    //post 到伺服器
    let url = 'http://127.0.0.1:8000/regSheet/';
    let request = fetch('http://127.0.0.1:8000/regSheet/', {
        method: "POST", 
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    //伺服器回傳
    request
    .then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('資料登錄失敗！\n請確保資料輸入正確');
        }
    })
    .then(response=>{
        console.log(response);
        alert("資料登錄成功！"); //跳出小視窗
    }) 
    .catch(error => {
        console.error(error);
        alert(error); //跳出錯誤資訊
    })
})


//取資料表資料
document.getElementById("mapArea").addEventListener('change', ()=>{

    //要取的區域
    let mapValue = document.getElementById("mapArea").value;

    //從伺服器 get
    let url = 'http://127.0.0.1:8000/getSheet/' + mapValue;
    var request = fetch( url, {
        method: 'GET'
    });

    request
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('未找到該地區資料表！請先登錄資料表')
        }
    })
    .then(response =>{
        document.getElementById("mapRouteNum").textContent = response.routeNum;
        document.getElementById("mapSheetID").textContent = response.sheetID;
    })
    .catch(error => {
        console.error(error);
        alert(error); //跳出錯誤資訊
    })
    // document.getElementById("mapRouteNum").textContent = regRouteNum;
    // document.getElementById("mapSheetID").textContent = regSheetID;
    // console.log(document.getElementById("mapRouteNum").textContent);
    // console.log(document.getElementById("mapSheetID").textContent);
})