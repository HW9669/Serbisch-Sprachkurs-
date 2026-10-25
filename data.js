// Serbisch für Anfänger – 10 Lektionen, 500 Vokabeln, 100 Sätze
// Lateinische Schrift, ekavischer Standard (Serbien).
// Betonung: Der betonte Vokal trägt einen Akzent (á é í ó ú, ŕ für silbisches r).
// app.js erzeugt daraus die normale Schreibweise (für Anzeige und Ton) und die
// deutsche Lautschrift (betonte Silbe in GROSSBUCHSTABEN).
// Format: Wörter und Sätze = [Serbisch, Deutsch]; Dialog = [Sprecher, Serbisch, Deutsch].

const LESSONS = [
  // ------------------------------------------------------------------ 1
  {
    id: 1,
    title: "Begrüßung & Vorstellung",
    goal: "Grüßen, dich vorstellen, nach Namen, Herkunft und Befinden fragen.",
    dialog: [
      ["Ana", "Dóbar dan! Káko se zóveš?", "Guten Tag! Wie heißt du?"],
      ["Marko", "Zóvem se Márko. A ti?", "Ich heiße Marko. Und du?"],
      ["Ana", "Zóvem se Ána. Drágo mi je.", "Ich heiße Ana. Freut mich."],
      ["Marko", "Drágo mi je. Ódakle si?", "Freut mich auch. Woher kommst du?"],
      ["Ana", "Ja sam iz Béča. A ti?", "Ich bin aus Wien. Und du?"],
      ["Marko", "Ja sam iz Béograda.", "Ich bin aus Belgrad."]
    ],
    grammar: {
      title: "Du oder Sie? Und das Verb „biti“ (sein)",
      text: [
        "ti = du (Freunde, Familie, Kinder). vi = Sie (höflich) und ihr. Mit „vi“ wird auch eine einzelne Person gesiezt: Kako ste? (Sie) – Kako si? (du).",
        "Das Verb „biti“ (sein): ja sam · ti si · on/ona je · mi smo · vi ste · oni su.",
        "Das Pronomen wird oft weggelassen: Zovem se Herbert (statt „Ja se zovem Herbert“)."
      ]
    },
    words: [
      ["zdrávo", "hallo"], ["dóbar dan", "guten Tag"], ["dóbro jútro", "guten Morgen"], ["dóbro véče", "guten Abend"],
      ["láku nóć", "gute Nacht"], ["doviđénja", "auf Wiedersehen"], ["ćáo", "servus / tschüss"], ["vídimo se", "bis bald"],
      ["hvála", "danke"], ["mólim", "bitte"], ["izvínite", "Entschuldigung (Sie)"], ["oprósti", "Entschuldige (du)"],
      ["dá", "ja"], ["né", "nein"], ["já", "ich"], ["tí", "du"], ["ón", "er"], ["óna", "sie (Einzahl)"],
      ["mí", "wir"], ["ví", "ihr / Sie"], ["íme", "Vorname"], ["prézime", "Nachname"], ["káko", "wie"], ["kó", "wer"],
      ["štá", "was"], ["gdé", "wo"], ["ódakle", "woher"], ["zášto", "warum"], ["káda", "wann"], ["zóvem se", "ich heiße"],
      ["sám", "ich bin"], ["sí", "du bist"], ["jé", "er / sie / es ist"], ["smó", "wir sind"], ["sté", "ihr seid / Sie sind"],
      ["sú", "sie sind"], ["dóbro", "gut"], ["lóše", "schlecht"], ["ódlično", "ausgezeichnet"], ["drágo mi je", "freut mich"],
      ["Béč", "Wien"], ["Béograd", "Belgrad"], ["Áustrija", "Österreich"], ["Sŕbija", "Serbien"], ["némački", "Deutsch"],
      ["sŕpski", "Serbisch"], ["éngleski", "Englisch"], ["govóriti", "sprechen"], ["razúmeti", "verstehen"], ["živéli", "Prost! / Zum Wohl!"]
    ],
    sentences: [
      ["Káko se zóveš?", "Wie heißt du?"],
      ["Káko se zóvete?", "Wie heißen Sie?"],
      ["Zóvem se Hérbert.", "Ich heiße Herbert."],
      ["Drágo mi je.", "Freut mich."],
      ["Ódakle si?", "Woher kommst du?"],
      ["Ja sam iz Béča.", "Ich bin aus Wien."],
      ["Govóriš li némački?", "Sprichst du Deutsch?"],
      ["Káko si?", "Wie geht's dir?"],
      ["Dóbro sam, hvála. A ti?", "Mir geht's gut, danke. Und dir?"],
      ["Ne razúmem.", "Ich verstehe nicht."]
    ]
  },

  // ------------------------------------------------------------------ 2
  {
    id: 2,
    title: "Zahlen, Zeit & Wochentage",
    goal: "Zahlen, Uhrzeit und Wochentage: Termine ausmachen.",
    dialog: [
      ["Kupac", "Dóbar dan! Imáte li vréme sútra?", "Guten Tag! Haben Sie morgen Zeit?"],
      ["Agent", "Dóbar dan! Sútra je útorak. Imám vréme u déset sáti.", "Guten Tag! Morgen ist Dienstag. Ich habe um zehn Uhr Zeit."],
      ["Kupac", "Ódlično. Vídimo se sútra u déset.", "Ausgezeichnet. Wir sehen uns morgen um zehn."],
      ["Agent", "Dóbro. Doviđénja!", "Gut. Auf Wiedersehen!"]
    ],
    grammar: {
      title: "Uhrzeit und Zahlen",
      text: [
        "Koliko je sati? – Pet je sati. Nach 2, 3, 4 heißt es „sata“ (dva sata, tri sata), ab 5 „sati“ (pet sati, deset sati).",
        "Wochentage schreibt man klein: ponedeljak, utorak, sreda … „u“ + Wochentag heißt „am“: u petak = am Freitag."
      ]
    },
    words: [
      ["núla", "null"], ["jédan", "eins"], ["dvá", "zwei"], ["trí", "drei"], ["četíri", "vier"], ["pét", "fünf"],
      ["šést", "sechs"], ["sédam", "sieben"], ["ósam", "acht"], ["dévet", "neun"], ["déset", "zehn"], ["jedánaest", "elf"],
      ["dvánaest", "zwölf"], ["dvádeset", "zwanzig"], ["trídeset", "dreißig"], ["pedéset", "fünfzig"], ["stó", "hundert"],
      ["híljada", "tausend"], ["dánas", "heute"], ["sútra", "morgen"], ["júče", "gestern"], ["sáda", "jetzt"],
      ["sát", "Stunde / Uhr"], ["mínut", "Minute"], ["dán", "Tag"], ["nedélja", "Sonntag / Woche"], ["mésec", "Monat"],
      ["gódina", "Jahr"], ["jútro", "Morgen"], ["véče", "Abend"], ["pódne", "Mittag"], ["nóć", "Nacht"], ["ponóć", "Mitternacht"],
      ["vréme", "Zeit / Wetter"], ["ráno", "früh"], ["kásno", "spät"], ["úvek", "immer"], ["níkad", "nie"],
      ["ponédeljak", "Montag"], ["útorak", "Dienstag"], ["sréda", "Mittwoch"], ["čétvrtak", "Donnerstag"], ["pétak", "Freitag"],
      ["súbota", "Samstag"], ["póla", "halb"], ["slédeći", "nächster"], ["próšli", "letzter / vergangener"],
      ["víkend", "Wochenende"], ["práznik", "Feiertag"], ["rođéndan", "Geburtstag"]
    ],
    sentences: [
      ["Kóliko je sáti?", "Wie spät ist es?"],
      ["Pet je sáti.", "Es ist fünf Uhr."],
      ["Dánas je ponédeljak.", "Heute ist Montag."],
      ["Sútra je útorak.", "Morgen ist Dienstag."],
      ["Vídimo se u pétak.", "Wir sehen uns am Freitag."],
      ["Sástanak je u déset sáti.", "Der Termin ist um zehn Uhr."],
      ["Imám vréme sútra.", "Ich habe morgen Zeit."],
      ["Kóliko imáte gódina?", "Wie alt sind Sie?"],
      ["Kada imáš rođéndan?", "Wann hast du Geburtstag?"],
      ["Dóbar víkend!", "Schönes Wochenende!"]
    ]
  },

  // ------------------------------------------------------------------ 3
  {
    id: 3,
    title: "Familie & Menschen",
    goal: "Über die Familie sprechen und Personen beschreiben.",
    dialog: [
      ["Ana", "Imáš li bráta ili séstru?", "Hast du einen Bruder oder eine Schwester?"],
      ["Marko", "Imám séstru. Ona se zóve Mája.", "Ich habe eine Schwester. Sie heißt Maja."],
      ["Marko", "A ti? Imáš li bráta?", "Und du? Hast du einen Bruder?"],
      ["Ana", "Ne, némam bráta. Imám sámo séstru.", "Nein, ich habe keinen Bruder. Ich habe nur eine Schwester."],
      ["Marko", "A tvója pórodica? Živi li u Béču?", "Und deine Familie? Lebt sie in Wien?"],
      ["Ana", "Da, móji róditelji žíve u Béču.", "Ja, meine Eltern leben in Wien."]
    ],
    grammar: {
      title: "Mein, dein, unser – und „nicht haben“",
      text: [
        "mein: moj (männlich), moja (weiblich), moje (sächlich). So auch tvoj/tvoja/tvoje, naš/naša/naše, vaš/vaša/vaše. Beispiel: moj otac, moja majka, moje dete.",
        "ich habe = imam, ich habe nicht = nemam (ne + imam). Genauso: sam → nisam (ich bin nicht)."
      ]
    },
    words: [
      ["pórodica", "Familie"], ["májka", "Mutter"], ["ótac", "Vater"], ["máma", "Mama"], ["táta", "Papa"], ["róditelji", "Eltern"],
      ["sín", "Sohn"], ["ćérka", "Tochter"], ["brát", "Bruder"], ["séstra", "Schwester"], ["múž", "Ehemann"], ["žéna", "Frau / Ehefrau"],
      ["báka", "Oma"], ["déda", "Opa"], ["únuk", "Enkel"], ["únuka", "Enkelin"], ["tétka", "Tante"], ["újak", "Onkel (mütterlich)"],
      ["stríc", "Onkel (väterlich)"], ["róđak", "Cousin / Verwandter"], ["déte", "Kind"], ["déca", "Kinder"], ["béba", "Baby"],
      ["déčak", "Bub"], ["devójčica", "Mädchen"], ["múškarac", "Mann"], ["čóvek", "Mensch"], ["dévojka", "junge Frau / Freundin"],
      ["mómak", "junger Mann / Freund"], ["prijátelj", "Freund"], ["prijáteljica", "Freundin"], ["kómšija", "Nachbar"], ["góst", "Gast"],
      ["stár", "alt"], ["mlád", "jung"], ["véliki", "groß"], ["máli", "klein"], ["lép", "schön"], ["vísok", "hochgewachsen"],
      ["nízak", "klein gewachsen"], ["óženjen", "verheiratet (Mann)"], ["údata", "verheiratet (Frau)"], ["zájedno", "zusammen"],
      ["vóleti", "lieben / mögen"], ["ímati", "haben"], ["živéti", "leben / wohnen"], ["mój", "mein"], ["tvój", "dein"], ["náš", "unser"], ["váš", "euer / Ihr"]
    ],
    sentences: [
      ["Óvo je mója pórodica.", "Das ist meine Familie."],
      ["Óvo je mója žéna.", "Das ist meine Frau."],
      ["Óvo je mój múž.", "Das ist mein Mann."],
      ["Imám dvóje déce.", "Ich habe zwei Kinder."],
      ["Imám sína i ćérku.", "Ich habe einen Sohn und eine Tochter."],
      ["Mój ótac živi u Béogradu.", "Mein Vater lebt in Belgrad."],
      ["Imáš li bráta ili séstru?", "Hast du einen Bruder oder eine Schwester?"],
      ["Kóliko imáte déce?", "Wie viele Kinder haben Sie?"],
      ["Móji róditelji su dívni.", "Meine Eltern sind wunderbar."],
      ["Mója súpruga se zóve Mílena.", "Meine Frau heißt Milena."]
    ]
  },

  // ------------------------------------------------------------------ 4
  {
    id: 4,
    title: "Smalltalk: Wetter, Gefühle, Hobbys",
    goal: "Ein Gespräch beginnen: Wetter, Befinden und Freizeit.",
    dialog: [
      ["Agent", "Lépo vréme dánas, zar ne?", "Schönes Wetter heute, nicht wahr?"],
      ["Kupac", "Da, vrlo lépo. Nije hládno.", "Ja, sehr schön. Es ist nicht kalt."],
      ["Agent", "Šta vólite da rádite u slóbodno vréme?", "Was machen Sie gern in Ihrer Freizeit?"],
      ["Kupac", "Vólim da plívam i čítam.", "Ich schwimme und lese gern."],
      ["Agent", "Ódlično! Ja vólim fúdbal.", "Ausgezeichnet! Ich mag Fußball."]
    ],
    grammar: {
      title: "Verneinung und „gern tun“",
      text: [
        "Verneinung: „ne“ steht vor dem Verb (ne razumem). „je“ wird zu „nije“, „sam“ zu „nisam“: Hladno je. – Nije hladno. Gladan sam. – Nisam gladan.",
        "Gern tun: voleti + da + Verb (Präsens). Volim da plivam = Ich schwimme gern. Volim da čitam = Ich lese gern."
      ]
    },
    words: [
      ["kíša", "Regen"], ["súnce", "Sonne"], ["snég", "Schnee"], ["vétar", "Wind"], ["óblak", "Wolke"], ["tóplo", "warm"],
      ["hládno", "kalt"], ["vrúće", "heiß"], ["súnčano", "sonnig"], ["óblačno", "bewölkt"], ["sréćan", "glücklich"], ["túžan", "traurig"],
      ["umóran", "müde"], ["gládan", "hungrig"], ["žédan", "durstig"], ["zadovóljan", "zufrieden"], ["ljút", "wütend"], ["véseo", "fröhlich"],
      ["hóbi", "Hobby"], ["múzika", "Musik"], ["fílm", "Film"], ["knjíga", "Buch"], ["spórt", "Sport"], ["fúdbal", "Fußball"],
      ["šétnja", "Spaziergang"], ["kúvanje", "Kochen"], ["čítati", "lesen"], ["slúšati", "hören / zuhören"], ["glédati", "anschauen"],
      ["ígrati", "spielen"], ["plívati", "schwimmen"], ["pévati", "singen"], ["tŕčati", "laufen"], ["vóziti", "fahren"],
      ["lépo", "schön"], ["zanimljívo", "interessant"], ["téško", "schwer"], ["láko", "leicht"], ["mnógo", "viel"], ["málo", "wenig"],
      ["vŕlo", "sehr"], ["móžda", "vielleicht"], ["náravno", "natürlich"], ["táčno", "genau / richtig"], ["u rédu", "in Ordnung"],
      ["báš", "genau / echt"], ["áli", "aber"], ["í", "und"], ["íli", "oder"], ["jér", "weil"]
    ],
    sentences: [
      ["Kákvo je vréme dánas?", "Wie ist das Wetter heute?"],
      ["Dánas je lépo vréme.", "Heute ist schönes Wetter."],
      ["Páda kíša.", "Es regnet."],
      ["Hládno je.", "Es ist kalt."],
      ["Šta vóliš da rádiš u slóbodno vréme?", "Was machst du gern in deiner Freizeit?"],
      ["Vólim múziku i fúdbal.", "Ich mag Musik und Fußball."],
      ["Žédan sam.", "Ich habe Durst."],
      ["Umóran sam.", "Ich bin müde."],
      ["Vrlo je zanimljívo!", "Das ist sehr interessant!"],
      ["Nije hládno.", "Es ist nicht kalt."]
    ]
  },

  // ------------------------------------------------------------------ 5
  {
    id: 5,
    title: "Essen & Trinken",
    goal: "Im Restaurant und Café bestellen und bezahlen.",
    dialog: [
      ["Konobar", "Dóbro véče. Izvólite?", "Guten Abend. Bitte schön?"],
      ["Gost", "Stó za dvóje, mólim.", "Einen Tisch für zwei, bitte."],
      ["Konobar", "Izvólite. Evo jélovnik.", "Bitte sehr. Hier ist die Speisekarte."],
      ["Gost", "Hvála. Jédnu súpu i pilétinu, mólim.", "Danke. Eine Suppe und das Hühnchen, bitte."],
      ["Konobar", "A za píti?", "Und zu trinken?"],
      ["Gost", "Vódu i jédno pívo.", "Wasser und ein Bier."],
      ["Konobar", "Prijátno!", "Guten Appetit!"]
    ],
    grammar: {
      title: "Bestellen: die Endung -u",
      text: [
        "Beim Bestellen wird bei Wörtern auf -a die Endung zu -u: kafa → kafu, supa → supu, piletina → piletinu. Jednu kafu, molim.",
        "Männliche und sächliche Wörter bleiben meist gleich: jedno pivo, jedan sok, hleb."
      ]
    },
    words: [
      ["hrána", "Essen / Nahrung"], ["píće", "Getränk"], ["dóručak", "Frühstück"], ["rúčak", "Mittagessen"], ["véčera", "Abendessen"],
      ["restóran", "Restaurant"], ["jélovnik", "Speisekarte"], ["kónobar", "Kellner"], ["ráčun", "Rechnung"], ["hléb", "Brot"],
      ["mléko", "Milch"], ["sír", "Käse"], ["jáje", "Ei"], ["méso", "Fleisch"], ["pilétina", "Hühnerfleisch"], ["svinjétina", "Schweinefleisch"],
      ["ríba", "Fisch"], ["súpa", "Suppe"], ["saláta", "Salat"], ["krómpir", "Kartoffel"], ["pirínač", "Reis"], ["téstenina", "Nudeln"],
      ["póvrće", "Gemüse"], ["vóće", "Obst"], ["jábuka", "Apfel"], ["paradájz", "Paradeiser"], ["lúk", "Zwiebel"], ["só", "Salz"],
      ["bíber", "Pfeffer"], ["šéćer", "Zucker"], ["káfa", "Kaffee"], ["čáj", "Tee"], ["vóda", "Wasser"], ["sók", "Saft"], ["pívo", "Bier"],
      ["víno", "Wein"], ["rákija", "Obstbrand"], ["kólač", "Kuchen"], ["sládoled", "Eis"], ["úkusno", "lecker"], ["sláno", "salzig"],
      ["slátko", "süß"], ["jésti", "essen"], ["píti", "trinken"], ["narúčiti", "bestellen"], ["plátiti", "bezahlen"], ["fláša", "Flasche"],
      ["čáša", "Glas"], ["tánjir", "Teller"], ["nóž", "Messer"]
    ],
    sentences: [
      ["Stó za dvóje, mólim.", "Einen Tisch für zwei, bitte."],
      ["Jélovnik, mólim.", "Die Speisekarte, bitte."],
      ["Šta prepóručujete?", "Was empfehlen Sie?"],
      ["Jédnu káfu, mólim.", "Einen Kaffee, bitte."],
      ["Dájte mi vódu, mólim.", "Geben Sie mir bitte Wasser."],
      ["Ja ću pilétinu i salátu.", "Ich nehme das Hühnchen und den Salat."],
      ["Prijátno!", "Guten Appetit!"],
      ["Bílo je vrlo úkusno.", "Es war sehr lecker."],
      ["Nísam gládan, hvála.", "Ich habe keinen Hunger, danke."],
      ["Ráčun, mólim.", "Die Rechnung, bitte."]
    ]
  },

  // ------------------------------------------------------------------ 6
  {
    id: 6,
    title: "Einkaufen & Geld",
    goal: "Einkaufen: nach dem Preis fragen, Farben, Kleidung, bezahlen.",
    dialog: [
      ["Prodavac", "Izvólite?", "Bitte schön?"],
      ["Kupac", "Trážim plávu kóšulju.", "Ich suche ein blaues Hemd."],
      ["Prodavac", "Kója veličína?", "Welche Größe?"],
      ["Kupac", "Véliku, mólim.", "Eine große, bitte."],
      ["Prodavac", "Izvólite. Kóšta dvádeset évra.", "Bitte sehr. Es kostet zwanzig Euro."],
      ["Kupac", "Dóbro, úzeću je.", "Gut, ich nehme es."]
    ],
    grammar: {
      title: "Adjektive: männlich, weiblich, sächlich",
      text: [
        "Das Adjektiv richtet sich nach dem Hauptwort: nov stan (männlich) – nova kuća (weiblich, Endung -a) – novo dete (sächlich, Endung -o).",
        "So auch bei Farben: crven kaput – crvena jakna – crveno dete."
      ]
    },
    words: [
      ["pródavnica", "Geschäft"], ["píjaca", "Markt"], ["súpermarket", "Supermarkt"], ["kása", "Kassa"], ["nóvac", "Geld"], ["céna", "Preis"],
      ["gotóvina", "Bargeld"], ["kártica", "Bankomatkarte"], ["évro", "Euro"], ["dínar", "Dinar"], ["pópust", "Rabatt"], ["jéftin", "billig"],
      ["skúp", "teuer"], ["besplátno", "gratis"], ["késa", "Sackerl"], ["tórba", "Tasche"], ["kilógram", "Kilogramm"], ["lítar", "Liter"],
      ["kómad", "Stück"], ["veličína", "Größe"], ["bója", "Farbe"], ["cŕven", "rot"], ["pláv", "blau"], ["zélen", "grün"], ["žút", "gelb"],
      ["cŕn", "schwarz"], ["béo", "weiß"], ["sív", "grau"], ["nóv", "neu"], ["ódeća", "Kleidung"], ["cípele", "Schuhe"], ["kóšulja", "Hemd"],
      ["pantalóne", "Hose"], ["jákna", "Jacke"], ["kúpiti", "kaufen"], ["pródati", "verkaufen"], ["trážiti", "suchen / verlangen"],
      ["úzeti", "nehmen"], ["próbati", "probieren / anprobieren"], ["kóštati", "kosten"], ["trébati", "brauchen"], ["otvóreno", "geöffnet"],
      ["zatvóreno", "geschlossen"], ["óvo", "dieses"], ["tó", "das"], ["jóš", "noch"], ["své", "alles"], ["néšto", "etwas"], ["sámo", "nur"],
      ["préviše", "zu viel"]
    ],
    sentences: [
      ["Kóliko kóšta óvo?", "Was kostet das?"],
      ["Préviše je skúpo.", "Das ist zu teuer."],
      ["Imáte li néšto jéftinije?", "Haben Sie etwas Günstigeres?"],
      ["Úzeću óvo.", "Ich nehme das."],
      ["Mógu li da plátim kárticom?", "Kann ich mit Karte zahlen?"],
      ["Sámo gotóvinom.", "Nur bar."],
      ["Imáte li óvo u véćoj veličíni?", "Haben Sie das in einer größeren Größe?"],
      ["Trážim plávu jáknu.", "Ich suche eine blaue Jacke."],
      ["Mógu li da próbam?", "Kann ich es anprobieren?"],
      ["To je sve, hvála.", "Das ist alles, danke."]
    ]
  },

  // ------------------------------------------------------------------ 7
  {
    id: 7,
    title: "Reisen & Verkehr",
    goal: "Unterwegs: Fahrkarten kaufen, nach dem Weg fragen, sich orientieren.",
    dialog: [
      ["Putnik", "Dóbar dan. Jédna kárta za Béograd, mólim.", "Guten Tag. Eine Fahrkarte nach Belgrad, bitte."],
      ["Službenik", "Kada putújete?", "Wann reisen Sie?"],
      ["Putnik", "Sútra ujútru.", "Morgen früh."],
      ["Službenik", "Vóz pólazi u ósam sáti.", "Der Zug fährt um acht Uhr ab."],
      ["Putnik", "Kóliko kóšta?", "Was kostet es?"],
      ["Službenik", "Dvádeset évra.", "Zwanzig Euro."]
    ],
    grammar: {
      title: "Wohin? Wo? Woher?",
      text: [
        "Wohin: u + Akkusativ – Idem u Beč. / Idem u Beograd.",
        "Wo: u + Lokativ – Živim u Beču. / Živim u Beogradu.",
        "Woher: iz + Genitiv – Ja sam iz Beča. / Ja sam iz Beograda. Für: za + Akkusativ – karta za Beograd."
      ]
    },
    words: [
      ["putóvanje", "Reise"], ["pút", "Weg / Reise"], ["áerodrom", "Flughafen"], ["stánica", "Station / Haltestelle"], ["vóz", "Zug"],
      ["áutobus", "Bus"], ["táksi", "Taxi"], ["automóbil", "Auto"], ["kóla", "Auto (Mehrzahl)"], ["vózač", "Fahrer"], ["kárta", "Fahrkarte / Karte"],
      ["pásoš", "Reisepass"], ["kófer", "Koffer"], ["mápa", "Plan / Landkarte"], ["úlica", "Straße"], ["tŕg", "Platz"], ["móst", "Brücke"],
      ["grád", "Stadt"], ["sélo", "Dorf"], ["gránica", "Grenze"], ["pólazak", "Abfahrt"], ["dólazak", "Ankunft"], ["lévo", "links"],
      ["désno", "rechts"], ["právo", "geradeaus"], ["blízu", "nahe"], ["dáleko", "weit"], ["nápred", "vorwärts"], ["názad", "zurück"],
      ["góre", "oben"], ["dóle", "unten"], ["íspred", "vor"], ["íza", "hinter"], ["póred", "neben"], ["mésto", "Ort / Platz"],
      ["pŕtljag", "Gepäck"], ["pútnik", "Reisender"], ["túrista", "Tourist"], ["íći", "gehen"], ["dóći", "kommen"], ["stíći", "ankommen"],
      ["pútovati", "reisen"], ["čékati", "warten"], ["izgúbiti se", "sich verirren"], ["pítati", "fragen"], ["pokázati", "zeigen"],
      ["skrénuti", "abbiegen"], ["zaustáviti", "anhalten"], ["sédište", "Sitzplatz"], ["vóžnja", "Fahrt"]
    ],
    sentences: [
      ["Gde je stánica?", "Wo ist die Haltestelle?"],
      ["Jédna kárta za Béograd, mólim.", "Eine Fahrkarte nach Belgrad, bitte."],
      ["Kada pólazi vóz?", "Wann fährt der Zug ab?"],
      ["Kóliko kóšta kárta?", "Was kostet die Fahrkarte?"],
      ["Gde je áerodrom?", "Wo ist der Flughafen?"],
      ["Izgúbio sam se.", "Ich habe mich verirrt."],
      ["Pokážite mi na mápi, mólim.", "Zeigen Sie mir bitte auf dem Plan."],
      ["Ídite právo, pa lévo.", "Gehen Sie geradeaus, dann links."],
      ["Skrénite désno.", "Biegen Sie rechts ab."],
      ["Da li je dáleko?", "Ist es weit?"]
    ]
  },

  // ------------------------------------------------------------------ 8
  {
    id: 8,
    title: "Wohnen & Immobilien",
    goal: "Räume, Besichtigung, Miete und Kauf: das Wichtigste für Wohnungen.",
    dialog: [
      ["Agent", "Dóbar dan! Dobrodóšli. Evo, óvo je stán.", "Guten Tag! Willkommen. Hier ist die Wohnung."],
      ["Kupac", "Hvála. Stán je vrlo svétao!", "Danke. Die Wohnung ist sehr hell!"],
      ["Agent", "Da, ima tri sóbe, kúhinju i bálkon.", "Ja, sie hat drei Zimmer, eine Küche und einen Balkon."],
      ["Kupac", "Kóliko je kírija?", "Wie hoch ist die Miete?"],
      ["Agent", "Kírija je pétsto évra.", "Die Miete beträgt fünfhundert Euro."],
      ["Kupac", "Dóbro. Mógu li da vídim kupátilo?", "Gut. Kann ich das Bad sehen?"]
    ],
    grammar: {
      title: "Mehrzahl und Zahlen",
      text: [
        "Mehrzahl: soba → sobe, stan → stanovi, kuća → kuće.",
        "Nach 2, 3, 4 steht die Form auf -e: dve sobe, tri sobe. Ab 5 steht die Form auf -a: pet soba, deset soba."
      ]
    },
    words: [
      ["stán", "Wohnung"], ["kúća", "Haus"], ["sóba", "Zimmer"], ["spávaća sóba", "Schlafzimmer"], ["dnévna sóba", "Wohnzimmer"],
      ["kúhinja", "Küche"], ["kupátilo", "Bad"], ["tóalet", "WC"], ["balkón", "Balkon"], ["terása", "Terrasse"], ["bášta", "Garten"],
      ["garáža", "Garage"], ["pódrum", "Keller"], ["sprát", "Stockwerk"], ["líft", "Aufzug"], ["stépenice", "Stiegen"], ["vráta", "Tür"],
      ["prózor", "Fenster"], ["zíd", "Wand / Mauer"], ["pód", "Boden"], ["króv", "Dach"], ["námeštaj", "Möbel"], ["krévet", "Bett"],
      ["stólica", "Sessel (Stuhl)"], ["órmar", "Schrank"], ["frižíder", "Kühlschrank"], ["špóret", "Herd"], ["gréjanje", "Heizung"],
      ["strúja", "Strom"], ["kírija", "Miete"], ["pródaja", "Verkauf"], ["kúpac", "Käufer"], ["vlásnik", "Eigentümer"], ["stánar", "Mieter"],
      ["adrésa", "Adresse"], ["kvadrát", "Quadratmeter"], ["ugovór", "Vertrag"], ["depózit", "Kaution"], ["ágent", "Makler"],
      ["nekrétnina", "Immobilie"], ["pógled", "Aussicht"], ["tíh", "ruhig"], ["svétao", "hell"], ["próstran", "geräumig"],
      ["renóviran", "renoviert"], ["razgledánje", "Besichtigung"], ["iznájmiti", "vermieten / mieten"], ["uséliti se", "einziehen"],
      ["tróškovi", "Kosten"], ["términ", "Termin"]
    ],
    sentences: [
      ["Imám stán na pródaju.", "Ich habe eine Wohnung zum Verkauf."],
      ["Stán ima tri sóbe i kúhinju.", "Die Wohnung hat drei Zimmer und eine Küche."],
      ["Stán je svétao i tíh.", "Die Wohnung ist hell und ruhig."],
      ["Kóliko ima kvadráta?", "Wie viele Quadratmeter hat sie?"],
      ["Ima li bálkon?", "Gibt es einen Balkon?"],
      ["Kóliko je kírija?", "Wie hoch ist die Miete?"],
      ["Kóliko su tróškovi?", "Wie hoch sind die Kosten?"],
      ["Móžemo li da zakážemo razgledánje?", "Können wir eine Besichtigung vereinbaren?"],
      ["Stán je renóviran.", "Die Wohnung ist renoviert."],
      ["Imámo i garážu.", "Wir haben auch eine Garage."]
    ]
  },

  // ------------------------------------------------------------------ 9
  {
    id: 9,
    title: "Gesundheit & Körper",
    goal: "Körperteile benennen, Beschwerden schildern, zum Arzt und in die Apotheke.",
    dialog: [
      ["Doktor", "Dóbar dan. Šta vas bóli?", "Guten Tag. Was tut Ihnen weh?"],
      ["Pacijent", "Bóli me gláva i imám temperatúru.", "Ich habe Kopfschmerzen und Fieber."],
      ["Doktor", "Od kada?", "Seit wann?"],
      ["Pacijent", "Od júče.", "Seit gestern."],
      ["Doktor", "Dóbro. Evo recépta. Odmárajte se.", "Gut. Hier ist das Rezept. Ruhen Sie sich aus."],
      ["Pacijent", "Hvála, doktóre.", "Danke, Herr Doktor."]
    ],
    grammar: {
      title: "Schmerzen ausdrücken",
      text: [
        "Boli me glava = Mir tut der Kopf weh (me = mich). Boli me stomak, boli me ruka.",
        "Höflich gefragt: Šta vas boli? (vas = Sie). Unter Freunden: Šta te boli? (te = dich)."
      ]
    },
    words: [
      ["télo", "Körper"], ["gláva", "Kopf"], ["líce", "Gesicht"], ["óko", "Auge"], ["úvo", "Ohr"], ["nós", "Nase"], ["ústa", "Mund"],
      ["zúb", "Zahn"], ["vrát", "Hals"], ["ráme", "Schulter"], ["rúka", "Hand / Arm"], ["pŕst", "Finger"], ["stómak", "Bauch / Magen"],
      ["léđa", "Rücken"], ["nóga", "Bein / Fuß"], ["stópalo", "Fußsohle"], ["kóža", "Haut"], ["sŕce", "Herz"], ["kŕv", "Blut"], ["kósa", "Haar"],
      ["dóktor", "Arzt"], ["lékar", "Arzt (Mediziner)"], ["bólnica", "Krankenhaus"], ["apotéka", "Apotheke"], ["lék", "Medikament"],
      ["recépt", "Rezept"], ["ból", "Schmerz"], ["glavóbolja", "Kopfschmerzen"], ["temperatúra", "Fieber"], ["prehláda", "Verkühlung"],
      ["kášalj", "Husten"], ["alérgija", "Allergie"], ["póvreda", "Verletzung"], ["bólestan", "krank"], ["zdráv", "gesund"],
      ["hítno", "dringend"], ["pómoć", "Hilfe"], ["hítna pómoć", "Rettung (Notarzt)"], ["bóleti", "wehtun"], ["oséćati se", "sich fühlen"],
      ["prégled", "Untersuchung"], ["osigúranje", "Versicherung"], ["zdrávlje", "Gesundheit"], ["spávati", "schlafen"],
      ["odmárati se", "sich ausruhen"], ["pomóći", "helfen"], ["léčiti", "behandeln"], ["pózvati", "rufen / anrufen"], ["telefón", "Telefon"],
      ["ambulánta", "Ambulanz"]
    ],
    sentences: [
      ["Bóli me gláva.", "Ich habe Kopfschmerzen."],
      ["Bóli me stómak.", "Ich habe Bauchschmerzen."],
      ["Bólestan sam.", "Ich bin krank."],
      ["Trébam dóktora.", "Ich brauche einen Arzt."],
      ["Pózovite hítnu pómoć!", "Rufen Sie die Rettung!"],
      ["Gde je apotéka?", "Wo ist die Apotheke?"],
      ["Imám temperatúru.", "Ich habe Fieber."],
      ["Imám alérgiju.", "Ich habe eine Allergie."],
      ["Káko se oséćate?", "Wie fühlen Sie sich?"],
      ["Već mi je bólje.", "Es geht mir schon besser."]
    ]
  },

  // ------------------------------------------------------------------ 10
  {
    id: 10,
    title: "Arbeit & Alltag",
    goal: "Büro, Telefon und die wichtigsten Verben und Wörter für den Alltag.",
    dialog: [
      ["Agent", "Halo, dóbar dan. Imám jedno pítanje.", "Hallo, guten Tag. Ich habe eine Frage."],
      ["Kolega", "Izvólite, slúšam.", "Bitte, ich höre."],
      ["Agent", "Kada je sástanak?", "Wann ist die Besprechung?"],
      ["Kolega", "Sástanak je sútra u déset.", "Die Besprechung ist morgen um zehn."],
      ["Agent", "Hvála na pomóći!", "Danke für die Hilfe!"],
      ["Kolega", "Nema próblema. Doviđénja!", "Kein Problem. Auf Wiedersehen!"]
    ],
    grammar: {
      title: "Können, müssen, wollen – und Fragen mit „li“",
      text: [
        "moći, morati, hteti + da + Verb im Präsens: Moram da idem. Mogu da pomognem. Hoću da kupim stan.",
        "Ja/Nein-Fragen: das Verb + „li“: Možete li da me pozovete? Imate li vremena? Govorite li nemački?"
      ]
    },
    words: [
      ["pósao", "Arbeit"], ["kancelárija", "Büro"], ["fírma", "Firma"], ["koléga", "Kollege"], ["šéf", "Chef"], ["sástanak", "Besprechung / Termin"],
      ["póziv", "Anruf"], ["méjl", "E-Mail"], ["póruka", "Nachricht"], ["ínternet", "Internet"], ["račúnar", "Computer"], ["dokúment", "Dokument"],
      ["pítanje", "Frage"], ["ódgovor", "Antwort"], ["próblem", "Problem"], ["rešénje", "Lösung"], ["idéja", "Idee"], ["ráditi", "arbeiten / machen"],
      ["želéti", "wünschen / wollen"], ["móći", "können"], ["mórati", "müssen"], ["znáti", "wissen / kennen"], ["htéti", "wollen"], ["dáti", "geben"],
      ["vídeti", "sehen"], ["čúti", "hören"], ["réći", "sagen"], ["písati", "schreiben"], ["zváti", "rufen / nennen"], ["póčeti", "beginnen"],
      ["završíti", "beenden"], ["odgovóriti", "antworten"], ["mísliti", "denken"], ["vérovati", "glauben"], ["účiti", "lernen"], ["vážno", "wichtig"],
      ["mogúće", "möglich"], ["potrébno", "nötig"], ["slóbodno", "frei"], ["záuzet", "beschäftigt"], ["spréman", "bereit"], ["bŕzo", "schnell"],
      ["poláko", "langsam"], ["ónda", "dann"], ["pónekad", "manchmal"], ["čésto", "oft"], ["rétko", "selten"], ["véć", "schon"], ["ópet", "wieder"],
      ["záto", "deshalb"]
    ],
    sentences: [
      ["Rádim u kanceláriji.", "Ich arbeite im Büro."],
      ["Imám važan sástanak.", "Ich habe einen wichtigen Termin."],
      ["Móžete li da me pózovete?", "Können Sie mich anrufen?"],
      ["Píšite mi méjl, mólim.", "Schreiben Sie mir bitte eine E-Mail."],
      ["Imám jedno pítanje.", "Ich habe eine Frage."],
      ["Nema próblema.", "Kein Problem."],
      ["Záuzet sam.", "Ich bin beschäftigt."],
      ["Móram da ídem.", "Ich muss gehen."],
      ["Mogúće je.", "Es ist möglich."],
      ["Hvála na pomóći!", "Danke für die Hilfe!"]
    ]
  }
];

