# API

BaseURL: /api/v1

## Endpoints
[ GET ] /pokemon
Get a list of pokemon

[ POST ] /pokemon/add
Add a new pokemon

[ PUT ] /pokemon/update
Update pokemon based on it's Id.

[ DELETE ] /pokemon/delete
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

