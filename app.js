(function () {
  "use strict";

  const app = document.getElementById("app");
  const backBtn = document.getElementById("back");
  const crumb = document.getElementById("crumb");
  const STORE = "serbisch-kurs-v2";

  // ---------- Daten ----------
  const mk = (list, kind) => list.map((r, i) => ({
    key: kind + ":" + r[0], kind: kind, n: i + 1, sr: r[0], de: r[1], pr: r[2], cat: r[3]
  }));
  const W = mk(WORDS, "w");
  const SN = mk(SENTENCES, "s");
  const ALL = W.concat(SN);
  const byKey = {};
  ALL.forEach((x) => { byKey[x.key] = x; });

  // ---------- Speicher (nur Komfort, App läuft auch ohne) ----------
  let S = {};
  try { S = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { S = {}; }
  S.known = S.known || {};
  S.weak = S.weak || {};
  S.set = Object.assign({ auto: true, slow: false, voice: "" }, S.set);
  const persist = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* ignorieren */ } };

  // ---------- Hilfsfunktionen ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const cats = (list) => list.reduce((o, x) => (o.indexOf(x.cat) < 0 ? o.concat(x.cat) : o), []);
  const $ = (id) => document.getElementById(id);
  const countKnown = (list) => list.filter((x) => S.known[x.key]).length;
  const weakItems = () => ALL.filter((x) => S.weak[x.key]);
  const mark = (x, good) => {
    if (good) { delete S.weak[x.key]; } else { S.weak[x.key] = true; delete S.known[x.key]; }
    persist();
  };

  // ---------- Sprachausgabe ----------
  const synth = window.speechSynthesis || null;
  let voices = [];
  const loadVoices = () => { if (synth) voices = synth.getVoices(); };
  if (synth) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", loadVoices);
  }
  const lang = (v) => v.lang.toLowerCase().replace("_", "-");
  function pickVoice() {
    if (S.set.voice) {
      const m = voices.filter((v) => v.voiceURI === S.set.voice)[0];
      if (m) return m;
    }
    for (const p of ["sr", "hr", "bs"]) {
      const v = voices.filter((x) => lang(x).indexOf(p) === 0)[0];
      if (v) return v;
    }
    return null;
  }
  function voiceStatus() {
    if (!synth) return { ok: false, text: "Dieser Browser hat keine Sprachausgabe. Der Kurs funktioniert, aber ohne Ton." };
    const v = pickVoice();
    if (!v) return { ok: false, text: "Auf diesem Gerät ist keine serbische, kroatische oder bosnische Stimme installiert. Die Aussprache ist dann nicht korrekt." };
    if (lang(v).indexOf("sr") === 0) return { ok: true, text: "Serbische Stimme: " + v.name + " (" + v.lang + ")" };
    return { ok: false, text: "Keine serbische Stimme auf diesem Gerät. Ersatzweise: " + v.name + " (" + v.lang + "). Die Aussprache ist ähnlich, aber nicht ganz korrekt." };
  }
  function say(text, slowOnce) {
    if (!synth || !text) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    u.lang = v ? v.lang : "sr-RS";
    if (v) u.voice = v;
    u.rate = slowOnce || S.set.slow ? 0.65 : 0.9;
    setTimeout(() => synth.speak(u), 40);
  }
  const autoSay = (text) => { if (S.set.auto) say(text); };
  const earBtn = (text, label) =>
    synth ? '<button class="btn ear" data-say="' + esc(text) + '">' + (label || "Anhören") + "</button>" : "";

  // ---------- Navigation ----------
  const TITLES = {
    start: "Hauptmenü", woerter: "Wörter lernen", saetze: "Sätze lernen", wiederholen: "Wiederholen",
    wortquiz: "Vokabelquiz", satzquiz: "Satzquiz", hoeren: "Hören & Verstehen",
    nachschlagen: "Nachschlagen", aussprache: "Aussprache", einstellungen: "Einstellungen"
  };
  const ROUTES = {
    start: home,
    woerter: () => study({ kind: "w" }),
    saetze: () => study({ kind: "s" }),
    wiederholen: () => study({ kind: "weak" }),
    wortquiz: () => quiz("w"),
    satzquiz: () => quiz("s"),
    hoeren: listening,
    nachschlagen: lookup,
    aussprache: sounds,
    einstellungen: settings
  };
  function go(name) {
    if (!ROUTES[name]) name = "start";
    if (synth) synth.cancel();
    app.innerHTML = "";
    backBtn.hidden = name === "start";
    crumb.textContent = name === "start" ? "Lateinische Schrift · mit Ton · Lautschrift für Österreich" : TITLES[name];
    ROUTES[name]();
    window.scrollTo(0, 0);
    try { history.replaceState(null, "", "#" + name); } catch (e) { /* ignorieren */ }
  }
  backBtn.addEventListener("click", () => go("start"));
  $("gear").addEventListener("click", () => go("einstellungen"));
  app.addEventListener("click", (e) => {
    const s = e.target.closest("[data-say]");
    if (s) { e.stopPropagation(); say(s.getAttribute("data-say")); return; }
    const g = e.target.closest("[data-go]");
    if (g) go(g.getAttribute("data-go"));
  });

  const catSelect = (list, id) =>
    '<select id="' + id + '" aria-label="Kategorie"><option value="">Alle Themen</option>' +
    cats(list).map((c) => "<option>" + esc(c) + "</option>").join("") + "</select>";
  const bar = (v, max) => '<div class="bar"><i style="width:' + (max ? Math.round(v / max * 100) : 0) + '%"></i></div>';

  // ---------- Hauptmenü ----------
  function home() {
    const kw = countKnown(W), ks = countKnown(SN), weak = weakItems().length;
    const item = (go, title, desc, meta, extra) =>
      '<button class="item" data-go="' + go + '"><span class="t">' + title + '</span><span class="d">' + desc + "</span>" +
      (meta || "") + "</button>";
    const status = voiceStatus();
    app.innerHTML =
      (status.ok ? "" : '<p class="note">' + esc(status.text) + ' <button class="btn" data-go="einstellungen">Stimme wählen</button></p>') +
      '<section class="panel path"><h2>Empfohlener Lernweg</h2><ol>' +
      '<li><button class="link" data-go="aussprache">Aussprache kennenlernen</button><span class="muted">5 Minuten</span></li>' +
      '<li><button class="link" data-go="woerter">Wörter lernen</button><span class="muted">je Thema ein paar Karten</span></li>' +
      '<li><button class="link" data-go="saetze">Sätze lernen</button><span class="muted">mit Ton mitsprechen</span></li>' +
      '<li><button class="link" data-go="hoeren">Hören & Quiz</button><span class="muted">Gelerntes prüfen</span></li></ol></section>' +

      '<h2 class="grp">Lernen</h2><div class="menu">' +
      item("woerter", "Wörter lernen", W.length + " Wörter als Karteikarten, jedes Wort wird vorgesprochen.",
        '<span class="m">' + kw + " von " + W.length + " gewusst</span>" + bar(kw, W.length)) +
      item("saetze", "Sätze lernen", SN.length + " Alltagssätze für Begrüßung, Smalltalk, Familie, Reisen, Einkaufen.",
        '<span class="m">' + ks + " von " + SN.length + " gewusst</span>" + bar(ks, SN.length)) +
      "</div>" +

      '<h2 class="grp">Üben</h2><div class="menu">' +
      item("wortquiz", "Vokabelquiz", "Wort sehen und hören, richtige Übersetzung wählen.") +
      item("satzquiz", "Satzquiz", "Sätze verstehen und die passende Übersetzung finden.") +
      item("hoeren", "Hören & Verstehen", "Nur zuhören, ohne Text: Was wurde gesagt?") +
      item("wiederholen", "Wiederholen", "Alles, was du nicht gewusst hast, noch einmal.",
        '<span class="m">' + (weak ? weak + " offen" : "nichts offen") + "</span>") +
      "</div>" +

      '<h2 class="grp">Nachschlagen</h2><div class="menu">' +
      item("nachschlagen", "Alle Wörter & Sätze", "Suchen und anhören, nach Themen sortiert.") +
      item("aussprache", "Aussprache-Hilfe", "č, ć, š, ž, đ und mehr in deutscher Lautschrift.") +
      item("einstellungen", "Einstellungen", "Ton, Tempo, Stimme, Fortschritt löschen.") +
      "</div>";
  }

  // ---------- Lernen mit Karteikarten (Wörter, Sätze, Wiederholen) ----------
  function study(o) {
    const review = o.kind === "weak";
    const base = review ? weakItems() : (o.kind === "w" ? W : SN);
    let cat = "", dir = "sr", onlyOpen = false, deck = [], idx = 0, flipped = false;

    if (review && !base.length) {
      app.innerHTML = '<div class="panel"><h2>Nichts zu wiederholen</h2><p class="muted">Sobald du bei einer Karte „Nochmal“ wählst oder im Quiz falsch liegst, erscheint sie hier.</p>' +
        '<button class="btn primary" data-go="start">Zum Hauptmenü</button></div>';
      return;
    }
    app.innerHTML =
      '<div class="panel">' +
      '<div class="row">' + (review ? "" : catSelect(base, "cat")) +
      '<select id="dir" aria-label="Richtung"><option value="sr">Serbisch → Deutsch</option><option value="de">Deutsch → Serbisch</option></select>' +
      (review ? "" : '<label class="chk"><input type="checkbox" id="open"> nur offene</label>') + "</div>" +
      '<div class="muted" id="count"></div><div id="fill"></div>' +
      '<div class="card" id="card" role="button" tabindex="0" aria-label="Karte umdrehen"></div>' +
      '<div class="actions"><button class="btn bad" id="again">Nochmal</button>' +
      '<button class="btn" id="flip">Umdrehen</button>' +
      '<button class="btn good" id="known">Gewusst</button></div>' +
      '<div class="actions"><button class="btn" id="shuf">Neu mischen</button><button class="btn" data-go="start">Hauptmenü</button></div></div>';

    const card = $("card");
    const frontIsSr = () => dir === "sr";

    function build() {
      deck = shuffle(base.filter((x) => (!cat || x.cat === cat) && (!onlyOpen || !S.known[x.key])));
      idx = 0; flipped = false; render(true);
    }
    function render(speakNew) {
      const pool = base.filter((x) => !cat || x.cat === cat);
      const known = pool.filter((x) => S.known[x.key]).length;
      $("count").textContent = known + " von " + pool.length + " gewusst" + (deck.length ? " · Karte " + (idx + 1) + " von " + deck.length : "");
      $("fill").innerHTML = bar(known, pool.length);
      if (!deck.length) {
        card.innerHTML = '<div class="big">Alles gewusst</div><div class="hint">Wähle ein anderes Thema oder mische neu.</div>';
        return;
      }
      const x = deck[idx];
      const showSr = frontIsSr() || flipped;
      const sentence = x.kind === "s";
      const main = frontIsSr() ? x.sr : x.de;
      const other = frontIsSr() ? x.de : x.sr;
      card.innerHTML =
        '<div class="hint">' + esc(x.cat) + "</div>" +
        '<div class="big' + (sentence ? " sent" : "") + '">' + esc(main) + "</div>" +
        (showSr ? '<div class="pron">' + esc(x.pr) + "</div>" : "") +
        (flipped ? '<div class="trans' + (sentence ? " sent" : "") + '">' + esc(other) + "</div>" : "") +
        (showSr ? earBtn(x.sr) : "") +
        '<div class="hint">' + (flipped ? "" : "Tippen zum Umdrehen") + "</div>";
      if (speakNew && frontIsSr()) autoSay(x.sr);
    }
    function reveal() {
      if (!deck.length) return;
      flipped = !flipped; render(false);
      if (flipped && !frontIsSr()) autoSay(deck[idx].sr);
    }
    function next() { idx = (idx + 1) % deck.length; flipped = false; render(true); }
    function answer(good) {
      if (!deck.length) return;
      const x = deck[idx];
      mark(x, good);
      if (good) S.known[x.key] = true; persist();
      if (good && (onlyOpen || review)) {
        deck.splice(idx, 1);
        if (idx >= deck.length) idx = 0;
        flipped = false; render(true);
      } else next();
    }

    card.addEventListener("click", (e) => { if (!e.target.closest("[data-say]")) reveal(); });
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); } });
    $("flip").onclick = reveal;
    $("again").onclick = () => answer(false);
    $("known").onclick = () => answer(true);
    $("shuf").onclick = build;
    $("dir").onchange = (e) => { dir = e.target.value; flipped = false; render(true); };
    if (!review) {
      $("cat").onchange = (e) => { cat = e.target.value; build(); };
      $("open").onchange = (e) => { onlyOpen = e.target.checked; build(); };
    }
    build();
  }

  // ---------- Quiz (Wörter, Sätze) ----------
  function quiz(kind) {
    const base = kind === "w" ? W : SN;
    app.innerHTML =
      '<div class="panel" id="qbox"><h2 style="margin-top:0">' + TITLES[kind === "w" ? "wortquiz" : "satzquiz"] + "</h2>" +
      '<div class="row">' + catSelect(base, "qcat") +
      '<select id="qdir" aria-label="Richtung"><option value="sr">Serbisch → Deutsch</option><option value="de">Deutsch → Serbisch</option></select>' +
      '<select id="qn" aria-label="Anzahl"><option value="10">10 Fragen</option><option value="20">20 Fragen</option></select></div>' +
      '<button class="btn primary" id="start">Quiz starten</button></div>';

    $("start").onclick = () => {
      const cat = $("qcat").value, dir = $("qdir").value, n = +$("qn").value;
      let pool = base.filter((x) => !cat || x.cat === cat);
      if (pool.length < 4) pool = base;
      const qs = shuffle(pool).slice(0, n);
      let i = 0, score = 0;
      const wrong = [];
      const box = $("qbox");

      function ask() {
        const x = qs[i];
        let near = base.filter((y) => y.cat === x.cat && y.key !== x.key && y.de !== x.de);
        if (near.length < 3) near = base.filter((y) => y.key !== x.key && y.de !== x.de);
        const options = shuffle([x].concat(shuffle(near).slice(0, 3)));
        box.innerHTML =
          '<div class="muted">Frage ' + (i + 1) + " von " + qs.length + " · " + score + " richtig</div>" + bar(i, qs.length) +
          '<div class="q' + (kind === "s" ? " sent" : "") + '">' + esc(dir === "sr" ? x.sr : x.de) + "</div>" +
          (dir === "sr" ? '<div class="pron">' + esc(x.pr) + "</div>" + earBtn(x.sr) : "") +
          '<div class="opts">' + options.map((o, k) =>
            '<button class="btn" data-k="' + k + '">' + esc(dir === "sr" ? o.de : o.sr) + "</button>").join("") + "</div>" +
          '<div id="fb"></div><div class="actions" id="nx"></div>';
        if (dir === "sr") autoSay(x.sr);
        box.querySelectorAll(".opts button").forEach((b) => {
          b.onclick = () => {
            const ok = options[+b.dataset.k] === x;
            box.querySelectorAll(".opts button").forEach((y) => {
              y.disabled = true;
              if (options[+y.dataset.k] === x) y.classList.add("right");
            });
            if (ok) score++; else { b.classList.add("wrong"); wrong.push(x); }
            mark(x, ok);
            const last = i === qs.length - 1;
            $("fb").innerHTML = '<p class="fb ' + (ok ? "ok" : "no") + '">' + (ok ? "Richtig." : "Nicht ganz.") +
              " <b>" + esc(x.sr) + "</b> = " + esc(x.de) + '</p><div class="pron">' + esc(x.pr) + "</div>" + earBtn(x.sr);
            if (dir === "de") autoSay(x.sr);
            $("nx").innerHTML = '<button class="btn primary" id="go">' + (last ? "Ergebnis" : "Weiter") + "</button>";
            $("go").onclick = () => { i++; last ? done() : ask(); };
            $("go").focus();
          };
        });
      }
      function done() {
        const pct = Math.round(score / qs.length * 100);
        box.innerHTML =
          '<h2 style="margin-top:0">' + score + " von " + qs.length + " richtig (" + pct + " %)</h2>" +
          (wrong.length
            ? '<p class="muted">Diese kommen unter „Wiederholen“ dran:</p><ul class="list">' + wrong.map((w) =>
                '<li><div style="flex:1"><div class="sr">' + esc(w.sr) + "</div><div>" + esc(w.de) + '</div><div class="pr">' + esc(w.pr) + "</div></div>" + earBtn(w.sr) + "</li>").join("") + "</ul>"
            : "<p>Alles richtig.</p>") +
          '<div class="actions"><button class="btn primary" id="again">Nochmal spielen</button>' +
          (wrong.length ? '<button class="btn" data-go="wiederholen">Fehler wiederholen</button>' : "") +
          '<button class="btn" data-go="start">Hauptmenü</button></div>';
        $("again").onclick = () => go(kind === "w" ? "wortquiz" : "satzquiz");
      }
      ask();
    };
  }

  // ---------- Hören & Verstehen ----------
  function listening() {
    if (!synth) {
      app.innerHTML = '<div class="panel"><h2>Hören & Verstehen</h2><p>Dieser Browser hat keine Sprachausgabe, deshalb ist diese Übung nicht möglich.</p><button class="btn primary" data-go="start">Hauptmenü</button></div>';
      return;
    }
    app.innerHTML =
      '<div class="panel" id="lbox"><h2 style="margin-top:0">Hören & Verstehen</h2>' +
      '<p class="muted">Du hörst ein Wort oder einen Satz, der Text bleibt zuerst verborgen. Wähle die richtige deutsche Bedeutung.</p>' +
      '<div class="row"><select id="lk" aria-label="Art"><option value="w">Wörter</option><option value="s">Sätze</option></select>' +
      '<select id="ln" aria-label="Anzahl"><option value="10">10 Aufgaben</option><option value="20">20 Aufgaben</option></select></div>' +
      '<button class="btn primary" id="start">Start</button></div>';
    $("start").onclick = () => {
      const kind = $("lk").value, n = +$("ln").value, base = kind === "w" ? W : SN;
      const qs = shuffle(base).slice(0, n);
      let i = 0, score = 0;
      const wrong = [];
      const box = $("lbox");
      function ask() {
        const x = qs[i];
        let near = base.filter((y) => y.cat === x.cat && y.key !== x.key && y.de !== x.de);
        if (near.length < 3) near = base.filter((y) => y.key !== x.key && y.de !== x.de);
        const options = shuffle([x].concat(shuffle(near).slice(0, 3)));
        box.innerHTML =
          '<div class="muted">Aufgabe ' + (i + 1) + " von " + qs.length + " · " + score + " richtig</div>" + bar(i, qs.length) +
          '<div class="actions"><button class="btn primary" data-say="' + esc(x.sr) + '">Nochmal hören</button>' +
          '<button class="btn" id="slow">Langsam hören</button></div>' +
          '<div class="opts">' + options.map((o, k) => '<button class="btn" data-k="' + k + '">' + esc(o.de) + "</button>").join("") + "</div>" +
          '<div id="fb"></div><div class="actions" id="nx"></div>';
        say(x.sr);
        $("slow").onclick = () => say(x.sr, true);
        box.querySelectorAll(".opts button").forEach((b) => {
          b.onclick = () => {
            const ok = options[+b.dataset.k] === x;
            box.querySelectorAll(".opts button").forEach((y) => {
              y.disabled = true;
              if (options[+y.dataset.k] === x) y.classList.add("right");
            });
            if (ok) score++; else { b.classList.add("wrong"); wrong.push(x); }
            mark(x, ok);
            const last = i === qs.length - 1;
            $("fb").innerHTML = '<p class="fb ' + (ok ? "ok" : "no") + '">' + (ok ? "Richtig." : "Nicht ganz.") +
              " <b>" + esc(x.sr) + "</b> = " + esc(x.de) + '</p><div class="pron">' + esc(x.pr) + "</div>";
            $("nx").innerHTML = '<button class="btn primary" id="go">' + (last ? "Ergebnis" : "Weiter") + "</button>";
            $("go").onclick = () => { i++; last ? done() : ask(); };
            $("go").focus();
          };
        });
      }
      function done() {
        box.innerHTML =
          '<h2 style="margin-top:0">' + score + " von " + qs.length + " richtig</h2>" +
          (wrong.length ? '<p class="muted">Zum Nachhören:</p><ul class="list">' + wrong.map((w) =>
            '<li><div style="flex:1"><div class="sr">' + esc(w.sr) + "</div><div>" + esc(w.de) + "</div></div>" + earBtn(w.sr) + "</li>").join("") + "</ul>" : "<p>Alles richtig verstanden.</p>") +
          '<div class="actions"><button class="btn primary" data-go="hoeren">Nochmal</button><button class="btn" data-go="start">Hauptmenü</button></div>';
      }
      ask();
    };
  }

  // ---------- Nachschlagen ----------
  function lookup() {
    let kind = "s", cat = "", q = "";
    app.innerHTML =
      '<div class="panel"><div class="row"><div class="seg" id="seg">' +
      '<button class="btn" data-kind="w">Wörter</button><button class="btn" data-kind="s">Sätze</button></div>' +
      '<input type="search" id="q" class="grow" placeholder="Suchen (Serbisch oder Deutsch)" aria-label="Suchen"></div>' +
      '<div class="chips" id="chips"></div><div class="muted" id="cnt"></div><ul class="list" id="sl"></ul></div>';
    function draw() {
      const base = kind === "w" ? W : SN;
      document.querySelectorAll("#seg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.kind === kind)));
      $("chips").innerHTML = ["Alle"].concat(cats(base)).map((c) => {
        const on = (c === "Alle" && !cat) || c === cat;
        return '<button class="btn chip" aria-pressed="' + on + '" data-c="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("");
      const term = q.trim().toLowerCase();
      const rows = base.filter((x) => (!cat || x.cat === cat) &&
        (!term || x.sr.toLowerCase().indexOf(term) >= 0 || x.de.toLowerCase().indexOf(term) >= 0));
      $("cnt").textContent = rows.length + " Einträge";
      $("sl").innerHTML = rows.map((x) =>
        '<li><span class="num">' + (kind === "s" ? x.n + "." : "") + '</span><div style="flex:1"><div class="sr">' + esc(x.sr) +
        "</div><div>" + esc(x.de) + '</div><div class="pr">' + esc(x.pr) + "</div></div>" + earBtn(x.sr) + "</li>").join("") ||
        '<li class="muted">Nichts gefunden.</li>';
    }
    $("seg").addEventListener("click", (e) => { const b = e.target.closest("[data-kind]"); if (b) { kind = b.dataset.kind; cat = ""; draw(); } });
    $("chips").addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (b) { cat = b.dataset.c === "Alle" ? "" : b.dataset.c; draw(); } });
    $("q").oninput = (e) => { q = e.target.value; draw(); };
    draw();
  }

  // ---------- Aussprache ----------
  function sounds() {
    app.innerHTML =
      '<div class="panel"><h2 style="margin-top:0">So liest du die Lautschrift</h2>' +
      "<p>Serbisch wird so gesprochen, wie es geschrieben wird: jeder Buchstabe hat genau einen Laut. " +
      "Die Lautschrift ist für österreichisches Deutsch gedacht, die <b>betonte Silbe</b> steht in GROSSBUCHSTABEN.</p>" +
      '<div class="scroll"><table><thead><tr><th>Serbisch</th><th>Aussprache</th><th>Beispiel</th><th></th></tr></thead><tbody>' +
      LEGEND.map((l) => {
        const word = l[2].split(" → ")[0];
        return "<tr><td>" + esc(l[0]) + "</td><td>" + esc(l[1]) + "</td><td>" + esc(l[2]) + "</td><td>" + earBtn(word) + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="muted">Dieser Kurs verwendet nur die lateinische Schrift und den in Serbien üblichen ekavischen Standard (z. B. „mleko“, „lepo“).</p></div>';
  }

  // ---------- Einstellungen ----------
  function settings() {
    const status = voiceStatus();
    const sel = voices.filter((v) => ["sr", "hr", "bs"].some((p) => lang(v).indexOf(p) === 0));
    const cur = pickVoice();
    app.innerHTML =
      '<div class="panel"><h2 style="margin-top:0">Ton</h2>' +
      '<label class="chk"><input type="checkbox" id="auto"' + (S.set.auto ? " checked" : "") + '> Neue Wörter und Sätze automatisch vorsprechen</label>' +
      '<div class="row" style="margin-top:12px"><label for="tempo">Tempo</label><select id="tempo"><option value="n">normal</option><option value="l">langsam</option></select></div>' +
      '<div class="row"><label for="voice">Stimme</label><select id="voice" class="grow">' +
      (sel.length ? sel.map((v) => '<option value="' + esc(v.voiceURI) + '"' + (cur && cur.voiceURI === v.voiceURI ? " selected" : "") + ">" + esc(v.name + " (" + v.lang + ")") + "</option>").join("")
        : '<option value="">keine passende Stimme gefunden</option>') + "</select></div>" +
      '<p class="' + (status.ok ? "fb ok" : "note") + '">' + esc(status.text) + "</p>" +
      '<div class="actions" style="justify-content:flex-start"><button class="btn primary" id="test">Probe hören</button></div></div>' +
      '<div class="panel" style="margin-top:14px"><h2 style="margin-top:0">Fortschritt</h2>' +
      "<p>" + countKnown(W) + " von " + W.length + " Wörtern und " + countKnown(SN) + " von " + SN.length + " Sätzen gewusst. " + weakItems().length + " zum Wiederholen.</p>" +
      '<button class="btn bad" id="reset">Fortschritt löschen</button></div>';
    $("tempo").value = S.set.slow ? "l" : "n";
    $("auto").onchange = (e) => { S.set.auto = e.target.checked; persist(); };
    $("tempo").onchange = (e) => { S.set.slow = e.target.value === "l"; persist(); };
    $("voice").onchange = (e) => { S.set.voice = e.target.value; persist(); settings(); };
    $("test").onclick = () => say("Dobar dan! Kako ste? Drago mi je.");
    let armed = false;
    $("reset").onclick = () => {
      if (!armed) { armed = true; $("reset").textContent = "Wirklich löschen? Nochmal tippen"; return; }
      S.known = {}; S.weak = {}; persist(); settings();
    };
  }

  const start = (location.hash || "").slice(1);
  go(ROUTES[start] ? start : "start");
})();