const LEGEND = [
  ["c", "z (wie in „Zeit“)", "cena → ZE-na"],
  ["č", "tsch (wie in „Tschüss“)", "čaj → tschaj"],
  ["ć", "weiches tj (zwischen tsch und tj)", "noć → notj"],
  ["š", "sch (wie in „Schule“)", "šest → schest"],
  ["ž", "stimmhaftes sch, wie g in „Garage“ (hier: zh)", "žena → ZHE-na"],
  ["đ", "weiches dj (wie in englisch „Jeans“, weicher)", "doviđenja → DO-wi-dje-nja"],
  ["dž", "dsch (wie in „Dschungel“)", "džep → dschep"],
  ["j", "j (wie in „Jahr“)", "jaje → JA-je"],
  ["lj", "weiches l, wie in „Familie“ (italienisch gli)", "prijatelj → PRI-ja-telj"],
  ["nj", "weiches n, wie in „Cognac“", "doviđenja → …nja"],
  ["h", "ch (wie in „Bach“)", "hvala → CHWA-la"],
  ["v", "w (wie in „Wasser“)", "voda → WO-da"],
  ["s", "immer stimmlos, wie ß (hier: ß)", "sat → ßat"],
  ["z", "stimmhaftes s (wie in „Sonne“, hier: s)", "voz → wos"],
  ["r", "gerollt (Zungenspitzen-R); kann eine Silbe bilden", "Srbija → SR-bi-ja"]
];
