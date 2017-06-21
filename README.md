# StaphBrowse
A NYGC Hackathon Project to Create a genome visualization tool for *Staphylococcus aureus*

*Staphylococcus aureus* is the most common cause of human bacterial infections, including the majority of hospital acquired infections. *S. aureus* has a highly variable genome, with differences between isolates that include substantial insertion/deletions of mobile elements. Disease surveillance research has led to the genome sequencing of many thousands of isolates. However, the annotation of these genome sequences does not provide researchers with a complete set of orthologs with informative names. Here, we present a computational pipeline to compare de novo sequence contigs to the set of complete RefSeq genomes for i) determining appropriate reference genome for whole-genome alignment, ii) annotation, ortholog prediction, and comparative genomics, and iii) front-end visualization of genome annotation using a versatile, user-friendly web-based genome browser. We demonstrate our pipeline using data from *S. aureus* as a paradigm, owing to its high sequence variability, and therefore less well-curated genomic sequences in public databases.
 

## Dependencies:computer:

pyfasta [link](https://pypi.python.org/pypi/pyfasta/)

BLAST+ [link](https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastDocs&DOC_TYPE=Download)

MAUVE [link](http://darlinglab.org/mauve/snapshots/2015/2015-02-13/linux-x64/mauve_linux_snapshot_2015-02-13.tar.gz)

GLIMMER [link](https://ccb.jhu.edu/software/glimmer/)

## StaphBrowse workflow

![My image](https://github.com/NCBI-Hackathons/Staph_aureus_viewer/blob/master/StaphBrowse_workflow.png)


## Find the best reference genome for alignment

Obtain 162 near-complete whole-genome sequences from NCBI

`wget ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/001/717/725/`

### Run the best_reference.sh script

`staph_pipeline.sh`

Output for best alignment 

![My image](https://github.com/NCBI-Hackathons/Staph_aureus_viewer/blob/master/best_reference.png)

### JBrowse visualization of Staphylococcus aureus genome






