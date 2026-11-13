let backgroundColor = '#1E243C';
let boxColor = '#2D3458';
let textColor = '#FFFFFF';
let linkHoverColor = '#D6ECFF'; 

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
    textAlign(LEFT, TOP);

    // Link "Torna a tutti i paesi": con il mouse sopra diventa giallo e si sottolinea
    let linkText = '← Torna a tutti i paesi';
    let linkHoverColor = '#D6ECFF'
    if (overLink()) {
        linkColor = accentColor;
    }
    fill(linkColor);
    textStyle(BOLD);
    textSize(15);
    text(linkText, margin, 20);
    if (overLink()) {
        stroke(linkColor);
        strokeWeight(1.5);
        line(margin, 40, margin + textWidth(linkText), 40);  // sottolineatura
        noStroke();  // i testi successivi non devono avere contorno
    }

    // il cursore diventa una manina sopra il link
    cursor(overLink() ? 'pointer' : 'default');
    let famineRow = data.findRow(selectedFamineId, "famine_id");

    if (famineRow) {
        let duration = int(famineRow.get("deaths"));
        let midpoint = float(famineRow.get("Excess Mortality midpoint"));
        let upper = float(famineRow.get("Excess Mortality upper"));

        let numPallini = upper / 100000;
        let numPalliniPieni = midpoint / 100000;

        let diametro = 15;
        let padding = 5;

        let posX = 20;
        let posY = 20;


        for (let i = 0; i < numPallini; i++) {

            if (i < numPalliniPieni) {
                fill(accentColor);
                stroke(accentColor);
            } else {
                noFill();
                stroke(accentColor);
            }
            circle(posX, posY, diametro);

            posX += diametro + padding;

            // Va a capo quando il prossimo pallino uscirebbe dal canvas (con margine di 20)
            if (posX + diametro > width - 20) {
                posX = 20;
                posY += diametro + padding;
            }

        }
    }
}