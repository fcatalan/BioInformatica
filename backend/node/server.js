var express 	= require('express');
var app 		= express();
var http 		= require('http');
var server 		= http.createServer(app);
var io 			= require('socket.io').listen(server);
var bodyParser 	= require('body-parser');
var rio 		= require("rio");
var formidable = require('formidable');

// Generamos el puerto de conexión
var port = 8083;

server.listen(port);
console.log('Servidor Node.js iniciado en puerto: ' + port);

// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/testNodeR', function (req, res) {
	try{
		console.log("Ingreso al metodo");
		//var fileName = req.query.fileName;
		//var typeFile = req.query.typeFile;
	  	rio.$e({
				command: `library("RJSONIO");
						matriz_expresion<-as.data.frame(read.table("http://localhost:8081/BD_2_k_4_clustering_solutions.csv", header=T, sep=","));
						solucion_clustering<-as.data.frame(read.table("http://localhost:8081/soluciones_clustering.csv", header=T, sep=","));
						data=solucion_clustering_ordenada<-matriz_expresion[order(solucion_clustering$X1),];
						toJSON(data);
						`
//data=as.data.frame(read.table("http://localhost:8081/BD_2_k_4_clustering_solutions.csv", header=T, sep=","));
					
		}).then(function (data) {
		console.log(data);
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});





/*

// Arboles de calidad

app.get('/QAWPGMAHamming', function (req, res) {
	try{
			var fileName = req.query.fileName;
			var typeFile = req.query.typeFile;
		  
			res.json(`library("phangorn");library("ape");library("RJSONIO");
			    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
			    		  tree1=wpgma(dist.hamming(data));
  						  NJtrees = bootstrap.phyDat(data, FUN=function(x)wpgma(dist.hamming(x)), bs=100);
  						  toJSON(plotBS(tree1, NJtrees, "phylogram"))`)
	}
	catch(error){
		throw error;
	}
});




// Implementacion de metodos de R

app.get('/njhamming', function (req, res) {
	try{
			var fileName = req.query.fileName;
			var typeFile = req.query.typeFile;
		  	rio.$e({
			    command: `library("phangorn");library("ape");library("RJSONIO");
			    		  data=as.phyDat(read.${ typeFile }("http://localhost:8081/${ fileName }"));
			    		  toString(nj(dist.hamming(data)))`
			}).then(function (data) {
				console.log(data);
				//(res.json('{hola}'));
			    //(res.json(JSON.parse('{{'+data+'}}'));
			    (res.json(data));
			}).catch(function (err) {
			    console.log(err);
			    res.json(err);
			});
	}
	catch(error){
		throw error;
	}
});

app.get('/EvolutionaryModelHamming', function (req, res) {
	try{
	  var model = req.query.model;
	  var typeFile = req.query.typeFile;
	  var fileName = req.query.fileName;
	  rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		 data=as.phyDat(read.${ typeFile }("http://localhost:8081/${fileName}"));
		    		 toJSON(nj(dist.${typeFile}(as.${typeFile}bin(data),model='${model}')))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/BioNJHamming', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(bionj(dist.hamming(data)))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/EvolutionaryModelBioNJ', function (req, res) {
	try{
	  	var model = req.query.model;
	  	var fileName = req.query.fileName;
	  	var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(bionj(dist.${typeFile}(as.${typeFile}bin(data),model='${model}')))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/UPGMAHamming', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(upgma(dist.hamming(data)))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/UPGMAEvolutionaryModel', function (req, res) {
	try{
	  	var model = req.query.model;
	  	var fileName = req.query.fileName;
	  	var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(upgma(dist.${typeFile}(as.${typeFile}bin(data),model='${model}')))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/WPGMAHamming', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(wpgma(dist.hamming(data)))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/WPGMAEvolutionaryModel', function (req, res) {
	try{
		var fileName = req.query.fileName;
	  	var model = req.body.model;
	  	var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(wpgma(dist.${typeFile}(as.${typeFile}bin(data),model='${model}')))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/FastMinimumEvolutionBalanced', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(fastme.bal(dist.hamming(data), nni = TRUE, spr = TRUE, tbr = TRUE))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/FastMinimumEvolutionOLS', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(fastme.ols(dist.hamming(data), nni = TRUE))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/LeastSquaresFm', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"));
		    		  toJSON(Rfitch(dist.hamming(data), path='${__dirname}/sources/exe',quiet=TRUE,method='fm'))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});

app.get('/LeastSquaresLs', function (req, res) {
	try{
		var fileName = req.query.fileName;
		var typeFile = req.query.typeFile;
	  	rio.$e({
		    command: `library("phangorn");library("ape");library("RJSONIO");
		    		  data=as.phyDat(read.${typeFile}("http://localhost:8081/${fileName}"))
		    		  toJSON(Rfitch(dist.hamming(data), path='${__dirname}/sources/exe',quiet=TRUE,method='ls'))`
		}).then(function (data) {
		    res.json(JSON.parse(data));
		}).catch(function (err) {
		    console.log(err);
		    res.json(err);
		});
	}
	catch(error){
		throw error;
	}
});
*/

// Subida de archivos al repositorio local

app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.json('{ok}');
});


