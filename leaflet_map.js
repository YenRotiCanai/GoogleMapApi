// 其他 function

let regArea = "";
let regRouteNum = 0;
let regSheetUrl = "";

let mapArea = "";
let mapRouteNum = 0;
let mapSheetUrl = "";

let mapJson = "";

// 登錄資料表
document.getElementById("regBtn").addEventListener('click', ()=>{
    
    //取使用者輸入
    regArea = document.getElementById("regArea").value;
    regRouteNum = document.getElementById("regRouteNum").value;
    regSheetUrl = document.getElementById("regSheetUrl").value;

    //轉成 json 格式
    let data = JSON.stringify({area: regArea, routeNum: regRouteNum, sheetUrl: regSheetUrl});
    console.log(data);

    //post 到伺服器
    let url = 'http://127.0.0.1:8000/regSheet/';
    // let url = 'https://health21-fastapi.herokuapp.com/regSheet/';
    let request = fetch(url, {
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
            throw new Error('資料登錄失敗!\n請確保資料輸入正確');
        }
    })
    .then(response=>{
        console.log(response);
        alert("資料登錄成功!"); //跳出小視窗
    }) 
    .catch(error => {
        console.error(error);
        alert(error); //跳出錯誤資訊
    })
})


//取資料表資料
document.getElementById("mapArea").addEventListener('change', ()=>{

    //清空原本的值
    document.getElementById("mapRouteNum").textContent = "";
    document.getElementById("mapSheetUrl").textContent = "";

    //要取的區域
    let mapValue = document.getElementById("mapArea").value;

    //從伺服器 get
    let url = 'http://127.0.0.1:8000/getSheet/' + mapValue;
    // let url = 'https://health21-fastapi.herokuapp.com/getSheet/' + mapValue;
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
        document.getElementById("mapSheetUrl").textContent = response.sheetUrl;
        mapJson = response.routesJson;
        
        drawMap(mapJson);
    })
    .catch(error => {
        console.error(error);
        alert(error); //跳出錯誤資訊
    })
})

function getAreaSelection(){
    let url = 'http://127.0.0.1:8000/getMapArea/';
    // let url = 'https://health21-fastapi.herokuapp.com/getSheet/' + mapValue;
    var request = fetch( url, {
        method: 'GET'
    });

    request
    .then(response =>response.json())
    .then(response =>{
        console.log(response);
        let selArea = document.getElementById('mapArea');
        let str = '<option value="please select" selected>請選擇</option>';

        for(var i in response){
            str += '<option value="' + i + '">' + i + '</option>'
        }

        selArea.innerHTML = str;

    })
}

getAreaSelection()

// var map = L.map('map').setView([24.82434674639735, 121.00141682492709], 13);

// var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 20
// }).addTo(map);

