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



// API endpoints
app.post('/api/marker', async (req, res) => {
    // const marker = await User.create(req.body);
    res.json(user);
});

app.get("/api/marker", (req, res, next) => {

    db.all("select * from marker", (err, rows) => {

        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        // let markerList = rows.map((marker) => {

        //     db.all("select * from attribute", (err, rows) => {

        //         if (err) return marker;

        //         return { ...marker, attributeList: rows }

        //     });

        // })


        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/marker2", (req, res, next) => {

    const sql = "SELECT * FROM marker; \
    SELECT * from attribute \
    INNER JOIN attribute ON marker.id = attribute.marker_id";


    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        console.log(rows);
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