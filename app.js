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
    // let info = req.body;
    // fs.readFile('notifications.json', 'utf8', function(e, fileData){
    //     if (e) {
    //         res.status(401);
    //         res.send({e});
    //         next();
    //     }
    //     try {
    //         fileData = JSON.parse(fileData);
    //     } catch(e) {
    //         console.error(e);
    //         fileData = [];
    //     }

    //     fileData.push(info);
    //     fileData = JSON.stringify(fileData);

    //     fs.writeFileSync('notifications.json', fileData, 'utf8');
    //     res.send(fileData);
    //     next();
    // });
    console.log("**************************WEBHOOK**************************")
    console.log(req.body);
    console.log("************************FIN WEBHOOK************************")
    res.sendStatus(201);
    //res.json(req.body);
});

app.post('/iniciar_pago', function(req, res){

    // Crea un objeto de preferencia
    let preference = {
        items: [{
            id: 1234,
            title: req.body.title,
            description: "Dispositivo móvil de Tienda e-commerce",
            picture_url: req.body.img,
            quantity: 1,
            unit_price: Number(req.body.price),
            external_reference: "fer_eze_jose@hotmail.com",
        }],
        external_reference: "fer_eze_jose@hotmail.com",
        payer:{
            name: "Lalo",
            surname: "Landa",
            email: "test_user_63274575@testuser.com",
            phone:{
                area_code: "11",
                number: 22223333,
            },
            address:{
                street_name: "false",
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
            //default_installments: 6 
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