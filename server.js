const express = require('express');

const app = express();

app.get('/', (req,res) => res.send('API Running'));

//uses enviroment variable for PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));