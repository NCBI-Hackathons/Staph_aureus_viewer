# StaphBrowse
A NYGC Hackathon Project to Create a JBrowse Viewer for Staph aureus genomes

The aim of this project is to develop a genome browser for Staphylococcus aureus genomes. NCBI genome database currently lists genome sequence data from 7968 stains, with varying degree of genome assembly qualities. 162 strains have near-complete whole-genome sequence, while a majority of sequences exist as either scaffolds (4711) or contigs (3086). Our genome browser pipeline aims to achieve the following goals:

1. Develop a pipeline to take fragmented scaffolds/contigs and identify the best complete genome sequence to assemble and visualize using Jbrowse

2. Annotate the newly assembled genome and visualize with Jbrowse

3. Predict orthologs and report recent gene duplications, reaarangements and other structural variation between Staphylococcus aureus strains


## Dependencies:computer:

pyfasta (https://pypi.python.org/pypi/pyfasta/)

BLAST+ (ftp://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/)


## Find the best reference genome for alignment

Obtain 162 near-complete whole-genome sequences from NCBI

`wget ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/001/717/725/`

Run the best_reference.sh script

`best_reference.sh`

Output for best alignment 

![My image](https://github.com/NCBI-Hackathons/Staph_aureus_viewer/blob/master/best_reference.png)




