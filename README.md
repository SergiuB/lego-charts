# search-page

A demo search page for listing tours from https://api.myjson.com/bins/18x6yt

This project was bootstrapped with [Create React App (for Typescript)](https://github.com/facebookincubator/create-react-app).  
You can find the most recent version of the CRA guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

See [online demo](https://sergiub.github.io/search-page/).

## Features

- Tours can be sorted by several criteria.
- Tour cards are lazy loaded for best performance using [react-lazyload](https://github.com/jasonslyvia/react-lazyload).
- Responsive design
- Supports theming
  - Styling is done using [styled-components](https://www.styled-components.com/)
  - Styling system draws inspiration from [rebass](https://rebassjs.org/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn analyze`

Uses [Source Map Explorer](https://www.npmjs.com/package/source-map-explorer) to understand where code bloat is coming from.
Need to run `yarn build` first.
