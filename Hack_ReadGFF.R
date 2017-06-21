##########################################################
##   Author: Richard Copin                              ##
##   The script goal is to work from .gff file format   ##
##   downloaded from NCBI and customize genome feature  ##
##   table.                                             ##


# R Packages

library(data.table)
library(plyr)


# Set working directory

directory = "path/"
setwd(directory)


# Load file containg .gff file names

gff_names_temp = scan("gff_name.txt",what=character(0),nlines=1,sep="\t")
gff_names = sapply(gff_names_temp, function(s) {
  s = gsub("-", "", s)
}) # clean gff names


# Function to play with gff contents

getAttributeField <- function (x, field, attrsep = ";") {
  s = strsplit(x, split = attrsep, fixed = TRUE)
  sapply(s, function(atts) {
    a = strsplit(atts, split = "=", fixed = TRUE)
    m = match(field, sapply(a, "[", 1))
    if (!is.na(m)) {
      rv = a[[m]][2]
    }
    else {
      rv = as.character(NA)
    }
    return(rv)
  })
}


# Function to load individual gff file

gffRead <- function(gffFile, nrows = -1) {
  cat("Reading ", gffFile, ": ", sep="")
  gff = read.table(gffFile, sep="\t", as.is=TRUE, quote="",
                   header=FALSE, comment.char="#", nrows = nrows,
                   colClasses=c("character", "character", "character", "integer",  
                                "integer",
                                "character", "character", "character", "character"))
  colnames(gff) = c("seqname", "source", "feature", "start", "end",
                    "score", "strand", "frame", "attributes")
  cat("found", nrow(gff), "rows with classes:",
      paste(sapply(gff, class), collapse=", "), "\n")
  stopifnot(!any(is.na(gff$start)), !any(is.na(gff$end)))
  return(gff)
}


# Loop over each gff file

for(o in 1 :length(gff_names)){
  
  Gen.name <- paste(gff_names[o],"_genomic.gff", sep = "")
  save.name <- paste("Hack_", gff_names[o],"_GenBank_complete_Gff.txt", sep ="")
 
  
  #gff from Genbank
  
  #add columns of interest
  gff <- gffRead(gffFile = Gen.name)
  gff$GenBank_locus_tag <- getAttributeField(gff$attributes, "locus_tag")
  gff$Product <- getAttributeField(gff$attributes, "product")
  gff$Gene_name <- getAttributeField(gff$attributes, "gene")
  gff$Note <- getAttributeField(gff$attributes, "Note")
  gff$Pseudogene <- getAttributeField(gff$attributes, "gene_biotype")
  
  #remove rows and columns with non-relevant info
  gffClean <- gff[ ! gff$feature %in% c("CDS","region", "sequence_feature", "STS", "exon","transcript"), ]
  gffClean <- gffClean[-c(9,8,7,6,2,1)]
  
  gffClean$Pseudogene[which(gffClean$Pseudogene== "protein_coding")] <- NA
  gffClean$Pseudogene[which(gffClean$Pseudogene== "misc_RNA")] <- NA
  gffClean$Pseudogene[which(gffClean$Pseudogene== "rRNA")] <- NA
  gffClean$Pseudogene[which(gffClean$Pseudogene== "tRNA")] <- NA
  
  #add product info to main dataframe
  gffProduct <- gff[ gff$feature %in% c("CDS"), ]
  gffProduct <- gffProduct[c(which(colnames(gffProduct) == "start"), (which(colnames(gffProduct) == "Product")))]
  
  for (i in 1:nrow(gffProduct)){
    if (gffProduct$start[i] %in% gffClean$start ) {
      d <- which(gffProduct$start[i] == gffClean$start)
      gffClean$Product[d] <- gffProduct$Product[i]
    }}
  
  #add gene size
  final.gff <- gffClean 
  size.gene <- as.data.frame(matrix(data = NA, nrow = nrow(final.gff), ncol = 1))
  for (i in 1:nrow(final.gff)) {
    size.gene[1] <- final.gff$end - final.gff$start +1
  }
  colnames(size.gene) <- "Locus_size"
  
  #order dataframe
  final.gff <- cbind(final.gff, size.gene)
  final.gff <- final.gff[c(1:3,which(colnames(final.gff) == "Locus_size"), 4,5,7,6,9,8)]
  
  #Save Table
  write.table(final.gff, file = save.name, sep="\t", row.names = FALSE, quote = FALSE) 
}
