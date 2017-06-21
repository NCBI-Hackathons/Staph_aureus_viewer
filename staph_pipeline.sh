#!/usr/bin/sh

############################################
## Pipeline to split FASTA sequence and ####
## perform BLAST search agains S. aureus ###
## genomes to determine the best reference #
############################################

####################################################################
####### Read directories to obtain nucleotide fasta sequence #######
####################################################################

## Download Staphylococcus aurues genomes from NCBI ###############

## mkdir staph_genomes ##

## wget ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/001/717/725/ ###

## This folder will have 162 genomes ##

## Many genomes are redundant or have only plasmid sequences, so we  ##
## narrowed down the list to 66 genomes for final comparison ###


######### split fasta to 1kb chunks ######

## cd to folder where test genome is placed ##

JOBID=$1

FASTA_PATH="/home/ubuntu/staph_team/server/jobs/${JOBID}/"

BLAST_PATH="/home/ubuntu/staph_team/genomes/66_genomes/blast_db/"

GENOME_PATH="/home/ubuntu/staph_team/genomes/66_genomes/"

OUT_PATH="/home/ubuntu/staph_team/server/jobs/$JOBID/"

eval cd "${FASTA_PATH}"

for entry in * ## FASTA_PATH ##

do

echo `pyfasta split -n 1 -k 1000 $entry`

echo "performing blast...."

echo `blastn -query uploaded.split.1Kmer.fa -db ${BLAST_PATH}/staph_database -outfmt 6 > $entry\_consensus.out`

consensus=$(cat $entry\_consensus.out | awk '{print $2}' | sort | uniq -c | awk '{print $2,$1}' | sort -k2,2nr | head -n1 | awk '{print $1}')

highest=$(cat $entry\_consensus.out | awk '{print $2}' | sort | uniq -c | awk '{print $2,$1}' | sort -k2,2nr | head -n1 | awk '{print $2}')

total=$(cat $entry\_consensus.out | awk '{print $2}' | sort | uniq -c | awk '{print $2,$1}' | sort -k2,2nr | cut -f2 | awk '{ sum += $2} END {print sum}')

div=$(expr $highest/$total)

echo "The best reference for $entry is $consensus with $div consensus identity"

echo `rm *.gdx`
echo`rm *.flat`

done

#echo "performing MAUVE alignment"

echo `cp ${FASTA_PATH}/uploaded.fa ${GENOME_PATH}`

eval cd "${GENOME_PATH}"

echo `"../mauve_snapshot_2015-02-13/linux-x64/progressiveMauve" --output ${OUT_PATH}/output.xmfa  uploaded.fa $consensus.fa`


done

