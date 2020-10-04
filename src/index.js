const express = require('express');


//////////////// ENDPOINT INICIAL DEL SERVER //////////////////////
const app = express();
app.get('/', (request, response) => {
    response.send('Hello World!!');
});

//////////////// SERVER //////////////////////
// Configuracion puertos server
const { PORT } = process.env;
const portAssigned = PORT;
app.set('port', portAssigned || 3000);
const port = app.get('port');
app.listen(port, () => {
    console.log(`✔️ 🚀 >>>> Server working on PORT ${port}  <<<< 🚀 ✔️`);
});