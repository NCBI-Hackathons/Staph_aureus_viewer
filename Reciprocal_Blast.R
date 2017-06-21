###########################################################
##   Author: Richard Copin                               ##
##   The script goal is to set up custom BLAST databases ##
##   for cds containg files from bacterial genomes and   ##
##   Reciprocal BLAST each file                          ##


# Set working directory

directory = "path/"
setwd(directory)


# Load cds containg files and clean-up names

name_cds_temp = scan("file_name",what=character(0),nlines=1,sep="\t")
name_cds_in = sapply(name_cds_temp, function(s) {
  s = gsub("-", "", s)
})
name_cds_out = sapply(name_cds_temp, function(s) {
  s = gsub("_cds_from_genomic.fna-", "", s)
})

# Format database
# export PATH=$PATH:/usr/local/ncbi/blast/bin

Formatblast = "Formatblast.sh"
cat(paste("#!/bin/bash"),sep="\n",file=Formatblast,append=TRUE)
for(i in 1:length(name_cds_in)) {
  cat(paste("makeblastdb -in ", name_cds_in[i]," -parse_seqids -dbtype nucl", sep=""),sep="\n",file=Formatblast,append=TRUE)
}

# Run Reciprocal Blasts and save files

Script = "reciprocal_blast.sh"
cat(paste("#!/bin/bash"),sep="\n",file=Script,append=TRUE)
for(i in 1:length(name_cds_in)) {
  for(j in 1:length(name_cds_in))  {
    cat(paste("blastn -db ",  name_cds_in[i], " -outfmt '6 std sgi stitle' -evalue 0.001 -query ", 
              name_cds_in[j], " -out ",name_cds_out[i],"vs",name_cds_out[j],".txt", sep=""),sep="\n",
              file=Script,append=TRUE)
  }
}

######## Use BEST RECIPROCAL HIT script ########


