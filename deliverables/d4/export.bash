declare -a names=(
  "legenda"
  "cliente"
  "login"
  "logout"
  "dashboard"
  "heatmap"
);

declare -a index=(
  0 1 2 3 4 5
);

for i in "${index[@]}"
do drawio -x -s 1.3 -f png -p $i -o ".media/user-flows/${names[i]}.png" ".media/.drawio/user-flows.drawio"
done;

for f in ./.media/user-flows/*.png
do convert "$f" -background white -alpha remove -alpha off "$f"
done;

drawio -x -s 1.3 -f png -o ".media/" ".media/.drawio/resources-extraction.drawio";

drawio -x -s 1.3 -f png -o ".media/" ".media/.drawio/resources-models.drawio";

quarto render *.qmd;

code documento-di-sviluppo.pdf;

cp documento-di-sviluppo.pdf D4-T41.pdf;

# pdf compression
ps2pdf D4-T41.pdf;
