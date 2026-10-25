// Kapitel 1–5
// Format: Wörter/Sätze = [Serbisch, Deutsch]; Dialoge = [Sprecher, Serbisch, Deutsch].
// Der Akzent (á é í ó ú ŕ) markiert die betonte Silbe; app.js macht daraus Schreibweise und Lautschrift.

CHAPTERS.push(
  // ------------------------------------------------------------------ 1
  {
    id: 1, part: "Erste Schritte",
    title: "Begrüßung & Höflichkeit",
    goal: "Alle Grüße des Tages, Verabschiedung, Befinden, Bitte, Danke und kleine Antworten an einem Ort.",
    grammar: {
      title: "Anrede, Tageszeiten und Höflichkeit",
      text: [
        "Du oder Sie: ti = du (Freunde, Familie, Kinder), vi = Sie (höflich). Kako si? (du) – Kako ste? (Sie). Beim Siezen steht das Verb im Plural, auch für eine einzelne Person.",
        "Tageszeiten: Dobro jutro (bis etwa 10 Uhr), Dobar dan (tagsüber), Dobro veče (ab dem späten Nachmittag). Laku noć sagt man nur beim Schlafengehen oder zum Abschied am späten Abend.",
        "Anrede mit Namen: Im Gespräch steht der Name im Vokativ, oft mit der Endung -e/-u: gospodine Jovanoviću (Herr Jovanović), gospođo Petrović (Frau Petrović)."
      ]
    },
    groups: [
      { title: "Hallo, Willkommen, Anrede", words: [
        ["dóbro jútro", "guten Morgen"], ["dóbar dan", "guten Tag"], ["dóbro véče", "guten Abend"], ["láku nóć", "gute Nacht"],
        ["zdrávo", "hallo"], ["ćáo", "servus / hallo (locker)"], ["zdrávo svíma", "hallo an alle"], ["dóbrodošli", "willkommen"],
        ["dobrodóšlica", "Willkommen (Empfang)"], ["prijátan dan", "einen schönen Tag"], ["prijátno véče", "einen schönen Abend"],
        ["pozdrávi", "Grüße"], ["pozdráviti", "grüßen"], ["pozdrávljam", "ich grüße"], ["gospódin", "Herr"], ["gospóđa", "Frau"],
        ["gospóđica", "Fräulein / junge Frau"], ["gospódine", "Herr … (Anrede)"], ["gospóđo", "Frau … (Anrede)"], ["drági", "lieber"],
        ["poštóvani", "sehr geehrter"], ["sví", "alle"], ["rukovánje", "Handschlag"], ["zagrljáj", "Umarmung"], ["poljúbac", "Kuss"]
      ]},
      { title: "Verabschiedung & gute Wünsche", words: [
        ["doviđénja", "auf Wiedersehen"], ["vídimo se", "bis bald"], ["vídimo se úskoro", "bis demnächst"], ["vídimo se sútra", "bis morgen"],
        ["vídimo se kásnije", "bis später"], ["do skóra", "bis bald (kurz)"], ["sréćan pút", "gute Reise"], ["sréćno", "viel Glück"],
        ["sréćan rođéndan", "alles Gute zum Geburtstag"], ["sréćna nóva gódina", "frohes neues Jahr"], ["sréćan Bóžić", "frohe Weihnachten"],
        ["sréćan Úskrs", "frohe Ostern"], ["čestítam", "ich gratuliere"], ["čestítka", "Glückwunschkarte"], ["živéli", "Prost!"],
        ["na zdrávlje", "zum Wohl / Gesundheit"], ["prijátno", "guten Appetit"], ["pózdrav", "Gruß"], ["srdáčan pózdrav", "herzliche Grüße"],
        ["slátke snóve", "süße Träume"], ["čúvaj se", "pass auf dich auf"], ["jávi se", "melde dich"], ["óstani zdrav", "bleib gesund"],
        ["pútuj zdrávo", "gute Fahrt"], ["dóbar víkend", "schönes Wochenende"]
      ]},
      { title: "Wie geht’s? Befinden", words: [
        ["káko si", "wie geht’s dir"], ["káko ste", "wie geht es Ihnen"], ["káko ide", "wie läuft’s"], ["šta íma", "was gibt’s"],
        ["šta íma nóvo", "was gibt’s Neues"], ["dóbro sam", "mir geht’s gut"], ["ódlično sam", "mir geht’s ausgezeichnet"], ["prílično dóbro", "ziemlich gut"],
        ["nórmalno", "normal / passt schon"], ["nísam dóbro", "mir geht’s nicht gut"], ["lóše sam", "mir geht’s schlecht"], ["táko-táko", "so lala"],
        ["níje lóše", "nicht schlecht"], ["néma próblema", "kein Problem"], ["sve je u rédu", "alles in Ordnung"], ["sve dóbro", "alles gut"],
        ["hvála na pítanju", "danke der Nachfrage"], ["a tí", "und du"], ["a ví", "und Sie / und ihr"], ["í tí", "du auch"], ["í ví", "Sie auch / ihr auch"],
        ["kao í óbično", "wie immer"], ["ne mógu da se póžalim", "ich kann nicht klagen"], ["dúgo se nísmo vídeli", "wir haben uns lange nicht gesehen"],
        ["drágo mi je što te vídim", "schön, dich zu sehen"]
      ]},
      { title: "Bitte, Danke, Entschuldigung", words: [
        ["hvála", "danke"], ["hvála lépo", "danke schön"], ["hvála mnógo", "vielen Dank"], ["mnógo hvála", "herzlichen Dank"], ["hvála vam", "danke (Ihnen)"],
        ["hvála ti", "danke (dir)"], ["néma na čému", "gern geschehen"], ["mólim", "bitte"], ["mólim vas", "bitte (Sie)"], ["mólim te", "bitte (du)"],
        ["izvínite", "Entschuldigung (Sie)"], ["izvíni", "Entschuldigung (du)"], ["oprósti", "verzeih (du)"], ["opróstite", "verzeihen Sie"],
        ["žáo mi je", "es tut mir leid"], ["žáo mi je zbog tóga", "das tut mir leid"], ["u rédu je", "ist in Ordnung"], ["ne brínite", "keine Sorge (Sie)"],
        ["ne bríni", "keine Sorge (du)"], ["svaka část", "Hut ab / Respekt"], ["izvólite", "bitte sehr (Sie)"], ["izvóli", "bitte sehr (du)"],
        ["dozvólite", "erlauben Sie"], ["ako ste ljúbazni", "wenn Sie so freundlich sind"], ["hvála únapred", "danke im Voraus"]
      ]},
      { title: "Ja, Nein, Vielleicht – kleine Antworten", words: [
        ["dá", "ja"], ["né", "nein"], ["móžda", "vielleicht"], ["náravno", "natürlich"], ["svákako", "auf jeden Fall"], ["táčno", "genau / richtig"],
        ["nétačno", "falsch / nicht richtig"], ["slážem se", "ich stimme zu"], ["ne slážem se", "ich bin nicht einverstanden"], ["sígurno", "sicher"],
        ["verovátno", "wahrscheinlich"], ["níkako", "auf keinen Fall"], ["móže", "geht / okay"], ["ne móže", "geht nicht"], ["záista", "wirklich"],
        ["stvárno", "tatsächlich"], ["svejédno mi je", "mir ist es egal"], ["ne znám", "ich weiß nicht"], ["znám", "ich weiß"], ["razúmem", "ich verstehe"],
        ["ne razúmem", "ich verstehe nicht"], ["još jédnom", "noch einmal"], ["spórije", "langsamer"], ["glásnije", "lauter"], ["tíše", "leiser"]
      ]}
    ],
    sentences: [
      ["Dóbro jútro! Káko ste spávali?", "Guten Morgen! Wie haben Sie geschlafen?"],
      ["Dóbar dan, drága gospóđo!", "Guten Tag, liebe Frau!"],
      ["Dóbro véče, dóbro dóšli!", "Guten Abend, herzlich willkommen!"],
      ["Láku nóć i slátke snóve!", "Gute Nacht und süße Träume!"],
      ["Ćáo, vídimo se sútra!", "Servus, wir sehen uns morgen!"],
      ["Doviđénja i prijátan dan!", "Auf Wiedersehen und einen schönen Tag!"],
      ["Káko ste? – Dóbro sam, hvála. A vi?", "Wie geht es Ihnen? – Mir geht’s gut, danke. Und Ihnen?"],
      ["Šta íma nóvo? – Níšta nóvo.", "Was gibt’s Neues? – Nichts Neues."],
      ["Hvála lépo na pómoći!", "Vielen Dank für die Hilfe!"],
      ["Néma na čému.", "Gern geschehen."],
      ["Izvínite, mógu li da vas pítam néšto?", "Entschuldigung, darf ich Sie etwas fragen?"],
      ["Žáo mi je, ne razúmem.", "Es tut mir leid, ich verstehe nicht."],
      ["Mólim vas, ponóvite još jédnom.", "Bitte wiederholen Sie es noch einmal."],
      ["Govórite spórije, mólim vas.", "Sprechen Sie bitte langsamer."],
      ["Sréćan rođéndan! Sve nájbolje!", "Alles Gute zum Geburtstag! Das Allerbeste!"]
    ],
    dialogs: [
      { title: "Zwei Bekannte treffen sich", lines: [
        ["Marko", "Zdrávo, Ána! Káko si?", "Hallo, Ana! Wie geht’s dir?"],
        ["Ana", "Zdrávo, Márko! Dóbro sam, hvála. A ti?", "Hallo, Marko! Mir geht’s gut, danke. Und dir?"],
        ["Marko", "I ja sam dóbro. Šta íma nóvo?", "Mir auch. Was gibt’s Neues?"],
        ["Ana", "Níšta nóvo. Vídimo se sútra?", "Nichts Neues. Sehen wir uns morgen?"],
        ["Marko", "Da, vídimo se sútra. Ćáo!", "Ja, bis morgen. Servus!"],
        ["Ana", "Ćáo, čúvaj se!", "Servus, pass auf dich auf!"]
      ]},
      { title: "Förmlicher Empfang", lines: [
        ["Gospodin Jovanović", "Dóbar dan! Dóbro dóšli.", "Guten Tag! Herzlich willkommen."],
        ["Gospođa Petrović", "Dóbar dan! Hvála lépo.", "Guten Tag! Vielen Dank."],
        ["Gospodin Jovanović", "Káko ste putóvali?", "Wie war Ihre Reise?"],
        ["Gospođa Petrović", "Dóbro, hvála. A vi, káko ste?", "Gut, danke. Und wie geht es Ihnen?"],
        ["Gospodin Jovanović", "Dóbro sam, hvála na pítanju. Izvólite, sédite.", "Mir geht’s gut, danke der Nachfrage. Bitte, nehmen Sie Platz."],
        ["Gospođa Petrović", "Hvála vam.", "Danke."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 2
  {
    id: 2, part: "Erste Schritte",
    title: "Sich vorstellen & Kennenlernen",
    goal: "Name, Herkunft, Sprachen, Alter und Kontaktdaten: alles, was man beim Kennenlernen braucht.",
    grammar: {
      title: "„zvati se“, „biti“ und „iz“ + Genitiv",
      text: [
        "Sich heißen: zovem se, zoveš se, zove se, zovemo se, zovete se, zovu se. Kako se zovete? – Zovem se Herbert.",
        "Herkunft: Ja sam iz + Genitiv: iz Austrije, iz Srbije, iz Beča, iz Beograda (Beč → Beča, Beograd → Beograda).",
        "Nationalität: Ja sam Austrijanac (Mann) / Austrijanka (Frau). Sprachen: Govorim nemački (ohne Artikel, Sprachen enden auf -i)."
      ]
    },
    groups: [
      { title: "Name & Herkunft", words: [
        ["íme", "Vorname"], ["prézime", "Nachname"], ["nádimak", "Spitzname"], ["zóvem se", "ich heiße"], ["káko se zóvete", "wie heißen Sie"],
        ["káko se zóveš", "wie heißt du"], ["móje íme je", "mein Name ist"], ["ódakle ste", "woher sind Sie"], ["ódakle si", "woher bist du"],
        ["já sam iz", "ich bin aus"], ["dólazim iz", "ich komme aus"], ["rođén sam u", "ich bin geboren in"], ["gdé ste rođeni", "wo sind Sie geboren"],
        ["mésto rođénja", "Geburtsort"], ["dátum rođénja", "Geburtsdatum"], ["državljánstvo", "Staatsbürgerschaft"], ["zémlja", "Land"],
        ["dŕžava", "Staat"], ["gráđanin", "Bürger"], ["glávni grád", "Hauptstadt"], ["rodni grád", "Heimatstadt"], ["dómovina", "Heimat"],
        ["stránac", "Ausländer"], ["póreklo", "Herkunft"], ["nacionálnost", "Nationalität"]
      ]},
      { title: "Länder & Orte", words: [
        ["Áustrija", "Österreich"], ["Sŕbija", "Serbien"], ["Némačka", "Deutschland"], ["Švájcarska", "Schweiz"], ["Hŕvatska", "Kroatien"],
        ["Bósna i Hercegóvina", "Bosnien und Herzegowina"], ["Cŕna Góra", "Montenegro"], ["Makedónija", "Nordmazedonien"], ["Slovénija", "Slowenien"],
        ["Máđarska", "Ungarn"], ["Rumúnija", "Rumänien"], ["Búgarska", "Bulgarien"], ["Gŕčka", "Griechenland"], ["Itálija", "Italien"],
        ["Fráncuska", "Frankreich"], ["Špánija", "Spanien"], ["Éngleska", "England"], ["Rúsija", "Russland"], ["Túrska", "Türkei"],
        ["Amérika", "Amerika"], ["Évropa", "Europa"], ["Évropska únija", "Europäische Union"], ["Bálkan", "Balkan"], ["Béč", "Wien"], ["Béograd", "Belgrad"]
      ]},
      { title: "Nationalitäten", words: [
        ["Austríjanac", "Österreicher"], ["Austríjanka", "Österreicherin"], ["Sŕbin", "Serbe"], ["Sŕpkinja", "Serbin"], ["Némac", "Deutscher"],
        ["Némica", "Deutsche"], ["Švajcárac", "Schweizer"], ["Hŕvat", "Kroate"], ["Hŕvatica", "Kroatin"], ["Bósanac", "Bosnier"],
        ["Crnógorac", "Montenegriner"], ["Makedónac", "Mazedonier"], ["Slóvenac", "Slowene"], ["Máđar", "Ungar"], ["Rúmun", "Rumäne"],
        ["Búgarin", "Bulgare"], ["Gŕk", "Grieche"], ["Itálijan", "Italiener"], ["Fráncuz", "Franzose"], ["Špánac", "Spanier"], ["Énglez", "Engländer"],
        ["Rús", "Russe"], ["Túrčin", "Türke"], ["Amerikánac", "Amerikaner"], ["Evrópljanin", "Europäer"]
      ]},
      { title: "Sprachen & Verständigung", words: [
        ["jézik", "Sprache"], ["sŕpski", "Serbisch"], ["némački", "Deutsch"], ["éngleski", "Englisch"], ["hŕvatski", "Kroatisch"], ["bósanski", "Bosnisch"],
        ["fráncuski", "Französisch"], ["itálijanski", "Italienisch"], ["špánski", "Spanisch"], ["rúski", "Russisch"], ["túrski", "Türkisch"],
        ["matérnji jézik", "Muttersprache"], ["stráni jézik", "Fremdsprache"], ["govóriti", "sprechen"], ["razúmeti", "verstehen"], ["prévesti", "übersetzen"],
        ["prévod", "Übersetzung"], ["réč", "Wort"], ["réčenica", "Satz"], ["ízgovor", "Aussprache"], ["náglasak", "Betonung / Akzent"],
        ["latínica", "lateinische Schrift"], ["círilica", "kyrillische Schrift"], ["ázbuka", "Alphabet"], ["písmo", "Schrift"]
      ]},
      { title: "Alter, Wohnort & Kontaktdaten", words: [
        ["kóliko imáte gódina", "wie alt sind Sie"], ["kóliko imáš gódina", "wie alt bist du"], ["stánujem", "ich wohne"], ["živím", "ich lebe"],
        ["adrésa", "Adresse"], ["úlica", "Straße / Gasse"], ["kúćni brój", "Hausnummer"], ["poštánski brój", "Postleitzahl"], ["mésto stanovánja", "Wohnort"],
        ["telefón", "Telefon"], ["brój telefóna", "Telefonnummer"], ["mobílni telefón", "Handy"], ["méjl", "E-Mail"], ["mejl adrésa", "E-Mail-Adresse"],
        ["líčna kárta", "Personalausweis"], ["pásoš", "Reisepass"], ["dokúment", "Dokument"], ["potpís", "Unterschrift"], ["formulár", "Formular"],
        ["popúniti", "ausfüllen"], ["pódaci", "Daten"], ["líčni pódaci", "persönliche Daten"], ["íme i prézime", "Vor- und Nachname"], ["bráčno stánje", "Familienstand"], ["pól", "Geschlecht"]
      ]}
    ],
    sentences: [
      ["Káko se zóveš?", "Wie heißt du?"],
      ["Káko se zóvete?", "Wie heißen Sie?"],
      ["Zóvem se Hérbert.", "Ich heiße Herbert."],
      ["Móje íme je Mílena.", "Mein Name ist Milena."],
      ["Drágo mi je što smo se upoználi.", "Schön, dass wir uns kennengelernt haben."],
      ["Ódakle ste?", "Woher sind Sie?"],
      ["Ja sam iz Áustrije, iz Béča.", "Ich bin aus Österreich, aus Wien."],
      ["Ja dólazim iz Sŕbije.", "Ich komme aus Serbien."],
      ["Govórite li némački?", "Sprechen Sie Deutsch?"],
      ["Govórim némački i málo sŕpski.", "Ich spreche Deutsch und ein bisschen Serbisch."],
      ["Učím sŕpski već gódinu dána.", "Ich lerne seit einem Jahr Serbisch."],
      ["Ne razúmem sve, ali razúmem málo.", "Ich verstehe nicht alles, aber ich verstehe etwas."],
      ["Kóliko imáte gódina?", "Wie alt sind Sie?"],
      ["Gde stánujete?", "Wo wohnen Sie?"],
      ["Dájte mi, mólim vas, váš brój telefóna.", "Geben Sie mir bitte Ihre Telefonnummer."]
    ],
    dialogs: [
      { title: "Kennenlernen auf einer Feier", lines: [
        ["Jelena", "Dóbar dan! Ja sam Jélena. Káko se vi zóvete?", "Guten Tag! Ich bin Jelena. Wie heißen Sie?"],
        ["Stefan", "Dóbar dan, Jélena. Zóvem se Štéfan. Drágo mi je.", "Guten Tag, Jelena. Ich heiße Stefan. Freut mich."],
        ["Jelena", "Drágo mi je. Ódakle ste, Štéfane?", "Freut mich. Woher sind Sie, Stefan?"],
        ["Stefan", "Ja sam iz Áustrije, iz Béča. A vi?", "Ich bin aus Österreich, aus Wien. Und Sie?"],
        ["Jelena", "Ja sam iz Nóvog Sáda, ali sáda živím u Béču.", "Ich bin aus Novi Sad, wohne aber jetzt in Wien."],
        ["Stefan", "Zanimljivo! Govórite li némački?", "Interessant! Sprechen Sie Deutsch?"],
        ["Jelena", "Da, govórim némački i éngleski.", "Ja, ich spreche Deutsch und Englisch."],
        ["Stefan", "Ódlično!", "Ausgezeichnet!"]
      ]},
      { title: "Anmeldeformular", lines: [
        ["Službenik", "Dóbar dan. Íme i prézime, mólim vas.", "Guten Tag. Vor- und Nachname, bitte."],
        ["Gost", "Štéfan Mílić.", "Stefan Milić."],
        ["Službenik", "Dátum i mésto rođénja?", "Geburtsdatum und Geburtsort?"],
        ["Gost", "Rođen sam u Béču.", "Ich bin in Wien geboren."],
        ["Službenik", "A váša adrésa?", "Und Ihre Adresse?"],
        ["Gost", "Stánujem u Béču, Mála úlica, brój pét.", "Ich wohne in Wien, Kleine Straße, Nummer fünf."],
        ["Službenik", "Váš brój telefóna, mólim?", "Ihre Telefonnummer, bitte?"],
        ["Gost", "Evo, napísao sam ga óvde.", "Hier, ich habe sie hier aufgeschrieben."],
        ["Službenik", "Hvála. Potpíšite óvde, mólim.", "Danke. Unterschreiben Sie bitte hier."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 3
  {
    id: 3, part: "Erste Schritte",
    title: "Zahlen, Mengen & Maße",
    goal: "Alle Zahlen von 0 bis zur Million, Reihenfolge, Mengenwörter, Maße und einfaches Rechnen.",
    grammar: {
      title: "Zahlen im Satz",
      text: [
        "1 hat drei Formen: jedan (männlich), jedna (weiblich), jedno (sächlich). 2 heißt dva (männlich/sächlich) und dve (weiblich): dva sata, dve sobe.",
        "Nach 2, 3, 4 steht die Form für „wenige“ (dva sata, tri dinara). Ab 5 steht der Genitiv Plural: pet sati, pet dinara, dvadeset evra.",
        "Ordnungszahlen sind Adjektive: prvi (m), prva (f), prvo (n). Der erste Mai = prvi maj."
      ]
    },
    groups: [
      { title: "Zahlen von 0 bis 20", words: [
        ["núla", "null"], ["jédan", "eins (männlich)"], ["jédna", "eins (weiblich)"], ["jédno", "eins (sächlich)"], ["dvá", "zwei (männlich)"], ["dvé", "zwei (weiblich)"],
        ["dvóje", "zwei (Gruppe, Kinder)"], ["trí", "drei"], ["četíri", "vier"], ["pét", "fünf"], ["šést", "sechs"], ["sédam", "sieben"], ["ósam", "acht"],
        ["dévet", "neun"], ["déset", "zehn"], ["jedánaest", "elf"], ["dvánaest", "zwölf"], ["trínaest", "dreizehn"], ["četŕnaest", "vierzehn"],
        ["pétnaest", "fünfzehn"], ["šésnaest", "sechzehn"], ["sédamnaest", "siebzehn"], ["ósamnaest", "achtzehn"], ["devétnaest", "neunzehn"], ["dvádeset", "zwanzig"]
      ]},
      { title: "Zehner, Hunderter, Tausender", words: [
        ["dvádeset jédan", "einundzwanzig"], ["dvádeset dvá", "zweiundzwanzig"], ["trídeset", "dreißig"], ["četŕdeset", "vierzig"], ["pedéset", "fünfzig"],
        ["šezdéset", "sechzig"], ["sedámdeset", "siebzig"], ["osámdeset", "achtzig"], ["devédeset", "neunzig"], ["stó", "hundert"], ["stó jédan", "hunderteins"],
        ["dvésta", "zweihundert"], ["trísta", "dreihundert"], ["čétiristo", "vierhundert"], ["pétsto", "fünfhundert"], ["šésto", "sechshundert"],
        ["sédamsto", "siebenhundert"], ["ósamsto", "achthundert"], ["dévetsto", "neunhundert"], ["híljada", "tausend"], ["dvé híljade", "zweitausend"],
        ["déset híljada", "zehntausend"], ["stó híljada", "hunderttausend"], ["milión", "Million"], ["milijárda", "Milliarde"]
      ]},
      { title: "Ordnungszahlen & Reihenfolge", words: [
        ["pŕvi", "erster"], ["drúgi", "zweiter"], ["tréći", "dritter"], ["četvŕti", "vierter"], ["péti", "fünfter"], ["šésti", "sechster"], ["sédmi", "siebter"],
        ["ósmi", "achter"], ["déveti", "neunter"], ["déseti", "zehnter"], ["jedánaesti", "elfter"], ["dvánaesti", "zwölfter"], ["dvádeseti", "zwanzigster"],
        ["stóti", "hundertster"], ["póslednji", "letzter"], ["pŕvi pút", "das erste Mal"], ["drúgi pút", "das zweite Mal"], ["póslednji pút", "das letzte Mal"],
        ["pŕvo", "erstens"], ["drúgo", "zweitens"], ["tréće", "drittens"], ["nájpre", "zuerst"], ["zátim", "dann / danach"], ["na kráju", "am Schluss"], ["konáčno", "schließlich"]
      ]},
      { title: "Mengenwörter", words: [
        ["mnógo", "viel"], ["málo", "wenig"], ["nékoliko", "einige"], ["sváki", "jeder"], ["níjedan", "keiner"], ["néki", "irgendein / manche"], ["céo", "ganz"],
        ["póla", "halb / Hälfte"], ["četvŕtina", "Viertel"], ["déo", "Teil"], ["pár", "Paar / ein paar"], ["túce", "Dutzend"], ["víše", "mehr"], ["mánje", "weniger"],
        ["nájviše", "am meisten"], ["nájmanje", "am wenigsten"], ["dovóljno", "genug"], ["préviše", "zu viel"], ["prémalo", "zu wenig"], ["níšta", "nichts"],
        ["své", "alles"], ["néšto", "etwas"], ["óstatak", "Rest"], ["pún", "voll"], ["prázan", "leer"]
      ]},
      { title: "Maße & Rechnen", words: [
        ["métar", "Meter"], ["centímetar", "Zentimeter"], ["milímetar", "Millimeter"], ["kilómetar", "Kilometer"], ["kvadrátni métar", "Quadratmeter"],
        ["lítar", "Liter"], ["grám", "Gramm"], ["kilógram", "Kilogramm"], ["tóna", "Tonne"], ["procénat", "Prozent"], ["plús", "plus"], ["mínus", "minus"],
        ["púta", "mal"], ["podéljeno", "geteilt durch"], ["jédnako", "gleich"], ["zbír", "Summe"], ["rázlika", "Unterschied"], ["brój", "Zahl / Nummer"],
        ["cífra", "Ziffer"], ["račúnati", "rechnen"], ["brójati", "zählen"], ["težína", "Gewicht"], ["vísina", "Höhe"], ["širína", "Breite"], ["dužína", "Länge"]
      ]}
    ],
    sentences: [
      ["Brójim od jédan do déset.", "Ich zähle von eins bis zehn."],
      ["Dvá plús trí je pét.", "Zwei plus drei ist fünf."],
      ["Déset mínus četíri je šést.", "Zehn minus vier ist sechs."],
      ["Kóliko to kóšta? – Stó dínara.", "Was kostet das? – Hundert Dinar."],
      ["Tréba mi pétsto grámova síra.", "Ich brauche fünfhundert Gramm Käse."],
      ["Mój brój telefóna je núla jédan, dvá, trí, četíri.", "Meine Telefonnummer ist null eins, zwei, drei, vier."],
      ["Stán je na tréćem spratu.", "Die Wohnung ist im dritten Stock."],
      ["Ovo je pŕvi pút da sam óvde.", "Das ist das erste Mal, dass ich hier bin."],
      ["Mnógo hvála, imám dovóljno.", "Vielen Dank, ich habe genug."],
      ["Dóšlo je nékoliko ljúdi.", "Es sind einige Leute gekommen."],
      ["Pola kilógrama, mólim.", "Ein halbes Kilo, bitte."],
      ["To je dva kilométra ód óvde.", "Das ist zwei Kilometer von hier."],
      ["Svákog dána sam óvde.", "Ich bin jeden Tag hier."],
      ["Mój stán ima šezdéset kvadráta.", "Meine Wohnung hat sechzig Quadratmeter."],
      ["Ukúpno je to stó évra.", "Insgesamt sind das hundert Euro."]
    ],
    dialogs: [
      { title: "Auf dem Markt", lines: [
        ["Prodavac", "Izvólite, šta želíte?", "Bitte schön, was möchten Sie?"],
        ["Kupac", "Kóliko kóštaju jábuke?", "Was kosten die Äpfel?"],
        ["Prodavac", "Šezdéset dínara kílo.", "Sechzig Dinar das Kilo."],
        ["Kupac", "Dájte mi dvá kílograma, mólim.", "Geben Sie mir bitte zwei Kilogramm."],
        ["Prodavac", "Izvólite. Još néšto?", "Bitte sehr. Noch etwas?"],
        ["Kupac", "Ne, to je sve. Kóliko je ukúpno?", "Nein, das ist alles. Wie viel macht es zusammen?"],
        ["Prodavac", "Stó dvádeset dínara.", "Hundertzwanzig Dinar."]
      ]},
      { title: "Telefonnummer austauschen", lines: [
        ["Ana", "Kóji je váš brój telefóna?", "Wie lautet Ihre Telefonnummer?"],
        ["Marko", "Núla šést dvá, četíri, pét, šést, sédam.", "Null sechs zwei, vier, fünf, sechs, sieben."],
        ["Ana", "Mólim? Ponóvite spórije.", "Wie bitte? Wiederholen Sie es langsamer."],
        ["Marko", "Núla, šést, dvá, četíri, pét, šést, sédam.", "Null, sechs, zwei, vier, fünf, sechs, sieben."],
        ["Ana", "Hvála, zapísala sam.", "Danke, ich habe es aufgeschrieben."]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 4
  {
    id: 4, part: "Erste Schritte",
    title: "Zeit, Datum & Kalender",
    goal: "Uhrzeit, Tageszeiten, Wochentage, Monate, Jahreszeiten, Datum, Feiertage und Termine.",
    grammar: {
      title: "Zeitangaben",
      text: [
        "Uhrzeit: Koliko je sati? – Pet je sati. „Pet i po“ heißt 5:30, im Deutschen sagt man dafür „halb sechs“. Pet i četvrt = Viertel nach fünf, četvrt do pet = Viertel vor fünf.",
        "Wochentage und Uhrzeit mit „u“ + Akkusativ: u petak (am Freitag), u podne (mittags), u dvanaest sati (um zwölf Uhr). Monate mit „u“ + Lokativ: u maju (im Mai).",
        "Termine: Mogu li da zakažem termin? Mogu li da pomerim termin? So bittest du höflich um einen anderen Zeitpunkt."
      ]
    },
    groups: [
      { title: "Uhrzeit", words: [
        ["sát", "Stunde / Uhr"], ["mínut", "Minute"], ["sekúnda", "Sekunde"], ["čétvrt", "Viertel"], ["kóliko je sáti", "wie spät ist es"], ["u kóliko sáti", "um wie viel Uhr"],
        ["u dvá sáta", "um zwei Uhr"], ["pét i po", "halb sechs (5:30)"], ["čétvrt do pét", "Viertel vor fünf"], ["pét i čétvrt", "Viertel nach fünf"], ["pódne", "Mittag"],
        ["ponóć", "Mitternacht"], ["prépodne", "Vormittag"], ["pópodne", "Nachmittag"], ["ránije", "früher"], ["kásnije", "später"], ["na vréme", "rechtzeitig"],
        ["kásniti", "zu spät kommen"], ["budílnik", "Wecker"], ["rúčni sát", "Armbanduhr"], ["zídni sát", "Wanduhr"], ["ráno", "früh"], ["kásno", "spät"],
        ["vrémenska zóna", "Zeitzone"], ["létnje vréme", "Sommerzeit"]
      ]},
      { title: "Tageszeiten & Zeitpunkte", words: [
        ["jútro", "Morgen"], ["véče", "Abend"], ["nóć", "Nacht"], ["dán", "Tag"], ["dánas", "heute"], ["sútra", "morgen"], ["prekosútra", "übermorgen"],
        ["júče", "gestern"], ["prekjúče", "vorgestern"], ["sáda", "jetzt"], ["ódmah", "sofort"], ["úskoro", "bald"], ["nedávno", "kürzlich"], ["nékad", "einmal / irgendwann"],
        ["úvek", "immer"], ["níkad", "nie"], ["pónekad", "manchmal"], ["čésto", "oft"], ["rétko", "selten"], ["svákog dána", "jeden Tag"], ["dánju", "tagsüber"],
        ["nóću", "nachts"], ["ujútru", "morgens"], ["uvéče", "abends"], ["céo dán", "den ganzen Tag"]
      ]},
      { title: "Wochentage & Woche", words: [
        ["ponedéljak", "Montag"], ["útorak", "Dienstag"], ["sréda", "Mittwoch"], ["čétvrtak", "Donnerstag"], ["pétak", "Freitag"], ["súbota", "Samstag"],
        ["nédelja", "Sonntag / Woche"], ["rádni dán", "Werktag"], ["víkend", "Wochenende"], ["slóbodan dán", "freier Tag"], ["óve nedélje", "diese Woche"],
        ["slédeće nedélje", "nächste Woche"], ["próšle nedélje", "letzte Woche"], ["svákog ponedéljka", "jeden Montag"], ["u pónedeljak", "am Montag"], ["u útorak", "am Dienstag"],
        ["u srédu", "am Mittwoch"], ["u čétvrtak", "am Donnerstag"], ["u pétak", "am Freitag"], ["u súbotu", "am Samstag"], ["u nedélju", "am Sonntag"],
        ["svákog víkenda", "jedes Wochenende"], ["jédnom nedéljno", "einmal pro Woche"], ["dvá púta nedéljno", "zweimal pro Woche"], ["céla nedélja", "die ganze Woche"]
      ]},
      { title: "Monate & Jahreszeiten", words: [
        ["jánuar", "Jänner"], ["fébruar", "Februar"], ["márt", "März"], ["ápril", "April"], ["máj", "Mai"], ["jún", "Juni"], ["júl", "Juli"], ["ávgust", "August"],
        ["septémbar", "September"], ["októbar", "Oktober"], ["novémbar", "November"], ["decémbar", "Dezember"], ["mésec", "Monat"], ["gódina", "Jahr"], ["proléće", "Frühling"],
        ["léto", "Sommer"], ["jésen", "Herbst"], ["zíma", "Winter"], ["pólugodište", "Halbjahr"], ["stóleće", "Jahrhundert"], ["décenija", "Jahrzehnt"],
        ["óve gódine", "heuer / dieses Jahr"], ["slédeće gódine", "nächstes Jahr"], ["próšle gódine", "letztes Jahr"], ["u léto", "im Sommer"]
      ]},
      { title: "Datum, Termine & Feste", words: [
        ["dátum", "Datum"], ["kalendár", "Kalender"], ["kóji je dátum", "welches Datum ist heute"], ["godíšnjica", "Jahrestag"], ["rođéndan", "Geburtstag"],
        ["práznik", "Feiertag"], ["Bóžić", "Weihnachten"], ["Úskrs", "Ostern"], ["Nóva gódina", "Neujahr / Silvester"], ["sláva", "Slava (Familienfest)"],
        ["Svéti Sáva", "Sankt Sava (27. Jänner)"], ["Đúrđevdan", "Georgstag (6. Mai)"], ["Prvi máj", "1. Mai"], ["godíšnji ódmor", "Jahresurlaub"], ["ódmor", "Urlaub / Erholung"],
        ["rók", "Frist"], ["términ", "Termin"], ["zakázati", "vereinbaren / ansetzen"], ["otkázati", "absagen"], ["pomériti", "verschieben"], ["pozívnica", "Einladung"],
        ["pozváti", "einladen"], ["prosláva", "Feier"], ["dóček", "Silvesterfeier / Empfang"], ["praznóvati", "feiern"]
      ]}
    ],
    sentences: [
      ["Kóliko je sáti? – Pét je sáti.", "Wie spät ist es? – Es ist fünf Uhr."],
      ["U kóliko sáti póčinje sástanak?", "Um wie viel Uhr beginnt die Besprechung?"],
      ["Sástanak počínje u devét i po.", "Die Besprechung beginnt um halb zehn."],
      ["Stígao sam na vréme.", "Ich bin rechtzeitig angekommen."],
      ["Žáo mi je, kásnim pét mínuta.", "Es tut mir leid, ich komme fünf Minuten zu spät."],
      ["Dánas je pétak, a sútra je súbota.", "Heute ist Freitag und morgen ist Samstag."],
      ["U pónedeljak imám términ kod dóktora.", "Am Montag habe ich einen Termin beim Arzt."],
      ["Vídimo se u srédu u pódne.", "Wir sehen uns am Mittwoch zu Mittag."],
      ["Kóji je danášnji dátum?", "Welches Datum ist heute?"],
      ["Dánas je dvádeset péti októbar.", "Heute ist der fünfundzwanzigste Oktober."],
      ["Mój rođéndan je u máju.", "Mein Geburtstag ist im Mai."],
      ["Léti vólim da íđem na móre.", "Im Sommer fahre ich gern ans Meer."],
      ["Óve gódine idém na ódmor u Sŕbiju.", "Heuer fahre ich auf Urlaub nach Serbien."],
      ["Mógu li da pomérim términ?", "Kann ich den Termin verschieben?"],
      ["Hvála na pozívnici, rádo ću dóći.", "Danke für die Einladung, ich komme gern."]
    ],
    dialogs: [
      { title: "Besichtigung vereinbaren", lines: [
        ["Kupac", "Dóbar dan! Želím da zakážem razglédanje stána.", "Guten Tag! Ich möchte eine Wohnungsbesichtigung vereinbaren."],
        ["Agent", "Dóbar dan! Kada vam odgovára?", "Guten Tag! Wann passt es Ihnen?"],
        ["Kupac", "U srédu, ako je móguće.", "Am Mittwoch, wenn es möglich ist."],
        ["Agent", "U srédu imám slóbodan términ u déset sáti.", "Am Mittwoch habe ich um zehn Uhr einen freien Termin."],
        ["Kupac", "Odlično. Mógu li da dóđem u dvánaest?", "Ausgezeichnet. Kann ich auch um zwölf kommen?"],
        ["Agent", "Móže. Dvánaest sáti, u srédu. Vídimo se!", "Geht. Zwölf Uhr, am Mittwoch. Bis dann!"]
      ]},
      { title: "Verabredung unter Freunden", lines: [
        ["Ana", "Šta rádiš u súbotu?", "Was machst du am Samstag?"],
        ["Marko", "Za sad níšta. Što pítaš?", "Vorerst nichts. Warum fragst du?"],
        ["Ana", "Idémo na rúčak u pódne. Hóćeš da dóđeš?", "Wir gehen mittags essen. Willst du kommen?"],
        ["Marko", "Rádo! U kóliko sáti?", "Gern! Um wie viel Uhr?"],
        ["Ana", "U dvánaest, ispred restórana.", "Um zwölf, vor dem Restaurant."],
        ["Marko", "Dóbro, vídimo se u súbotu u pódne!", "Gut, wir sehen uns am Samstag zu Mittag!"]
      ]}
    ]
  },

  // ------------------------------------------------------------------ 5
  {
    id: 5, part: "Menschen",
    title: "Familie & Beziehungen",
    goal: "Kernfamilie, Verwandtschaft, Heirat, Freundschaft und die wichtigen Ereignisse im Leben.",
    grammar: {
      title: "Besitz, „haben“ und Mehrzahl in der Familie",
      text: [
        "mein: moj (m), moja (f), moje (n): moj otac, moja majka, moje dete. Ebenso tvoj/tvoja/tvoje, naš/naša/naše, vaš/vaša/vaše.",
        "imati (haben): imam, imaš, ima, imamo, imate, imaju. Verneinung: nemam, nemaš, nema, nemamo, nemate, nemaju.",
        "Unregelmäßig: brat → braća (Brüder, Geschwister), sestra → sestre, dete → deca (Kinder), čovek → ljudi (Leute)."
      ]
    },
    groups: [
      { title: "Kernfamilie", words: [
        ["pórodica", "Familie"], ["róditelji", "Eltern"], ["májka", "Mutter"], ["ótac", "Vater"], ["máma", "Mama"], ["táta", "Papa"], ["sín", "Sohn"], ["ćérka", "Tochter"],
        ["déte", "Kind"], ["déca", "Kinder"], ["brát", "Bruder"], ["séstra", "Schwester"], ["blizánci", "Zwillinge"], ["jedínac", "Einzelkind (männlich)"], ["jedínica", "Einzelkind (weiblich)"],
        ["béba", "Baby"], ["déčak", "Bub"], ["devójčica", "Mädchen"], ["stáriji brát", "älterer Bruder"], ["mláđi brát", "jüngerer Bruder"], ["stárija séstra", "ältere Schwester"],
        ["mláđa séstra", "jüngere Schwester"], ["bráća", "Brüder / Geschwister"], ["séstre", "Schwestern"], ["bráća i séstre", "Geschwister"]
      ]},
      { title: "Verwandte", words: [
        ["báka", "Oma"], ["déda", "Opa"], ["únuk", "Enkel"], ["únuka", "Enkelin"], ["únuci", "Enkelkinder"], ["tétka", "Tante"], ["újak", "Onkel (mütterlich)"], ["stríc", "Onkel (väterlich)"],
        ["stríca", "Frau des väterlichen Onkels"], ["újna", "Frau des mütterlichen Onkels"], ["róđak", "Cousin"], ["rođáka", "Cousine"], ["néćak", "Neffe"], ["nećáka", "Nichte"],
        ["kúm", "Trauzeuge / Pate"], ["kúma", "Trauzeugin / Patin"], ["prédak", "Vorfahre"], ["predáci", "Vorfahren"], ["pótomak", "Nachkomme"], ["rodbína", "Verwandtschaft"],
        ["pórodično stáblo", "Stammbaum"], ["blízak", "nah / eng"], ["dálji róđak", "entfernter Verwandter"], ["prádeda", "Urgroßvater"], ["prábaka", "Urgroßmutter"]
      ]},
      { title: "Heirat & Familienstand", words: [
        ["múž", "Ehemann"], ["žéna", "Frau / Ehefrau"], ["súpruga", "Gattin"], ["súprug", "Gatte"], ["óženjen", "verheiratet (Mann)"], ["údata", "verheiratet (Frau)"], ["neóženjen", "ledig (Mann)"],
        ["neúdata", "ledig (Frau)"], ["razvéden", "geschieden (Mann)"], ["razvedéna", "geschieden (Frau)"], ["udóvac", "Witwer"], ["udóvica", "Witwe"], ["záručen", "verlobt"],
        ["záručnik", "Verlobter"], ["záručnica", "Verlobte"], ["verídba", "Verlobung"], ["venčánje", "Trauung"], ["svádba", "Hochzeit (Feier)"], ["mláda", "Braut"],
        ["mladožénja", "Bräutigam"], ["bráčni par", "Ehepaar"], ["médeni mésec", "Flitterwochen"], ["svékar", "Schwiegervater"], ["svékrva", "Schwiegermutter"], ["snája", "Schwiegertochter"]
      ]},
      { title: "Freunde & Beziehungen", words: [
        ["prijátelj", "Freund"], ["prijáteljica", "Freundin"], ["drúg", "Freund / Kamerad"], ["drúgarica", "Freundin / Kameradin"], ["drúštvo", "Freundeskreis / Gesellschaft"],
        ["kómšija", "Nachbar"], ["poznánik", "Bekannter"], ["poznánica", "Bekannte"], ["góst", "Gast"], ["domáćin", "Gastgeber"], ["domáćica", "Gastgeberin"], ["mómak", "Freund / Bursche"],
        ["dévojka", "Freundin / junge Frau"], ["déčko", "Freund (umgangssprachlich)"], ["ljúbav", "Liebe"], ["zaljúbljen", "verliebt"], ["sviđáti se", "gefallen"], ["viđáti se", "sich treffen"],
        ["upoznáti", "kennenlernen"], ["povérenje", "Vertrauen"], ["pódrška", "Unterstützung"], ["prijáteljstvo", "Freundschaft"], ["nájbolji prijátelj", "bester Freund"],
        ["nájbolja prijáteljica", "beste Freundin"], ["stári prijátelj", "alter Freund"]
      ]},
      { title: "Lebensabschnitte & Ereignisse", words: [
        ["rođénje", "Geburt"], ["détinjstvo", "Kindheit"], ["mládost", "Jugend"], ["stárost", "Alter"], ["žívot", "Leben"], ["smŕt", "Tod"], ["sahrána", "Begräbnis"], ["kŕštenje", "Taufe"],
        ["školovánje", "Schulbildung"], ["penzíja", "Pension"], ["penzióner", "Pensionist"], ["odrástati", "aufwachsen"], ["rodíti se", "geboren werden"], ["úmreti", "sterben"],
        ["naslédstvo", "Erbe"], ["testámenat", "Testament"], ["naslédnik", "Erbe (Person)"], ["pokójnik", "Verstorbener"], ["sáučešće", "Beileid"], ["žálost", "Trauer"],
        ["rádost", "Freude"], ["slávlje", "Fest / Feier"], ["iznenáđenje", "Überraschung"], ["dár", "Geschenk"], ["trúdnica", "Schwangere"]
      ]}
    ],
    sentences: [
      ["Óvo je mója pórodica.", "Das ist meine Familie."],
      ["Imám dvóje déce, sína i ćérku.", "Ich habe zwei Kinder, einen Sohn und eine Tochter."],
      ["Mója žéna se zóve Mílena.", "Meine Frau heißt Milena."],
      ["Mój brát živi u Béogradu.", "Mein Bruder lebt in Belgrad."],
      ["Móji róditelji su penzióneri.", "Meine Eltern sind Pensionisten."],
      ["Imáš li bráće i séstara?", "Hast du Geschwister?"],
      ["Jesi li óženjen?", "Bist du verheiratet?"],
      ["Mója ćérka íde u škólu.", "Meine Tochter geht zur Schule."],
      ["Mój sín je stúdent.", "Mein Sohn ist Student."],
      ["Náša báka i déda žíve na sélu.", "Unsere Oma und unser Opa leben auf dem Land."],
      ["Imámo dvóje unúka.", "Wir haben zwei Enkelkinder."],
      ["Mój újak ima restóran.", "Mein Onkel hat ein Restaurant."],
      ["Slávimo našu slávu sváke gódine.", "Wir feiern unsere Slava jedes Jahr."],
      ["Pórodica mi je véoma vážna.", "Die Familie ist mir sehr wichtig."],
      ["Móji prijátelji su mi kao pórodica.", "Meine Freunde sind für mich wie Familie."]
    ],
    dialogs: [
      { title: "Über die Familie sprechen", lines: [
        ["Ana", "Imáš li bráće i séstara?", "Hast du Geschwister?"],
        ["Marko", "Imám jédnu séstru i jédnog bráta.", "Ich habe eine Schwester und einen Bruder."],
        ["Ana", "A tvóji róditelji?", "Und deine Eltern?"],
        ["Marko", "Žíve u Nóvom Sádu. Mój ótac je penzióner.", "Sie leben in Novi Sad. Mein Vater ist Pensionist."],
        ["Ana", "Imáš li déce?", "Hast du Kinder?"],
        ["Marko", "Imám ćérku. Ima pét gódina.", "Ich habe eine Tochter. Sie ist fünf Jahre alt."],
        ["Ana", "Kóliko lépo!", "Wie schön!"]
      ]},
      { title: "Gäste zu Hause", lines: [
        ["Domaćin", "Dóbro dóšli! Óvo je mója žéna Mílena.", "Herzlich willkommen! Das ist meine Frau Milena."],
        ["Gost", "Drágo mi je, gospóđo.", "Freut mich, gnädige Frau."],
        ["Domaćica", "Drágo mi je. Izvólite, ulázite.", "Freut mich. Bitte, kommen Sie herein."],
        ["Gost", "A óvo su váša déca?", "Und das sind Ihre Kinder?"],
        ["Domaćica", "Da, sín i ćérka. Rádi su što ste dóšli.", "Ja, Sohn und Tochter. Sie freuen sich, dass Sie gekommen sind."]
      ]}
    ]
  }
);
