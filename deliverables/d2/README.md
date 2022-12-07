#### Bash exporting .drawio files
```bash
drawio -x -s 2 -f png -o ".media" ".media/.drawio"
drawio -x -s 1 -f pdf -o ".media" ".media/diagrammacomp.drawio"
```

#### Concatenate pdf files
```bash
pdftk documento-di-Specifica.pdf diagrammacomp.pdf cat output D2-T41.pdf
```