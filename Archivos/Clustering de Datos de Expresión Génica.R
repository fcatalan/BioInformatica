source("http://www.bioconductor.org/biocLite.R")
#biocLite("GEOquery")
#biocLite("Biobase")
library(Biobase)
library(GEOquery)
db <- getGEO('GDS2842', destdir=".")
#leer archivo modo local
db<-getGEO(filename='GDS2842.soft.gz')
matriz_log <- GDS2eSet(db, do.log2=TRUE)
muestras<-sampleNames(matriz_log)
genes<-featureNames(matriz_log)
expresion <- exprs(matriz_log)
matriz_expresion<-exprs(matriz_log[,])
matriz_expresion<-na.omit(matriz_expresion)
colnames(matriz_expresion) <- pData(matriz_log)$"disease.state"
head(matriz_expresion[,1:10])
normal_etapa3=subset(matriz_expresion, select = c(1:3,40:43))
sub_condiciones <- t(normal_etapa3[1:20,])
sub_genes<- normal_etapa3[1:20,]


#biocLite("amap")


library(amap)
algoritmoKg <- Kmeans(x = sub_genes, centers=2, method="euclidean",iter.max = 100)
algoritmoKc <- Kmeans(x = sub_condiciones, centers=2, method="euclidean",iter.max = 100)
algoritmoKg$cluster
algoritmoKc$cluster
algoritmoKg$centers
algoritmoKc$centers
algoritmoKg$size
algoritmoKc$size

grafico<-plot(sub_genes, col = algoritmoKg$cluster, type='n', main="K-means en genes")
points(algoritmoKg$centers, col = c("green","blue"), pch = 15, cex = 1)
text(sub_genes, labels=rownames(sub_genes), col=algoritmoKg$cluster)

grafico<-plot(sub_condiciones, col = algoritmoKg$cluster, type='n', main="K-means en muestras")
points(algoritmoKc$centers, col = c("green","blue"), pch = 15, cex = 1)
text(sub_condiciones, labels=rownames(sub_condiciones), col=algoritmoKc$cluster)

heatmap(sub_genes, main = "Heatmap de genes")

heatmap(sub_condiciones, main = "Heatmap de muestras (normal y cáncer etapa 3)")

biocLite("gplots")
library(gplots)

clases.muestras<-c(rep("deepskyblue", each=3), rep("orange", each=40))
heatmap(matriz_expresion[1100:1250,],
        distfun = function(x) dist(x,method = 'euclidean'),
        hclustfun = function(x) hclust(x,method = 'complete'),
        xlab="Muestras",
        ylab="Genes",
        col=greenred(20),
        ColSideColors = clases.muestras
)




