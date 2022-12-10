#### Bash exporting .drawio files
```bash
declare -a names=(
  "complessivo"
  "utente"
  "vetrina"
  "impianto"
  "dipendenti"
  "complessivo-ocl"
  "utente-ocl"
  "vetrina-ocl"
  "impianto-ocl"
  "dipendenti-ocl"
);

declare -a index=(
  0 1 2 3 4 5 6 7 8 9
);

for i in "${index[@]}"
do drawio -x -s 1.3 -f png -p $i -o ".media/${names[i]}.png" ".media/.drawio/classi.drawio"
done;

for f in ./.media/*.png
do convert "$f" -background white -alpha remove -alpha off "$f"
done;

drawio -x -s 1.01 -p 0 -f pdf -o ".media/complessivo-t.pdf" ".media/.drawio/classi.drawio" &&\
  pdftk A=./.media/complessivo-t.pdf cat A1 output .media/complessivo.pdf &&\
drawio -x -s 1.01 -p 5 -f pdf -o ".media/complessivo-ocl-t.pdf" ".media/.drawio/classi.drawio" &&\
  pdftk A=./.media/complessivo-ocl-t.pdf cat A1 output .media/complessivo-ocl.pdf &&\
rm .media/complessivo-t.pdf .media/complessivo-ocl-t.pdf;

```

#### Concatenate pdf files
```bash
pdftk A=documento-di-architettura.pdf B=.media/complessivo.pdf C=.media/complessivo-ocl.pdf cat A B C output D3-T41.pdf
```

#### Reduce pdf size
```bash
ps2pdf D3-T41.pdf
```