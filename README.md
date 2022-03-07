# Backend CRUD API REST

_Ejemplo de WS REST con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Ver **Despliegue** para conocer cómo desplegar el proyecto.


### Pre-requisitos 📋

_Este proyecto se puede desarrollar igual en **Windows**, **Linux** u **OS X** aunque se recomienda usar una máquina virtual con LINUX para tener un seguimiento y un mentenimiento futuro más sencillo._

_Se recomienda instalar la última versión estable de 64 bits de la distribución **Ubuntu** de Linux (20.04 LTS actualmente)._

```
Se recomienda un mínimo de 2GHz de procesador, 4GB de RAM y 25GB de HD._ 
```

### Instalación 🔧

_Vamos a instalar las aplicaciones y herramientas que más se utilizarán._

_**Chrome**_
```
Instalar desde el sitio web
```
_**VSCode**_
```
sudo snap install --classic code
code .
```
_**Postman**_
```
sudo snap install postman
postman &
```
_Ahora instalaremos el gestor de paquetes de **Node (npm)**._
```
sudo apt update 
sudo apt install npm
```
_A continuación, instalamos npm una utilidad que ayuda a instalar y mantener las versiones de **Node** (se denomina **n**) e instalamos la última versión estable de **Node JS**._
```
sudo npm clean -f 
sudo npm i -g n

sudo n stable
```
_Vamos a instalar la biblioteca **Express**, que proporciona una capa adicional sobre NodeJS que facilita la gestión de métodos y recursos HTTP._
```
npm i -S express
```
_Instalaremos a continuación el gestor de proyectos **Nodemon**._
```
npm i -D nodemon
```
_Ahora instalaremos **Morgan** como motor de registro._
```
npm i -S morgan
```
_Por último, vamos a instalar **MongoDB**._
```
sudo apt update
sudo apt install -y mongodb
```

## Despliegue 📦

_Primero vamos a clonar el repositorio de github._
```
git clone "https://github.com/juliosalag/practica1.git" api-rest
cd api-rest
```

_**Ejecutamos cada parte en una terminal distinta**_

_1 - Ejecutamos el servidor **NodeJS** con el código index.js_
```
npm start
```
_2 - Lanzamos la base de datos y verificamos el estado de la base de datos_
```
sudo systemctl start mongodb

mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```
_3 - Abrimos el gestor de base de datos (cliente **mongo**)_
```
mongo --host 127.0.0.1:27017
show dbs
```

## Ejecutando las pruebas ⚙️

_Una vez hecho el despliegue ya podríamos empezar a trabajar con el CRUD API REST._ 

_1 - Abrimos el postman._

_2 - Añadimos el archivo_ "**crud.postman_collection.json**"_._ 

_3 - Y ya empezamos a hacer las peticiones, empezariamos con los POST y seguidamente ya podriamos hacer las otras peticiones (GET, PUT, DELETE)._

### Analice las pruebas end-to-end 🔩

_Al haber realizado la primera peticion POST, comprobamos en la terminal, en la que tenemos abierto el gestor de base de datos, que se ha creado una nueva base de datos con el nombre de "SD"_

```
show dbs
use SD
```

_Una vez realizada más peticiones, podemos ir observando en la misma terminal que antes, los cambios que hemos hecho:_
_**Para ver todas las colecciones que existen.**_
```
show collections
```
_**Para ver todos los elementos de cada colección.**_
```
db.{colección}.find()
```

## Construido con 🛠️

* [Postman](https://www.getpostman.com/) - Testing de API REST (aunque podemos usar la versión de navegador)
* [VSCode](https://code.visualstudio.com/Download) - Editor de texto

## Versionado 📌

Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/juliosalag/practica1/tags).

## Autor ✒️

* **Julio Sala Gallardo** - *Trabajo y documentación* - [jsala](https://github.com/juliosalag)

## Licencia 📄

Este proyecto está bajo la Licencia Open Source Initiative
