En mi trabajo práctico, desarrollé un E-commerce basado en la tienda de "League of Legends". En este proyecto, creé un array con 5 categorías de skins, cada una con diferentes precios. La categoría "Mítica" es la más cara, mientras que la categoría "Común" es la más barata.

Como parte de la bienvenida al usuario, se le otorgan 10,000 RP como regalo para gastar en nuestra tienda, para ir comprando el usuario debe hacer click en las "cards" que fui creando, donde cada card representa una categoría diferente de skins.

Después, Agregue un "Carrito de compras" para almacenar las skins que el usuario agregue. El contenido de este carrito se carga utilizando la funcionalidad de "Local Storage" del navegador y se utiliza un. JSON para que el usuario aunque actualice la página no se pierda lo que quedó en el carrito.

El usuario tiene la capacidad de manipular el carrito, añadiendo o eliminando las skins que desee. Sin embargo, este tiene un límite de 10,000 RP iniciales. Si el usuario supera este límite, la compra no se realizará. Además, se realiza un seguimiento del valor total de las skins en el carrito para controlar los RP que se utilizarán en la compra.

Una vez que el usuario realiza una compra, se actualizan los RP restantes para permitirle seguir comprando. Además, al confirmar una compra, se crea un array que almacena el historial de compras del usuario mediante el método ".push". Esto posibilita que el usuario vea un resumen de sus compras anteriores.
