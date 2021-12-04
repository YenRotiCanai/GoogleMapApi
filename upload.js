let btn_upload = document.getElementById('upload-file').addEventListener('click', upload_file)

function upload_file(){
    let file = document.getElementById("choose-file").files[0];
    let formData = new FormData();
        
    formData.append("file", file);
    let request = fetch('http://127.0.0.1:8000/uploadfile/', {method: "POST", body: formData});

    request
    .then(response => response.json())
    .then(response=>{
        console.log(response);
    })
}


function show_file(){
    // console.log('btn clicked')

    Papa.parse(document.getElementById('choose-file').files[0],{
        download: true,
        header: false,
        complete: function(results){
            // console.log(results);
            displayHTMLTable(results);
        }
    });

    function displayHTMLTable(results){
        var table = "<table class='table'>";
        var data = results.data;
            
        // console.log(data)
        // console.log(data[1])

        for(i=0;i<data.length;i++){
            table+= "<tr>";
            var row = data[i];
            var cells = row.join(",").split(",");
                
            for(j=0;j<cells.length;j++){
                table+= "<td>";
                table+= cells[j];
                table+= "</th>";
            }
            table+= "</tr>";
        }
        table+= "</table>";
        document.getElementById('csv_table').innerHTML = table;
    }
    
};

// $(document).ready(function(){

//     $('#submit-file').on("click", function(e){
//         e.preventDefault();
//         $('#files').parse({
//             config: {
//                 delimiter: "auto",
//                 complete: displayHTMLTable,
//             },
//             before: function(file, inputElem)
//             {
//                 //console.log("Parsing file...", file);
//             },
//             error: function(err, file)
//             {
//                 //console.log("ERROR:", err, file);
//             },
//             complete: function()
//             {
//                 //console.log("Done with all files");
//             }
//         });
//     });

//     
// })



