# API

### BaseURL: `/api/v1`

## Endpoints
`[ GET ] /pokemon` \
Get a list of pokemon

`[ GET ] /pokemon/id` \
Get a specific pokemon based on it's id

`[ POST ] /pokemon/add` \
Add a new pokemon

`[ PUT ] /pokemon/update` \
Update pokemon based on it's Id.

`[ DELETE ] /pokemon/delete/id` \
Set the active flag on our pokemon to 0

## Models
* Database - A class to manage our connection to postgres.
* Auth - A class to manage API Tokens.
* Pokemon - A class that manages all pokemon data.
* ApiResponse - A class to manage any responses from our API.

## Routes
* Auth Routes - Anything related to authentication.
* Pokemon Routes - Anything related to the pokemon resource.

## Middleware
* Auth - Intercept all request and validate the API Token

# Sample Request Objects (JSON)

### Pokemon POST
```
{
	"newPokemon": {
		"name": "Bulbasaur", 
		"species": "Mouse Pokémon", 
		"height": "0.7 m", 
		"weight": "6.9 kg", 
		"abilities": "Growl, Tackle, Leech seed, Vine whip", 
		"type": "electric", 
		"sprite":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", 
		"hp":45, 
		"attack":49, 
		"defense":49, 
		"sp_atk":45, 
		"sp_def": 65, 
		"speed":65, 
		"total": 318	
	}
}
```

### Pokemon PUT
```
{
	"updatedPokemon": {
		"name": "Bulbasaur 2.0", 
		"species": "Mouse Pokémon", 
		"height": "0.7 m", 
		"weight": "6.9 kg", 
		"abilities": "Growl, Tackle, Leech seed, Vine whip", 
		"type": "electric", 
		"sprite":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", 
		"hp":45, 
		"attack":100, 
		"defense":150, 
		"sp_atk":60, 
		"sp_def": 95, 
		"speed":95, 
		"total": 450	
	}
}
```
