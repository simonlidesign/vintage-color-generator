var vintage = {
    numOfColors: 5,
    colors: [],
    hues: [],
    saturations: [],
    brightnesses: [],
    run: null
}

// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately 
var HSBToRGB = (hsb) => {

    var rgb = { };
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s * 255 / 100);
    var v = Math.round(hsb.b * 255 / 100);

        if (s == 0) {

        rgb.r = rgb.g = rgb.b = v;
        } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;

            if (h == 360) h = 0;

                if (h < 60) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3 }
                else if (h < 120) { rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3 }
                else if (h < 180) { rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3 }
                else if (h < 240) { rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3 }
                else if (h < 300) { rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3 }
                else if (h < 360) { rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3 }
                else { rgb.r = 0; rgb.g = 0; rgb.b = 0 }
        }

    return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = (unshuffled) => unshuffled
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

vintage.run = ()=>{
    var i;
    for (i=0;i<vintage.numOfColors;i++){
        vintage.hues.push( Math.round((Math.random() + i)*360/vintage.numOfColors) );
        vintage.saturations.push( Math.round((Math.random() + i)*45/vintage.numOfColors + 5) );
        vintage.brightnesses.push( Math.round((Math.random() + i)*90/vintage.numOfColors + 10) );
    }

    vintage.hues = shuffle(vintage.hues);
    // vintage.hues.sort((a,b)=>a-b);
    // for (i=0;i<=vintage.numOfColors/4;i++){
    //     vintage.hues.unshift(vintage.hues.pop());
    // }
    vintage.saturations.sort();
    vintage.brightnesses.sort((a,b)=>b-a);

    for (i=0;i<vintage.numOfColors;i++){
        var color = document.createElement('div'),
            hsb = {h: vintage.hues[i], s: vintage.saturations[i], b: vintage.brightnesses[i]},
            rgb = HSBToRGB(hsb);

        // console.log(hsb);
        color.classList.add('color');
        color.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.querySelector('.palette').appendChild(color);
    }
};

vintage.run();
