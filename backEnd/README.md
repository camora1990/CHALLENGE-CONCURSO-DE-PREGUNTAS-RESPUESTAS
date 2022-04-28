# **`Pre requistos`**

## **`Instalaciones necesarias`**

> 1.  Node
> 2.  MongoDB
> 3.  Mongo Compass
> 4.  Typescript

# **`Configuración del backEnd`**

1. Ingresar a la carperta backed abrir la consola y ejecutar el siguiente comando para instalar todas las dependencias del proyecto

> npm install

2. Luego de instalar las dependencias en la misma carpeta backEnd crear un archivo llamado .env en este archivo estan alojadas las variables de entorno necesarias para ejecutar localmaente el backEnd, en el archivo .env.ejemplo se encuentran los nombres de las variables.

### **`Nota:`**

No usar el puerto 3000 pues es el que se usa react por defecto

### **`Ejemplo`**

> PORT=8081
> CONNECTION_STRING=mongodb://localhost:27017/PRUEBA-SOFKA

## `Scripts para ejecutar el backEnd`

- Generar carpeta build y transpila el codigo Typescript a JavaScript

  > npm run build

- Levantar el servidor en ambiente de desarrollo, para ejecutar este comando se recomienda installar nodemon de manera global **npm install -g nodemon**

  > npm run dev

- Levanta el servidor siempre y cuando se halla generado la carpeta build
  > npm run start

### **`RUTAS DE API`**

#### `URL BASE`

> http://localhost:PORT/api/v1/

#### `GET`

- optiene las rondas o niveles del juego

  > http://localhost:PORT/api/v1/round

- optiene los puntajes de los jugadores que ganaron el juego

  > http://localhost:PORT/api/v1/score

- optiene la categoria de la ronda o nivel

  > http://localhost:PORT/api/v1/category/:roundId

- optiene las preguntas de correspondientes a la categoria
  > http://localhost:PORT/api/v1/question/:categoryId

#### `POST`

- crea el jugador en la base de datos
  > http://localhost:PORT/api/v1/player

- Simula el login del jugdor
  > http://localhost:PORT/api/v1/player/login

- Registra el jugador que gana el juego con su puntaje
  > http://localhost:PORT/api/v1/score
