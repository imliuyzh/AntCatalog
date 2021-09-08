# AntCatalog
## Getting Started
Before moving on in this section, please install Node.js and npm. It is recommended to follow the tutorial [here](https://www.youtube.com/watch?v=ohBFbA0O6hs).

### Front end
1. Enter the `client` folder in the command line and execute `npm i` to install the packages
2. Run `npm start` to begin the front end application

### Back end
1. Enter the `server` folder in the command line and execute `npm i` to install the packages
2. Run `npm run dev` to start the back end service

For other information of back end services such as testing, please visit [here](https://github.com/imliuyzh/AntCatalog/tree/main/server). 

## Built With
### Front end
+ IconPark
+ PatternFly
+ React
+ Redux
  + React Redux
  + redux-thunk
+ UUID

### Back end
+ Express.js
  + compression
  + CORS
  + Express Rate Limit
  + express-validator
  + Helmet
+ Fuse.js
+ Jest 
+ Node.js
  + Nodemon
+ SuperTest
+ Sequelize
  + sqlite3
+ semistandard
+ winston

AntCatalog also uses Locust for load testing, which itself is written in Python.

## Deployment
The instruction below is written for a VPS with Ubuntu 20.04 installed.

## Acknowledgments
This project is made possible by UC Irvine's Public Records Office. But the inspiration has its root from the ZotCurve project.
