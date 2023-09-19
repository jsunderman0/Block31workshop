const pg = require('pg');
const client = new pg.Client('postgres://localhost/pet_finder_db');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/api/pets' , async (req, res, next) => {
    try{
        const SQL = `
            SELECT *
            FROM pets
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    }
    catch(ex){
        next(ex);
    }

})

const setup = async () => {
    await client.connect()
    console.log("connected to the database")
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            is_favorite BOOLEAN
        );
        INSERT INTO pets (name) VALUES ('Jack');
        INSERT INTO pets (name) VALUES ('Michael');
        INSERT INTO pets (name) VALUES ('Austin');
        INSERT INTO pets (name) VALUES ('Akash')
        
    `;
    await client.query(SQL);
    console.log("tables created and data seeded")

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    }
    )
    
}
setup()