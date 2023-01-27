## Steps to run the app

In the project directory, we have the backend code inside ./api-server folder.

1. yarn `yarn && cd ./api-server && yarn` from the project root directory to install node_modules
2. run `yarn serve` from the project root directory or in ./api-server directory to start the api.
3. run `yarn start` from the project root directory to start the forntEnd application

## `side note :`

    The Api runs on port 4000 while the FrontEnd run on port 3000. Make sure those ports a free
    on your local development machine.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to the frontEnd, but the backend just restarts when edited, which will result in emptying the database as it is an in memory database<br>

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
