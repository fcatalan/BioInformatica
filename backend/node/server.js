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
					solucion_clustering_ordenada<-matriz_expresion[order(solucion_clustering$X1),];					
				
					library("fields");
					#verde,negro,rojo
					#colores<-colorRampPalette(c("#5CB357","black","#E6332A"))(99);
					#setEPS()
					#postscript(paste("../Resultados/",nameBD,"/00_eisen_plot_",nameBD,".eps",sep = ""),width=6, height=8)
					#image.plot(t(solucion_clustering_ordenada),col = colores, axes=FALSE, lab.breaks=NULL);
					#dev.off()
					#guarda los genes de cada grupo
					elementos_grupo=vector();
					for (cluster in 1:(max(solucion_clustering$X1))) {
					k=row.names(matriz_expresion[which(solucion_clustering$X1==cluster),]);
					write.table(k, paste("genes_grupo_",cluster,".txt",sep = ""),row.names = FALSE, col.names = FALSE,quote=FALSE);
					elementos_grupo=c(elementos_grupo,length(k));
					}
					#write.table(elementos_grupo, "num_genes_grupo.txt",row.names = FALSE, col.names = FALSE,quote=FALSE)

					times<-1:ncol(matriz_expresion)
					xrange <- range(times) 
					yrange <- range(matriz_expresion) 

					par(mfrow = c(2, 2))

					for (p in 1:(max(solucion_clustering$X1))) {

						genes_en_cluster<-matriz_expresion[which(solucion_clustering$X1==p),]
						plot(xrange, yrange, type="n", xlab="Time points", ylab="Gene Expression" )

						for (i in 1:nrow(genes_en_cluster)) {   
						lines(times, genes_en_cluster[i,], type="l", lwd=1.5, col="#5CB357") 
						} 
						epsilon = 0.04
						
						for(c in times) {
						
						points(times[c], mean(genes_en_cluster[,c]), cex=1)
						
						up = mean(genes_en_cluster[,c])+sd(genes_en_cluster[,c])
						low = mean(genes_en_cluster[,c])-sd(genes_en_cluster[,c])
						segments(times[c],up,times[c],low)
						segments(times[c]-epsilon, up , times[c]+epsilon, up)
						segments(times[c]-epsilon, low , times[c]+epsilon, low)

						}
						
						data=toJSON(lines(times, apply(genes_en_cluster,2,mean), cex=1,type="b"))
						
						
						title(paste("cluster=",p, sep=""))
					}					
					
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


