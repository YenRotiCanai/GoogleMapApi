function initMap(){
    
    //地圖設定
    var options = {
        center: {lat: 24.794387044191037 , lng: 121.00012748250742},
        zoom: 12
    }

    //創新的地圖
    map = new google.maps.Map(document.getElementById('map'), options)

    class Rest_Info{
        constructor(location, name, icon)
        {
            this.location = location,
            this.name = name,
            this.icon = icon
        }
    }

    //餐廳
    const R1_yashuzhai = new Rest_Info({lat:24.794388261674445, lng: 121.00012480028795}, `<h2>雅素齋自然人文蔬食館</h2>`, "/icon/Picture1_ya.png");
    const R2_jingding = new Rest_Info({lat:24.80694440021254, lng: 120.96717814114272}, `<h2>井町日式蔬食料理</h2>`, "/icon/Picture2_jing.png");
    const R3_jiazhen =  new Rest_Info({lat:24.799638469920698, lng: 120.95316545574171}, `<h2>家蓁素食自助餐</h2>`, "/icon/Picture3_jia.png");
    const R4_zixin = new Rest_Info({lat:24.871209418461, lng: 120.993891846625}, `<h2>子欣素食</h2>`, "/icon/Picture4_zi.png");

    

    /*
    //標記出餐廳的位子
    const marker1 = new google.maps.Marker({
        position: R1_yashuzhai_loc,
        map: map,
    });
    const marker2 = new google.maps.Marker({
        position: R2_jingding_loc,
        map: map,
    });
    const marker3 = new google.maps.Marker({
        position: R3_jiazhen_loc,
        map: map,
    });
    const marker4 = new google.maps.Marker({
        position: R4_zixin_loc,
        map: map,
    });
    

    //顯示餐廳名字
    const detailWindow1 = new google.maps.InfoWindow({
        content: `<h2>雅素齋自然人文蔬食館</h2>`
    });
    const detailWindow2 = new google.maps.InfoWindow({
        content: `<h2>井町日式蔬食料理</h2>`
    });
    const detailWindow3 = new google.maps.InfoWindow({
        content: `<h2>家蓁素食自助餐</h2>`
    });
    const detailWindow4 = new google.maps.InfoWindow({
        content: `<h2>子欣素食</h2>`
    });

    marker1.addListener("click", ()=>{
        detailWindow1.open(map, marker1);
    })
    marker2.addListener("click", ()=>{
        detailWindow2.open(map, marker2);
    })
    marker3.addListener("click", ()=>{
        detailWindow3.open(map, marker3);
    })
    marker4.addListener("click", ()=>{
        detailWindow4.open(map, marker4);
    })
*/

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
        const detailWindow = new google.maps.InfoWindow({
            content: property.name
        });
        marker.addListener("click", ()=>{
            detailWindow.open(map, marker);
        })
    }

    addMarker(R1_yashuzhai);
    addMarker(R2_jingding);
    addMarker(R3_jiazhen);
    addMarker(R4_zixin);
}