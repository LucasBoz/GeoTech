// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")


// APP SERVER CONFIG
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * SERVER CONFIG
 */

// Server port
var HTTP_PORT = 8005
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});


/**
 * API endpoints
 */

 // Save marker
app.post('/api/marker', (req, res) => {
    console.log("POST");
    // console.log(req.body);
    res.json({});
});


// List all marker 
app.get("/api/marker", (req, res, next) => {


    db.all("select * from marker", (err, rows) => {

        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        // rows.forEach(marker => {
        //     let sql = "select * from attribute WHERE attribute.id_marker = " + marker.id; 
        //     let teste = executeSql(sql); 
        //     console.log("2");
        //     console.log(teste);
        // });
        // console.log("3");
        // let markerList = rows.map((marker) => {
        //     let sql = "select * from attribute WHERE attribute.id_marker = " + marker.id; 
        //     let attributesList = new Promise((resolve, reject) => {
        //         DatabaseService.db.transaction(trans => {
        //             trans.executeSql(
        //                 sql,
        //                 params,
        //                 (db, results) => {
        //                     let data;
        //                     if (!resultsInsteadData) {
        //                         data = ParserService.ItemsToArray(results);
        //                     } else {
        //                         data = results;
        //                     }
        //                     resolve(data);
        //                 },
        //                 error => {
        //                     reject(error);
        //                 },
        //             );
        //         });
        //     });
        //     console.log(attributeList);
        //     return { ...marker, attributeList: attributesList }
        // })


        res.json({
            "message": "success",
            "data": rows
        })
    });
});



// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});


