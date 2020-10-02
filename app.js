var express = require('express');
var exphbs = require('express-handlebars');
const mercadopago = require('mercadopago');

// mercadopago.configure({
//     access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
// });

mercadopago.configure({
    access_token: 'APP_USR-8127697866385203-100201-37f05bfe0977c1c6f8f2279450882833-653909144'
});

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/comprar', function (req, res) {
    console.log("entro aca");
    // Crea un objeto de preferencia
    let preference = {
        items: [{
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        }]
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            global.id = response.body.id;

            //  con init point
            //global.init_point = response.body.init_point;

        }).catch(function (error) {
            console.log(error);
        });
});


app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT || 3001, ()=>{console.log("Servidor iniciado")});