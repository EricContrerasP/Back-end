# Back-end
API en typescript, usando SQLite que permite agregar frutas y distintos tipos de variedades, cosechas, agricultores y distintos campos y clientes.

## Como iniciar el proyecto

Para instalar las dependencias usar el comando:

```shell
npm install
```

Para inicializar la base de datos en caso que no se encuentre el archivo api.db usar el comando:

```shell
npm run database
```

Este crea la instancia de la base de datos con las tablas vacias.

Para iniciar el servidor usar el comando:

```shell
npm run dev
```

Inicia el servidor en localhost en el puerto 3000

## Como usar la api

A modo de ejemplo se usa el caso de la tabla fruta. las consultas posibles son:

"/api/fruta"
"/api/agricultor"
"/api/campo"
"/api/cliente"
"/api/cosecha"

Para obtener la lista de todas las frutas se debe consultar el url [localhost:3000/api/fruta](localhost:3000/api/fruta) con el método GET.

Para obtener una unica fruta se consulta la url con el numero del id [localhost:3000/api/fruta/id](localhost:3000/api/fruta/id) 

Para agregar una fruta nueva realizar un POST a la url [localhost:3000/api/fruta](localhost:3000/api/fruta), enviando un json que contenga el nombre de la fruta.

```js
{"name":"Avocado"}
```

para cargar el archivo csv se debe enviar a través de POST a "/api/csv" con la llave csvFile, a través de un form-data.