// 測試資料
let rrJSON = '{"0":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"1":{"順序編號":1,"lat":24.798897,"lng":120.9788137,"取餐地點":"300新竹市東區食品路66號","取餐方式":"外送","名字":"鄧怡君","距離km":2.6,"身份證":"D199895462","電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"2":{"順序編號":7,"lat":24.793853,"lng":120.9709649,"取餐地點":"300新竹市東區食品路331號","取餐方式":"外送","名字":"呂宇軒","距離km":3.6,"身份證":"F298131981","電話":941470789,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"3":{"順序編號":4,"lat":24.8129363,"lng":120.9797227,"取餐地點":"300新竹市東區中央路345號","取餐方式":"外送","名字":"葉昱瑞","距離km":3.1,"身份證":"A194421941","電話":964995881,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"4":{"順序編號":11,"lat":24.8103007,"lng":120.9834718,"取餐地點":"300新竹市東區自由路10號","取餐方式":"外送","名字":"許馥翰","距離km":3.5,"身份證":"F299279766","電話":979011430,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"5":{"順序編號":3,"lat":24.798897,"lng":120.9788137,"取餐地點":"300新竹市東區食品路66號","取餐方式":"外送","名字":"張嘉凱","距離km":2.6,"身份證":"C296920727","電話":950406516,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"6":{"順序編號":10,"lat":24.793853,"lng":120.9709649,"取餐地點":"300新竹市東區食品路331號","取餐方式":"外送","名字":"黃初斌","距離km":3.6,"身份證":"C299697038","電話":966684874,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"7":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"8":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"9":{"順序編號":5,"lat":24.778253,"lng":120.994819,"取餐地點":"308新竹縣寶山鄉創新一路1之2號","取餐方式":"外送","名字":"陸方皓","距離km":4.4,"身份證":"E294056931","電話":940360858,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"10":{"順序編號":15,"lat":24.8129363,"lng":120.9797227,"取餐地點":"300新竹市東區中央路345號","取餐方式":"外送","名字":"張向治","距離km":3.1,"身份證":"B197729427","電話":959603186,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"11":{"順序編號":16,"lat":24.8044995,"lng":120.9655154,"取餐地點":"300新竹市北區中山路75號","取餐方式":"外送","名字":"馮皇冰","距離km":4.8,"身份證":"C191931282","電話":967091883,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"12":{"順序編號":6,"lat":24.778253,"lng":120.994819,"取餐地點":"308新竹縣寶山鄉創新一路1之2號","取餐方式":"外送","名字":"郭家友","距離km":4.4,"身份證":"G193413281","電話":942349838,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"13":{"順序編號":2,"lat":24.7815839,"lng":120.9995382,"取餐地點":"300新竹市東區新安路5號","取餐方式":"外送","名字":"林佳蓉","距離km":2.6,"身份證":"E196819809","電話":992366382,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"14":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"15":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"16":{"順序編號":12,"lat":24.7807936,"lng":120.9978601,"取餐地點":"300新竹市東區園區二路9號","取餐方式":"外送","名字":"楊志為","距離km":4.3,"身份證":"G297346050","電話":980336801,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"17":{"順序編號":13,"lat":24.7722707,"lng":121.0232623,"取餐地點":"300新竹市東區篤行一路1號","取餐方式":"外送","名字":"權育儒","距離km":5.0,"身份證":"D197523892","電話":997123331,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"18":{"順序編號":9,"lat":24.8044995,"lng":120.9655154,"取餐地點":"300新竹市北區中山路75號","取餐方式":"外送","名字":"林曉芷","距離km":4.8,"身份證":"H193570666","電話":942794823,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"19":{"順序編號":14,"lat":24.8044995,"lng":120.9655154,"取餐地點":"300新竹市北區中山路75號","取餐方式":"外送","名字":"林紫慈","距離km":4.8,"身份證":"H293394739","電話":973661026,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"20":{"順序編號":8,"lat":24.8103007,"lng":120.9834718,"取餐地點":"300新竹市東區自由路10號","取餐方式":"外送","名字":"郭淑惠","距離km":3.5,"身份證":"E291516789","電話":964444746,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"},"21":{"順序編號":0,"lat":24.794374,"lng":121.0001793,"取餐地點":"300新竹市東區光復路二段214號","取餐方式":"餐廳","名字":"雅素齋自然人文蔬食館","距離km":1.0,"身份證":940875015,"電話":940875015,"餐廳":"雅素齋自然人文蔬食館","餐廳地址":"300新竹市東區光復路二段214號"}}';

function drawMap(mapJson){
    // 地圖樣式
    var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // 把 json 轉成 javascript object
    let rrObj = JSON.parse(mapJson);

    let colors = ['red','blue','yellow','green','orange','purple']; // 線的顏色
    let cont_name = ""; // 參賽者名字
    let group_name = "";    // 路線分組名字
    let rest_name = rrObj[0].名字;  //餐廳名字
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
    let max_lat = rrObj[0].lat;
    let min_lat = rrObj[0].lat;
    let max_lng = rrObj[0].lng;
    let min_lng = rrObj[0].lng;


    for(var i in rrObj){
        cont_name = rrObj[i].名字;  // 取得參賽者名字
        console.log(cont_name);
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

            console.log(routes_latlng);
            console.log(routes_cont_name);
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
}

