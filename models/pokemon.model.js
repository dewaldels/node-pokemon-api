const ApiResponse = require('./api-response.model');
const {db} = require('./db.model');

class Pokemon {

    async get() {
        const apiResp = new ApiResponse();
        try {
            const result = await db.pool.query('SELECT * FROM pokemon');
            apiResp.data = result.rows || [];
        } catch (e) {
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
        const placeholders = Object.keys(pokemon).map((key, i) => `$${i + 1}`).join(',');
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
            apiResp.status = 201;
        } catch (e) {
            console.error(e);
            apiResp.status = 500;
            apiResp.error = e.message;
        }

        return apiResp;

    }

    async update(pokemon) {

        const apiResp = new ApiResponse();

        if (pokemon === null || typeof pokemon == 'undefined') {
            apiResp.status = 400;
            apiResp.error = "Please add a pokemon!";
            return apiResp;
        }

        if (!pokemon.id) {
            apiResp.status = 400;
            apiResp.error = "Please ensure you add the id of the pokemon!";
            return apiResp;
        }

        try {

            const insert = 'UPDATE pokemon SET ' + Object.keys(pokemon).map((key, i) => {
                return `${key} = $${i + 1}`
            }).join(',') + ' WHERE id = $' + (Object.keys(pokemon).length + 1);

            const result = await db.pool.query(insert, [...Object.values(pokemon), pokemon.id]);
            if (result.rowCount <= 0) {
                apiResp.success = true;
            }
        } catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
        }

        return apiResp;
    }

    async delete(id) {
        const apiResp = new ApiResponse();

        if (!id) {
            apiResp.status = 400;
            apiResp.error = 'You have not provided the id of the pokemon you want to remove.';
            return apiResp;
        }

        try {
            const result = await db.pool.query('UPDATE pokemom SET active = 0 WHERE id = $1', [id]);
            if (result.rowCount <= 0) {
                throw new Error('Could not remove the pokemon or it has already been deleted.');
            } else {
                apiResp.success = true;
                apiResp.data = 'Successfully removed Pokemon.';
            }
        }
        catch (e) {
            apiResp.error = e.message;
            apiResp.status = 500;
        }

        return  apiResp;
    }

}

module.exports.pokemon = new Pokemon();