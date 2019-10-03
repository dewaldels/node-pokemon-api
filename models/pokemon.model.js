const ApiResponse = require('./api-response.model');
const {db} = require('./db.model');

class Pokemon {

    /**
     * Get an array of Pokemon objects.
     * @returns {Promise<ApiResponse>}
     */
    async get() {
        const apiResp = new ApiResponse();
        try {
            // Select all pokemon who have not been deleted. (pokemon.active != 0)
            const result = await db.pool.query('SELECT * FROM pokemon WHERE active = $1', [1]);
            apiResp.data = result.rows || [];
        } catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
        }
        return apiResp;
    }

    /**
     * Get an array of Pokemon objects.
     * @returns {Promise<ApiResponse>}
     */
    async getById(id) {
        const apiResp = new ApiResponse();
        try {

            // Check that a pokemon object was received from the Request.
            if (id === null || typeof id == 'undefined') {
                apiResp.status = 400;
                apiResp.error = "Please provide the pokemon id you are looking for";
                return apiResp;
            }

            // Select all pokemon who have not been deleted. (pokemon.active != 0)
            const result = await db.pool.query('SELECT * FROM pokemon WHERE active = $1 AND id = $2', [1, id]);
            apiResp.data = result.rows || [];
        } catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
        }
        return apiResp;
    }

    /**
     * Add a new Pokemon. Data is extracted from the Request body -> newPokemon
     * @param pokemon
     * @returns {Promise<ApiResponse>}
     */
    async add(pokemon) {

        const apiResp = new ApiResponse();

        // Check that a pokemon object was received from the Request.
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

        // Create the object for the Insert Query.
        const insertQuery = {
            text: query,
            values: Object.values(pokemon)
        };

        try {
            // Insert into the Database using the db class
            const result = await db.pool.query(insertQuery);
            // Add the object with the new id to the response data.
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

    /**
     * Update a pokemon using the updatedPokemon object from the Request body.
     * The entire pokemon object will be replaced.
     * @param pokemon
     * @returns {Promise<ApiResponse>}
     */
    async update(pokemon) {

        const apiResp = new ApiResponse();

        //  Check that the updatedPokemon object was received in the Request.
        if (pokemon === null || typeof pokemon == 'undefined') {
            apiResp.status = 400;
            apiResp.error = "Please add a pokemon!";
            return apiResp;
        }

        // Check that the id exists on the updatedPokemon object.
        if (!pokemon.id) {
            apiResp.status = 400;
            apiResp.error = "Please ensure you add the id of the pokemon!";
            return apiResp;
        }

        try {

            // Update the pokemon record.
            const columns = Object.keys(pokemon).map((key, i) => `${key} = $${i + 1}`).join(',');
            // The id placeholder will be the number of items + 1
            const idPlaceholder = `$${(Object.keys(pokemon).length + 1)}`;
            // Add the generated columns and placeholder to the Update Query.
            const insert = `UPDATE pokemon SET ${columns}  WHERE id = ${idPlaceholder}`;
            // Execute the Update query using the db.pool
            const result = await db.pool.query(insert, [...Object.values(pokemon), pokemon.id]);

            if (result.rowCount > 0) {
                apiResp.success = true;
            } else {
                throw new Error('Could not update the Pokemon');
            }
        } catch (e) {
            apiResp.status = 500;
            apiResp.error = e.message;
        }

        return apiResp;
    }

    /**
     * Update the Pokemon's active column to 0.
     * @param id
     * @returns {Promise<ApiResponse>}
     */
    async delete(id) {
        const apiResp = new ApiResponse();

        if (!id) {
            apiResp.status = 400;
            apiResp.error = 'You have not provided the id of the pokemon you want to remove.';
            return apiResp;
        }

        try {
            // Update using the db.pool
            const result = await db.pool.query('UPDATE pokemon SET active = $1 WHERE id = $2', [0, id]);
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