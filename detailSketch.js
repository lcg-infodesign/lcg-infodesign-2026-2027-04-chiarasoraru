let backgroundColor = '#1E243C';
let boxColor = '#2D3458';
let textColor = '#FFFFFF';
let linkHoverColor = '#D6ECFF'; 
let femmineColor = '#8A5CF5';  // viola
let maschiColor = '#FF9F3F';   // arancione

// colori CSV uguali in tuttele pagines
let years = ["2020", "2021", "2022", "2023"];
let colorScale = {
    '2020': '#C9B1E0',
    '2021': '#EBD84B',
    '2022': '#F0645A',
    '2023': '#8FB04A'
}

// stessa roba
let margin = 40;

// variabile in cui salvo dati
let data;
let selectedCountryCode;

// true quando il mouse è sopra il link 
let sopraLink = false;

async function setup() {

    //carico i dati
    data = await loadTable("assets/nascite_MF.csv", ",", "header");

    // Parametri passati nell’URL 
    let params = getURLParams();

    selectedCountryCode = params.paese;

    // creo il canvas
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

}

function draw() {
    background(backgroundColor);

    // impostazioni per tutti i testi
    noStroke();

    //mouse false true
     sopraLink = false;
    if (mouseX > margin && mouseX < margin + 210 && mouseY > 15 && mouseY < 42) {
        sopraLink = true;
    }
    
    // Link Torna a tutti i paesi
    let linkText = '← Torna a tutti i paesi';
    let linkColor = textColor;          // colore normale
        if (sopraLink) {
        linkColor = linkHoverColor;     // mouse sopra
    }
    
    
    fill(linkColor);
    textSize(20);
    text(linkText, margin, 35);
  if (sopraLink) {
        stroke(linkColor);
        strokeWeight(1.5);
        line(margin, 40, margin + 210, 40);  // sottolineatura
        noStroke(); 
      }
        
    
     //riga paese
    let countryRow = data.findRow(selectedCountryCode, "Codice");

    if (countryRow) {
        let nome = countryRow.get("Paese");

        // Titolo
        fill(textColor);
        textStyle(BOLD);
        textSize(32);
        text(countryRow.get("Paese"), margin, 90);
        textStyle(NORMAL);
        textSize(14);
        text("In dettaglio, quante femmine e maschi sono nati dal 2020 al 2023", margin, 118);

        // Legenda
        let xLegenda = width - margin - 440;
        fill(textColor);
        textSize(13);
        text("Legenda:", xLegenda, margin + 14);
         textStyle(NORMAL);
        text("Ogni riquadro è un anno.", xLegenda, margin + 34);
        text("Più il petalo è lungo, più bambini sono nati.", xLegenda, margin + 52);
        fill(femmineColor);
        ellipse(xLegenda + 6, margin + 76, 8, 18);
        text("femmine", xLegenda + 18, margin + 81);
        fill(maschiColor);
        ellipse(xLegenda + 106, margin + 76, 8, 18);
        text("maschi", xLegenda + 118, margin + 81);
        
       
         // femmine e maschi di ogni anno e valore più alto 
        let femmine = [];
        let maschi = [];
        let massimo = 0;
        for (let i = 0; i < 4; i++) {
            let f = int(countryRow.get("F_" + years[i]));
            let m = int(countryRow.get("M_" + years[i]));
            femmine.push(f);
            maschi.push(m);
            if (f > massimo) {
                massimo = f;
            }
            if (m > massimo) {
                massimo = m;
            }
        }
       // Un riquadro per ogni anno
        let larghezzaBox = 520;
        let spazio = 60;                                            // spazio tra le colonne
        let altezzaBox = (height - 205 - margin - 20) / 2;
        let xInizio = (width - 2 * larghezzaBox - spazio) / 2;      // così i riquadri stanno al centro
        let maxLength = altezzaBox - 90;                            // petalo più lungo

        for (let i = 0; i < 4; i++) {
            let f = femmine[i];
            let m = maschi[i];
            let totale = int(countryRow.get(years[i]));   // colonne 2020-2023


            // colonna
            let colonna = i % 2;
            // riga
            let riga = 0;
            if (i >= 2) {
                riga = 1;
            }

            // angolo in alto a sinistra del riquadro
            let xBox = xInizio + colonna * (larghezzaBox + spazio);
            let yBox = 205 + riga * (altezzaBox + 20);

            // riquadro blu
            fill(boxColor);
            rect(xBox, yBox, larghezzaBox, altezzaBox);

            // anno nel colore della pagina principale
            fill(colorScale[years[i]]);
            textStyle(BOLD);
            textSize(22);
            textStyle(NORMAL);
            text(years[i], xBox + 20, yBox + 32);

            // fiore a sinistra nel riquadro
            let lungF = map(f, 0, massimo, 0, maxLength);
            let lungM = map(m, 0, massimo, 0, maxLength);
            mioFiore(xBox + 150, yBox + altezzaBox - 25, lungF, lungM);

            // numeri grandi a destra nel riquadro
            let xNumeri = xBox + 300;

            fill(femmineColor);
            textSize(36);
            text(f, xNumeri, yBox + 64);
            textSize(14);
             text("femmine", xNumeri, yBox + 84);

            fill(maschiColor);
            textSize(36);
            text(m, xNumeri, yBox + 134);
            textSize(14);
              text("maschi", xNumeri, yBox + 154);
            fill(textColor);
            text("totale " + totale, xNumeri, yBox + 188);
        }

    } 

}

// Fiore 
function mioFiore(_x, _y, _lungF, _lungM) {
    push();
    translate(_x, _y);

    // petalo femmine
    push();
    rotate(-90 - 20);
    fill(femmineColor);
    ellipse(_lungF / 2, 0, _lungF, _lungF * 0.4);
    pop();

    // petalo maschi
    push();
    rotate(-90 + 20);
    fill(maschiColor);
    ellipse(_lungM / 2, 0, _lungM, _lungM * 0.4);
    pop();

    // centro del fiore
    fill(textColor);
    circle(0, 0, 14);

    pop();
} 


//torna alla pagina di insieme
function mousePressed() {
    if (sopraLink) {
        window.location.href = 'index.html';
    }
}