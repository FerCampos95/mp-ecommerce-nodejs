# mp-ecommerce

Este e-commerce de ejemplo será la base para la integración de MercadoPago con `nodejs`.

## Datos para pruebas

_Usuario de prueba_
user: test_user_22257713@testuser.com
pass: qatest49

_Tarjetas de prueba_
Mastercard: 5031 7557 3453 0604
Visa: 4509 9535 6623 3704

cod: 123
date: 11/25
user: APRO / FUND / CONT


## Antes de comenzar

Esta aplicación debe estar accesible mediante un dominio público en internet antes de comenzar con la integración y para ello usaremos [Heroku](https://heroku.com).

Requisitos para realizar la integración: 
* Cuenta en GitHub.
* Cuenta en [Heroku](https://heroku.com).

## Haciendo pública mi e-commerce de ejemplo

1. Realizar un fork de este proyecto. Considerando que tu usuario de GitHub es `username`, tendremos el repositorio https://github.com/username/mp-ecommerce-nodejs
2. Ingresar a tu cuenta de Heroku
3. Crear una aplicación en Heroku para realizar el deploy de nuestro e-commerce. Nombrarla de la siguiente manera *username*-mp-commerce-nodejs. Ejemplo:
<div style="text-align: center;" >
<img src="docs/step0.png" width=400 />
</div>

4. Conectar a nuestra aplicación en Heroku el repositorio "forkeado" en el paso 1
<div style="text-align: center;" >
<img src="docs/step1.png" width=800 />
</div>

5. Activar el deploy autómatico ante cualquier cambio en el branch "master". Realizar un deploy manualmente, mediante la opción "Deploy branch" para comprobar que la app esté funcionando correctamente.

<div style="text-align: center;" >
<img src="docs/step2.png" width=800 />
</div>

6. Nuevamente considerando que tu usuario de GitHub es `username` (substituir en la URL por el correcto), acceder a https://username-mp-ecommerce-nodejs.herokuapp.com/ y validar que la app esté corriendo. Deberás visualizar algo como lo siguiente

<div style="text-align: center;" >
<img src="docs/step3.png" width=800 />
</div># mp-ecommerce-nodejs
