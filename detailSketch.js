let backgroundColor = '#1E243C';
let boxColor = '#2D3458';
let textColor = '#FFFFFF';
let accentColor = '#EBD84B';
let linkHoverColor = '#D6ECFF'; 
let femmineColor = '#8A5CF5';  // viola
let maschiColor = '#FF9F3F';   // arancione

// colori CSV uguali in tuttele pagines
let years = ["2020", "2021", "2022", "2023"];
let angles = [-90, 0, 90, 180];
let colorScale = {
    '2020': '#C9B1E0',
    '2021': '#EBD84B',
    '2022': '#F0645A',
    '2023': '#8FB04A'
}

// stessa roba
let margin = 40;
let headerHeight = 140;

// variabile in cui salvo dati
let data;
let selectedCountryCode;

async function setup() {

    //carico i dati
    data = await loadTable("assets/nascite_MF.csv", ",", "header");

    // Legge i parametri passati nell’URL (es. ?famine=123)
    let params = getURLParams();

    // salvo l'id della carestia selezionata
    selectedCountryCode = params.paese;

    // creo il canvas
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

}

function draw() {
    background(backgroundColor);

    // impostazioni per tutti i testi
    noStroke();
    
    // Link Torna a tutti i paesi
    let linkText = '← Torna a tutti i paesi';
    let linkColor = textColor;          // colore normale
    if (overLink()) {
        linkColor = linkHoverColor;     // mouse sopra
    }
    
    
    fill(linkColor);
    textStyle(BOLD);
    textSize(15);
    text(linkText, margin, 20);
    if (overLink()) {
        stroke(linkColor);
        strokeWeight(1.5);
        line(margin, 40, margin + textWidth(linkText), 40);  // sottolineatura
        noStroke(); 
      }
        

    // manina
    cursor(overLink() ? 'pointer' : 'default');
    
     //riga paese
    let countryRow = data.findRow(selectedCountryCode, "Codice");

    if (countryRow) {
        let nome = countryRow.get("Paese");

        // Titolo
        fill(textColor);
        textStyle(BOLD);
        textSize(32);
        text(countryRow.get("Paese"), margin, 90);
        textSize(14);
        text("In dettaglio, quante femmine e maschi sono nati dal 2020 al 2023", margin, 118);

        // Legenda
        let xLegenda = width - margin - 440;
        fill(textColor);
        textSize(13);
        text("Legenda:", xLegenda, margin + 14);
        text("Ogni riquadro è un anno.", xLegenda, margin + 34);
        text("Più il petalo è lungo, più bambini sono nati.", xLegenda, margin + 52);
        fill(femmineColor);
        ellipse(xLegenda + 6, margin + 76, 8, 18);
        text("femmine", xLegenda + 18, margin + 81);
        fill(maschiColor);
        ellipse(xLegenda + 106, margin + 76, 8, 18);
        text("maschi", xLegenda + 118, margin + 81);
        fill(textColor);
        text("La scala è la stessa per tutti e 4 gli anni.", xLegenda, margin + 106);
       
         // femmine e maschi di ogni anno e valore più alto 
        let femmine = [];
        let maschi = [];
        let massimo = 0;
        for (let i = 0; i < 4; i++) {
            let f = int(countryRow.get("F_" + years[i]));
            let m = int(countryRow.get("M_" + years[i]));
            femmine.push(f);
            maschi.push(m);
            massimo = max(massimo, f, m);
        }
       // Un fiore per ogni anno
        let dimColonna = (width - 2 * margin) / 4;
        let yFiore = height - 150;                                  // dove sta il pallino
        let maxLength = min(yFiore - 200, dimColonna * 0.85);       // petalo più lungo

        for (let i = 0; i < 4; i++) {
            let f = femmine[i];
            let m = maschi[i];
            let totale = int(countryRow.get(years[i]));   // totale dell'anno (colonne 2020-2023)
            let xFiore = margin + dimColonna * (i + 0.5);

            let lungF = map(f, 0, massimo, 0, maxLength);
            let lungM = map(m, 0, massimo, 0, maxLength);
            mioFiore(xFiore, yFiore, lungF, lungM);

            // anno e numeri sotto il fiore
            textAlign(CENTER, TOP);
            fill(textColor);
            textStyle(BOLD);
            textSize(16);
            text(years[i], xFiore, yFiore + 20);
            textStyle(NORMAL);
            textSize(14);
            text("totale " + totale, xFiore, yFiore + 44);
            textSize(13);
            fill(femmineColor);
            text("femmine " + f, xFiore, yFiore + 68);
            fill(maschiColor);
            text("maschi " + m, xFiore, yFiore + 88);
            textAlign(LEFT, TOP);
    
        }

    } else {
        // codice non presente nel CSV
        fill(textColor);
        textStyle(BOLD);
        textSize(28);
        text("Paese non trovato", margin, 55);
    }
}

// Fiore con 2 petali verticali
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


// torna a tutti i paesi
function overLink() {
    return mouseX > margin && mouseX < margin + 190 && mouseY > 15 && mouseY < 42;
}

//torna alla pagina di insieme
function mouseClicked() {
    if (overLink()) {
        window.location.href = 'index.html';
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}