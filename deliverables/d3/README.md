#### Bash exporting .drawio files
```bash
drawio -x -s 2 -c -f png -o ".media" ".media/.drawio" &&
for f in ./.media/*.png; do convert "$f" -background white -alpha remove -alpha off "$f"; done &&
img2pdf ./.media/classi.png > ./.media/classi.pdf &&
img2pdf ./.media/classi_ocl.png > ./.media/classi_ocl.pdf
```

```bash
declare -a names=(
  "complessivo"
  "utente"
  "impianto"
  "dipendente"
  "heatmap"
  "modello"
  "tipi"
  "managers"
  "complessivo_ocl"
  "utente_ocl"
  "impianto_ocl"
  "dipendente_ocl"
  "heatmap_ocl"
  "modello_ocl"
  "tipi_ocl"
);

declare -a index=(
  0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
);

for i in "${index[@]}"
do drawio -x -s 1.3 -f png -p $i -o ".media/${names[i]}.png" ".media/.drawio/classi.drawio"
done;

for f in ./.media/*.png
do convert "$f" -background white -alpha remove -alpha off "$f"
done;

drawio -x -s 1.1 -p 0 -f pdf -o ".media/complessivo_t.pdf" ".media/.drawio/classi.drawio" &&\
  pdftk A=./.media/complessivo_t.pdf cat A1 output .media/complessivo.pdf &&\
drawio -x -s 1.1 -f pdf -g 8..8 -o ".media/complessivo_ocl_t.pdf" ".media/.drawio/classi.drawio" &&\
  pdftk A=./.media/complessivo_ocl_t.pdf cat A1 output .media/complessivo_ocl.pdf &&\
rm .media/complessivo_t.pdf .media/complessivo_ocl_t.pdf;

```

#### Concatenate pdf files
```bash
pdftk A=documento-di-architettura.pdf B=.media/complessivo.pdf C=.media/complessivo_ocl.pdf cat A1-6 B1 A7-end C1 output D3-T41.pdf
```

#### Reduce pdf size
```bash
ps2pdf D3-T41.pdf
```