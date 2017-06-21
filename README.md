# StaphBrowse

### A versatile and user-friendly genome browser for *Staphylococcus aureus*
### Hackathon Team: Stuart Brown, Anbo Zhou, Richard Kopin and Jeffrey Vedanayagam

*Staphylococcus aureus* is the most common cause of human bacterial infections, including the majority of hospital acquired infections. *S. aureus* has a highly variable genome, with differences between isolates that include substantial insertion/deletions of mobile elements. Disease surveillance research has led to the genome sequencing of many thousands of isolates. However, the annotation of these genome sequences does not provide researchers with a complete set of orthologs with informative names. Here, we present a computational pipeline to compare de novo sequence contigs to the set of complete RefSeq genomes for i) determining appropriate reference genome for whole-genome alignment, ii) annotation, ortholog prediction, and comparative genomics, and iii) front-end visualization of genome annotation using a versatile, user-friendly web-based genome browser. We demonstrate our pipeline using data from *S. aureus* as a paradigm, owing to its high sequence variability, and therefore less well-curated genomic sequences in public databases.
 

## Dependencies:computer:

pyfasta [link](https://pypi.python.org/pypi/pyfasta/)

BLAST+ [link](https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastDocs&DOC_TYPE=Download)

MAUVE [link](http://darlinglab.org/mauve/snapshots/2015/2015-02-13/linux-x64/mauve_linux_snapshot_2015-02-13.tar.gz)

GLIMMER [link](https://ccb.jhu.edu/software/glimmer/)

JBrowse [link](

## StaphBrowse workflow

![My image](https://github.com/NCBI-Hackathons/Staph_aureus_viewer/blob/master/StaphBrowse_workflow.png)


## Workflow methods

### Genome sequence data
 
*Staphyococcus aureus* genome sequence data was obtained from NCBI genomes portal, using the search term “staphylococcus aureus[orgn] “. NBCI lists 7968 sequences associated with *S. aureus*, but only 66 sequences are complete whole-genome sequences. We downloaded 66 complete whole-genome sequences of *S. aureus* from NCBI. 

Obtain near-complete whole-genome sequences from NCBI

`wget ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/001/717/725/`


### Determining the best reference genome for alignment 
 
As a proof-of-principle, we sampled 10 random genomes from the whole-genome set and subdivided the genomes into 1kb chunks using pyfasta tool. 1kb sequences were then compared with BLAST against a database of the remaining genomes using a custom shell script. The most frequent best-hit to a Reference was identified for each query genome. 
 
A pairwise alignment between the query genome and the closest Reference genome is then  constructed with MAUVE Contig Mover and exported as a JPEG image. A table of gaps in the alignment is also provided as a CSV file to aid in the identification of strain-specific insertions of mobile elements, which often carry drug resistance and virulence genes. 


### Run the best_reference.sh script

`staph_pipeline.sh`

Output for best alignment 

![My image](https://github.com/NCBI-Hackathons/Staph_aureus_viewer/blob/master/best_reference.png)

### Ortholog identification

For 50 *S. aureus* genomes we extracted the protein-coding sequences (CDS) from the gene feature format (gff) file. The CDS fasta files were then converted into individual BLAST databases for performing reciprocal best BLAST search. We required a minimum alignment length of 50 nucleotides with a e-value < 0.001 for a best reciprocal BLAST hit using the `ortholog_identification.R` script.

### JBrowse visualization of *Staphylococcus aureus* genome

![My image](






