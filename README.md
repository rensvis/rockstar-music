# Getting Started with the Rockstars Music app

## Introduction

This is a music app that allows you to create playlists with your favorite songs.

## Prerequisits

You need to have NPM installed on your machine in order to run this app.

## Installation

Clone this repo to your desired location. Open the rockstar-music-1 project in a terminal and run `npm install` to download dependencies.

## Running the app

The app consists of a React frontend and a json-server backend.

### Backend

To start up the backend server run `json-server -p 4000 --watch db.json` in a terminal (project location). Note the `-p 400 flag` to run the backend over port 400.

### Frontend

To start up the frontend open up a second terminal at the project location and run `npm start`.

## Other scripts

### Testing

`npm test` launches the test runner in the interactive watch mode.

`npx cypress open` opens up Cypress where you can run an end-to-end test. Simply click on either the filename of "Run 1 integration spec" to run the test.

### Building

`npm run build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!
