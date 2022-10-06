const dotenv = require('dotenv').config({ path: '../../.env' });

const express = require('express');
const app = express();

app.listen(process.env.port);

console.log(`App listening on port ${process.env.port}`);