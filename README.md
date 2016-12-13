# BioInformatica
> Proyecto final de BioInformatica.

Instalar Node version v6.9.2 o v7.2.1, para generar el proyecto se instalo la v7.2.1  de la siguiente URL: [Nodejs.org/en/](https://nodejs.org/en/)

# Instalar Yeoman

Docuemtación y para que sirve ver pagina: [Yeoman.io](http://yeoman.io/generators)

Comando de instalación, en la instrucción de mas abajo instala todo

```
npm install -g yo
```

# Instalar todas las herramientas para generar un proyecto

instalar `yo`, `grunt-cli`, `bower`, `generator-angular` y `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```

# Generar un proyecto con Yeoman

Crear una carpeta:

```
mkdir my-new-project && cd $_
``` 

Ejectar en la consola `yo angular`, y escribir el nombre de la app:
```
yo angular [app-name]
```

Ejcutar `grunt` luego para construir y visualizar la aplicación ejecutar `grunt serve`

