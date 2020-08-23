var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

       /**
        * CREATE TABLE MARKER 
        */ 
        db.run(`CREATE TABLE marker (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            color text, 
            lat text,
            lng text
            ); 
            `,
        (err) => {
            if (err) {
                console.log(err)
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO marker (name, color, lat, lng) VALUES (?,?,?,?)'
                db.run(insert, ["Ponto 1","blue","-54", -"24"])
                db.run(insert, ["Ponto 2","red","-55", -"23"])
                db.run(insert, ["Ponto 3","#ffffff","-56", -"22"])
            }
        });  


        /**
         * CREATE TABLE ATTRIBUTE
         */
        db.run(`
            CREATE TABLE attribute (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key text, 
            value text, 
            id_marker INTEGER
            ); 
            `,
        (err) => {
            if (err) {
                console.log(err)
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO attribute (key, value, id_marker) VALUES (?,?,?)'
                db.run(insert, ["Quantidade","50","1"])
                db.run(insert, ["Nome","Clei","1"])
                db.run(insert, ["Quantidade","50","2"])
                db.run(insert, ["Número","20","2"])
            }
        });  



    }
});


module.exports = db
