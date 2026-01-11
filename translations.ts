
export type Language = 'en' | 'de' | 'fr' | 'it';

export const TRANSLATIONS = {
  en: {
    title: 'zinit.ch 3D-Druck Service',
    upload: 'Upload STL',
    analyzing: 'Analyzing Geometry...',
    estTotalCost: 'Estimated Total Cost',
    material: 'Material',
    machineTime: 'Machine Time',
    energyCost: 'Energy Cost',
    laborPost: 'Labor & Post',
    setupFee: 'Setup Fee',
    modelAnalysis: 'Model Analysis',
    volume: 'Volume',
    surfaceArea: 'Surface Area',
    boundingBox: 'Bounding Box',
    printTime: 'Print Time',
    printSettings: 'Print Settings',
    infill: 'Infill Density',
    layerHeight: 'Layer Height (mm)',
    color: 'Color',
    multicolor: 'Multicolor Print',
    nozzleSize: 'Nozzle Size (mm)',
    warning: 'This is an estimate and errors may occur. For an exact price, please contact me at 3d-druck@zinit.ch.',
    engineReady: 'STLLoader Engine Ready',
    printerTooLarge: 'Model is larger than the printer\'s print volume.',
    placeholderTitle: 'Upload an STL model to view',
    placeholderSub: 'Interactive 3D preview will appear here',
    rights: 'All rights reserved.',
    terms: 'Terms of Service',
    termsContent: `1. Scope of Services
This private 3D printing service offers custom manufacturing of 3D printed parts based on customer-provided STL files. All prints are produced on a best-effort basis.

2. Pricing & Payment
All prices shown are estimates. Final pricing may vary based on actual print time, material usage, and complexity. Payment is due before the part is shipped.

3. File Requirements
Customers must provide valid, printable STL files. We reserve the right to reject files that are not suitable for printing.

4. Quality & Tolerances
FDM 3D printing has inherent limitations. Minor imperfections, layer lines, and dimensional tolerances of ±0.5mm are normal and not considered defects.

5. Liability
We are not liable for any damages arising from the use of printed parts. Parts are provided "as is" without warranty for specific applications.

6. Intellectual Property
Customers confirm they have the right to print the submitted designs. We do not claim ownership of customer designs.

7. Data Privacy
Uploaded files are used solely for printing purposes and are deleted after order completion.

8. Cancellation
Orders may be cancelled before printing begins. Once printing has started, cancellation is not possible.

9. Contact
For questions, please contact: 3d-druck@zinit.ch`,
    currency: 'CHF',
    sendInquiry: 'Send Inquiry via Email',
    emailSubject: '3D Printing Inquiry',
    emailBodyHeader: 'Hello zinit.ch Team,\n\nI would like to request a print with the following settings:',
    emailBodyFooter: '\n(Please remember to attach the STL file to this email.)',
    quantity: 'Quantity'
  },
  de: {
    title: 'zinit.ch 3D-Druck Service',
    upload: 'STL hochladen',
    analyzing: 'Geometrie wird analysiert...',
    estTotalCost: 'Geschätzte Gesamtkosten',
    material: 'Material',
    machineTime: 'Maschinenzeit',
    energyCost: 'Energiekosten',
    laborPost: 'Arbeit & Nachbearbeitung',
    setupFee: 'Einrichtungsgebühr',
    modelAnalysis: 'Modellanalyse',
    volume: 'Volumen',
    surfaceArea: 'Oberfläche',
    boundingBox: 'Grösse',
    printTime: 'Druckzeit',
    printSettings: 'Druckeinstellungen',
    infill: 'Inhaltsdichte (Infill)',
    layerHeight: 'Schichthöhe (mm)',
    color: 'Farbe',
    multicolor: 'Mehrfarbendruck',
    nozzleSize: 'Druckdüse (mm)',
    warning: 'Dies ist eine Schätzung und es können Fehler auftreten. Für einen genauen Preis kontaktiere mich bitte unter 3d-druck@zinit.ch.',
    engineReady: 'STLLoader Engine bereit',
    printerTooLarge: 'Das Modell ist grösser als das Druckvolumen des Druckers.',
    placeholderTitle: 'Lade ein STL-Modell hoch',
    placeholderSub: 'Die interaktive 3D-Vorschau erscheint hier',
    rights: 'Alle Rechte vorbehalten.',
    terms: 'Nutzungsbedingungen',
    termsContent: `1. Leistungsumfang
Dieser private 3D-Druckservice bietet die individuelle Fertigung von 3D-gedruckten Teilen basierend auf vom Kunden bereitgestellten STL-Dateien. Alle Drucke werden nach bestem Bemühen erstellt.

2. Preise & Zahlung
Alle angezeigten Preise sind Schätzungen. Der Endpreis kann je nach tatsächlicher Druckzeit, Materialverbrauch und Komplexität variieren. Die Zahlung ist vor dem Versand des Teils fällig.

3. Dateianforderungen
Kunden müssen gültige, druckbare STL-Dateien bereitstellen. Wir behalten uns das Recht vor, Dateien abzulehnen, die nicht für den Druck geeignet sind.

4. Qualität & Toleranzen
FDM-3D-Druck hat inhärente Einschränkungen. Kleinere Unvollkommenheiten, Schichtlinien und Masstoleranzen von ±0,5mm sind normal und gelten nicht als Mängel.

5. Haftung
Wir haften nicht für Schäden, die durch die Verwendung der gedruckten Teile entstehen. Teile werden ohne Gewährleistung für spezifische Anwendungen "wie besehen" geliefert.

6. Geistiges Eigentum
Kunden bestätigen, dass sie das Recht haben, die eingereichten Designs zu drucken. Wir erheben keinen Anspruch auf Kundendesigns.

7. Datenschutz
Hochgeladene Dateien werden ausschliesslich für Druckzwecke verwendet und nach Auftragsabschluss gelöscht.

8. Stornierung
Aufträge können vor Druckbeginn storniert werden. Nach Druckstart ist eine Stornierung nicht mehr möglich.

9. Kontakt
Bei Fragen kontaktieren Sie uns unter: 3d-druck@zinit.ch`,
    currency: 'CHF',
    sendInquiry: 'Anfrage per E-Mail senden',
    emailSubject: '3D-Druck Anfrage',
    emailBodyHeader: 'Hallo zinit.ch Team,\n\nIch möchte einen Druck mit den folgenden Einstellungen anfragen:',
    emailBodyFooter: '\n(Bitte denke daran, die STL-Datei dieser E-Mail anzuhängen.)',
    quantity: 'Stückzahl'
  },
  fr: {
    title: 'zinit.ch 3D-Druck Service',
    upload: 'Télécharger STL',
    analyzing: 'Analyse de la géométrie...',
    estTotalCost: 'Coût total estimé',
    material: 'Matériau',
    machineTime: 'Temps machine',
    energyCost: 'Coût énergétique',
    laborPost: 'Main-d\'œuvre & Post',
    setupFee: 'Frais de mise en place',
    modelAnalysis: 'Analyse du modèle',
    volume: 'Volume',
    surfaceArea: 'Surface',
    boundingBox: 'Boîte englobante',
    printTime: 'Temps d\'impression',
    printSettings: 'Paramètres d\'impression',
    infill: 'Densité de remplissage',
    layerHeight: 'Hauteur de couche (mm)',
    color: 'Color',
    multicolor: 'Impression multicolore',
    nozzleSize: 'Buse (mm)',
    warning: 'C\'est une estimation et des erreurs peuvent survenir. Pour un prix exact, veuillez nous contacter à 3d-druck@zinit.ch.',
    engineReady: 'Moteur STLLoader prêt',
    printerTooLarge: 'Le modèle est plus grand que le volume d\'impression de l\'imprimante.',
    placeholderTitle: 'Téléchargez un modèle STL',
    placeholderSub: 'L\'aperçu 3D interactif apparaîtra ici',
    rights: 'Tous droits réservés.',
    terms: 'Conditions d\'utilisation',
    termsContent: `1. Étendue des services
Ce service d'impression 3D privé propose la fabrication sur mesure de pièces imprimées en 3D à partir de fichiers STL fournis par le client. Toutes les impressions sont réalisées au mieux.

2. Prix et paiement
Tous les prix affichés sont des estimations. Le prix final peut varier en fonction du temps d'impression réel, de l'utilisation des matériaux et de la complexité. Le paiement est dû avant l'expédition de la pièce.

3. Exigences de fichiers
Les clients doivent fournir des fichiers STL valides et imprimables. Nous nous réservons le droit de rejeter les fichiers qui ne conviennent pas à l'impression.

4. Qualité et tolérances
L'impression 3D FDM a des limitations inhérentes. Les petites imperfections, les lignes de couche et les tolérances dimensionnelles de ±0,5mm sont normales et ne sont pas considérées comme des défauts.

5. Responsabilité
Nous ne sommes pas responsables des dommages résultant de l'utilisation des pièces imprimées. Les pièces sont fournies "telles quelles" sans garantie pour des applications spécifiques.

6. Propriété intellectuelle
Les clients confirment qu'ils ont le droit d'imprimer les designs soumis. Nous ne revendiquons pas la propriété des designs des clients.

7. Protection des données
Les fichiers téléchargés sont utilisés uniquement à des fins d'impression et sont supprimés après la fin de la commande.

8. Annulation
Les commandes peuvent être annulées avant le début de l'impression. Une fois l'impression commencée, l'annulation n'est plus possible.

9. Contact
Pour toute question, veuillez contacter: 3d-druck@zinit.ch`,
    currency: 'CHF',
    sendInquiry: 'Envoyer une demande par e-mail',
    emailSubject: 'Demande d\'impression 3D',
    emailBodyHeader: 'Bonjour l\'équipe zinit.ch,\n\nJe souhaite demander une impression avec les paramètres suivants :',
    emailBodyFooter: '\n(N\'oubliez pas de joindre le fichier STL à cet e-mail.)',
    quantity: 'Quantité'
  },
  it: {
    title: 'zinit.ch 3D-Druck Service',
    upload: 'Carica STL',
    analyzing: 'Analisi della geometria...',
    estTotalCost: 'Costo totale stimato',
    material: 'Materiale',
    machineTime: 'Tempo macchina',
    energyCost: 'Costo energetico',
    laborPost: 'Manodopera e Post',
    setupFee: 'Costo di installazione',
    modelAnalysis: 'Analyse del modello',
    volume: 'Volume',
    surfaceArea: 'Area superficiale',
    boundingBox: 'Ingombro',
    printTime: 'Tempo di stampa',
    printSettings: 'Impostazioni di stampa',
    infill: 'Densità di riempimento',
    layerHeight: 'Altezza dello strato (mm)',
    color: 'Colore',
    multicolor: 'Stampa multicolore',
    nozzleSize: 'Ugello (mm)',
    warning: 'Questa è una stima e potrebbero verificarsi errori. Per un prezzo esatto, contattaci all\'indirizzo 3d-druck@zinit.ch.',
    engineReady: 'Motore STLLoader pronto',
    printerTooLarge: 'Il modello è più grande del volume di stampa della stampante.',
    placeholderTitle: 'Carica un modello STL',
    placeholderSub: 'L\'anteprima 3D apparirà qui',
    rights: 'Tutti i diritti riservati.',
    terms: 'Termini di servizio',
    termsContent: `1. Ambito dei servizi
Questo servizio di stampa 3D privato offre la produzione personalizzata di parti stampate in 3D basate su file STL forniti dal cliente. Tutte le stampe sono prodotte al meglio delle nostre possibilità.

2. Prezzi e pagamento
Tutti i prezzi mostrati sono stime. Il prezzo finale può variare in base al tempo di stampa effettivo, all'utilizzo del materiale e alla complessità. Il pagamento è dovuto prima della spedizione del pezzo.

3. Requisiti dei file
I clienti devono fornire file STL validi e stampabili. Ci riserviamo il diritto di rifiutare file non adatti alla stampa.

4. Qualità e tolleranze
La stampa 3D FDM ha limitazioni intrinseche. Piccole imperfezioni, linee di strato e tolleranze dimensionali di ±0,5mm sono normali e non sono considerate difetti.

5. Responsabilità
Non siamo responsabili per eventuali danni derivanti dall'uso delle parti stampate. Le parti sono fornite "così come sono" senza garanzia per applicazioni specifiche.

6. Proprietà intellettuale
I clienti confermano di avere il diritto di stampare i design inviati. Non rivendichiamo la proprietà dei design dei clienti.

7. Privacy dei dati
I file caricati vengono utilizzati esclusivamente per scopi di stampa e vengono eliminati dopo il completamento dell'ordine.

8. Cancellazione
Gli ordini possono essere annullati prima dell'inizio della stampa. Una volta iniziata la stampa, l'annullazione non è possibile.

9. Contatto
Per domande, contattare: 3d-druck@zinit.ch`,
    currency: 'CHF',
    sendInquiry: 'Invia richiesta via e-mail',
    emailSubject: 'Richiesta di stampa 3D',
    emailBodyHeader: 'Ciao team zinit.ch,\n\nvorrei richiedere una stampa con le seguenti impostazioni:',
    emailBodyFooter: '\n(Ricordati di allegare il file STL a questa email.)',
    quantity: 'Quantità'
  }
};

