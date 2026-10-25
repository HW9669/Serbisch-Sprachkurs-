(function () {
  "use strict";

  const app = document.getElementById("app");
  const backBtn = document.getElementById("back");
  const crumb = document.getElementById("crumb");
  const STORE = "serbisch-kurs-v4";
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
  const mkItem = (kind, chapter, group, i, r) => ({
    key: kind + ":" + clean(r[0]), kind: kind, lesson: chapter, group: group, n: i + 1,
    sr: clean(r[0]), de: r[1], pr: pron(r[0])
  });
  const LES = CHAPTERS.map((C) => {
    const groups = C.groups.map((g, gi) => ({ title: g.title, items: g.words.map((r, i) => mkItem("w", C.id, gi, i, r)) }));
    return {
      id: C.id, part: C.part, title: C.title, goal: C.goal, grammar: C.grammar, groups: groups,
      W: [].concat.apply([], groups.map((g) => g.items)),
      SN: C.sentences.map((r, i) => mkItem("s", C.id, 0, i, r)),
      D: C.dialogs.map((d) => ({ title: d.title, lines: d.lines.map((r) => ({ who: clean(r[0]), sr: clean(r[1]), de: r[2], pr: pron(r[1]) })) }))
    };
  });
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
  S.set = Object.assign({ auto: true, slow: false, voice: "", dlgRate: 0.7, dlgAuto: true, dlgPause: true }, S.set);
  const persist = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiterarbeiten */ } };
  const prog = (id) => {
    S.les[id] = S.les[id] || { dlg: {}, gram: false, best: {} };
    S.les[id].best = S.les[id].best || {};
    if (typeof S.les[id].dlg !== "object") S.les[id].dlg = {};
    return S.les[id];
  };

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
  const earBtn = (text, label) =>
    synth ? '<button class="btn ear" data-say="' + esc(text) + '">' + (label || "Anhören") + "</button>" : "";

  // ---------- Navigation ----------
  const TOP = { start: "start", chapter: "kapitel", review: "wiederholen", lookup: "nachschlagen", sounds: "aussprache", settings: "einstellungen" };
  let cur = { name: "start", args: {} };
  let leave = null; // wird beim Verlassen einer Ansicht aufgerufen (z. B. Dialog stoppen)
  function parentOf(c) {
    if (c.args && c.args.back) return c.args.back;
    if (c.name === "start") return null;
    return { name: "start", args: {} };
  }
  function nav(name, args) {
    if (leave) { leave(); leave = null; }
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
      if (tok) history.replaceState(null, "", "#" + (name === "chapter" ? "kapitel" + cur.args.id : tok));
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
  const chBack = (id) => ({ name: "chapter", args: { id: id } });
  const STEPS_TOTAL = 6;

  // ---------- Kapitelstatus ----------
  function steps(L) {
    const p = prog(L.id), b = p.best;
    const kw = countKnown(L.W), ks = countKnown(L.SN);
    const heard = L.D.filter((d, i) => p.dlg[i]).length;
    const need = (n) => Math.ceil(n * PASS / 100);
    return [
      { label: "Dialoge hören und nachsprechen", done: heard === L.D.length, info: heard + " von " + L.D.length + " gehört", nav: ["dialogs", { id: L.id, back: chBack(L.id) }] },
      { label: "Wortschatz lernen", done: kw >= need(L.W.length), info: kw + " von " + L.W.length + " gewusst · " + L.groups.length + " Themengruppen", nav: ["vocab", { id: L.id, back: chBack(L.id) }] },
      { label: "Sätze lernen", done: ks >= need(L.SN.length), info: ks + " von " + L.SN.length + " gewusst", nav: ["scards", { id: L.id, back: chBack(L.id) }] },
      { label: "Grammatik-Tipps", done: !!p.gram, info: p.gram ? "gelesen" : "", nav: ["grammar", { id: L.id, back: chBack(L.id) }] },
      { label: "Übungen", done: ["vocab", "hear", "gap"].every((k) => b[k] !== undefined), info: ["vocab", "hear", "gap"].filter((k) => b[k] !== undefined).length + " von 3 gemacht", nav: ["practice", { id: L.id, back: chBack(L.id) }] },
      { label: "Kapiteltest", done: (b.final || 0) >= PASS, info: b.final !== undefined ? "Bestwert " + b.final + " %" : "ab " + PASS + " % bestanden", nav: ["test", { id: L.id, back: chBack(L.id) }] }
    ];
  }
  const doneCount = (L) => steps(L).filter((s) => s.done).length;

  // ---------- Hauptmenü ----------
  function home() {
    setCrumb(LES.length + " Kapitel · " + ALLW.length.toLocaleString("de-AT") + " Vokabeln · " + ALLS.length + " Sätze · " + LES.reduce((n, L) => n + L.D.length, 0) + " Dialoge");
    const status = voiceStatus();
    const nextL = LES.filter((L) => doneCount(L) < STEPS_TOTAL)[0];
    const weak = weakItems().length;
    const startedAny = LES.some((L) => doneCount(L) > 0 || countKnown(L.W) > 0);
    const parts = [];
    LES.forEach((L) => { if (parts.indexOf(L.part) < 0) parts.push(L.part); });
    app.innerHTML =
      (status.ok ? "" : '<p class="note">' + esc(status.text) + ' <button class="btn" ' + navAttr("settings") + ">Stimme wählen</button></p>") +
      (nextL
        ? '<section class="panel next"><div class="muted">' + (startedAny ? "Weiter geht’s mit" : "Hier beginnst du") + '</div><h2>Kapitel ' + nextL.id + ": " + esc(nextL.title) + "</h2>" +
          '<p class="muted">' + esc(nextL.goal) + '</p><button class="btn primary" ' + navAttr("chapter", { id: nextL.id }) + ">" + (startedAny ? "Kapitel fortsetzen" : "Mit Kapitel 1 starten") + "</button></section>"
        : '<section class="panel next"><h2>Alle Kapitel abgeschlossen</h2><p class="muted">Wiederhole mit „Wiederholen“ oder starte einzelne Kapitel neu.</p></section>') +
      parts.map((part) =>
        '<h2 class="grp">' + esc(part) + '</h2><div class="menu">' +
        LES.filter((L) => L.part === part).map((L) => {
          const n = doneCount(L);
          return '<button class="item" ' + navAttr("chapter", { id: L.id }) + '><span class="t"><span class="lnum">' + L.id + "</span> " + esc(L.title) + "</span>" +
            '<span class="d">' + esc(L.goal) + '</span><span class="m">' + (n === STEPS_TOTAL ? "abgeschlossen" : n + " von " + STEPS_TOTAL + " Schritten") + "</span>" + bar(n, STEPS_TOTAL) + "</button>";
        }).join("") + "</div>").join("") +
      '<h2 class="grp">Zusätzlich</h2><div class="menu">' +
      '<button class="item" ' + navAttr("review") + '><span class="t">Wiederholen</span><span class="d">Alles, was du nicht gewusst hast, noch einmal üben.</span><span class="m">' + (weak ? weak + " offen" : "nichts offen") + "</span></button>" +
      '<button class="item" ' + navAttr("lookup") + '><span class="t">Nachschlagen</span><span class="d">Alle ' + ALLW.length.toLocaleString("de-AT") + " Wörter und " + ALLS.length + " Sätze durchsuchen und anhören.</span></button>" +
      '<button class="item" ' + navAttr("sounds") + '><span class="t">Aussprache-Hilfe</span><span class="d">č, ć, š, ž, đ und mehr in deutscher Lautschrift.</span></button>' +
      '<button class="item" ' + navAttr("settings") + '><span class="t">Einstellungen</span><span class="d">Ton, Tempo, Dialog-Pausen, Stimme, Fortschritt löschen.</span></button>' +
      "</div>";
  }

  // ---------- Kapitel (Übersicht) ----------
  function chapterView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " von " + LES.length);
    const st = steps(L);
    app.innerHTML =
      '<section class="panel"><h2 style="margin:0 0 4px">Kapitel ' + L.id + ": " + esc(L.title) + '</h2><p class="muted" style="margin:0">' + esc(L.goal) + "</p></section>" +
      '<ol class="steps">' + st.map((s, i) =>
        '<li><button class="step' + (s.done ? " done" : "") + '" ' + navAttr(s.nav[0], s.nav[1]) + '><span class="no">' + (s.done ? "✓" : i + 1) + '</span><span class="lbl">' + esc(s.label) +
        '</span><span class="inf">' + esc(s.info) + "</span></button></li>").join("") + "</ol>" +
      '<p class="muted">Tipp: Geh die Schritte der Reihe nach durch. Im Kapiteltest brauchst du ' + PASS + " %, dann gilt das Kapitel als abgeschlossen.</p>";
  }

  // ---------- Dialoge ----------
  function dialogsView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · Dialoge");
    const p = prog(L.id);
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Dialoge: ' + esc(L.title) + "</h2>" +
      '<p class="muted">Zu jedem Dialog hörst du jede Zeile einzeln, danach folgt eine Pause zum Nachsprechen. Alles bleibt sichtbar, die Anzeige läuft mit.</p></section>' +
      '<div class="menu" style="margin-top:12px">' + L.D.map((d, i) =>
        '<button class="item" ' + navAttr("dialog", { id: L.id, idx: i, back: { name: "dialogs", args: a } }) + '><span class="t">' + (i + 1) + ". " + esc(d.title) + '</span><span class="d">' + d.lines.length + " Zeilen</span><span class=\"m\">" +
        (p.dlg[i] ? "gehört" : "noch nicht gehört") + "</span></button>").join("") + "</div>";
  }

  function dialogView(a) {
    const L = lesson(a.id), D = L.D[a.idx];
    setCrumb("Kapitel " + L.id + " · Dialog " + (a.idx + 1) + " von " + L.D.length);
    prog(L.id).dlg[a.idx] = true; persist();
    const who = [];
    D.lines.forEach((d) => { if (who.indexOf(d.who) < 0) who.push(d.who); });
    app.innerHTML =
      '<section class="panel"><h2 style="margin-top:0">' + esc(D.title) + "</h2>" +
      '<p class="muted">Tippe auf eine Zeile, um dort zu beginnen. Nach jeder Zeile kommt eine Pause: Sprich nach, im gleichen Tempo.</p>' +
      '<ul class="dlg">' + D.lines.map((d, i) =>
        '<li id="dl' + i + '" class="p' + who.indexOf(d.who) % 2 + '"><span class="who">' + esc(d.who) + '</span><div class="sr">' + esc(d.sr) +
        '</div><div class="pron">' + esc(d.pr) + "</div><div>" + esc(d.de) + '</div><div class="your">Jetzt du: sprich nach</div></li>').join("") + "</ul>" +
      (L.D[a.idx + 1] ? '<div class="actions"><button class="btn" ' + navAttr("dialog", { id: L.id, idx: a.idx + 1, back: a.back }) + ">Nächster Dialog</button></div>" : '<div class="actions"><button class="btn primary" ' + navAttr("vocab", { id: L.id, back: chBack(L.id) }) + ">Weiter: Wortschatz</button></div>") +
      "</section>" +
      '<div class="dbar" id="dbar"><div class="drow"><button class="btn" id="prev">Zurück</button><button class="btn primary" id="play">Abspielen</button><button class="btn" id="next">Weiter</button></div>' +
      '<details class="dopt"><summary>Tempo und Pause einstellen</summary><div class="drow small"><label>Tempo <select id="rate"><option value="0.55">sehr langsam</option><option value="0.7">langsam</option><option value="0.85">normal</option></select></label>' +
      '<label class="chk"><input type="checkbox" id="dauto"> automatisch weiter</label>' +
      '<label class="chk"><input type="checkbox" id="dpause"> Pause zum Nachsprechen</label></div></details></div>';

    let idx = 0, playing = false, token = 0, timer = null;
    const n = D.lines.length;
    const mark2 = (i, wait) => {
      D.lines.forEach((x, k) => {
        const el = $("dl" + k);
        if (!el) return;
        el.classList.toggle("now", k === i);
        el.classList.toggle("wait", k === i && !!wait);
      });
      const el = $("dl" + i);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    const label = () => { const b = $("play"); if (b) b.textContent = playing ? "Pause" : "Abspielen"; };
    function stop() {
      token++; clearTimeout(timer); if (synth) synth.cancel();
      playing = false; label();
      D.lines.forEach((x, k) => { const el = $("dl" + k); if (el) el.classList.remove("wait"); });
    }
    function after(dur) {
      const my = token;
      if (!S.set.dlgAuto) { playing = false; label(); mark2(idx, false); return; }
      const wait = S.set.dlgPause ? Math.min(10000, Math.max(2500, dur * 1.6 + 900)) : 600;
      mark2(idx, S.set.dlgPause);
      timer = setTimeout(() => {
        if (my !== token) return;
        if (idx < n - 1) { idx++; speakLine(); } else { playing = false; label(); mark2(-1, false); }
      }, wait);
    }
    function speakLine() {
      const my = token, d = D.lines[idx];
      mark2(idx, false);
      if (!synth) { playing = false; label(); return; }
      const u = makeUtterance(d.sr, false, who.indexOf(d.who) % 2 ? 0.85 : 1);
      u.rate = S.set.dlgRate;
      let start = 0, done = false, fb = null;
      const est = Math.max(1500, d.sr.length * 120 / u.rate);
      const finish = () => {
        if (done || my !== token) return;
        done = true; clearTimeout(fb);
        after(start ? Date.now() - start : est);
      };
      u.onstart = () => { start = Date.now(); };
      u.onend = finish; u.onerror = finish;
      fb = setTimeout(finish, est + 2500);
      setTimeout(() => { if (my === token) synth.speak(u); }, 60);
    }
    function playFrom(i) { stop(); idx = Math.max(0, Math.min(n - 1, i)); playing = true; label(); speakLine(); }
    $("play").onclick = () => { if (playing) stop(); else playFrom(idx); };
    $("prev").onclick = () => playFrom(idx - 1);
    $("next").onclick = () => playFrom(idx + 1);
    D.lines.forEach((x, i) => { $("dl" + i).addEventListener("click", (e) => { if (!e.target.closest("[data-say]")) playFrom(i); }); });
    $("rate").value = String(S.set.dlgRate);
    $("rate").onchange = (e) => { S.set.dlgRate = +e.target.value; persist(); };
    $("dauto").checked = !!S.set.dlgAuto;
    $("dauto").onchange = (e) => { S.set.dlgAuto = e.target.checked; persist(); };
    $("dpause").checked = !!S.set.dlgPause;
    $("dpause").onchange = (e) => { S.set.dlgPause = e.target.checked; persist(); };
    leave = stop;
    if (S.set.auto) setTimeout(() => { if (cur.name === "dialog") playFrom(0); }, 300);
  }

  // ---------- Grammatik ----------
  function grammarView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · Grammatik");
    prog(L.id).gram = true; persist();
    app.innerHTML =
      '<section class="panel"><h2 style="margin-top:0">' + esc(L.grammar.title) + "</h2>" +
      L.grammar.text.map((t) => "<p>" + esc(t) + "</p>").join("") +
      '<div class="actions"><button class="btn primary" ' + navAttr("practice", { id: L.id, back: chBack(L.id) }) + ">Weiter: Übungen</button></div></section>";
  }

  // ---------- Wortschatz: Themengruppen wählen ----------
  function vocabView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · Wortschatz");
    const kw = countKnown(L.W);
    app.innerHTML =
      '<section class="panel"><h2 style="margin-top:0">Wortschatz: ' + esc(L.title) + "</h2>" +
      '<p class="muted">' + L.W.length + " Wörter in " + L.groups.length + " Themengruppen. Wörter, die zusammengehören, stehen in derselben Gruppe. Die Übersetzung ist immer sichtbar.</p>" + bar(kw, L.W.length) + "</section>" +
      '<div class="menu" style="margin-top:12px">' +
      L.groups.map((g, i) => {
        const k = countKnown(g.items);
        return '<button class="item" ' + navAttr("studyg", { id: L.id, gi: i, back: { name: "vocab", args: a } }) + '><span class="t">' + (i + 1) + ". " + esc(g.title) + '</span><span class="d">' + g.items.length + " Wörter</span><span class=\"m\">" + k + " von " + g.items.length + " gewusst</span>" + bar(k, g.items.length) + "</button>";
      }).join("") +
      '<button class="item" ' + navAttr("studyg", { id: L.id, gi: -1, back: { name: "vocab", args: a } }) + '><span class="t">Alle ' + L.W.length + ' Wörter</span><span class="d">Das ganze Kapitel gemischt oder als Liste.</span></button></div>';
  }
  function studygView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · " + (a.gi >= 0 ? L.groups[a.gi].title : "alle Wörter"));
    study({ groups: a.gi >= 0 ? [L.groups[a.gi]] : [{ title: "Alle Wörter", items: L.W }], back: a.back });
  }
  const scards = (a) => { const L = lesson(a.id); setCrumb("Kapitel " + L.id + " · Sätze"); study({ groups: [{ title: "Sätze", items: L.SN }], back: a.back, parentArgs: a }); };

  // ---------- Lernen: Karten und Liste (Übersetzung immer sichtbar) ----------
  function study(o) {
    const items = [].concat.apply([], o.groups.map((g) => g.items));
    const review = !!o.review;
    let onlyOpen = false, deck = [], idx = 0, mode = "cards";
    app.innerHTML =
      '<div class="panel"><div class="row"><div class="seg" id="mseg"><button class="btn" data-m="cards">Karten</button><button class="btn" data-m="list">Liste</button></div>' +
      (review ? "" : '<label class="chk"><input type="checkbox" id="open"> nur offene</label>') + "</div>" +
      '<div class="muted" id="count"></div><div id="fill"></div><div id="body"></div></div>';
    const body = $("body");
    const known = () => items.filter((x) => S.known[x.key]).length;
    function head() {
      $("count").textContent = known() + " von " + items.length + " gewusst" + (mode === "cards" && deck.length ? " · Karte " + (idx + 1) + " von " + deck.length : "");
      $("fill").innerHTML = bar(known(), items.length);
      document.querySelectorAll("#mseg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.m === mode)));
    }
    function cardsView() {
      body.innerHTML =
        '<div class="card" id="card" aria-live="polite"></div>' +
        '<div class="actions"><button class="btn bad" id="again">Noch unsicher</button><button class="btn" id="skip">Weiter</button><button class="btn good" id="known">Gewusst</button></div>' +
        '<div class="actions"><button class="btn" id="shuf">Neu mischen</button></div>';
      $("skip").onclick = () => { if (deck.length) next(); };
      $("again").onclick = () => answer(false);
      $("known").onclick = () => answer(true);
      $("shuf").onclick = buildDeck;
      buildDeck();
    }
    function buildDeck() {
      deck = shuffle(items.filter((x) => !onlyOpen || !S.known[x.key]));
      idx = 0; renderCard(true);
    }
    function renderCard(speakNew) {
      const card = $("card");
      head();
      if (!deck.length) {
        card.innerHTML = '<div class="big">Alles gewusst</div><div class="hint">Wähle eine andere Gruppe oder schalte „nur offene“ aus.</div>' +
          (o.back ? '<button class="btn primary" data-nav="' + o.back.name + "\" data-args='" + JSON.stringify(o.back.args) + "'>Zurück</button>" : "");
        return;
      }
      const x = deck[idx], sentence = x.kind === "s";
      card.innerHTML =
        '<div class="hint">' + (x.lesson ? "Kapitel " + x.lesson : "") + "</div>" +
        '<div class="big' + (sentence ? " sent" : "") + '">' + esc(x.sr) + "</div>" +
        '<div class="pron">' + esc(x.pr) + "</div>" +
        '<div class="trans' + (sentence ? " sent" : "") + '">' + esc(x.de) + "</div>" +
        earBtn(x.sr, "Nochmal anhören");
      if (speakNew) autoSay(x.sr);
    }
    function next() { idx = (idx + 1) % deck.length; renderCard(true); }
    function answer(good) {
      if (!deck.length) return;
      const x = deck[idx];
      mark(x, good);
      if (good) { S.known[x.key] = true; persist(); }
      if (good && (onlyOpen || review)) {
        deck.splice(idx, 1);
        if (idx >= deck.length) idx = 0;
        renderCard(true);
      } else next();
    }
    function listView() {
      const rows = items.filter((x) => !onlyOpen || !S.known[x.key]);
      head();
      body.innerHTML = '<ul class="list">' + rows.map((x, i) =>
        '<li><label class="tick"><input type="checkbox" data-k="' + esc(x.key) + '"' + (S.known[x.key] ? " checked" : "") + ' aria-label="gewusst"></label><div style="flex:1"><div class="sr">' + esc(x.sr) +
        "</div><div>" + esc(x.de) + '</div><div class="pr">' + esc(x.pr) + "</div></div>" + earBtn(x.sr) + "</li>").join("") + "</ul>";
      body.querySelectorAll("input[data-k]").forEach((c) => {
        c.onchange = () => {
          const x = byKey[c.dataset.k];
          if (c.checked) { S.known[x.key] = true; delete S.weak[x.key]; } else { delete S.known[x.key]; }
          persist(); head();
        };
      });
    }
    function render() { mode === "cards" ? cardsView() : listView(); }
    $("mseg").addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (b) { mode = b.dataset.m; render(); } });
    if (!review) $("open").onchange = (e) => { onlyOpen = e.target.checked; render(); };
    render();
  }

  // ---------- Fragen-Baukasten ----------
  const byKey = {};
  ALL.forEach((x) => { byKey[x.key] = x; });
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
          ? '<p class="fb ok">Bestanden. Kapitel ' + cfg.lessonId + " ist abgeschlossen.</p>"
          : '<p class="fb no">Noch nicht bestanden (nötig: ' + PASS + " %). Wiederhole den Wortschatz und versuche es noch einmal.</p>";
      }
      const nextL = cfg.final && pct >= PASS && cfg.lessonId < LES.length ? cfg.lessonId + 1 : null;
      box.innerHTML =
        '<h2 style="margin-top:0">' + score + " von " + qs.length + " richtig (" + pct + " %)</h2>" + verdict +
        (wrong.length
          ? '<p class="muted">Diese kommen unter „Wiederholen“ dran:</p><ul class="list">' + wrong.map((w) =>
              '<li><div style="flex:1"><div class="sr">' + esc(w.sr) + "</div><div>" + esc(w.de) + '</div><div class="pr">' + esc(w.pr) + "</div></div>" + earBtn(w.sr) + "</li>").join("") + "</ul>"
          : "<p>Alles richtig.</p>") +
        '<div class="actions"><button class="btn primary" id="again">Nochmal</button>' +
        (cfg.back ? '<button class="btn" data-nav="' + cfg.back.name + "\" data-args='" + JSON.stringify(cfg.back.args) + "'>" + (cfg.back.name === "chapter" ? "Zum Kapitel" : "Zurück") + "</button>" : "") +
        (nextL ? '<button class="btn good" ' + navAttr("chapter", { id: nextL }) + ">Nächstes Kapitel</button>" : "") +
        '<button class="btn" ' + navAttr("start") + ">Hauptmenü</button></div>";
      $("again").onclick = cfg.again;
    }
    ask();
  }

  // ---------- Übungen & Test (pro Kapitel) ----------
  function practiceView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · Übungen");
    const b = prog(L.id).best;
    const row = (key, title, desc) =>
      '<button class="item" data-ex="' + key + '"><span class="t">' + title + '</span><span class="d">' + desc + '</span><span class="m">' + (b[key] !== undefined ? "Bestwert " + b[key] + " %" : "noch nicht gemacht") + "</span></button>";
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Übungen: ' + esc(L.title) + '</h2><p class="muted">Hier ist die Übersetzung verborgen. Jede Übung kann beliebig oft wiederholt werden.</p></section>' +
      '<div class="menu" style="margin-top:12px">' +
      row("vocab", "Vokabelquiz (15 Fragen)", "Wort sehen oder Bedeutung wählen, in beide Richtungen.") +
      row("hear", "Hören & Verstehen (15 Aufgaben)", "Du hörst ein Wort oder einen Satz, der Text bleibt verborgen.") +
      row("gap", "Lückentext (bis 10 Sätze)", "Ergänze das fehlende Wort im Satz.") + "</div>";
    app.querySelectorAll("[data-ex]").forEach((el) => {
      el.onclick = () => {
        const k = el.dataset.ex;
        const run = () => {
          let qs = [];
          if (k === "vocab") {
            qs = shuffle(L.W).slice(0, 15).map((x, n) => qChoice(x, L.W, n < 9 ? "sr" : "de"));
          } else if (k === "hear") {
            qs = shuffle(L.W).slice(0, 10).map((x) => qListen(x, L.W)).concat(shuffle(L.SN).slice(0, 5).map((x) => qListen(x, L.SN)));
          } else {
            shuffle(L.SN).forEach((x) => { if (qs.length < 10) { const g = qGap(x, L.SN); if (g) qs.push(g); } });
          }
          runQuestions({ title: L.title, qs: shuffle(qs), back: chBack(L.id), again: run, bestKey: k, lessonId: L.id });
        };
        setCrumb("Kapitel " + L.id + " · " + (k === "vocab" ? "Vokabelquiz" : k === "hear" ? "Hören" : "Lückentext"));
        run();
      };
    });
  }
  function testView(a) {
    const L = lesson(a.id);
    setCrumb("Kapitel " + L.id + " · Kapiteltest");
    const b = prog(L.id).best;
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Kapiteltest</h2>' +
      "<p>20 gemischte Fragen aus Kapitel " + L.id + " (Vokabeln, Sätze, Hören, Lückentext). Mit " + PASS + " % gilt das Kapitel als abgeschlossen.</p>" +
      (b.final !== undefined ? '<p class="muted">Bestwert: ' + b.final + " %</p>" : "") +
      '<button class="btn primary" id="go">Test starten</button></section>';
    const run = () => {
      const w = shuffle(L.W), s = shuffle(L.SN);
      let qs = [];
      for (let i = 0; i < 8; i++) qs.push(qChoice(w[i], L.W, "sr"));
      for (let i = 8; i < 12; i++) qs.push(qChoice(w[i], L.W, "de"));
      for (let i = 12; i < 15; i++) qs.push(qListen(w[i], L.W));
      qs.push(qListen(s[0], L.SN), qListen(s[1], L.SN));
      const gaps = [];
      s.slice(2).forEach((x) => { if (gaps.length < 3) { const g = qGap(x, L.SN); if (g) gaps.push(g); } });
      qs = qs.concat(gaps);
      for (let i = 15; qs.length < 20 && i < w.length; i++) qs.push(qChoice(w[i], L.W, "sr"));
      runQuestions({ title: "Kapiteltest", qs: shuffle(qs), back: chBack(L.id), again: run, bestKey: "final", lessonId: L.id, final: true });
    };
    $("go").onclick = run;
  }

  // ---------- Wiederholen (alle Kapitel) ----------
  function reviewView() {
    setCrumb("Wiederholen");
    const weak = weakItems();
    if (!weak.length) {
      app.innerHTML = '<div class="panel"><h2 style="margin-top:0">Nichts zu wiederholen</h2><p class="muted">Sobald du bei einer Karte „Noch unsicher“ wählst oder im Quiz falsch liegst, erscheint sie hier.</p>' +
        '<button class="btn primary" ' + navAttr("start") + ">Hauptmenü</button></div>";
      return;
    }
    app.innerHTML = '<section class="panel"><h2 style="margin-top:0">Wiederholen</h2><p>' + weak.length + " Einträge sind noch offen.</p>" +
      '<div class="actions" style="justify-content:flex-start"><button class="btn primary" id="rc">Mit Karten wiederholen</button><button class="btn" id="rq">Quiz mit offenen Einträgen</button></div></section>';
    $("rc").onclick = () => { setCrumb("Wiederholen · Karten"); study({ groups: [{ title: "Offen", items: weak }], review: true, back: { name: "review", args: {} } }); };
    $("rq").onclick = () => {
      const run = () => {
        const w = shuffle(weakItems()).slice(0, 10);
        if (!w.length) { nav("review"); return; }
        const qs = w.map((x) => qChoice(x, x.kind === "w" ? lesson(x.lesson).W : lesson(x.lesson).SN, Math.random() < 0.7 ? "sr" : "de"));
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
      '<select id="lsel" aria-label="Kapitel"><option value="0">Alle Kapitel</option>' + LES.map((L) => '<option value="' + L.id + '">' + L.id + ". " + esc(L.title) + "</option>").join("") + "</select></div>" +
      '<div class="row"><input type="search" id="q" class="grow" placeholder="Suchen (Serbisch oder Deutsch)" aria-label="Suchen"></div>' +
      '<div class="muted" id="cnt"></div><ul class="list" id="sl"></ul></div>';
    function draw() {
      const base = kind === "w" ? ALLW : ALLS;
      document.querySelectorAll("#seg button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.kind === kind)));
      const term = q.trim().toLowerCase();
      const rows = base.filter((x) => (!les || x.lesson === les) && (!term || x.sr.toLowerCase().indexOf(term) >= 0 || x.de.toLowerCase().indexOf(term) >= 0));
      $("cnt").textContent = rows.length + " Einträge" + (rows.length > 200 ? " (die ersten 200 werden angezeigt, grenze die Suche ein)" : "");
      $("sl").innerHTML = rows.slice(0, 200).map((x) =>
        '<li><div style="flex:1"><div class="sr">' + esc(x.sr) + "</div><div>" + esc(x.de) + '</div><div class="pr">' + esc(x.pr) + "</div></div>" + earBtn(x.sr) + "</li>").join("") ||
        '<li class="muted">Nichts gefunden.</li>';
    }
    $("seg").addEventListener("click", (e) => { const b = e.target.closest("[data-kind]"); if (b) { kind = b.dataset.kind; draw(); } });
    $("lsel").onchange = (e) => { les = +e.target.value; draw(); };
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
      '<div class="row" style="margin-top:12px"><label for="tempo">Tempo (Karten)</label><select id="tempo"><option value="n">normal</option><option value="l">langsam</option></select></div>' +
      '<div class="row"><label for="voice">Stimme</label><select id="voice" class="grow">' +
      (sel.length ? sel.map((v) => '<option value="' + esc(v.voiceURI) + '"' + (cur2 && cur2.voiceURI === v.voiceURI ? " selected" : "") + ">" + esc(v.name + " (" + v.lang + ")") + "</option>").join("")
        : '<option value="">keine passende Stimme gefunden</option>') + "</select></div>" +
      '<p class="' + (status.ok ? "fb ok" : "note") + '">' + esc(status.text) + "</p>" +
      '<div class="actions" style="justify-content:flex-start"><button class="btn primary" id="test">Probe hören</button></div></div>' +
      '<div class="panel" style="margin-top:14px"><h2 style="margin-top:0">Dialoge</h2>' +
      '<div class="row"><label for="drate">Dialog-Tempo</label><select id="drate"><option value="0.55">sehr langsam</option><option value="0.7">langsam</option><option value="0.85">normal</option></select></div>' +
      '<label class="chk"><input type="checkbox" id="dauto"> automatisch zur nächsten Zeile</label>' +
      '<label class="chk" style="margin-top:8px"><input type="checkbox" id="dpause"> Pause zum Nachsprechen nach jeder Zeile</label></div>' +
      '<div class="panel" style="margin-top:14px"><h2 style="margin-top:0">Fortschritt</h2>' +
      "<p>" + kn + " von " + ALLW.length + " Wörtern und " + ks + " von " + ALLS.length + " Sätzen gewusst. " + weakItems().length + " zum Wiederholen.</p>" +
      '<button class="btn bad" id="reset">Fortschritt löschen</button></div>';
    $("tempo").value = S.set.slow ? "l" : "n";
    $("drate").value = String(S.set.dlgRate);
    $("dauto").checked = !!S.set.dlgAuto;
    $("dpause").checked = !!S.set.dlgPause;
    $("auto").onchange = (e) => { S.set.auto = e.target.checked; persist(); };
    $("tempo").onchange = (e) => { S.set.slow = e.target.value === "l"; persist(); };
    $("voice").onchange = (e) => { S.set.voice = e.target.value; persist(); settingsView(); };
    $("drate").onchange = (e) => { S.set.dlgRate = +e.target.value; persist(); };
    $("dauto").onchange = (e) => { S.set.dlgAuto = e.target.checked; persist(); };
    $("dpause").onchange = (e) => { S.set.dlgPause = e.target.checked; persist(); };
    $("test").onclick = () => say("Dobar dan! Kako ste? Drago mi je.");
    let armed = false;
    $("reset").onclick = () => {
      if (!armed) { armed = true; $("reset").textContent = "Wirklich löschen? Nochmal tippen"; return; }
      S.known = {}; S.weak = {}; S.les = {}; persist(); settingsView();
    };
  }

  const VIEWS = {
    start: home, chapter: chapterView, dialogs: dialogsView, dialog: dialogView, grammar: grammarView, vocab: vocabView, studyg: studygView, scards: scards,
    practice: practiceView, test: testView, review: reviewView, lookup: lookupView, sounds: soundsView, settings: settingsView
  };
  const HASH = { wiederholen: "review", nachschlagen: "lookup", aussprache: "sounds", einstellungen: "settings" };
  const h = (location.hash || "").slice(1);
  const m = /^kapitel(\d+)$/.exec(h);
  if (m && lesson(+m[1])) nav("chapter", { id: +m[1] });
  else if (HASH[h]) nav(HASH[h]);
  else nav("start");

  // Für Tests und Fehlersuche
  window.__kurs = { LES: LES, pron: pron, clean: clean };
})();
