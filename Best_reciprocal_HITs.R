###########################################################
##   Author: Richard Copin                               ##
##   The script goal is to find the Best Reciprocal Hit  ##
##   after BLAST on each bacterial CDS                   ##


# Set working directory

directory = "path/"
setwd(directory)


# Load file containing BLAST file names

name_cds_temp = scan("../data/cds_names_sample.txt",what=character(0),nlines=1,sep="\t")
name_cds = sapply(name_cds_temp, function(s) {
  s = gsub("-", "", s)
})
name_strains = sapply(name_cds_temp, function(s) {
  s = gsub("_cds_from_genomic.fna-", "", s)
})


# Function to collect cds attributes from cds nucleotide sequences downloaded from NCBI
readFastaRef = function(refFile) {
  row = scan(refFile,what=character(0),sep="\n")
  chars = substr(row,1,1)
  base = chars==">"
  seq = row[base]
  return(seq)
}
getAttributeField <- function (x, field, attrsep = " ") {
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


# Loop over each Reciprocal BLAST files to identify BEST HITs

for (i in 1:length(name_strains)) {
  for (j in 1:length(name_strains)) {
    
    # Load cds containing sequence files
    genome1 = name_strains[i]
    genome2 = name_strains[j]
    genome1.df = as.data.frame(readFastaRef(paste("../genomes/cds/", name_cds[i], sep = "")))
    genome2.df = as.data.frame(readFastaRef(paste("../genomes/cds/", name_cds[j], sep = "")))
    
    
    
    ### genome1 ###
    # collect names from genome1 cds
    colnames(genome1.df) <- "name"
    genome1.df$name <- as.character(genome1.df$name)
    genome1.df$protein_id <- getAttributeField(genome1.df$name, "[protein_id")
    genome1.df$protein_id <- gsub("[^[:alnum:][:blank:]_.]", "", genome1.df$protein_id)
    genome1.df$locus_tag <- getAttributeField(genome1.df$name, "[locus_tag")
    genome1.df$locus_tag <- gsub("[^[:alnum:][:blank:]_.]", "", genome1.df$locus_tag)
    genome1.df$product <- getAttributeField(genome1.df$name, "[protein")
    genome1.df$product <- gsub("[^[:alnum:][:blank:]_.]", "", genome1.df$product)
    
    no.protein_genome1 <- which(is.na(genome1.df$protein_id) == TRUE)
    no.prot_genome1 <- as.data.frame(genome1.df[which(is.na(genome1.df$protein_id) == TRUE),])
    no.prot_genome1$protein_id <- no.prot_genome1$name
    no.prot_genome1$protein_id <- gsub(".*.1_c", "c", no.prot_genome1$protein_id)
    no.prot_genome1$protein_id <- gsub(".*.2_c", "c", no.prot_genome1$protein_id)
    no.prot_genome1$protein_id <- gsub(".*.3_c", "c", no.prot_genome1$protein_id)
    no.prot_genome1$protein_id <- gsub(" .*", "", no.prot_genome1$protein_id)
    genome1.df$protein_id[no.protein_genome1] <- no.prot_genome1$protein_id
    
    protID.genome1 <- cbind(genome1.df$protein_id,genome1.df$locus_tag,genome1.df$product)
    colnames(protID.genome1) <- c("Protein_id", "Locus_tag", "Product")
    protID.genome1 <- as.data.frame(protID.genome1)
    protID.genome1$Protein_id <- as.character(protID.genome1$Protein_id)
    protID.genome1$Product <- as.character(protID.genome1$Product)
    protID.genome1$Locus_tag <- as.character(protID.genome1$Locus_tag)
    
    
    ### genome2 ###
    # collect names from genome2 cds
    colnames(genome2.df) <- "name"
    genome2.df$name <- as.character(genome2.df$name)
    genome2.df$protein_id <- getAttributeField(genome2.df$name, "[protein_id")
    genome2.df$protein_id <- gsub("[^[:alnum:][:blank:]_.]", "", genome2.df$protein_id)
    genome2.df$locus_tag <- getAttributeField(genome2.df$name, "[locus_tag")
    genome2.df$locus_tag <- gsub("[^[:alnum:][:blank:]_.]", "", genome2.df$locus_tag)
    genome2.df$product <- getAttributeField(genome2.df$name, "[protein")
    genome2.df$product <- gsub("[^[:alnum:][:blank:]_.]", "", genome2.df$product)
    
    no.protein_genome2 <- which(is.na(genome2.df$protein_id) == TRUE)
    no.prot_genome2 <- as.data.frame(genome2.df[which(is.na(genome2.df$protein_id) == TRUE),])
    no.prot_genome2$protein_id <- no.prot_genome2$name
    no.prot_genome2$protein_id <- gsub(".*.1_c", "c", no.prot_genome2$protein_id)
    no.prot_genome2$protein_id <- gsub(".*.2_c", "c", no.prot_genome2$protein_id)
    no.prot_genome2$protein_id <- gsub(".*.3_c", "c", no.prot_genome2$protein_id)
    no.prot_genome2$protein_id <- gsub(" .*", "", no.prot_genome2$protein_id)
    genome2.df$protein_id[no.protein_genome2] <- no.prot_genome2$protein_id
    
    protID.genome2 <- cbind(genome2.df$protein_id,genome2.df$locus_tag,genome2.df$product)
    colnames(protID.genome2) <- c("Protein_id", "Locus_tag", "Product")
    protID.genome2 <- as.data.frame(protID.genome2)
    protID.genome2$Protein_id <- as.character(protID.genome2$Protein_id)
    protID.genome2$Product <- as.character(protID.genome2$Product)
    protID.genome2$Locus_tag <- as.character(protID.genome2$Locus_tag)
    
    protID.genome1$Protein_id <- gsub("\\..*","", protID.genome1$Protein_id)
    protID.genome2$Protein_id <- gsub("\\..*","",protID.genome2$Protein_id)
    
    
    # Load Reciprocal BLAST files for genome 1 and 2
    blast.file.name1 = paste("../blast_results/", name_strains[i], "vs", name_strains[j], ".txt", sep = "")
    blast.file.name2 = paste("../blast_results/", name_strains[j], "vs", name_strains[i], ".txt", sep = "")
    
    
    Blast1 <- read.delim(blast.file.name1, header = FALSE, stringsAsFactors = F)  
    dim(Blast1)
    colnames(Blast1) <- c("Query_id_a", "Subject_id_b", "%_identity_a", "alignment_length_a", "mismatches_a", "gap_openings_a", "q_start_a", "q_end_a", "s_start_a", "s_end_a", "e_value_a", "bit_score_a", "Subject_b_GI", "Subject_b_Title" )
    
    # select alignments with length of at least 50 AA
    Blast1.align50aa <- Blast1[which(Blast1$alignment_length_a >= 50),c(1,2,3,4,11,12,14)]
    Blast1.align50aa$Query_id_a <- gsub("lcl|","",Blast1.align50aa$Query_id_a)
    Blast1.align50aa$Query_id_a <- gsub("[^[:alnum:][:blank:]_.]","",Blast1.align50aa$Query_id_a)
    
    # for each query protein, extract the blast output for their corresponding target/s 
    # sort ascending based on bit_score
    # store matrices in a list
    unique.row <- unique(Blast1.align50aa$Query_id_a)
    atBeginning <- Sys.time()
    then <- Sys.time()
    list.best.hits1 <- list()
    list.best.hits2 <- list()
    
    for (k in 1:length(unique.row)){
      d <- Blast1.align50aa[which(Blast1.align50aa$Query_id_a == unique.row[k]),]
      list.best.hits1[[k]] <- d[order(d$bit_score_a, decreasing = T),]
      list.best.hits2[[k]] <-  list.best.hits1[[k]][1:4,]
      names(list.best.hits1)[k] <- paste(list.best.hits2[k])
    }
    print(Sys.time()-then)
    
    # for each query protein, extract the Best Hit of the Query (BHQ) 
    # i.e. target protein/s with the best bit_score  (store as list)
    atBeginning <- Sys.time()
    then <- Sys.time()
    targets.a <- list()
    
    for (tg in names(list.best.hits1)){
      targets.a[[tg]] <- list.best.hits1[[tg]][which(list.best.hits1[[tg]]$bit_score_a == max(list.best.hits1[[tg]]$bit_score_a)),2]
    }
    print(Sys.time()-then)
    
    
    ######## READ in the blast output file for the genome2 #######
    Blast2 <- read.delim(blast.file.name2, header = FALSE, stringsAsFactors = F)  
    dim(Blast2)
    
    # add column names
    colnames(Blast2) <- c("Query_id_b", "Subject_id_a", "%_identity_b", "alignment_length_b", "mismatches_b", "gap_openings_b", "q_start_b", "q_end_b", "s_start_b", "s_end_b", "e_value_b", "bit_score_b", "Subject_a_GI", "Subject_a_Title")
    
    
    # select alignments with length of at least 50 AA
    Blast2.align50aa <- Blast2[which(Blast2$alignment_length_b >= 50),c(1,2,3,4,11,12,14)]
    Blast2.align50aa <- Blast2.align50aa[order(Blast2.align50aa$bit_score_b, decreasing = T),]
    Blast2.align50aa$Query_id_b <- gsub("lcl|","",Blast2.align50aa$Query_id_b)
    Blast2.align50aa$Query_id_b <- gsub("[^[:alnum:][:blank:]_.]","",Blast2.align50aa$Query_id_b)
    
    # for each query protein, extract the blast output for their corresponding BHQ
    # sort decreasing based on bit_score
    # store matrices in a list
    atBeginning <- Sys.time()
    then <- Sys.time()
    targets.b <- list()
    
    for (q in names(targets.a)){
      d <- Blast2.align50aa[which(Blast2.align50aa$Query_id_b %in% targets.a[[q]]),]
      targets.b[[q]] <- d[order(d$bit_score_b, decreasing = T),]
    }
    print(Sys.time()-then)
    
    # for the BHQ of each query protein, 
    # if the BHT (protein/s with the largest Bitscore) match the query protein => assign orthology as RBH
    # store matrices in a list
    atBeginning <- Sys.time()
    then <- Sys.time()
    final.list <- list()
    
    for (r in names(targets.b)){
      maxi <- targets.b[[r]][which(targets.b[[r]]$bit_score_b == max(targets.b[[r]]$bit_score_b)),]
      final.list[[r]] <- maxi[which(maxi$Subject_id_a %in% unique(list.best.hits1[[paste(r)]]$Query_id_a)),]
    }
    print(Sys.time()-then)
    
    # store the RBH as matrix 
    atBeginning <- Sys.time()
    then <- Sys.time()
    final.final.list <- do.call("rbind",final.list)
    rownames(final.final.list) <- NULL
    print(Sys.time()-then)
    
    # Clean-up the matrix to match cds names
    head(final.final.list)
    final.final.list$ref_seq_ID_b <- final.final.list$Query_id_b
    final.final.list$ref_seq_ID_b <- gsub(".*_cds_","", final.final.list$ref_seq_ID_b)
    final.final.list$ref_seq_ID_b <- gsub("[^[:alnum:][:blank:]_]","&", final.final.list$ref_seq_ID_b)
    final.final.list$ref_seq_ID_b <- gsub("&.*", "",final.final.list$ref_seq_ID_b)
    
    no.id <- which(!grepl("[AIBEC]", final.final.list$ref_seq_ID_b, perl = TRUE) == TRUE)
    no.protein_id <- final.final.list[which(!grepl("[AIBEC]", final.final.list$ref_seq_ID_b, perl = TRUE) == TRUE),]
    no.protein_id$Query_id_b <- gsub(".*.1_c", "c", no.protein_id$Query_id_b)
    no.protein_id$Query_id_b <- gsub(".*.2_c", "c", no.protein_id$Query_id_b)
    no.protein_id$Query_id_b <- gsub(".*.3_c", "c", no.protein_id$Query_id_b)
    final.final.list$ref_seq_ID_b[no.id] <- no.protein_id$Query_id_b
    
    final.final.list$ref_seq_ID_a <- final.final.list$Subject_id_a
    final.final.list$ref_seq_ID_a <- gsub(".*_cds_","", final.final.list$ref_seq_ID_a)
    final.final.list$ref_seq_ID_a <- gsub("[^[:alnum:][:blank:]_]","&", final.final.list$ref_seq_ID_a)
    final.final.list$ref_seq_ID_a <- gsub("&.*", "",final.final.list$ref_seq_ID_a)
    
    final.final.list$locusTag_a  <- final.final.list$Subject_id_a
    final.final.list$locusTag_a  <- final.final.list$locusTag_a[NA]
    final.final.list$locusTag_b  <- final.final.list$Query_id_b
    final.final.list$locusTag_b <- final.final.list$locusTag_b[NA]
    
    no.id <- which(!grepl("[AIBEC]", final.final.list$ref_seq_ID_a, perl = TRUE) == TRUE)
    no.protein_id <- final.final.list[which(!grepl("[AIBEC]", final.final.list$ref_seq_ID_a, perl = TRUE) == TRUE),]
    no.protein_id$Subject_id_a <- gsub(".*.1_c", "c", no.protein_id$Subject_id_a)
    no.protein_id$Subject_id_a <- gsub(".*.2_c", "c", no.protein_id$Subject_id_a)
    no.protein_id$Subject_id_a <- gsub(".*.3_c", "c", no.protein_id$Subject_id_a)
    final.final.list$ref_seq_ID_a[no.id] <- no.protein_id$Subject_id_a
    
    #Match cds names to matrix features    
    for (s in 1: nrow(final.final.list)){
      d <- which(protID.genome1$Protein_id == final.final.list$ref_seq_ID_b[s])
      final.final.list$locusTag_b[s] <- protID.genome1$Locus_tag[d]
    }
    
    for (e in 1: nrow(final.final.list)){
      d <- which(protID.genome2$Protein_id == final.final.list$ref_seq_ID_a[e])
      final.final.list$locusTag_a[e] <- protID.genome2$Locus_tag[d]
    }
    
    # save the RBH matrix
    write.table(final.final.list, paste(name_strains[j], "_", name_strains[i], ".txt", sep=""), quote=FALSE, sep = "\t", row.names = F)
    
  }
}

