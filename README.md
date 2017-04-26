# node-api

[![Circle CI](https://circleci.com/gh/rit-sse/node-api.svg?style=svg&circle-token=50819f36da32c91bfd2df83ccae75175c0ff9a6e)](https://circleci.com/gh/rit-sse/node-api)

The SSE new and improved unified API

[Apiary Docs](http://docs.sse.apiary.io)

## Development

### Authentication
To generate the necessary client id and secret, head to the [Google Developer Console](https://console.developers.google.com/project), create a project, select 'APIs & Auth > Credentials', and finally click 'Create a new Client ID' making sure to set the origin and forwarding address.  After you do this, download the json.  Move it to `keys/google.json`.

Auth to the node api using a client app then copy the token and set Authorization: Bearer *Token*
You can also perform fake auth by setting all security too low then authing with slack using the defualt username in password *hint - its hardcoded in the code*


### Running the app
1. `npm install`
2. `npm run keygen`
3. `npm run bootstrap -- --admin:firstName [YOUR NAME] --admin:lastName [YOUR LAST NAME] --admin:dce [YOUR DCE] --keygen --seed` - Creates and migrates the database. If you specify the admin args, a membership will be created for that
user with all permissions. If you specify keygen, all keys will be regenerated.
If you specify seed it will seed the database.
4. `npm start`


### Notes
1. `PORT="2222" npm start` - Runs the server on a diffrent port.

### Running with docker
1. `docker-compose up`

