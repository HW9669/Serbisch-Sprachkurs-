// Kapitel 11–15

CHAPTERS.push(
  // ------------------------------------------------------------------ 11
  {
    id: 11, part: "Essen, Einkaufen, Wohnen",
    title: "Immobilien & Wohnungssuche",
    goal: "Objektarten, Lage, Ausstattung, Kauf, Miete, Verträge, Finanzierung und das Maklergespräch.",
    grammar: {
      title: "Kaufen, mieten, verkaufen: nützliche Verben und Fragen",
      text: [
        "kupiti = kaufen, prodati = verkaufen, iznajmiti = mieten oder vermieten, izdati = vermieten. Imam stan na prodaju (zum Verkauf). Imam stan za izdavanje (zur Vermietung).",
        "Fragen mit Preis und Fläche: Koliko košta stan? Koliko ima kvadrata? Koliko je kirija? Koliko su režije? Ima li lift? (Gibt es einen Aufzug?)",
        "Zahlen und Fläche: 60 m² = šezdeset kvadrata. Nach Zahlen ab 5 steht der Genitiv Plural: pet soba, šest spratova, osam kvadrata."
      ]
    },
    groups: [
      { title: "Objektarten & Lage", words: [
        ["nekrétnina", "Immobilie"], ["garsonjéra", "Garçonnière"], ["jednosóban stán", "Einzimmerwohnung"], ["dvosóban stán", "Zweizimmerwohnung"], ["trosóban stán", "Dreizimmerwohnung"],
        ["četvorosóban stán", "Vierzimmerwohnung"], ["pénthaus", "Penthouse"], ["porodična kúća", "Einfamilienhaus"], ["víla", "Villa"], ["vikéndica", "Wochenendhaus"], ["plác", "Grundstück"],
        ["grádilište", "Baugrund"], ["póslovni próstor", "Geschäftslokal"], ["lokál", "Lokal"], ["magacín", "Lager"], ["novográdnja", "Neubau"], ["starográdnja", "Altbau"], ["periferíja", "Stadtrand"],
        ["okolína", "Umgebung"], ["kvárt", "Viertel"], ["nasélje", "Siedlung"], ["lokácija", "Lage"], ["blízina", "Nähe"], ["stámbena zgráda", "Wohnhaus"], ["pógled", "Aussicht"]
      ]},
      { title: "Ausstattung & Zustand", words: [
        ["kvadratúra", "Wohnfläche"], ["povŕšina", "Fläche"], ["prízemlje", "Erdgeschoss"], ["potkróvlje", "Dachgeschoss"], ["párket", "Parkett"], ["laminát", "Laminat"], ["plóčice", "Fliesen"],
        ["céntralno gréjanje", "Zentralheizung"], ["pódno gréjanje", "Fußbodenheizung"], ["renóviran", "renoviert"], ["adaptíran", "saniert"], ["nóv", "neu"], ["luksúzan", "luxuriös"], ["úseljiv", "bezugsfertig"],
        ["námešten", "möbliert"], ["nenámešten", "unmöbliert"], ["svétao", "hell"], ["tíh", "ruhig"], ["próstran", "geräumig"], ["vlážan", "feucht"], ["búđ", "Schimmel"], ["oštéćenje", "Schaden"],
        ["energétski sertifikát", "Energieausweis"], ["párking mésto", "Stellplatz"], ["óstava", "Abstellraum"]
      ]},
      { title: "Kaufen, Mieten & Verträge", words: [
        ["kúpoprodája", "Kauf und Verkauf"], ["pródaja", "Verkauf"], ["izdávanje", "Vermietung"], ["iznájmiti", "mieten / vermieten"], ["izdáti", "vermieten"], ["kírija", "Miete"], ["zákup", "Pacht / Miete"],
        ["zákupac", "Mieter / Pächter"], ["zakupodávac", "Vermieter"], ["stánar", "Mieter"], ["vlásnik", "Eigentümer"], ["kúpac", "Käufer"], ["ugovór", "Vertrag"], ["ugovór o zákupu", "Mietvertrag"],
        ["ugovór o prodáji", "Kaufvertrag"], ["depózit", "Kaution"], ["ávans", "Anzahlung"], ["predúgovor", "Vorvertrag"], ["nótar", "Notar"], ["óvera", "Beglaubigung"], ["zemljíšna knjíga", "Grundbuch"],
        ["katástar", "Kataster"], ["vlasníštvo", "Eigentum"], ["hipóteka", "Hypothek"], ["provízija", "Provision"], 
      ]},
      { title: "Finanzierung & Kosten", words: [
        ["céna po kvadrátu", "Preis pro Quadratmeter"], ["pregovárati", "verhandeln"], ["pónuda", "Angebot"], ["tráženje", "Nachfrage"], ["stámbeni krédit", "Wohnkredit"], ["kamáta", "Zinsen"], ["ráta", "Rate"],
        ["učéšće", "Eigenmittel"], ["búdžet", "Budget"], ["procéna", "Schätzung"], ["mésečno", "monatlich"], ["godíšnje", "jährlich"], ["úkupno", "insgesamt"], ["uključéno", "inklusive"],
        ["nije uključéno", "nicht inbegriffen"], ["subvéncija", "Förderung"], ["isplátiti se", "sich lohnen"], ["investícija", "Investition"], ["príhod", "Einnahmen"], ["ráshod", "Ausgaben"],
        ["pórez na prénos", "Grunderwerbsteuer"], ["zakášnjela ráta", "Zahlungsverzug"], ["ótplata", "Rückzahlung"], ["zálog", "Pfand"], ["jémstvo", "Bürgschaft"]
      ]},
      { title: "Besichtigung & Maklergespräch", words: [
        ["razglédanje", "Besichtigung"], ["ágent", "Makler"], ["agéncija", "Agentur"], ["pósrednik", "Vermittler"], ["óglas", "Inserat"], ["fotográfije", "Fotos"], ["ósnova", "Grundriss"], ["zainteresován", "interessiert"],
        ["dógovor", "Vereinbarung"], ["dogovóriti", "vereinbaren"], ["pogledáti", "ansehen"], ["razmísliti", "überlegen"], ["odlúčiti", "entscheiden"], ["odgovára mi", "es passt mir"],
        ["ne odgovára mi", "es passt mir nicht"], ["svíđa mi se", "es gefällt mir"], ["šta míslite", "was meinen Sie"], ["izvólite unútra", "bitte kommen Sie herein"], ["mógu li da vídim", "kann ich sehen"],
        ["evo kljúča", "hier ist der Schlüssel"], ["pratíte me", "folgen Sie mir"], ["pazíte na stépenik", "Vorsicht, Stufe"], ["óvo je dnévna sóba", "das ist das Wohnzimmer"], ["kóliko je kírija", "wie hoch ist die Miete"], ["ima li lífta", "gibt es einen Lift"]
      ]}
    ],
    sentences: [
      ["Imám stán na pródaju.", "Ich habe eine Wohnung zum Verkauf."],
      ["Stán ima tri sóbe, kúhinju i kupátilo.", "Die Wohnung hat drei Zimmer, eine Küche und ein Bad."],
      ["Stán je svétao i tíh.", "Die Wohnung ist hell und ruhig."],
      ["Kóliko ima kvadráta?", "Wie viele Quadratmeter hat sie?"],
      ["Ima li bálkon?", "Gibt es einen Balkon?"],
      ["Kóliko je kírija mésečno?", "Wie hoch ist die Miete monatlich?"],
      ["Kóliko su rézije?", "Wie hoch sind die Betriebskosten?"],
      ["Móžemo li da zakážemo razglédanje?", "Können wir eine Besichtigung vereinbaren?"],
      ["Stán je renóviran i úseljiv.", "Die Wohnung ist renoviert und bezugsfertig."],
      ["Imámo i párking mésto.", "Wir haben auch einen Stellplatz."],
      ["Kóliko je depózit?", "Wie hoch ist die Kaution?"],
      ["Trébam stán blízu céntra.", "Ich brauche eine Wohnung in der Nähe des Zentrums."],
      ["Gde je lokácija?", "Wo ist die Lage?"],
      ["Cena je dógovorna.", "Der Preis ist verhandelbar."],
      ["Mólim vas, pošáljite mi ósnovu stána.", "Bitte schicken Sie mir den Grundriss der Wohnung."]
    ],
    dialogs: [
      { title: "Besichtigung", lines: [
        ["Agent", "Dóbar dan! Dobrodóšli. Evo, óvo je stán.", "Guten Tag! Willkommen. Hier ist die Wohnung."],
        ["Kupac", "Hvála. Stán je vrlo svétao!", "Danke. Die Wohnung ist sehr hell!"],
        ["Agent", "Da, ima tri sóbe, kúhinju i bálkon.", "Ja, sie hat drei Zimmer, eine Küche und einen Balkon."],
        ["Kupac", "Kóliko je kírija?", "Wie hoch ist die Miete?"],
        ["Agent", "Kírija je pétsto évra mésečno.", "Die Miete beträgt fünfhundert Euro monatlich."],
        ["Kupac", "Jesu li rézije uključéne?", "Sind die Betriebskosten inbegriffen?"],
        ["Agent", "Ne, rézije nísu uključéne.", "Nein, die Betriebskosten sind nicht inbegriffen."],
        ["Kupac", "Dóbro. Mógu li da vídim kupátilo?", "Gut. Kann ich das Bad sehen?"]
      ]},
      { title: "Beim Maklerbüro", lines: [
        ["Kupac", "Dóbar dan. Trážim dvosóban stán za kúpovinu.", "Guten Tag. Ich suche eine Zweizimmerwohnung zum Kauf."],
        ["Agent", "Dóbar dan. Kóliki je váš búdžet?", "Guten Tag. Wie hoch ist Ihr Budget?"],
        ["Kupac", "Oko stó pedéset híljada évra.", "Rund hundertfünfzigtausend Euro."],
        ["Agent", "Imámo nekóliko lépih stánova u Béogradu.", "Wir haben einige schöne Wohnungen in Belgrad."],
        ["Kupac", "Mógu li da ih vídim sútra?", "Kann ich sie morgen sehen?"],
        ["Agent", "Náravno. Zakazaću términ za dvánaest sáti.", "Natürlich. Ich vereinbare einen Termin für zwölf Uhr."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 12
  {
    id: 12, part: "Unterwegs",
    title: "Reisen & Verkehr",
    goal: "Verkehrsmittel, Bahnhof und Flughafen, Auto und Straße, Fahrkarten, Gepäck und Reiseverben.",
    grammar: {
      title: "Wohin? Wo? Womit?",
      text: [
        "Wohin: u/na + Akkusativ: Idem u Beč, idem na aerodrom. Wo: u/na + Lokativ: Živim u Beču, jesam na aerodromu.",
        "Womit fährt man: Instrumental ohne Präposition: autobusom, vozom, avionom, taksijem, biciklom. Putujem vozom. Idem autobusom.",
        "Fahrkarte: karta za Beograd (nach Belgrad), povratna karta (Retourkarte), karta u jednom pravcu (einfache Fahrt)."
      ]
    },
    groups: [
      { title: "Verkehrsmittel", words: [
        ["vóz", "Zug"], ["áutobus", "Bus"], ["trámvaj", "Straßenbahn"], ["trolejbús", "Obus"], ["métro", "U-Bahn"], ["táksi", "Taxi"], ["automóbil", "Auto"], ["kóla", "Auto (Mehrzahl)"],
        ["bicíkl", "Fahrrad"], ["mótor", "Motorrad"], ["kámion", "Lastwagen"], ["bród", "Schiff"], ["čámac", "Boot"], ["avíon", "Flugzeug"], ["helikópter", "Hubschrauber"], ["vózač", "Fahrer"],
        ["kondúkter", "Schaffner"], ["pútnik", "Reisender"], ["jávni prévoz", "öffentlicher Verkehr"], ["saobraćáj", "Verkehr"], ["línija", "Linie"], ["stánica", "Haltestelle"],
        ["áutobuska stánica", "Busbahnhof"], ["želéznička stánica", "Bahnhof"], ["táksi stájalište", "Taxistandplatz"]
      ]},
      { title: "Bahnhof & Flughafen", words: [
        ["želéznica", "Eisenbahn"], ["perón", "Bahnsteig"], ["kolosék", "Gleis"], ["vózni réd", "Fahrplan"], ["pólazak", "Abfahrt"], ["dólazak", "Ankunft"], ["kášnjenje", "Verspätung"],
        ["prestúpanje", "Umsteigen"], ["diréktan", "direkt"], ["áerodrom", "Flughafen"], ["términal", "Terminal"], ["lét", "Flug"], ["ukrcávanje", "Einsteigen"], ["slétanje", "Landung"],
        ["poletánje", "Start"], ["cárina", "Zoll"], ["gránica", "Grenze"], ["víza", "Visum"], ["pregléd prtljaga", "Gepäckkontrolle"], ["pŕtljag", "Gepäck"], ["kófer", "Koffer"],
        ["rúčni pŕtljag", "Handgepäck"], ["pútna tórba", "Reisetasche"], ["ránac", "Rucksack"], ["pútna isprava", "Reisedokument"]
      ]},
      { title: "Auto & Straße", words: [
        ["górivo", "Treibstoff"], ["benzín", "Benzin"], ["dízel", "Diesel"], ["púmpa", "Tankstelle"], ["gúma", "Reifen"], ["kóčnice", "Bremsen"], ["vólan", "Lenkrad"], ["pójas", "Sicherheitsgurt"],
        ["fárovi", "Scheinwerfer"], ["registárska tablica", "Kennzeichen"], ["vózačka dozvóla", "Führerschein"], ["saobraćájna nesréća", "Verkehrsunfall"], ["kázna", "Strafe"], ["parkírati", "parken"],
        ["párking", "Parkplatz"], ["áutoput", "Autobahn"], ["putarína", "Maut"], ["raskŕsnica", "Kreuzung"], ["semáfor", "Ampel"], ["krúžni tók", "Kreisverkehr"], ["trotóar", "Gehsteig"],
        ["péšak", "Fußgänger"], ["prélaz", "Übergang"], ["túnel", "Tunnel"], ["gúžva", "Stau"], ["bŕzina", "Geschwindigkeit"], ["ograničénje", "Beschränkung"]
      ]},
      { title: "Fahrkarten, Reservierung & Auskunft", words: [
        ["kárta", "Fahrkarte"], ["póvratna kárta", "Retourkarte"], ["u jédnom právcu", "einfache Fahrt"], ["mésečna kárta", "Monatskarte"], ["rezervácija", "Reservierung"], ["mésto", "Platz / Ort"],
        ["kúpe", "Abteil"], ["spávaća kóla", "Schlafwagen"], ["vagón", "Waggon"], ["lokomotíva", "Lokomotive"], ["kontróla", "Kontrolle"], ["kontrólor", "Kontrollor"], ["informácije", "Auskunft"],
        ["šálter", "Schalter"], ["apárat za kárte", "Fahrkartenautomat"], ["putóvanje", "Reise"], ["túrista", "Tourist"], ["turístička agéncija", "Reisebüro"], ["plán putóvanja", "Reiseplan"], ["rúta", "Route"],
        ["pópust za déčje", "Kinderermäßigung"], ["mládi", "Jugendliche"], ["stárije osóbe", "ältere Personen"], ["céna kárte", "Fahrpreis"], ["nóvčana kázna", "Geldstrafe"]
      ]},
      { title: "Reisen: Verben & Wendungen", words: [
        ["pútovati", "reisen"], ["íći", "gehen"], ["dóći", "kommen"], ["stíći", "ankommen"], ["ótići", "weggehen"], ["vrátiti se", "zurückkehren"], ["čékati", "warten"], ["pítati", "fragen"],
        ["izgúbiti se", "sich verirren"], ["úkrcati se", "einsteigen"], ["síći", "aussteigen"], ["préći", "hinübergehen"], ["vóziti", "fahren"], ["státi", "stehen bleiben"], ["zaustáviti", "anhalten"],
        ["própustiti", "verpassen"], ["óstati", "bleiben"], ["presédati", "umsteigen"], ["skrénuti", "abbiegen"], ["púna kárta", "volle Fahrkarte"], 
        ["do vidjénja", "auf Wiedersehen"], ["dóbro dóšli", "willkommen"], ["kóliko traje", "wie lange dauert es"]
      ]}
    ],
    sentences: [
      ["Gde je stánica?", "Wo ist die Haltestelle?"],
      ["Jédna kárta za Béograd, mólim.", "Eine Fahrkarte nach Belgrad, bitte."],
      ["Kada pólazi vóz za Nóvi Sad?", "Wann fährt der Zug nach Novi Sad ab?"],
      ["Kóliko kóšta póvratna kárta?", "Was kostet die Retourkarte?"],
      ["Gde je áerodrom?", "Wo ist der Flughafen?"],
      ["Mój vóz kásni dvádeset mínuta.", "Mein Zug hat zwanzig Minuten Verspätung."],
      ["Da li je to diréktan vóz?", "Ist das ein direkter Zug?"],
      ["Mógu li da úzmem rúčni pŕtljag?", "Kann ich das Handgepäck mitnehmen?"],
      ["Putújem avíonom, a ne vózom.", "Ich reise mit dem Flugzeug, nicht mit dem Zug."],
      ["Gde mógu da parkíram?", "Wo kann ich parken?"],
      ["Trébam benzín.", "Ich brauche Benzin."],
      ["Izgúbio sam pásoš.", "Ich habe meinen Pass verloren."],
      ["Prvi pút putújem u Sŕbiju.", "Ich reise zum ersten Mal nach Serbien."],
      ["Kóliko traje putóvanje?", "Wie lange dauert die Reise?"],
      ["Sréćan pút i dóbro dóšli!", "Gute Reise und willkommen!"]
    ],
    dialogs: [
      { title: "Am Bahnhof", lines: [
        ["Putnik", "Dóbar dan. Jédna kárta za Béograd, mólim.", "Guten Tag. Eine Fahrkarte nach Belgrad, bitte."],
        ["Službenik", "Kada putújete?", "Wann reisen Sie?"],
        ["Putnik", "Sútra ujútru.", "Morgen früh."],
        ["Službenik", "Vóz pólazi u ósam sáti sa peróna tri.", "Der Zug fährt um acht Uhr von Bahnsteig drei ab."],
        ["Putnik", "Kóliko kóšta?", "Was kostet es?"],
        ["Službenik", "Dvádeset évra.", "Zwanzig Euro."],
        ["Putnik", "Hvála. Ima li kásnjenja?", "Danke. Gibt es Verspätung?"],
        ["Službenik", "Ne, vóz je na vréme.", "Nein, der Zug ist pünktlich."]
      ]},
      { title: "Am Flughafen", lines: [
        ["Službenik", "Pásoš, mólim.", "Reisepass, bitte."],
        ["Putnik", "Izvólite.", "Bitte sehr."],
        ["Službenik", "Imáte li pŕtljag za prédaju?", "Haben Sie Gepäck zum Aufgeben?"],
        ["Putnik", "Da, jédan kófer.", "Ja, einen Koffer."],
        ["Službenik", "Izvólite vášu ukrcávanje kártu. Izlaz je B pét.", "Bitte, Ihre Bordkarte. Der Ausgang ist B fünf."],
        ["Putnik", "Hvála lépo.", "Vielen Dank."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 13
  {
    id: 13, part: "Unterwegs",
    title: "Hotel, Urlaub & Sehenswürdigkeiten",
    goal: "Unterkunft buchen, Urlaub am Meer und in den Bergen, Sehenswürdigkeiten, Service und Beschwerden.",
    grammar: {
      title: "Höflich bitten und reservieren",
      text: [
        "Bitten: Želeo bih sobu (ich hätte gern ein Zimmer, Mann) – Želela bih sobu (Frau). Möglich ist auch: Treba mi soba za dvoje.",
        "Reservierung: Imam rezervaciju na ime Windisch. Ima li slobodnih soba? Koliko košta noćenje? Je li doručak uključen?",
        "Aufforderung (Sie): Izvolite, uđite. Sačekajte, molim vas. Potpišite ovde. Du: Uđi, sačekaj, potpiši."
      ]
    },
    groups: [
      { title: "Unterkunft", words: [
        ["hótel", "Hotel"], ["hóstel", "Hostel"], ["pánsion", "Pension"], ["apártman", "Apartment"], ["kámp", "Campingplatz"], ["jednokrévetna sóba", "Einzelzimmer"], ["dvokrévetna sóba", "Doppelzimmer"],
        ["sóba sa dóručkom", "Zimmer mit Frühstück"], ["recépcija", "Rezeption"], ["recépcioner", "Rezeptionist"], ["séf", "Safe"], ["postéljina", "Bettwäsche"], ["polupánsion", "Halbpension"],
        ["púni pánsion", "Vollpension"], ["lózinka", "Passwort"], ["pógled na móre", "Meerblick"], ["noćénje", "Übernachtung"], ["príjava", "Anmeldung"], ["ódjava", "Abmeldung"],
        ["kárta za sóbu", "Zimmerkarte"], ["hótelska sóba", "Hotelzimmer"], ["dóručak je uključen", "Frühstück inbegriffen"], ["bézplatni internét", "kostenloses Internet"],
        ["parking za góste", "Parkplatz für Gäste"], ["sobárica", "Zimmermädchen"]
      ]},
      { title: "Meer, Berge & Urlaub", words: [
        ["móre", "Meer"], ["pláža", "Strand"], ["tálas", "Welle"], ["kúpanje", "Baden"], ["kúpaći kóstim", "Badeanzug"], ["kréma za sunčánje", "Sonnencreme"], ["sénka", "Schatten"], ["súncobran", "Sonnenschirm"],
        ["léžaljka", "Liegestuhl"], ["óstrvo", "Insel"], ["óbala", "Küste"], ["záliv", "Bucht"], ["jézero", "See"], ["réka", "Fluss"], ["planína", "Berg"], ["vŕh", "Gipfel"], ["stáza", "Weg / Pfad"],
        ["šétnja", "Spaziergang"], ["ízlet", "Ausflug"], ["létovanje", "Sommerurlaub"], ["zímovanje", "Winterurlaub"], ["spúst", "Seilbahn"], ["skíjaška stáza", "Skipiste"], ["rúksak", "Rucksack"], ["planínska kúća", "Berghütte"]
      ]},
      { title: "Sehenswürdigkeiten & Kultur", words: [
        ["znaménitost", "Sehenswürdigkeit"], ["spómenik", "Denkmal"], ["múzej", "Museum"], ["galérija", "Galerie"], ["cŕkva", "Kirche"], ["manástir", "Kloster"], ["tvŕđava", "Festung"], ["dvórac", "Schloss"],
        ["kúla", "Turm"], ["ístorija", "Geschichte"], ["kultúra", "Kultur"], ["úmetnost", "Kunst"], ["ízložba", "Ausstellung"], ["kóncert", "Konzert"], ["úlaznica", "Eintrittskarte"], ["vódič", "Reiseführer"],
        ["razglédnica", "Ansichtskarte"], ["suvénir", "Souvenir"], ["fotografísati", "fotografieren"], ["fotoaparát", "Fotoapparat"], ["slíkati", "fotografieren / malen"], ["mápa gráda", "Stadtplan"],
        ["turístička informácija", "Touristeninformation"], ["párk", "Park"], ["glávni trg", "Hauptplatz"]
      ]},
      { title: "Reservieren & Service", words: [
        ["rezervísati", "reservieren"], ["potvrdíti", "bestätigen"], ["promeníti", "ändern"], ["slóbodno", "frei"], ["záuzeto", "besetzt"], ["ima li slóbodnih sóba", "gibt es freie Zimmer"], ["céna po nóći", "Preis pro Nacht"],
        ["uključén", "inbegriffen"], ["dódatno", "zusätzlich"], ["boravíšna táksa", "Ortstaxe"], ["úsluga", "Service"], ["sóbna úsluga", "Zimmerservice"], ["čišćénje", "Reinigung"], ["búđenje", "Weckruf"],
        ["ódlazak", "Abreise"], ["čas odjáve", "Auschecken um"], ["kasna odjáva", "später Check-out"], ["čuvánje prtljaga", "Gepäckaufbewahrung"], ["prevoz do aerodróma", "Transfer zum Flughafen"],
        ["pútni vódič", "Reiseleiter"], ["rezervácija stóla", "Tischreservierung"], ["pregovárati o céni", "über den Preis verhandeln"], ["pópust za góste", "Rabatt für Gäste"],
        ["dóplata za sóbu", "Zuschlag fürs Zimmer"], ["avánsno plaćánje", "Vorauszahlung"]
      ]},
      { title: "Wünsche & Beschwerden", words: [
        ["žálba", "Beschwerde"], ["próblem", "Problem"], ["pŕljav", "schmutzig"], ["číst", "sauber"], ["hládan", "kalt"], ["ne rádi", "funktioniert nicht"], ["pólomljen", "kaputt"], ["tréba mi", "ich brauche"],
        ["dódatni péškir", "zusätzliches Handtuch"], ["drúga sóba", "anderes Zimmer"], ["zámena", "Wechsel / Umtausch"], ["pópravka", "Reparatur"], ["nadóknada", "Ersatz"], ["razočáran", "enttäuscht"],
        ["ljúbazno ósoblje", "freundliches Personal"], ["ósoblje", "Personal"], ["ménadžer", "Manager"], ["prepóruka", "Empfehlung"], ["preporúčiti", "empfehlen"], ["zadovóljstvo", "Zufriedenheit"],
        ["gostoprímstvo", "Gastfreundschaft"], ["hvála na gostoprímstvu", "danke für die Gastfreundschaft"], ["búčna sóba", "laute Zimmer"], ["néma tóple vóde", "kein warmes Wasser"], ["ugódan bóravak", "angenehmer Aufenthalt"]
      ]}
    ],
    sentences: [
      ["Imám rezervaciju na íme Mílić.", "Ich habe eine Reservierung auf den Namen Milić."],
      ["Ima li slóbodnih sóba?", "Gibt es freie Zimmer?"],
      ["Tréba mi sóba za dvóje na tri nóći.", "Ich brauche ein Zimmer für zwei Personen für drei Nächte."],
      ["Kóliko kóšta noćénje?", "Was kostet eine Übernachtung?"],
      ["Da li dóručak ulázi u cénu?", "Ist das Frühstück im Preis inbegriffen?"],
      ["U kóliko sáti je dóručak?", "Um wie viel Uhr ist das Frühstück?"],
      ["Sóba ima pógled na móre.", "Das Zimmer hat Meerblick."],
      ["Gde je pláža?", "Wo ist der Strand?"],
      ["Mógu li da ostávim pŕtljag do véčeri?", "Kann ich das Gepäck bis zum Abend lassen?"],
      ["Klíma u sóbi ne rádi.", "Die Klimaanlage im Zimmer funktioniert nicht."],
      ["Mólim vas, trébam dódatni péškir.", "Bitte, ich brauche ein zusätzliches Handtuch."],
      ["Kóliko kóšta úlaznica za múzej?", "Was kostet die Eintrittskarte fürs Museum?"],
      ["Mógu li da fotografíšem?", "Darf ich fotografieren?"],
      ["Mólim vas, pokážite mi na mápi.", "Zeigen Sie mir bitte auf dem Plan."],
      ["Hvála na gostoprímstvu!", "Danke für die Gastfreundschaft!"]
    ],
    dialogs: [
      { title: "An der Rezeption", lines: [
        ["Gost", "Dóbar dan. Imám rezervaciju na íme Mílić.", "Guten Tag. Ich habe eine Reservierung auf den Namen Milić."],
        ["Recepcioner", "Dóbar dan. Da, trí nóći, dvokrévetna sóba. Pásoš, mólim.", "Guten Tag. Ja, drei Nächte, Doppelzimmer. Reisepass, bitte."],
        ["Gost", "Izvólite. Da li dóručak ulázi u cénu?", "Bitte sehr. Ist das Frühstück im Preis inbegriffen?"],
        ["Recepcioner", "Da, dóručak je od sédam do déset.", "Ja, das Frühstück ist von sieben bis zehn Uhr."],
        ["Gost", "Odlično. Gde je lift?", "Ausgezeichnet. Wo ist der Lift?"],
        ["Recepcioner", "Lévo, pored recépcije. Váša sóba je na tréćem spratu.", "Links, neben der Rezeption. Ihr Zimmer ist im dritten Stock."],
        ["Gost", "Hvála lépo.", "Vielen Dank."]
      ]},
      { title: "Beschwerde im Zimmer", lines: [
        ["Gost", "Izvínite, imám próblem u sóbi.", "Entschuldigung, ich habe ein Problem im Zimmer."],
        ["Recepcioner", "Žáo mi je. Šta se desilo?", "Das tut mir leid. Was ist passiert?"],
        ["Gost", "Klíma ne rádi i nema tópie vóde.", "Die Klimaanlage funktioniert nicht und es gibt kein warmes Wasser."],
        ["Recepcioner", "Pošáljem májstora odmáh.", "Ich schicke sofort einen Handwerker."],
        ["Gost", "Hvála. Mógu li da dóbijem drúgu sóbu?", "Danke. Kann ich ein anderes Zimmer bekommen?"],
        ["Recepcioner", "Náravno, vídim šta imámo.", "Natürlich, ich sehe nach, was wir haben."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 14
  {
    id: 14, part: "Unterwegs",
    title: "Stadt & Orientierung",
    goal: "Gebäude und Orte, Behörden, Richtungen, Plätze und nach dem Weg fragen und antworten.",
    grammar: {
      title: "Richtungen und Orte",
      text: [
        "Richtungsangaben: Idite pravo. Skrenite levo/desno. Prva ulica levo, druga ulica desno. Na kraju ulice. Pored banke, ispred pošte, iza ugla.",
        "Präpositionen mit Genitiv: iz, od, do, bez, pored, ispred, iza, kod, blizu, oko, posle. Bei Orten: u + Lokativ (u gradu), na + Lokativ (na trgu).",
        "Fragen: Gde je…? (Wo ist…?) Kako da dođem do…? (Wie komme ich zu…?) Koliko je daleko? Da li je blizu? Koliko minuta pešice?"
      ]
    },
    groups: [
      { title: "Gebäude & Orte in der Stadt", words: [
        ["grád", "Stadt"], ["sélo", "Dorf"], ["céntar", "Zentrum"], ["tŕg", "Platz"], ["móst", "Brücke"], ["káfić", "Café"], ["póšta", "Post"], ["polícija", "Polizei"], ["vatrogásci", "Feuerwehr"],
        ["ópština", "Gemeinde"], ["skúpština", "Parlament"], ["súd", "Gericht"], ["bibliotéka", "Bibliothek"], ["tŕžnica", "Markthalle"], ["gróblje", "Friedhof"], ["stádion", "Stadion"], ["lúka", "Hafen"],
        ["fábrika", "Fabrik"], ["prédgrađe", "Vorort"], ["pešáčka zóna", "Fußgängerzone"], ["pódzemni prólaz", "Unterführung"], ["fontána", "Brunnen"], ["klúpa", "Bank (Sitzbank)"], ["grádska kúća", "Rathaus"],
        ["bóčna úlica", "Seitenstraße"], 
      ]},
      { title: "Behörden & Dienste", words: [
        ["úred", "Amt"], ["mátični úred", "Standesamt"], ["príjava prebivalíšta", "Meldezettel"], ["bóravak", "Aufenthalt"], ["dozvóla", "Genehmigung"], ["rádna dozvóla", "Arbeitsgenehmigung"],
        ["ambasáda", "Botschaft"], ["konzulát", "Konsulat"], ["prevodílac", "Übersetzer"], ["súdski túmač", "Gerichtsdolmetscher"], ["advokát", "Rechtsanwalt"], ["inspékcija", "Inspektion"],
        ["réd", "Reihe / Ordnung"], ["čekáti u rédu", "in der Reihe warten"], ["pešáčki prélaz", "Zebrastreifen"], ["prólaz", "Durchgang"], ["zahtév", "Antrag"], ["obavešténje", "Mitteilung"],
        ["óbrazac", "Formular"], ["kópija", "Kopie"], ["originál", "Original"], ["overíti", "beglaubigen"], ["slúžbeni", "amtlich"], ["radno vréme úreda", "Amtsstunden"], ["informacióni šálter", "Infoschalter"]
      ]},
      { title: "Richtungen & Lage", words: [
        ["lévo", "links"], ["désno", "rechts"], ["právo", "geradeaus"], ["názad", "zurück"], ["blízu", "nahe"], ["dáleko", "weit"], ["óvde", "hier"], ["támo", "dort"], ["góre", "oben"], ["dóle", "unten"],
        ["íznad", "oberhalb"], ["íspod", "unterhalb"], ["íspred", "vor"], ["íza", "hinter"], ["póred", "neben"], ["ízmeđu", "zwischen"], ["préko", "über / hinüber"], ["prékoputa", "gegenüber"],
        ["násuprot", "gegenüber von"], ["u blizíni", "in der Nähe"], ["na úglu", "an der Ecke"], ["úgao", "Ecke"], ["séver", "Norden"], ["júg", "Süden"], ["ístok", "Osten"], ["západ", "Westen"]
      ]},
      { title: "Straßen, Zeichen & Navigation", words: [
        ["bulevár", "Boulevard"], ["stájalište", "Haltestelle"], ["blók", "Häuserblock"], ["plán gráda", "Stadtplan"], ["navigácija", "Navigation"], ["znák", "Schild"], ["pútokaz", "Wegweiser"],
        ["zabránjen", "verboten"], ["dózvoljen", "erlaubt"], ["jednosméran", "Einbahn"], ["slépa úlica", "Sackgasse"], ["právac", "Richtung"], ["strána", "Seite"], ["sredína", "Mitte"], ["kráj", "Ende"],
        ["počétak", "Anfang"], ["únutra", "drinnen"], ["napólju", "draußen"], ["prvá úlica", "erste Straße"], ["drúga úlica", "zweite Straße"], ["tréća úlica", "dritte Straße"], ["ulaz u zgrádu", "Eingang ins Gebäude"],
        ["brój kúće", "Hausnummer"], ["opásnost na pútu", "Gefahr auf der Straße"], ["rádovi na pútu", "Bauarbeiten"]
      ]},
      { title: "Nach dem Weg fragen", words: [
        ["gdé je", "wo ist"], ["káko da dóđem do", "wie komme ich zu"], ["da li je dáleko", "ist es weit"], ["kóliko je dáleko", "wie weit ist es"], ["kóliko minúta", "wie viele Minuten"], ["pésice", "zu Fuß"],
        ["péške", "zu Fuß (Gen.)"], ["áutobusom", "mit dem Bus"], ["táksijem", "mit dem Taxi"], ["ídite právo", "gehen Sie geradeaus"], ["skrénite lévo", "biegen Sie links ab"], ["skrénite désno", "biegen Sie rechts ab"],
        ["na kráju úlice", "am Ende der Straße"], ["pored bánke", "neben der Bank"], ["íspred pošte", "vor der Post"], ["íza úgla", "hinter der Ecke"], ["pokážite mi na mápi", "zeigen Sie mir auf dem Plan"],
        ["izgúbio sam se", "ich habe mich verirrt"], ["trážim", "ich suche"], ["znáte li", "wissen Sie"], ["móžete li da mi pomógnete", "können Sie mir helfen"], ["nájbliža apotéka", "nächste Apotheke"],
        ["nájbliži bankomát", "nächster Bankomat"], ["hvála na pómoći", "danke für die Hilfe"], 
      ]}
    ],
    sentences: [
      ["Izvínite, gde je póšta?", "Entschuldigung, wo ist die Post?"],
      ["Káko da dóđem do céntra?", "Wie komme ich ins Zentrum?"],
      ["Ídite právo, pa skrénite lévo.", "Gehen Sie geradeaus, dann biegen Sie links ab."],
      ["Prva úlica désno, pa právo.", "Erste Straße rechts, dann geradeaus."],
      ["Banka je pored pošte.", "Die Bank ist neben der Post."],
      ["Da li je dáleko od óvde?", "Ist es weit von hier?"],
      ["Nije dáleko, pét mínuta pésice.", "Es ist nicht weit, fünf Minuten zu Fuß."],
      ["Kója je nájbliža stánica?", "Welche ist die nächste Haltestelle?"],
      ["Móžete li da mi pokážete na mápi?", "Können Sie es mir auf dem Plan zeigen?"],
      ["Izgúbio sam se. Trážim hótel.", "Ich habe mich verirrt. Ich suche das Hotel."],
      ["Stánica je prékoputa bánke.", "Die Haltestelle ist gegenüber der Bank."],
      ["Idite préko mósta.", "Gehen Sie über die Brücke."],
      ["Ulica je jednosmérna.", "Die Straße ist eine Einbahn."],
      ["Imáte li plán gráda?", "Haben Sie einen Stadtplan?"],
      ["Hvála na pómoći, doviđénja!", "Danke für die Hilfe, auf Wiedersehen!"]
    ],
    dialogs: [
      { title: "Nach dem Weg fragen", lines: [
        ["Turista", "Izvínite, gde je glávna pošta?", "Entschuldigung, wo ist die Hauptpost?"],
        ["Prolaznik", "Ídite právo do raskŕsnice, pa skrénite lévo.", "Gehen Sie geradeaus bis zur Kreuzung, dann biegen Sie links ab."],
        ["Turista", "Da li je dáleko?", "Ist es weit?"],
        ["Prolaznik", "Nije. Pét mínuta pésice.", "Nein. Fünf Minuten zu Fuß."],
        ["Turista", "Hvála lépo!", "Vielen Dank!"],
        ["Prolaznik", "Nema na čému. Sréćno!", "Gern geschehen. Viel Glück!"]
      ]},
      { title: "Auf dem Amt", lines: [
        ["Gost", "Dóbar dan. Trébam príjavu prebivalíšta.", "Guten Tag. Ich brauche eine Meldezettel-Anmeldung."],
        ["Službenik", "Dóbar dan. Imáte li líčnu kártu?", "Guten Tag. Haben Sie Ihren Ausweis?"],
        ["Gost", "Evo je. I ugovór o zákupu stána.", "Hier ist er. Und den Mietvertrag für die Wohnung."],
        ["Službenik", "Hvála. Popúnite óvaj óbrazac.", "Danke. Füllen Sie dieses Formular aus."],
        ["Gost", "Mógu li da dóbijem kópiju?", "Kann ich eine Kopie bekommen?"],
        ["Službenik", "Náravno, sáčekajte, mólim vas.", "Natürlich, bitte warten Sie."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 15
  {
    id: 15, part: "Unterwegs",
    title: "Natur, Wetter & Tiere",
    goal: "Wetter, Landschaft, Tiere, Pflanzen und Umwelt: das Vokabular für Gespräche im Freien.",
    grammar: {
      title: "Wetter und Naturbeschreibung",
      text: [
        "Wetter ohne Subjekt: Pada kiša. Pada sneg. Duva vetar. Sija sunce. Hladno je. Toplo je. Oblačno je. Lepo je vreme.",
        "Frage: Kakvo je vreme danas? – Danas je sunčano i toplo. Temperatur: Dvadeset stepeni (20 Grad).",
        "Vergleich: toplo – toplije (wärmer) – najtoplije (am wärmsten); hladno – hladnije; lepo – lepše."
      ]
    },
    groups: [
      { title: "Wetter", words: [
        ["vréme", "Wetter / Zeit"], ["súnce", "Sonne"], ["óblak", "Wolke"], ["kíša", "Regen"], ["snég", "Schnee"], ["vétar", "Wind"], ["olúja", "Sturm"], ["gróm", "Donner"], ["múnja", "Blitz"],
        ["mágla", "Nebel"], ["mráz", "Frost"], ["túča", "Hagel"], ["dúga", "Regenbogen"], ["tóplo", "warm"], ["hládno", "kalt"], ["vrúće", "heiß"], ["svéže", "frisch"], ["vlážno", "feucht"],
        ["súvo", "trocken"], ["óblačno", "bewölkt"], ["súnčano", "sonnig"], ["kíšovito", "regnerisch"], ["vétrovito", "windig"], ["prognóza", "Vorhersage"], ["stépen", "Grad"]
      ]},
      { title: "Landschaft & Natur", words: [
        ["príroda", "Natur"], ["bŕdo", "Hügel"], ["dolína", "Tal"], ["šúma", "Wald"], ["pólje", "Feld"], ["lívada", "Wiese"], ["pótok", "Bach"], ["vodopád", "Wasserfall"], ["ízvor", "Quelle"],
        ["péćina", "Höhle"], ["sténa", "Fels"], ["kámen", "Stein"], ["tló", "Boden"], ["bláto", "Schlamm"], ["tráva", "Gras"], ["cvét", "Blume"], ["stáblo", "Baum"], ["líst", "Blatt"], ["grána", "Ast"],
        ["kóren", "Wurzel"], ["nácionalni párk", "Nationalpark"], ["péjzaž", "Landschaft"], ["vídik", "Aussichtspunkt"], ["zvézda", "Stern"], ["nébo", "Himmel"], 
      ]},
      { title: "Tiere", words: [
        ["životínja", "Tier"], ["pás", "Hund"], ["máčka", "Katze"], ["kónj", "Pferd"], ["kráva", "Kuh"], ["svínja", "Schwein"], ["óvca", "Schaf"], ["kóza", "Ziege"], ["kókoška", "Henne"], ["pétao", "Hahn"],
        ["pátka", "Ente"], ["gúska", "Gans"], ["zéc", "Hase"], ["míš", "Maus"], ["ptíca", "Vogel"], ["zmíja", "Schlange"], ["médved", "Bär"], ["vúk", "Wolf"], ["lísica", "Fuchs"], ["jélen", "Hirsch"],
        ["sŕna", "Reh"], ["pčéla", "Biene"], ["léptir", "Schmetterling"], ["múva", "Fliege"], ["komárac", "Gelse"], 
      ]},
      { title: "Pflanzen, Garten & Landwirtschaft", words: [
        ["bíljka", "Pflanze"], ["rúža", "Rose"], ["lála", "Tulpe"], ["žbún", "Strauch"], ["séme", "Samen"], ["séjati", "säen"], ["sáditi", "pflanzen"], ["zalíti", "gießen"], ["kósiti", "mähen"],
        ["baštóvan", "Gärtner"], ["póvrtnjak", "Gemüsegarten"], ["vóćnjak", "Obstgarten"], ["vinográd", "Weingarten"], ["njíva", "Acker"], ["plástenik", "Gewächshaus"], ["đúbrivo", "Dünger"],
        ["žétva", "Ernte"], ["bérba", "Obstlese"], ["zrélo", "reif"], ["séoski", "ländlich"], ["poljoprívreda", "Landwirtschaft"], ["fárma", "Farm"], ["stádo", "Herde"], ["pášnjak", "Weide"], ["štála", "Stall"]
      ]},
      { title: "Umwelt & Aktivitäten im Freien", words: [
        ["žívotna sredína", "Umwelt"], ["zagađénje", "Verschmutzung"], ["ótpad", "Müll"], ["reciklírati", "recyceln"], ["enérgija", "Energie"], ["sólarni panéli", "Solarpaneele"], ["vetrénjača", "Windrad"],
        ["klímatske prómene", "Klimawandel"], ["očúvati", "schützen"], ["záštita", "Schutz"], ["ekólogija", "Ökologie"], ["orgánski", "biologisch"], ["čist váduh", "saubere Luft"], ["váduh", "Luft"],
        ["póžar", "Brand"], ["póplava", "Überschwemmung"], ["súša", "Dürre"], ["zemljotrés", "Erdbeben"], ["lavína", "Lawine"], ["klízanje", "Eislaufen"], ["sánkanje", "Rodeln"], ["pécanje", "Angeln"],
        ["kámpovanje", "Zelten"], ["róštilj", "Grill"], ["píknik", "Picknick"], 
      ]}
    ],
    sentences: [
      ["Kákvo je vréme dánas?", "Wie ist das Wetter heute?"],
      ["Dánas je sunčano i tóplo.", "Heute ist es sonnig und warm."],
      ["Páda kíša.", "Es regnet."],
      ["Páda snég.", "Es schneit."],
      ["Dúva jáki vétar.", "Es weht ein starker Wind."],
      ["Hládno je, obúci jáknu.", "Es ist kalt, zieh die Jacke an."],
      ["Sútra će bíti lépo vréme.", "Morgen wird das Wetter schön sein."],
      ["Temperatúra je dvádeset stépeni.", "Die Temperatur beträgt zwanzig Grad."],
      ["Vólim da šétam po šúmi.", "Ich gehe gern im Wald spazieren."],
      ["Mój pás vólí da trči po livádi.", "Mein Hund läuft gern über die Wiese."],
      ["Na plánini je snég.", "Auf dem Berg liegt Schnee."],
      ["U bášti imámo rúže i lále.", "Im Garten haben wir Rosen und Tulpen."],
      ["Príroda je ovde prelépa.", "Die Natur ist hier wunderschön."],
      ["Treba da čúvamo životnu sredínu.", "Wir müssen die Umwelt schützen."],
      ["Idémo na píknik ako ne bude kíše.", "Wir machen ein Picknick, wenn es nicht regnet."]
    ],
    dialogs: [
      { title: "Über das Wetter", lines: [
        ["Ana", "Kákvo je vréme dánas?", "Wie ist das Wetter heute?"],
        ["Marko", "Lépo je. Sunčano i tóplo, dvádeset stépeni.", "Schön. Sonnig und warm, zwanzig Grad."],
        ["Ana", "A sútra?", "Und morgen?"],
        ["Marko", "Prognóza kaže da će bíti kíša.", "Die Vorhersage sagt, dass es regnen wird."],
        ["Ana", "Šteta! Hteli smo na izlet.", "Schade! Wir wollten einen Ausflug machen."],
        ["Marko", "Možda u sredu, kad bude lépo.", "Vielleicht am Mittwoch, wenn es schön ist."]
      ]},
      { title: "Ein Ausflug in die Natur", lines: [
        ["Jelena", "Vólim da šétam po plánini.", "Ich gehe gern in den Bergen spazieren."],
        ["Stefan", "I ja. Tamo je príroda prelépa.", "Ich auch. Dort ist die Natur wunderschön."],
        ["Jelena", "Vídela sam jelene i zečeve.", "Ich habe Hirsche und Hasen gesehen."],
        ["Stefan", "Kakó lépo! Idémo u subótu?", "Wie schön! Gehen wir am Samstag?"],
        ["Jelena", "Dóbro, ali ponésimo jáknu i vódu.", "Gut, aber nehmen wir eine Jacke und Wasser mit."],
        ["Stefan", "Naravno. Vídimo se u osam ujutru.", "Natürlich. Wir sehen uns um acht Uhr früh."]
      ]}
    ]
  }
);
