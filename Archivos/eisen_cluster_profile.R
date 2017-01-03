require("Rserve")
Rserve()
run.Rserve()

setwd("C:/Users/fcatalan/Desktop/BioInformatica/BioInformatica/Archivos")

#source("sources/system/packages.R")         #Carga un conjunto de paquetes
cat("\014")                                 #Limpiar consola
library("RJSONIO")



matriz_expresion<-as.data.frame(read.table("http://localhost:8081/BD_2_k_4_clustering_solutions.csv", header=T, sep=","))

solucion_clustering<-as.data.frame(read.table("soluciones_clustering.csv", header=T, sep=","))

solucion_clustering_ordenada<-matriz_expresion[order(solucion_clustering$X1),]


############################## Eisen plot ##################################
library("fields")
#verde,negro,rojo
colores<-colorRampPalette(c("#5CB357","black","#E6332A"))(99)

#setEPS()
#postscript(paste("../Resultados/",nameBD,"/00_eisen_plot_",nameBD,".eps",sep = ""),width=6, height=8)
image.plot(t(solucion_clustering_ordenada),col = colores, axes=FALSE, lab.breaks=NULL)
#dev.off()


#guarda los genes de cada grupo
elementos_grupo=vector()
for (cluster in 1:(max(solucion_clustering$X1))) {
  k=row.names(matriz_expresion[which(solucion_clustering$X1==cluster),])
  write.table(k, paste("genes_grupo_",cluster,".txt",sep = ""),row.names = FALSE, col.names = FALSE,quote=FALSE)
  elementos_grupo=c(elementos_grupo,length(k))
}

#write.table(elementos_grupo, "num_genes_grupo.txt",row.names = FALSE, col.names = FALSE,quote=FALSE)




###################### cluster profile plot

#setEPS()
#postscript(paste("../Resultados/",nameBD,"/00_cluster_profile_plot_",nameBD,".eps",sep = ""),width=5.6, height=4.3)

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
    
    lines(times, apply(genes_en_cluster,2,mean), cex=1,type="b")
    
    
    title(paste("cluster=",p, sep=""))
}

#dev.off()




