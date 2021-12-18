let regArea = "";
let regRouteNum = 0;
let regSheetUrl = "";

let mapArea = "";
let mapRouteNum = 0;
let mapSheetUrl = "";

let mapJson = "";

// 登錄資料表
regBtn = document.getElementById("regBtn");
regBtn.addEventListener("click", () => {
    regBtn.disabled = true;
    regBtn.setAttribute(
        "style",
        "background: white; color: black; opacity: 1.0;"
    );
    regBtn.textContent = "請勿關閉本頁面, 資料處理中...";

    //取使用者輸入
    regArea = document.getElementById("regArea").value;
    regRouteNum = document.getElementById("regRouteNum").value;
    regSheetUrl = document.getElementById("regSheetUrl").value;

    //轉成 json 格式
    let data = JSON.stringify({
        area: regArea,
        routeNum: regRouteNum,
        sheetUrl: regSheetUrl,
    });
    // console.log(data);

    //post 到伺服器
    // let url = "http://127.0.0.1:8000/regSheet/";
    let url = 'https://health21-fastapi.herokuapp.com/regSheet/';
    let request = fetch(url, {
        method: "POST",
        body: data,
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    });

    //伺服器回傳
    request
        .then((response) => {
            if (response.ok) {
                regBtn.textContent = "資料處理完成，感謝您的耐心等待!";
                setTimeout(() => {
                    regBtn.disabled = false;
                    regBtn.style = "";
                    regBtn.textContent = "登錄報名表";
                }, 5000);
                return response.json();
            } else {
                throw new Error("資料登錄失敗!\n請確保資料輸入正確");
            }
        })
        .then((response) => {
            // console.log(response);
            alert("資料登錄成功!"); //跳出小視窗
            getAreaSelection();
        })
        .catch((error) => {
            console.error(error);
            alert(error); //跳出錯誤資訊
        });
});

// 取資料表資料
document.getElementById("mapArea").addEventListener("change", showMap);

// 更新地圖按鈕
document.getElementById("mapBtn").addEventListener("click", showMap);

function showMap() {
    //清空原本的值
    document.getElementById("mapRouteNum").textContent = "";
    document.getElementById("mapSheetUrl").textContent = "";

    //要取的區域
    let mapValue = document.getElementById("mapArea").value;

    let selectedArea = sheetObject && sheetObject[mapValue];
    if (selectedArea) {
        const { sheetUrl, routes, routeNum } = selectedArea;

        document.getElementById("mapRouteNum").textContent = routeNum;
        document.getElementById("mapSheetUrl").textContent = sheetUrl;

        // //從伺服器 get
        // let url = "http://127.0.0.1:8000/getSheet";
        let url = 'https://health21-fastapi.herokuapp.com/getSheet/' + mapValue;
        let request = fetch(url, {
            method: "POST",
            body: JSON.stringify({ sheetUrl }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        request
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("未找到該地區資料表! 請先登錄資料表");
            }
        })
        // 畫地圖
        .then(({ routesJson }) => {
            // console.log(routesJson);
            showMapAndRouteDetail(routesJson);
        });
    }
}

// let r = Object();

let sheetObject = null; // {}

// 抓 db 的和氣資料，設成選單
function getAreaSelection() {
    // let url = "http://127.0.0.1:8000/getMapArea/";
    let url = 'https://health21-fastapi.herokuapp.com/getSheet/' + mapValue;

    let request = fetch(url, { method: "GET" });

    let r = request
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response, typeof response);
            let selArea = document.getElementById("mapArea");
            let str = '<option value="please select" selected>請選擇</option>';
            for (let i in response) {
                str += '<option value="' + i + '">' + i + "</option>";
            }
            selArea.innerHTML = str;
            sheetObject = response;
            return response;
        });
    return r;
}

// 教學：出來以後還是可以接著 then 下去
getAreaSelection().then((result) => {
    console.log("getAreaSelection", result);
});

let mapDiv = document.getElementById('mapdiv');
let routeDetail = document.getElementById('routeDetail');

