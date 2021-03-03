# Mutant App

Este proyecto se hizo para Magneto, quien lo usa para reclutar mutantes alrededor del mundo. Ellos envían su secuencia genética y con esta aplicación detectamos si son mutantes o simples humanos.

## Instalación

Para correr este programa de forma local vas a necesitar [Node.Js](https://nodejs.org/en/). Asegurate de tener la [última versión LTS](https://nodejs.org/en/download/) instalada. Podés verificarlo con el siguiente comando en una terminal:
```
node -v
```

También cloná este repositorio en un directorio local.
```
git clone https://github.com/tupacz/mutant-app.git
cd ./mutant-app
```

Una vez que los archivos hayan descargado, abrí una terminal en la carpeta donde iniciaste el repositorio e instalá las dependencias con este comando:
```
npm i
```
## Corriendo la aplicación

Para correr la aplicación en tu entorno local basta con usar este comando en la carpeta del repositorio:
```
npm start
```
Si recibís el mensaje "Escuchando en puerto 3000", está todo listo.


## Verificación de secuencia mutante
La comunicación con la aplicación se hace mediante llamadas REST, por lo cual es recomendable tener a mano [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), o cualquier cliente REST que te guste.

La aplicación recibe un array de strings que representa una secuencia genética en forma de tabla.

### Tener en cuenta
- El array enviado debe llamarse **"dna"**.
- La tabla tiene que tener dimensiones NxN, es decir, **misma altura y mismo ancho**.
- Las letras enviadas solo pueden ser A, T, C y G. En **mayúsculas**.

### Verificación
Para que una secuencia genética sea verificada como un mutante, tienen que encontrarse al menos dos secuencias del mismo caracter en grupos de 4, de forma *oblicua*, *vertical*, u *horizontal*.

Se envía la secuencia con un HTTP POST, a la dirección `localhost:3000/mutant`, con un Json.

#### Ejemplo de mutante
```yaml
{
    "dna": [
        "AAAAGAC",
        "AAGTGGA",
        "ATCTCTA",
        "AGACGGA",
        "CGGTTAG",
        "TCACTGG",
        "GGGCGGG"
    ]
}
```

#### Ejemplo de no mutante
```yaml
{
    "dna": [
        "GTAAGAC",
        "AAGTGGA",
        "CACTATA",
        "AGACGGT",
        "CGGTTAG",
        "TCACTGG",
        "AGGCGGT"
    ]
}
```
## Live server

El servicio está hosteado en Azure, y se puede usar con las siguientes direcciónes:
- Verificación mutante con POST: `https://mutants-app.azurewebsites.net/mutant` - [Modo de uso](#Verificación-de-secuencia-mutante)

## Built With

* [Node.js](http://www.dropwizard.io/1.0.2/docs/)
* [Express](https://maven.apache.org/)

## Autor

* **Tupac Zuleta**
