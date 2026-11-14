let backgroundColor = '#1E243C';
let boxColor = '#2D3458';
let textColor = '#FFFFFF';
let accentColor = '#EBD84B';
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
    
    // Link "Torna a tutti i paesi"
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

        // femmine e maschi di ogni anno, totale dei 4 anni e val più alto
        let femmine = [];
        let maschi = [];
        let totale = 0;
        let massimo = 0;
        for (let i = 0; i < 4; i++) {
            let f = int(countryRow.get("F_" + years[i]));
            let m = int(countryRow.get("M_" + years[i]));
            femmine.push(f);
            maschi.push(m);
            totale = totale + f + m;
            massimo = max(massimo, f, m);
        }

            }

        }