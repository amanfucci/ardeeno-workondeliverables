for f in ./.media/mockups/*.png
do convert \
    -page +26+54 "$f" \
    -page +0+0 ./.media/mockups/.framed/frame.png \
    -background none -layers merge +repage "$f.framed.png";
  mv "$f.framed.png" ./.media/mockups/.framed/
done;

quarto render *.qmd;

code documento-di-progetto.pdf;

cp documento-di-progetto.pdf D1-T41.pdf;