function showMapAndRouteDetail(mapJson) {
    mapDiv.innerHTML = '';
    mapDiv.innerHTML ='<div class="col d-xl-flex justify-content-xl-center map" id="map"></div>';
    routeDetail.innerHTML = '';

    // 地圖樣式
    var CartoDB_Voyager = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
        }
    );

    // 把 json 轉成 javascript object
    let rrObj = JSON.parse(mapJson);

    let colors = ["red", "blue", "yellow", "green", "orange", "purple"]; // 線的顏色
    let lastName = rrObj[0].名字; // 上一個參賽者名字
    let lastAddr = rrObj[0].取餐地點; // 上一個取餐地點
    let restAddr = rrObj[0].取餐地點; // 餐廳地址
    let rest_count = 1; // 餐廳計數器（用來統計是不是跑完一輪了，因為起點和終點都是餐廳，所以計數器=2的時候，代表跑完一輪）
    
    let group_name = ""; // 路線分組名字
    let routes_latlng = []; // gps 群組
    let routes_contName_group = []; // 路線群組裡的參賽者名字
    let routes_addr_group = []; // 取餐地址群組
    let routes_count = 0; // 路線計數器
    let routes_group = []; // 路線群組
    let all_routes = L.layerGroup(); // 包含全部路線的圖層群組(layerGroup)

    // 存放圖層的變數，後面會陸續增加
    let overlays = {
        所有路線: all_routes,
    };

    // 算出地圖邊界
    let max_lat = rrObj[0].lat;
    let min_lat = rrObj[0].lat;
    let max_lng = rrObj[0].lng;
    let min_lng = rrObj[0].lng;

    for (let i=0; i<Object.keys(rrObj).length; i++) {

        let addr = rrObj[i].取餐地點;
        let cname = rrObj[i].名字;
        
        if(addr == lastAddr){
            if(addr != restAddr) lastName += ", " + cname;
            continue;
        }else{
            routes_addr_group.push(lastAddr);
            routes_contName_group.push(lastName);
            routes_latlng.push([Number(rrObj[i-1].lat), Number(rrObj[i-1].lng)]);
            lastAddr = addr;
            lastName = cname;
        }

        if(addr == restAddr) rest_count++; // 如果參賽者名字和餐廳名字一樣，餐廳計數器+1

        // 計算地圖邊界
        max_lat = Math.max(max_lat, rrObj[i].lat);
        min_lat = Math.min(min_lat, rrObj[i].lat);
        max_lng = Math.max(max_lng, rrObj[i].lng);
        min_lng = Math.min(min_lng, rrObj[i].lng);

        // 如果跑完一輪了
        if (rest_count == 2) {

            routes_addr_group.push(addr);
            routes_contName_group.push(cname);
            routes_latlng.push([Number(rrObj[i].lat), Number(rrObj[i].lng)]);

            let navResult = "https://www.google.com.tw/maps/dir/" + routes_addr_group[0];

            let str = routes_addr_group[0] + ' (' + routes_contName_group[0] + ')';
            for(let j=1; j<routes_contName_group.length; j++){
                str += " -> " + routes_addr_group[j]+ ' (' +routes_contName_group[j] + ')';
                navResult += '/' + routes_addr_group[j];
            }

            let k = routes_count + 1;

            routeDetail.innerHTML += '<div class="card"><div class="card-header" id="r' + k + '"><h2 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse' + k + '" aria-expanded="false" aria-controls="collapse' + k + '">路線 #' + k + '</button></h2></div><div id="collapse' + k + '" class="collapse" aria-labelledby="heading' + k + '" data-parent="#routeDetail"><div class="card-body">' + str + '</div>' +'<button class="btn btn-primary" id="nav' + k + '" onclick = "window.open(\'' + navResult + '\');">Google 導航路線</button></div></div>';

            // 新增一個路線圖層
            routes_group[routes_count] = L.layerGroup();

            // 把每一個地點都加上一個圖標(marker)，除了加到目前的圖層以外，還要加到最大的圖層裡(all_routes)
            for (let j = 0; j < routes_latlng.length; j++) {
                L.marker([routes_latlng[j][0], routes_latlng[j][1]])
                    .bindPopup(j + " " + routes_contName_group[j])
                    .addTo(routes_group[routes_count])
                    .addTo(all_routes);
            }

            // 劃線，然後加到圖層裡
            L.polyline(routes_latlng, { color: colors[routes_count] })
                .addTo(routes_group[routes_count])
                .addTo(all_routes);

            // 圖層命名
            group_name = "路線 " + (routes_count + 1);
            overlays = Object.assign(
                { [group_name]: routes_group[routes_count] },
                overlays
            );

            // console.log(routes_latlng);
            // console.log(routes_contName_group);
            // console.log(routes_addr_group);
            // 重置參數
            rest_count = 1;
            routes_latlng = [];
            routes_contName_group = [];
            routes_addr_group = [];
            routes_count++;
        }
    }

    // 宣告地圖，預設圖層為(all_routes)
    var map = new L.map("map", {
        center: [24.82434674639735, 121.00141682492709],
        zoom: 13,
        layers: [CartoDB_Voyager, all_routes],
    });

    // 增加圖層，順便排序
    L.control
        .layers(overlays, null, { collapsed: false, sortLayers: true })
        .addTo(map);

    // 用邊界來把地圖置中
    let bounds = [
        [min_lat, min_lng],
        [max_lat, max_lng],
    ];
    map.fitBounds(bounds);
}