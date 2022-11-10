/* Import packages */
const express = require('express');
require("dotenv").config();
  
/* Setup express server */
const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;

/* Import routes */
const index = require('./routes/index');
app.use('/', index);
  
app.listen(port, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ port)
    else 
        console.log("Error occurred, server can't start", error);
    }
);