# BioInformatica
> Proyecto final de BioInformatica.

Instalar Node version v6.9.2 o v7.2.1, para generar el proyecto se instalo la v7.2.1  de la siguiente URL: [Nodejs.org/en/](https://nodejs.org/en/)

# Comandos de git basicos

Clonar un proyecto: 
```
git clone [url del proyecto]
```

Cuando se realiza un cambio se debe agregar:

```
git add -A
```

Para guardar los cambios en la version local se debe realizar commit
```
git commit -m "[Comentario]"
```

Para subir los cambios al servidor
```
git push
```

Para descagar la ultima version del repositorio
```
git pull
```

Para visualizar el estado del repositorio y modificaciones realizadas
```
git status
```

# Descargar el Proyecto

Crear una carpeta y clonar el proyecto de gibhub con el siguiente comando:

```
git clone https://github.com/fcatalan/BioInformatica.git
```

# Instalar Herramientas

instalar `yo`, `grunt-cli`, `bower`, `generator-angular` y `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```


# Descargar Dependencias

> Descargar dependencias del archivo package.json

En una terminal abrir la carpeta app-bioinformatica y ejecutar el siguiente comando:

```
npm install
```

> Descargar dependencias del archivo bower.json

Sobre la misma terminal y carpeta abierta ejucutar el siguiente comando:

```
bower install
```

# Instalar Yeoman

Docuemtación y para que sirve ver pagina: [Yeoman.io](http://yeoman.io/)

Comando de instalación:

```
npm install -g yo
```

# Generar un Proyecto con Yeoman

> Pagina donde se encuentran todos los proyectos que se pueden generar con  [Yeoman-generator](http://yeoman.io/generators/) 

Crear una carpeta:

```
mkdir my-new-project && cd $_
``` 

Ejectar en la consola `yo angular`, y escribir el nombre de la app:
```
yo angular [app-name]
```

Ejcutar `grunt` luego para construir y visualizar la aplicación ejecutar `grunt serve`

