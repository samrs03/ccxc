# ccxc test


Hola a todos!


# Backend

Se usó NodeJS para construir esta aplicación, todos los llamados son comunes en el path /api/v1/ccxc/ y el endpoint de cada uno es el siguiente:

1. randomusers:
  Permite llamar randomuser.me y enlistar 10 personas, organizadas por orden alfabético en el primer nombre, luego, contará cuantas veces se repite cada letra y la   
  entregará en la respuesta. De igual modo, determinara en ese conteo cual fue la letra más usada. El endpoint no recibe parámetros y tiene una respuesta de la     siguiente manera:
  
  {
    "persons" :[],
    "letters": {
        "letters_count:[],
        "max_repeat_letter: []
        }
  }
  
  2. ships:
  Permite buscar y devolver el nombre de la nave que puede transporta el número de pasajeros (passengers) especificado en los parámetros. En el filtrado se elimina las naves que no tienen informacion especifica en los consumables o informacion en MGLT. Si existe dos naves que pasan estas condiciones de filtrado se escoge la que tenga más MGLT. Si al request no se le envian enteros sino strings, devolvera error 400.La respuesta tiene la siguiente forma:
  
  {
    "ship_name": string
  }
 3. planets:
 Permite encontrar el planeta que contenga o se caracterize por el tipo de terreno (terrain) ingresado como parametros, si mas de uno es retornado, o encontrado, se entregara el que más habitantes tenga. No puede haber numeros en el parametro.
 
 {
    "planet_name": string
 }
 
 
 
 # Frontend
 
 La aplicación se compone de un componente "padre" donde son llamados los componentes que se encargaran de hacer los requests al backend y renderizar cada seccion. Una vez obtenida la informacion, los componentes llaman a un componente hijo comun donde se muestra la informacion obtenida del backend.
 
 Los errores o validaciones de la informacion ingresada se hace por medio de alerts.
 
 
 
 Es necesario descargar el repositorio e ingresas a cada aplicacion (frontend, backend) y correr npm install y npm start. El backend por defecto se instalara en el puerto 3010 y el frontend en 3000.
 
 Les agradezco una vez mas por la oportunidad y estoy atento a feeback.
 
 Saludos,
 Samuel
