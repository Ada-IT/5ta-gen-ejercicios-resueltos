// importamos express y cors
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');

// creamos nuestro servidor
const app = express();

// usabamos cors
app.use( cors() );
// que nos interprete el json de un pedido, como un objeto y no un string
app.use( express.json() );

// agrego el router
app.use('/api', apiRouter);

app.listen(3000);