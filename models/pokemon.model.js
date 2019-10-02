const ApiResponse = require('./api-response.model');
const { db } = require('./db.model');

class Pokemon {

    async get() {
        const apiResp = new ApiResponse();
        try {
            const result = await db.pool.query('SELECT * FROM pokemon');
            apiResp.data = result.rows || [];
        }
        catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
        }
        return apiResp;
    }

    async add(pokemon) {

        const apiResp = new ApiResponse();

        if (pokemon === null || typeof pokemon == 'undefined') {
            apiResp.status = 400;
            apiResp.error = "Please add a pokemon!";
            return apiResp;
        }

        // Dynamically build $1, $2, $3, $4 based on the number of properties in the pokemon object.
        const placeholders = Object.keys(pokemon).map((key, i) => `$${i+1}`).join(',');
        // Use the pokemon keys to generate the column names of the table. 
        const columnNames = Object.keys(pokemon).join(',');
        
        // Be careful not to add any properties to the pokemon object in the request that are NOT column names of the table.
        const query = `INSERT INTO pokemon (${columnNames}) VALUES (${placeholders}) RETURNING id;`;
            
        const insertQuery = {
            text: query,
            values: Object.values(pokemon)
        };

        try {
            const result = await db.pool.query(insertQuery);
            apiResp.data = {
                ...pokemon,
                id: result.rows[0].id
            } || null;
        }
        catch (e) {
            console.error(e);
            apiResp.status = 500;
            apiResp.error = e.message;
        }
        
        return apiResp;

    }

    update(pokemon) {

        const apiResp = new ApiResponse();

        const insert = 'UPDATE pokemon SET ' + Object.keys(pokemon).map((key, index) => {
            return `${key} = $${i+1}`
        }).join(',') + ' WHERE id = $' + (pokemon.length + 1);

        console.log(insert);

        apiResp.data = insert;
        return apiResp;
    }

    delete() {

    }

}

module.exports.pokemon = new Pokemon();