#### Bash exporting .drawio files
```bash
declare -a names=(
  "login"
  "logout"
  "dashboard"
  "heatmap"
);

declare -a index=(
  0 1 2 3
);

for i in "${index[@]}"
do drawio -x -s 1.3 -f png -p $i -o ".media/${names[i]}.png" ".media/.drawio/user-flow.drawio"
done;

for f in ./.media/*.png
do convert "$f" -background white -alpha remove -alpha off "$f"
done;

drawio -x -s 1.3 -f png -p $i -o ".media/" ".media/.drawio/resources-extraction.drawio"

drawio -x -s 1.3 -f png -p $i -o ".media/" ".media/.drawio/resources-models.drawio"

```

#### Reduce pdf size
```bash
ps2pdf D4-T41.pdf
```