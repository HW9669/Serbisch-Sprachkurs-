(function () {
  "use strict";

  const app = document.getElementById("app");
  const backBtn = document.getElementById("back");
  const crumb = document.getElementById("crumb");
  const STORE = "serbisch-kurs-v3";
  const PASS = 80; // Prozent für „bestanden“

  // ---------- Text: Betonungszeichen entfernen, Lautschrift erzeugen ----------
  const ACC = { "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ŕ": "r", "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U", "Ŕ": "R" };
  const clean = (s) => s.normalize("NFC").replace(/[áéíóúŕÁÉÍÓÚŔ]/g, (c) => ACC[c]);
  const SPELL = { c: "z", "č": "tsch", "ć": "tj", "dž": "dsch", "đ": "dj", "š": "sch", "ž": "zh", h: "ch", s: "ß", z: "s", v: "w" };
  const STRESSED = "áéíóúŕ", BASE = "aeiour";
  const up = (t) => t.split("").map((ch) => (ch === "ß" ? ch : ch.toUpperCase())).join("");

  function wordPron(word) {
    const w = word.toLowerCase();
    const units = [];
    for (let i = 0; i < w.length;) {
      const c = w[i], n = w[i + 1];
      let t = c;
      if (c === "d" && n === "ž") { t = "dž"; i += 2; }
      else if ((c === "l" || c === "n") && n === "j") { t = c + "j"; i += 2; }
      else { i += 1; }
      const k = STRESSED.indexOf(t);
      units.push(k >= 0 ? { t: BASE[k], st: true } : { t: t, st: false });
    }
    units.forEach((u) => { u.v = u.t.length === 1 && "aeiou".indexOf(u.t) >= 0; });
    units.forEach((u, k) => {
      if (u.t === "r") {
        const p = units[k - 1], q = units[k + 1];
        if ((!p || !p.v) && (!q || !q.v) && (p || q)) u.nuc = true;
      }
    });
    const nuclei = [];
    units.forEach((u, k) => { if (u.v || u.nuc) nuclei.push(k); });
    const out = (u) => (SPELL[u.t] !== undefined ? SPELL[u.t] : u.t);
    if (!nuclei.length) return units.map(out).join("");
    const starts = [0];
    for (let a = 0; a < nuclei.length - 1; a++) {
      const gap = nuclei[a + 1] - nuclei[a] - 1;
      const second = units[nuclei[a] + 2];
      const liquid = gap === 2 && (second.t === "r" || second.t === "l"); // do-bro, ju-tro
      starts.push(gap >= 2 && !liquid ? nuclei[a] + 2 : nuclei[a] + 1);
    }
    return starts.map((s, idx) => {
      const e = idx + 1 < starts.length ? starts[idx + 1] : units.length;
      const part = units.slice(s, e);
      const txt = part.map(out).join("");
      return part.some((u) => u.st) ? up(txt) : txt;
    }).join("-");
  }
  const pron = (s) => s.normalize("NFC").replace(/[\p{L}]+/gu, wordPron);

  // ---------- Daten aufbereiten ----------
  const mkItem = (kind, lesson, i, r) => ({
    key: kind + ":" + clean(r[0]), kind: kind, lesson: lesson, n: i + 1,
    sr: clean(r[0]), de: r[1], pr: pron(r[0])
  });
  const LES = LESSONS.map((L) => ({
    id: L.id, title: L.title, goal: L.goal, grammar: L.grammar,
    W: L.words.map((r, i) => mkItem("w", L.id, i, r)),
    SN: L.sentences.map((r, i) => mkItem("s", L.id, i, r)),
    D: L.dialog.map((r) => ({ who: r[0], sr: clean(r[1]), de: r[2], pr: pron(r[1]) }))
  }));
  const ALLW = [].concat.apply([], LES.map((L) => L.W));
  const ALLS = [].concat.apply([], LES.map((L) => L.SN));
  const ALL = ALLW.concat(ALLS);
  const lesson = (id) => LES[id - 1];

  // ---------- Speicher (nur Komfort, App läuft auch ohne) ----------
  let S = {};
  try { S = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { S = {}; }
  S.known = S.known || {};
  S.weak = S.weak || {};
  S.les = S.les || {};
  S.set = Object.assign({ auto: true, slow: false, voice: "" }, S.set);
  const persist = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiterarbeiten */ } };
  const prog = (id) => { S.les[id] = S.les[id] || { dlg: false, gram: false, best: {} }; S.les[id].best = S.les[id].best || {}; return S.les[id]; };

  // ---------- Hilfsfunktionen ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (id) => document.getElementById(id);
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const bar = (v, max) => '<div class="bar"><i style="width:' + (max ? Math.round(v / max * 100) : 0) + '%"></i></div>';
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
  function makeUtterance(text, slowOnce, pitch) {
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    u.lang = v ? v.lang : "sr-RS";
    if (v) u.voice = v;
    u.rate = slowOnce || S.set.slow ? 0.65 : 0.9;
    if (pitch) u.pitch = pitch;
    return u;
  }
  function say(text, slowOnce) {
    if (!synth || !text) return;
    synth.cancel();
    const u = makeUtterance(text, slowOnce);
    setTimeout(() => synth.speak(u), 40);
  }
  const autoSay = (text) => { if (S.set.auto) say(text); };
  function sayLines(lines, onLine) { // lines: [{text, pitch}]
    if (!synth) return;
    synth.cancel();
    setTimeout(() => {
      lines.forEach((l, i) => {
        const u = makeUtterance(l.text, false, l.pitch);
        u.onstart = () => { if (onLine) onLine(i); };
        synth.speak(u);
      });
    }, 40);
  }
  const earBtn = (text, label) =>
    synth ? '<button class="btn ear" data-say="' + esc(text) + '">' + (label || "Anhören") + "</button>" : "";

  // ---------- Navigation ----------
  const TOP = { start: "start", lesson: "lektion", review: "wiederholen", lookup: "nachschlagen", sounds: "aussprache", settings: "einstellungen" };
  let cur = { name: "start", args: {} };
  function parentOf(c) {
    if (c.args && c.args.back) return c.args.back;
    if (c.name === "start") return null;
    return { name: "start", args: {} };
  }
  function nav(name, args) {
    if (synth) synth.cancel();
    cur = { name: name, args: args || {} };
    const p = parentOf(cur);
    backBtn.hidden = !p;
    backBtn.textContent = !p ? "" : (p.name === "start" ? "← Menü" : "← Zurück");
    app.innerHTML = "";
    VIEWS[name](cur.args);
    window.scrollTo(0, 0);
    try {
      const tok = TOP[name];
      if (tok) history.replaceState(null, "", "#" + (name === "lesson" ? "lektion" + cur.args.id : tok));
    } catch (e) { /* ignorieren */ }
  }
  const setCrumb = (t) => { crumb.textContent = t; };
  backBtn.addEventListener("click", () => { const p = parentOf(cur); if (p) nav(p.name, p.args); });
  $("gear").addEventListener("click", () => nav("settings"));
  app.addEventListener("click", (e) => {
    const s = e.target.closest("[data-say]");
    if (s) { e.stopPropagation(); say(s.getAttribute("data-say")); return; }
    const g = e.target.closest("[data-nav]");
    if (g) {
      const a = g.getAttribute("data-args");
      nav(g.getAttribute("data-nav"), a ? JSON.parse(a) : {});
    }
  });
  const navAttr = (name, args) => 'data-nav="' + name + '"' + (args ? " data-args='" + JSON.stringify(args) + "'" : "");
  const lessonBack = (id) => ({ name: "lesson", args: { id: id } });

  // ---------- Lektionsstatus ----------
  function steps(L) {
    const p = prog(L.id), b = p.best;
    const kw = countKnown(L.W), ks = countKnown(L.SN);
    return [
      { key: "dlg", label: "Einstieg: Dialog hören", done: !!p.dlg, info: p.dlg ? "gehört" : "", nav: ["dialog", { id: L.id, back: lessonBack(L.id) }] },
      { key: "w", label: "Vokabeln lernen", done: kw >= Math.ceil(L.W.length * PASS / 100), info: kw + " von " + L.W.length + " gewusst", nav: ["wcards", { id: L.id, back: lessonBack(L.id) }] },
      { key: "s", label: "Sätze lernen", done: ks >= Math.ceil(L.SN.length * PASS / 100), info: ks + " von " + L.SN.length + " gewusst", nav: ["scards", { id: L.id, back: lessonBack(L.id) }] },
      { key: "gram", label: "Grammatik-Tipp", done: !!p.gram, info: p.gram ? "gelesen" : "", nav: ["grammar", { id: L.id, back: lessonBack(L.id) }] },
      { key: "ex", label: "Übungen", done: ["vocab", "hear", "gap"].every((k) => b[k] !== undefined), info: ["vocab", "hear", "gap"].filter((k) => b[k] !== undefined).length + " von 3 gemacht", nav: ["practice", { id: L.id, back: lessonBack(L.id) }] },
      { key: "final", label: "Lektionstest", done: (b.final || 0) >= PASS, info: b.final !== undefined ? "Bestwert " + b.final + " %" : "ab " + PASS + " % bestanden", nav: ["test", { id: L.id, back: lessonBack(L.id) }] }
    ];
  }
  const doneCount = (L) => steps(L).filter((s) => s.done).length;

  // ---------- Hauptmenü ----------
  function home() {
    setCrumb("10 Lektionen · 500 Vokabeln · 100 Sätze · mit Ton");
    const status = voiceStatus();
    const nextL = LES.filter((L) => doneCount(L) < 6)[0];
    const weak = weakItems().length;
    const startedAny = LES.some((L) => doneCount(L) > 0 || countKnown(L.W) > 0);
    app.innerHTML =
      (status.ok ? "" : '<p class="note">' + esc(status.text) + ' <button class="btn" ' + navAttr("settings") + ">Stimme wählen</button></p>") +
      (nextL
        ? '<section class="panel next"><div class="muted">' + (startedAny ? "Weiter geht’s mit" : "Hier beginnst du") + '</div><h2>Lektion ' + nextL.id + ": " + esc(nextL.title) + "</h2>" +
          "<p class=\"muted\">" + esc(nextL.goal) + '</p><button class="btn primary" ' + navAttr("lesson", { id: nextL.id }) + ">" + (startedAny ? "Lektion fortsetzen" : "Lektion 1 starten") + "</button></section>"
        : '<section class="panel next"><h2>Alle Lektionen abgeschlossen</h2><p class="muted">Wiederhole mit „Wiederholen“ oder starte einzelne Lektionen neu.</p></section>') +
      '<h2 class="grp">Lektionen</h2><div class="menu">' +
      LES.map((L) => {
        const n = doneCount(L);
        return '<button class="item" ' + navAttr("lesson", { id: L.id }) + '><span class="t"><span class="lnum">' + L.id + "</span> " + esc(L.title) + "</span>" +
          '<span class="d">' + esc(L.goal) + '</span><span class="m">' + (n === 6 ? "abgeschlossen" : n + " von 6 Schritten") + "</span>" + bar(n, 6) + "</button>";
      }).join("") + "</div>" +
      '<h2 class="grp">Zusätzlich</h2><div class="menu">' +
      '<button class="item" ' + navAttr("review") + '><span class="t">Wiederholen</span><span class="d">Alles, was du nicht gewusst hast, noch einmal üben.</span><span class="m">' + (weak ? weak + " offen" : "nichts offen") + "</span></button>" +
      '<button class="item" ' + navAttr("lookup") + '><span class="t">Nachschlagen</span><span class="d">Alle 500 Wörter und 100 Sätze durchsuchen und anhören.</span></button>' +
      '<button class="item" ' + navAttr("sounds") + '><span class="t">Aussprache-Hilfe</span><span class="d">č, ć, š, ž, đ und mehr in deutscher Lautschrift.</span></button>' +
      '<button class="item" ' + navAttr("settings") + '><span class="t">Einstellungen</span><span class="d">Ton, Tempo, Stimme, Fortschritt löschen.</span></button>' +
      "</div>";
  }

  // ---------- Lektion (Übersicht) ----------
  function lessonView(a) {
    const L = lesson(a.id);
    setCrumb("Lektion " + L.id + " von 10");
    const st = steps(L);
    app.innerHTML =
      '<section class="panel"><h2 style="margin:0 0 4px">Lektion ' + L.id + ": " + esc(L.title) + '</h2><p class="muted" style="margin:0">' + esc(L.goal) + "</p></section>" +
      '<ol class="steps">' + st.map((s, i) =>
        '<li><button class="step' + (s.done ? " done" : "") + '" ' + navAttr(s.nav[0], s.nav[1]) + '><span class="no">' + (s.done ? "✓" : i + 1) + '</span><span class="lbl">' + esc(s.label) +
        '</span><span class="inf">' + esc(s.info) + "</span></button></li>").join("") + "</ol>" +
      '<p class="muted">Tipp: Geh die Schritte der Reihe nach durch. Im Lektionstest brauchst du ' + PASS + " %, dann gilt die Lektion als abgeschlossen.</p>";
  }

  // ---------- Dialog ----------
  function dialogView(a) {
    const L = lesson(a.id);
    setCrumb("Lektion " + L.id + " · Einstieg");
    prog(L.id).dlg = true; persist();
    const who = [];
    L.D.forEach((d) => { if (who.indexOf(d.who) < 0) who.push(d.who); });
    app.innerHTML =
      '<section class="panel"><h2 style="margin-top:0">Dialog: ' + esc(L.title) + "</h2>" +
      '<p class="muted">Hör zuerst zu, dann sprich die Sätze laut nach. Tippe auf eine Zeile, um sie einzeln zu hören.</p>' +
      '<div class="actions" style="justify-content:flex-start;margin:0 0 12px"><button class="btn primary" id="play">Ganzen Dialog anhören</button><button class="btn" id="stop">Stopp</button></div>' +
      '<ul class="dlg">' + L.D.map((d, i) =>
        '<li id="dl' + i + '" class="p' + who.indexOf(d.who) % 2 + '"><span class="who">' + esc(d.who) + '</span><div class="sr">' + esc(d.sr) +
        '</div><div class="pron">' + esc(d.pr) + "</div><div>" + esc(d.de) + "</div>" + earBtn(d.sr) + "</li>").join("") + "</ul>" +
      '<div class="actions"><button class="btn primary" ' + navAttr("wcards", { id: L.id, back: lessonBack(L.id) }) + ">Weiter: Vokabeln lernen</button></div></section>";
    function play() {
      sayLines(L.D.map((d) => ({ text: d.sr, pitch: who.indexOf(d.who) % 2 ? 0.8 : 1 })), (i) => {
        L.D.forEach((x, k) => { const el = $("dl" + k); if (el) el.classList.toggle("now", k === i); });
      });
    }
    $("play").onclick = play;
    $("stop").onclick = () => { if (synth) synth.cancel(); L.D.forEach((x, k) => { const el = $("dl" + k); if (el) el.classList.remove("now"); }); };
    if (S.set.auto) play();
  }

  // ---------- Grammatik ----------
  function grammarView(a) {
    const L = lesson(a.id);
    setCrumb("Lektion " + L.id + " · Grammatik");
    prog(L.id).gram = true; persist();
    app.innerHTML =
      '<section class="panel"><h2 style="margin-top:0">' + esc(L.grammar.title) + "</h2>" +
      L.grammar.text.map((t) => "<p>" + esc(t) + "</p>").join("") +
      '<div class="actions"><button class="btn primary" ' + navAttr("practice", { id: L.id, back: lessonBack(L.id) }) + ">Weiter: Übungen</button></div></section>";
  }

  // ---------- Karteikarten (Übersetzung immer sichtbar) ----------
  function study(o) {
    // o: {pool, back, blocks, review}
    const pool = o.pool;
    let onlyOpen = false, deck = [], idx = 0, block = 0;
    const review = !!o.review;
    const blocks = o.blocks ? Math.ceil(pool.length / 10) : 0;
    app.innerHTML =
      '<div class="panel"><div class="row">' +
      (blocks ? '<select id="blk" aria-label="Block"><option value="0">Alle ' + pool.length + "</option>" +
        Array.from({ length: blocks }, (_, i) => '<option value="' + (i + 1) + '">Block ' + (i + 1) + " (" + (i * 10 + 1) + "–" + Math.min((i + 1) * 10, pool.length) + ")</option>").join("") + "</select>" : "") +
      (review ? "" : '<label class="chk"><input type="checkbox" id="open"> nur offene</label>') + "</div>" +
      '<div class="muted" id="count"></div><div id="fill"></div>' +
      '<div class="card" id="card" aria-live="polite"></div>' +
      '<div class="actions"><button class="btn bad" id="again">Noch unsicher</button><button class="btn" id="skip">Weiter</button><button class="btn good" id="known">Gewusst</button></div>' +
      '<div class="actions"><button class="btn" id="shuf">Neu mischen</button></div></div>';
    const card = $("card");
    const inScope = () => pool.filter((x, i) => !block || (i >= (block - 1) * 10 && i < block * 10));

    function build() {
      deck = shuffle(inScope().filter((x) => !onlyOpen || !S.known[x.key]));
      idx = 0; render(true);
    }
    function render(speakNew) {
      const scope = inScope();
      const known = scope.filter((x) => S.known[x.key]).length;
      $("count").textContent = known + " von " + scope.length + " gewusst" + (deck.length ? " · Karte " + (idx + 1) + " von " + deck.length : "");
      $("fill").innerHTML = bar(known, scope.length);
      if (!deck.length) {
        card.innerHTML = '<div class="big">Alles gewusst</div><div class="hint">Wähle einen anderen Block oder mische neu.</div>' +
          (o.back ? '<button class="btn primary" data-nav="' + o.back.name + "\" data-args='" + JSON.stringify(o.back.args) + "'>Zurück zur Lektion</button>" : "");
        return;
      }
      const x = deck[idx];
      const sentence = x.kind === "s";
      card.innerHTML =
        '<div class="hint">' + (x.lesson ? "Lektion " + x.lesson : "") + "</div>" +
        '<div class="big' + (sentence ? " sent" : "") + '">' + esc(x.sr) + "</div>" +
        '<div class="pron">' + esc(x.pr) + "</div>" +
        '<div class="trans' + (sentence ? " sent" : "") + '">' + esc(x.de) + "</div>" +
        earBtn(x.sr, "Nochmal anhören");
      if (speakNew) autoSay(x.sr);
    }
    function next() { idx = (idx + 1) % deck.length; render(true); }
    function answer(good) {
      if (!deck.length) return;
      const x = deck[idx];
      mark(x, good);
      if (good) { S.known[x.key] = true; persist(); }
      if (good && (onlyOpen || review)) {
        deck.splice(idx, 1);
        if (idx >= deck.length) idx = 0;
        render(true);
      } else next();
    }
    $("skip").onclick = () => { if (deck.length) next(); };
    $("again").onclick = () => answer(false);
    $("known").onclick = () => answer(true);
    $("shuf").onclick = build;
    if (!review) $("open").onchange = (e) => { onlyOpen = e.target.checked; build(); };
    if (blocks) $("blk").onchange = (e) => { block = +e.target.value; build(); };
    build();
  }
  const wcards = (a) => { const L = lesson(a.id); setCrumb("Lektion " + L.id + " · Vokabeln"); study({ pool: L.W, back: a.back, blocks: true }); };
  const scards = (a) => { const L = lesson(a.id); setCrumb("Lektion " + L.id + " · Sätze"); study({ pool: L.SN, back: a.back }); };

  // ---------- Fragen-Baukasten ----------
  function distractors(x, pool, field) {
    let src = pool.filter((y) => y.key !== x.key);
    if (src.length < 6) src = ALL.filter((y) => y.kind === x.kind && y.key !== x.key);
    const seen = {}; seen[x[field]] = 1;
    const out = [];
    shuffle(src).forEach((y) => { if (!seen[y[field]] && out.length < 3) { seen[y[field]] = 1; out.push(y); } });
    return out;
  }
  const infoHtml = (x) => '<p class="fb-line"><b>' + esc(x.sr) + "</b> = " + esc(x.de) + '</p><div class="pron">' + esc(x.pr) + "</div>";
  function qChoice(x, pool, dir) {
    const opts = shuffle([x].concat(distractors(x, pool, dir === "sr" ? "de" : "sr")));
    return {
      item: x, type: "choice", label: dir === "sr" ? "Was bedeutet das?" : "Wie sagt man das auf Serbisch?",
      prompt: dir === "sr"
        ? '<div class="q' + (x.kind === "s" ? " sent" : "") + '">' + esc(x.sr) + '</div><div class="pron">' + esc(x.pr) + "</div>" + earBtn(x.sr)
        : '<div class="q' + (x.kind === "s" ? " sent" : "") + '">' + esc(x.de) + "</div>",
      say: dir === "sr" ? x.sr : null, after: dir === "de" ? x.sr : null,
      options: opts.map((o) => ({ t: dir === "sr" ? o.de : o.sr, ok: o === x })), info: infoHtml(x)
    };
  }
  function qListen(x, pool) {
    const opts = shuffle([x].concat(distractors(x, pool, "de")));
    return {
      item: x, type: "listen", label: "Hören: Was bedeutet das?", forceSay: true,
      prompt: '<div class="actions" style="margin:6px 0 0"><button class="btn primary" data-say="' + esc(x.sr) + '">Nochmal hören</button><button class="btn" id="slow">Langsam hören</button></div>',
      say: x.sr, options: opts.map((o) => ({ t: o.de, ok: o === x })), info: infoHtml(x)
    };
  }
  const tok = (t) => t.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  function qGap(x, pool) {
    const parts = x.sr.split(" ");
    const cand = parts.map((p, i) => i).filter((i) => tok(parts[i]).length >= 3);
    if (!cand.length) return null;
    const i = cand[Math.floor(Math.random() * cand.length)];
    const ans = tok(parts[i]).toLowerCase();
    const bag = [];
    pool.forEach((y) => {
      if (y.key === x.key) return;
      y.sr.split(" ").forEach((p) => {
        const t = tok(p).toLowerCase();
        if (t.length >= 3 && t !== ans && bag.indexOf(t) < 0) bag.push(t);
      });
    });
    if (bag.length < 3) return null;
    const gapped = parts.map((p, k) => (k === i ? p.replace(tok(p), "_____") : p)).join(" ");
    const opts = shuffle([ans].concat(shuffle(bag).slice(0, 3)));
    return {
      item: x, type: "gap", label: "Welches Wort fehlt?",
      prompt: '<div class="q sent">' + esc(gapped) + '</div><div class="muted">' + esc(x.de) + "</div>",
      say: null, after: x.sr, options: opts.map((o) => ({ t: o, ok: o === ans })), info: infoHtml(x)
    };
  }

  // ---------- Fragen abspielen ----------
  function runQuestions(cfg) {
    // cfg: {title, qs, back, again, bestKey, lessonId, final}
    const qs = cfg.qs;
    let i = 0, score = 0;
    const wrong = [];
    app.innerHTML = '<div class="panel" id="qbox"></div>';
    const box = $("qbox");
    function ask() {
      const q = qs[i];
      box.innerHTML =
        '<div class="muted">' + esc(cfg.title) + " · Frage " + (i + 1) + " von " + qs.length + " · " + score + " richtig</div>" + bar(i, qs.length) +
        '<div class="qtype">' + esc(q.label) + "</div>" + q.prompt +
        '<div class="opts">' + q.options.map((o, k) => '<button class="btn" data-k="' + k + '">' + esc(o.t) + "</button>").join("") + "</div>" +
        '<div id="fb"></div><div class="actions" id="nx"></div>';
      if (q.say) { if (q.forceSay) say(q.say); else autoSay(q.say); }
      const slow = $("slow"); if (slow) slow.onclick = () => say(q.say, true);
      box.querySelectorAll(".opts button").forEach((b) => {
        b.onclick = () => {
          const ok = q.options[+b.dataset.k].ok;
          box.querySelectorAll(".opts button").forEach((y) => {
            y.disabled = true;
            if (q.options[+y.dataset.k].ok) y.classList.add("right");
          });
          if (ok) score++; else { b.classList.add("wrong"); wrong.push(q.item); }
          mark(q.item, ok);
          const last = i === qs.length - 1;
          $("fb").innerHTML = '<p class="fb ' + (ok ? "ok" : "no") + '">' + (ok ? "Richtig." : "Nicht ganz.") + "</p>" + q.info + earBtn(q.item.sr);
          if (q.after) autoSay(q.after);
          $("nx").innerHTML = '<button class="btn primary" id="go">' + (last ? "Ergebnis" : "Weiter") + "</button>";
          $("go").onclick = () => { i++; last ? done() : ask(); };
          $("go").focus();
        };
      });
    }
    function done() {
      const pct = Math.round(score / qs.length * 100);
      let verdict = "";
      if (cfg.lessonId && cfg.bestKey) {
        const b = prog(cfg.lessonId).best;
        b[cfg.bestKey] = Math.max(b[cfg.bestKey] || 0, pct);
        persist();
        if (cfg.final) verdict = pct >= PASS
          ? '<p class="fb ok">Bestanden. Lektion ' + cfg.lessonId + " ist abgeschlossen.</p>"
          : '<p class="fb no">Noch nicht bestanden (nötig: ' + PASS + " %). Wiederhole die Vokabeln und versuche es noch einmal.</p>";
      }
      const nextL = cfg.final && pct >= PASS && cfg.lessonId < 10 ? cfg.lessonId + 1 : null;
      box.innerHTML =
        '<h2 style="margin-top:0">' + score + " von " + qs.length + " richtig (" + pct + " %)</h2>" + verdict +
        (wrong.length
          ? '<p class="muted">Diese kommen unter „Wiederholen“ dran:</p><ul class="list">' + wrong.map((w) =>
              '<li><div style="flex:1"><div class="sr">' + esc(w.sr) + "</div><div>" + esc(w.de) + '</div><div class="pr">' + esc(w.pr) + "</div></div>" + earBtn(w.sr) + "</li>").join("") + "</ul>"
          : "<p>Alles richtig.</p>") +
        '<div class="actions"><button class="btn primary" id="again">Nochmal</button>' +
        (cfg.back ? '<button class="btn" data-nav="' + cfg.back.name + "\" data-args='" + JSON.stringify(cfg.back.args) + "'>" + (cfg.back.name === "lesson" ? "Zur Lektion" : "Zurück") + "</button>" : "") +
        (nextL ? '<button class="btn good" ' + navAttr("lesson", { id: nextL }) + ">Nächste Lektion</button>" : "") +
        '<button class="btn" ' + navAttr("start") + ">Hauptmenü</button></div>";
      $("again").onclick = cfg.again;
    }
    ask();
  }

  // ---------- Übungen & Test (pro Lektion) ----------
  function practiceView(a) {
    const L = lesson(a.id);
    setCrumb("Lektion " + L.id + " · Übungen");
    const b = prog(L.id).best;
    const row = (key, title, desc) =>
      '<button class="item" data-ex="' + key + '"><span class="t">' + title + '</span><span class="d">' + desc + '</span><span class="m">' + (b[key] !== undefined ? "Bestwert " + b[key] + " %" : "noch nicht gemacht") + "</span></button>";
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Übungen: ' + esc(L.title) + "</h2><p class=\"muted\">Jede Übung hat 10 Fragen und kann beliebig oft wiederholt werden.</p></section>" +
      '<div class="menu" style="margin-top:12px">' +
      row("vocab", "Vokabelquiz", "Wort sehen oder Bedeutung wählen, in beide Richtungen.") +
      row("hear", "Hören & Verstehen", "Du hörst ein Wort oder einen Satz, der Text bleibt verborgen.") +
      row("gap", "Lückentext", "Ergänze das fehlende Wort im Satz.") + "</div>";
    app.querySelectorAll("[data-ex]").forEach((el) => {
      el.onclick = () => {
        const k = el.dataset.ex;
        const run = () => {
          let qs = [];
          if (k === "vocab") {
            const w = shuffle(L.W).slice(0, 10);
            qs = w.map((x, n) => qChoice(x, L.W, n < 6 ? "sr" : "de"));
          } else if (k === "hear") {
            qs = shuffle(L.W).slice(0, 6).map((x) => qListen(x, L.W)).concat(shuffle(L.SN).slice(0, 4).map((x) => qListen(x, L.SN)));
          } else {
            shuffle(L.SN).forEach((x) => { if (qs.length < 10) { const g = qGap(x, L.SN); if (g) qs.push(g); } });
          }
          runQuestions({ title: L.title, qs: shuffle(qs), back: lessonBack(L.id), again: run, bestKey: k, lessonId: L.id });
        };
        setCrumb("Lektion " + L.id + " · " + (k === "vocab" ? "Vokabelquiz" : k === "hear" ? "Hören" : "Lückentext"));
        run();
      };
    });
  }
  function testView(a) {
    const L = lesson(a.id);
    setCrumb("Lektion " + L.id + " · Lektionstest");
    const b = prog(L.id).best;
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Lektionstest</h2>' +
      "<p>10 gemischte Fragen aus Lektion " + L.id + " (Vokabeln, Sätze, Hören, Lückentext). Mit " + PASS + " % gilt die Lektion als abgeschlossen.</p>" +
      (b.final !== undefined ? '<p class="muted">Bestwert: ' + b.final + " %</p>" : "") +
      '<button class="btn primary" id="go">Test starten</button></section>';
    const run = () => {
      const w = shuffle(L.W), s = shuffle(L.SN);
      let qs = [qChoice(w[0], L.W, "sr"), qChoice(w[1], L.W, "sr"), qChoice(w[2], L.W, "sr"), qChoice(w[3], L.W, "sr"),
        qChoice(w[4], L.W, "de"), qChoice(w[5], L.W, "de"), qListen(w[6], L.W), qListen(s[0], L.SN)];
      const gaps = [];
      s.slice(1).forEach((x) => { if (gaps.length < 2) { const g = qGap(x, L.SN); if (g) gaps.push(g); } });
      qs = qs.concat(gaps);
      runQuestions({ title: "Lektionstest", qs: shuffle(qs), back: lessonBack(L.id), again: run, bestKey: "final", lessonId: L.id, final: true });
    };
    $("go").onclick = run;
  }

  // ---------- Wiederholen (alle Lektionen) ----------
  function reviewView() {
    setCrumb("Wiederholen");
    const weak = weakItems();
    if (!weak.length) {
      app.innerHTML = '<div class="panel"><h2 style="margin-top:0">Nichts zu wiederholen</h2><p class="muted">Sobald du bei einer Karte „Nochmal“ wählst oder im Quiz falsch liegst, erscheint sie hier.</p>' +
        '<button class="btn primary" ' + navAttr("start") + ">Hauptmenü</button></div>";
      return;
    }
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Wiederholen</h2><p>' + weak.length + " Einträge sind noch offen.</p>" +
      '<div class="actions" style="justify-content:flex-start"><button class="btn primary" id="rc">Mit Karten wiederholen</button><button class="btn" id="rq">Quiz mit offenen Einträgen</button></div></section>';
    $("rc").onclick = () => { setCrumb("Wiederholen · Karten"); study({ pool: weak, review: true, back: { name: "review", args: {} } }); };
    $("rq").onclick = () => {
      const run = () => {
        const w = shuffle(weakItems()).slice(0, 10);
        if (!w.length) { nav("review"); return; }
        const qs = w.map((x) => qChoice(x, x.kind === "w" ? ALLW : ALLS, Math.random() < 0.7 ? "sr" : "de"));
        runQuestions({ title: "Wiederholung", qs: qs, back: { name: "review", args: {} }, again: run });
      };
      setCrumb("Wiederholen · Quiz");
      run();
    };
  }

  // ---------- Nachschlagen ----------
  function lookupView() {
    setCrumb("Nachschlagen");
    let kind = "w", les = 0, q = "";
    app.innerHTML =
      '<div class="panel"><div class="row"><div class="seg" id="seg"><button class="btn" data-kind="w">Wörter</button><button class="btn" data-kind="s">Sätze</button></div>' +
      '<input type="search" id="q" class="grow" placeholder="Suchen (Serbisch oder Deutsch)" aria-label="Suchen"></div>' +
      '<div class="chips" id="chips"></div><div class="muted" id="cnt"></div><ul class="list" id="sl"></ul></div>';
    function draw() {
      const base = kind === "w" ? ALLW : ALLS;
      document.querySelectorAll("#seg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.kind === kind)));
      $("chips").innerHTML = '<button class="btn chip" aria-pressed="' + (les === 0) + '" data-l="0">Alle</button>' +
        LES.map((L) => '<button class="btn chip" aria-pressed="' + (les === L.id) + '" data-l="' + L.id + '">' + L.id + " " + esc(L.title.split(/[ ,:&]/)[0]) + "</button>").join("");
      const term = q.trim().toLowerCase();
      const rows = base.filter((x) => (!les || x.lesson === les) && (!term || x.sr.toLowerCase().indexOf(term) >= 0 || x.de.toLowerCase().indexOf(term) >= 0));
      $("cnt").textContent = rows.length + " Einträge";
      $("sl").innerHTML = rows.slice(0, 150).map((x) =>
        '<li><div style="flex:1"><div class="sr">' + esc(x.sr) + "</div><div>" + esc(x.de) + '</div><div class="pr">' + esc(x.pr) + "</div></div>" + earBtn(x.sr) + "</li>").join("") ||
        '<li class="muted">Nichts gefunden.</li>';
    }
    $("seg").addEventListener("click", (e) => { const b = e.target.closest("[data-kind]"); if (b) { kind = b.dataset.kind; draw(); } });
    $("chips").addEventListener("click", (e) => { const b = e.target.closest("[data-l]"); if (b) { les = +b.dataset.l; draw(); } });
    $("q").oninput = (e) => { q = e.target.value; draw(); };
    draw();
  }

  // ---------- Aussprache ----------
  function soundsView() {
    setCrumb("Aussprache-Hilfe");
    app.innerHTML =
      '<div class="panel"><h2 style="margin-top:0">So liest du die Lautschrift</h2>' +
      "<p>Serbisch wird so gesprochen, wie es geschrieben wird: jeder Buchstabe hat genau einen Laut. " +
      "Die Lautschrift ist für österreichisches Deutsch gedacht, die <b>betonte Silbe</b> steht in GROSSBUCHSTABEN.</p>" +
      '<div class="scroll"><table><thead><tr><th>Serbisch</th><th>Aussprache</th><th>Beispiel</th><th></th></tr></thead><tbody>' +
      LEGEND.map((l) => {
        const word = l[2].split(" → ")[0];
        return "<tr><td>" + esc(l[0]) + "</td><td>" + esc(l[1]) + "</td><td>" + esc(l[2]) + "</td><td>" + earBtn(word) + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="muted">Dieser Kurs verwendet nur die lateinische Schrift und den in Serbien üblichen ekavischen Standard (z. B. „mleko“, „lepo“). ' +
      "Die Betonung ist in der Lautschrift markiert; sie kann in Serbisch auch die Tonhöhe betreffen, die hier nicht abgebildet wird.</p></div>";
  }

  // ---------- Einstellungen ----------
  function settingsView() {
    setCrumb("Einstellungen");
    const status = voiceStatus();
    const sel = voices.filter((v) => ["sr", "hr", "bs"].some((p) => lang(v).indexOf(p) === 0));
    const cur2 = pickVoice();
    const kn = countKnown(ALLW), ks = countKnown(ALLS);
    app.innerHTML =
      '<div class="panel"><h2 style="margin-top:0">Ton</h2>' +
      '<label class="chk"><input type="checkbox" id="auto"' + (S.set.auto ? " checked" : "") + "> Neue Wörter und Sätze automatisch vorsprechen</label>" +
      '<div class="row" style="margin-top:12px"><label for="tempo">Tempo</label><select id="tempo"><option value="n">normal</option><option value="l">langsam</option></select></div>' +
      '<div class="row"><label for="voice">Stimme</label><select id="voice" class="grow">' +
      (sel.length ? sel.map((v) => '<option value="' + esc(v.voiceURI) + '"' + (cur2 && cur2.voiceURI === v.voiceURI ? " selected" : "") + ">" + esc(v.name + " (" + v.lang + ")") + "</option>").join("")
        : '<option value="">keine passende Stimme gefunden</option>') + "</select></div>" +
      '<p class="' + (status.ok ? "fb ok" : "note") + '">' + esc(status.text) + "</p>" +
      '<div class="actions" style="justify-content:flex-start"><button class="btn primary" id="test">Probe hören</button></div></div>' +
      '<div class="panel" style="margin-top:14px"><h2 style="margin-top:0">Fortschritt</h2>' +
      "<p>" + kn + " von " + ALLW.length + " Wörtern und " + ks + " von " + ALLS.length + " Sätzen gewusst. " + weakItems().length + " zum Wiederholen.</p>" +
      '<button class="btn bad" id="reset">Fortschritt löschen</button></div>';
    $("tempo").value = S.set.slow ? "l" : "n";
    $("auto").onchange = (e) => { S.set.auto = e.target.checked; persist(); };
    $("tempo").onchange = (e) => { S.set.slow = e.target.value === "l"; persist(); };
    $("voice").onchange = (e) => { S.set.voice = e.target.value; persist(); settingsView(); };
    $("test").onclick = () => say("Dobar dan! Kako ste? Drago mi je.");
    let armed = false;
    $("reset").onclick = () => {
      if (!armed) { armed = true; $("reset").textContent = "Wirklich löschen? Nochmal tippen"; return; }
      S.known = {}; S.weak = {}; S.les = {}; persist(); settingsView();
    };
  }

  const VIEWS = {
    start: home, lesson: lessonView, dialog: dialogView, grammar: grammarView, wcards: wcards, scards: scards,
    practice: practiceView, test: testView, review: reviewView, lookup: lookupView, sounds: soundsView, settings: settingsView
  };
  const HASH = { wiederholen: "review", nachschlagen: "lookup", aussprache: "sounds", einstellungen: "settings" };
  const h = (location.hash || "").slice(1);
  const m = /^lektion(\d+)$/.exec(h);
  if (m && lesson(+m[1])) nav("lesson", { id: +m[1] });
  else if (HASH[h]) nav(HASH[h]);
  else nav("start");

  // Für Tests und Fehlersuche
  window.__kurs = { LES: LES, pron: pron, clean: clean };
})();