export const MATERIAL_DESCRIPTIONS = {
  en: {
    PLA: 'Easy to print, biodegradable, great for prototypes.',
    PETG: 'Durable, chemical resistant, good balance of strength.',
    ABS: 'High strength, heat resistant, industrial standard.',
    TPU: 'Flexible, rubber-like, high impact resistance.',
    NYLON: 'Extremely tough, wear resistant, self-lubricating.'
  },
  de: {
    PLA: 'Einfach zu drucken, biologisch abbaubar, ideal für Prototypen.',
    PETG: 'Langlebig, chemikalienbeständig, gute Festigkeit.',
    ABS: 'Hohe Festigkeit, hitzebeständig, Industriestandard.',
    TPU: 'Flexibel, gummiartig, hohe Schlagfestigkeit.',
    NYLON: 'Extrem zäh, verschleissfest, selbstschmierend.'
  },
  fr: {
    PLA: 'Facile à imprimer, biodégradable, idéal pour les prototypes.',
    PETG: 'Durable, résistant aux produits chimiques, bon équilibre.',
    ABS: 'Haute résistance, résistant à la chaleur, standard industriel.',
    TPU: 'Flexible, semblable au caoutchouc, haute résistance aux chocs.',
    NYLON: 'Extrêmement résistant, résistant à l\'usure.'
  },
  it: {
    PLA: 'Facile da stampare, biodégradable, ottimo per i prototipi.',
    PETG: 'Durevole, resistente ai prodotti chimici, buon equilibrio.',
    ABS: 'Alta resistenza, resistente al calore, standard industriel.',
    TPU: 'Flessibile, simile alla gomma, alta resistenza agli urti.',
    NYLON: 'Extremamente resistente, resistente all\'usura.'
  }
};
