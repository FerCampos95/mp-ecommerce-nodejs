var express = require('express');
var exphbs = require('express-handlebars');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');
const fs = require('fs');

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

datos={
    //urlApp: "localhost:3001",
    urlApp: "fercampos-mp-ecommerce-nodejs.herokuapp.com"
}

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/failure', function (req, res) {
    res.render('status', req.query);
});
app.get('/pending', function (req, res) {
    res.render('status', req.query);
});
app.get('/aproved', function (req, res) {
    res.render('status', req.query);
});

app.post('/notifications', function (req, res, next) {
    console.log("**************************WEBHOOK**************************")
    console.log(req.body);
    console.log("************************FIN WEBHOOK************************")

    let idPago=req.body.data.id;
    if(idPago){
        console.log("--------------------------El ID de pago es: "+ idPago);
    }
    
    // if(req.body){
    //     let filtros={
    //         range: req.body.date_created,
    //         begin_date: 'NOW-1MONTH',
    //         end_date: 'NOW',
    //         status: 'approved',
    //         operation_type: 'regular_payment'
    //     }
    
    //     mercadopago.payment.search(
    //         { qs: filtros}
    //     )
    //         .then(function (response) {
    //             console.log("**************************JSON PAGO**************************")
    //             console.log(response.body);
    //             console.log("************************FIN JSON PAGO************************")
    //             res.sendStatus(200);
    //         })
    //         .catch(function (error) {
    //             console.log("################----ERROR RECUPEANDO PAGO----################");
    //             console.log(error);
    //         });
    // }

    res.sendStatus(201);
});

app.post('/iniciar_pago', function(req, res){

    // Crea un objeto de preferencia

    let preference = {
        items: [{
            id: 1234,
            title: req.body.title,
            description: "Dispositivo móvil de Tienda e-commerce",
            picture_url: datos.urlApp+req.body.img,
            quantity: 1,
            unit_price: Number(req.body.price),
            external_reference: "fernandoc@epidataconsulting.com",
        }],
        external_reference: "fernandoc@epidataconsulting.com",
        payer:{
            name: "Lalo",
            surname: "Landa",
            email: "test_user_63274575@testuser.com",
            phone:{
                area_code: "11",
                number: 22223333,
            },
            address:{
                street_name: "False",
                street_number: 123,
                zip_code: "1111",
            },
        },
        back_urls:{
            failure: `${datos.urlApp}/failure`,
            pending: `${datos.urlApp}/pending`,
            success: `${datos.urlApp}/aproved`
        },
        auto_return: "approved",
        notification_url: `${datos.urlApp}/notifications`,
        payment_methods: {
            excluded_payment_methods: [
                {
                id: "amex"
                }
            ],
            excluded_payment_types: [
                {
                id: "atm"
                }
            ],
            installments: 6,
        },
    };

    console.log("################### El preference ####################")
    console.log(preference);
    console.log("######################################################")

    mercadopago.preferences.create(preference)
        .then(function (response) {
            // con global id
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            // global.id = response.body.id;
            // console.log(global.id);


            // Con init point
            console.log(response);
            global.init_point = response.body.init_point;
            console.log(global.init_point);
            res.redirect(global.init_point);
            
        }).catch(function (error) {
            console.log(error);
        });
});

app.use(express.static('assets'));


app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT || 3001, ()=>{console.log("Servidor iniciado")});