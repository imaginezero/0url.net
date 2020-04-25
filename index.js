const express = require('express');
const app = express();  
const createMiddleware = require('shorturl-tsv-express-middleware');

let server;

app.use(createMiddleware({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGa4pEgEAIHiM3OHYHHhhu_M90t3PzU2S6rQVT-DVxnr9w0-srVOCBn4asEKaKmZCsfKLx-VF4uYL7/pub?gid=0&single=true&output=tsv",
    interval: 1000 * 3600 * 24, //Once a day (Updates are typically triggered manually)
    onError: error => {
        console.error(error);
        server.close();
    },
    log: console.log,
    updateRoute: 'update-redirects',
}));

server = app.listen(process.env.PORT || 3000);
