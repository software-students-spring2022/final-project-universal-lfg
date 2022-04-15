@echo off 
cd back-end
start nodemon server.js
cd ../front-end
start expo start
