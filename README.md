# Serbisch für Anfänger

Einsteigerkurs Serbisch für deutschsprachige Lernende, aufgebaut wie ein Sprachkurs: **10 Lektionen, 500 Vokabeln, 100 Alltagssätze**. Alles in **lateinischer Schrift** (kein Kyrillisch), mit Lautschrift für **österreichisches Deutsch**.

## Lektionen

| # | Thema |
|---|---|
| 1 | Begrüßung & Vorstellung |
| 2 | Zahlen, Zeit & Wochentage |
| 3 | Familie & Menschen |
| 4 | Smalltalk: Wetter, Gefühle, Hobbys |
| 5 | Essen & Trinken |
| 6 | Einkaufen & Geld |
| 7 | Reisen & Verkehr |
| 8 | Wohnen & Immobilien |
| 9 | Gesundheit & Körper |
| 10 | Arbeit & Alltag |

Jede Lektion hat sechs Schritte: Dialog hören, 50 Vokabeln (in Blöcken zu 10), 10 Sätze, Grammatik-Tipp, drei Übungen (Vokabelquiz, Hören & Verstehen, Lückentext) und einen Lektionstest (ab 80 % bestanden).

## Ton

In den Lernkarten, Dialogen und Listen ist die deutsche Übersetzung immer sichtbar; nur in den Prüfungen (Quiz, Hören, Lückentext, Lektionstest) ist sie verborgen.

Jedes neue Wort, jeder neue Satz und jeder Dialog wird automatisch vorgesprochen. Der Ton kommt aus der Sprachausgabe des Browsers; die Stimme kann in den Einstellungen gewählt werden. Ohne installierte serbische Stimme wird ersatzweise eine kroatische oder bosnische verwendet.

## Benutzen

`index.html` im Browser öffnen, es wird kein Server benötigt. Als Webseite: in den GitHub-Einstellungen unter *Pages* den Branch auswählen. Der Lernfortschritt wird im Browser gespeichert.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Oberfläche und Styling |
| `app.js` | Menü, Lektionen, Karten, Übungen, Ton |
| `data.js` | Alle Lektionen (hier erweitern oder korrigieren) |

In `data.js` steht die Betonung als Akzent auf dem betonten Vokal (á é í ó ú, ŕ). Daraus entstehen die normale Schreibweise und die Lautschrift automatisch.
