drawio -x -s 2 -f png -o ".media" ".media/.drawio"
drawio -x -s 1.1 -f pdf -o ".media" ".media/.drawio/diagrammacomp.drawio"

quarto render *.qmd;

code documento-di-specifica.pdf;

pdftk documento-di-specifica.pdf .media/diagrammacomp.pdf cat output D2-T41.pdf;