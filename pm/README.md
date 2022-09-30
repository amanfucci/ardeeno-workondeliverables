# Rendering .md to pdf
### quartopdf
```bash
#!/bin/bash
cat ./.header.txt > "$1.qmd" &&\
cat "$1" >> "$1.qmd" &&\
sed -i "s/mermaid/{mermaid}\n%%| fig-width: 6.5in\n%%| fig-height: 6in/" "$1.qmd" &&\
quarto render "$1.qmd" -o "./rendered/$1.pdf" &&\
rm "$1.qmd"
```
### renderall
```bash
#!/bin/bash
for f in *.md; do quartopdf "$f"; done;
```