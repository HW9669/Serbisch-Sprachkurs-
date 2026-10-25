(function () {
  "use strict";

  var app = document.getElementById("app");
  var tabs = document.querySelectorAll("nav [data-tab]");
  var STORE = "serbisch-kurs-v1";

  // ---------- Hilfsfunktionen ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function categories(list) {
    var out = [];
    list.forEach(function (x) { if (out.indexOf(x[3]) < 0) out.push(x[3]); });
    return out;
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) { /* ohne Speicher weiterarbeiten */ }
  }
  var progress = load(); // { "wort": true } für gewusste Wörter

  // ---------- Vorlesen (Browser-Stimme, falls vorhanden) ----------
  var canSpeak = "speechSynthesis" in window;
  function speak(text) {
    if (!canSpeak) return;
    var voices = speechSynthesis.getVoices();
    var v = null;
    ["sr", "hr", "bs"].some(function (p) {
      v = voices.filter(function (x) { return x.lang.toLowerCase().indexOf(p) === 0; })[0];
      return !!v;
    });
    var u = new SpeechSynthesisUtterance(text);
    u.lang = v ? v.lang : "sr-RS";
    if (v) u.voice = v;
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  function speakBtn(text) {
    return canSpeak
      ? '<button class="btn icon" data-speak="' + esc(text) + '" aria-label="Vorlesen">🔊</button>'
      : "";
  }
  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-speak]");
    if (b) { e.stopPropagation(); speak(b.getAttribute("data-speak")); }
  }, true);

  // ---------- Tabs ----------
  var views = { trainer: trainer, quiz: quiz, sentences: sentences, sounds: sounds };
  function show(name) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.tab === name)); });
    app.innerHTML = "";
    views[name]();
    try { history.replaceState(null, "", "#" + name); } catch (e) { /* ignorieren */ }
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { show(t.dataset.tab); }); });

  function catSelect(list, id) {
    return '<select id="' + id + '" aria-label="Kategorie"><option value="">Alle Kategorien</option>' +
      categories(list).map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + "</select>";
  }

  // ---------- Wortschatz-Trainer ----------
  function trainer() {
    var cat = "", dir = "sr", onlyOpen = false, deck = [], idx = 0, flipped = false;

    app.innerHTML =
      '<div class="panel">' +
      '<div class="row">' + catSelect(WORDS, "cat") +
      '<select id="dir" aria-label="Richtung"><option value="sr">Serbisch → Deutsch</option><option value="de">Deutsch → Serbisch</option></select>' +
      '<label class="muted"><input type="checkbox" id="open"> nur offene</label></div>' +
      '<div class="muted" id="count"></div><div class="bar"><i id="fill"></i></div>' +
      '<div class="card" id="card" role="button" tabindex="0" aria-label="Karte umdrehen"></div>' +
      '<div class="actions"><button class="btn bad" id="again">Nochmal</button>' +
      '<button class="btn" id="flip">Umdrehen</button>' +
      '<button class="btn good" id="known">Gewusst</button></div>' +
      '<div class="actions"><button class="btn" id="shuf">Mischen</button>' +
      '<button class="btn" id="reset">Fortschritt zurücksetzen</button></div></div>';

    var card = document.getElementById("card");

    function build() {
      deck = WORDS.filter(function (w) {
        return (!cat || w[3] === cat) && (!onlyOpen || !progress[w[0]]);
      });
      deck = shuffle(deck);
      idx = 0; flipped = false; render();
    }
    function render() {
      var inCat = WORDS.filter(function (w) { return !cat || w[3] === cat; });
      var known = inCat.filter(function (w) { return progress[w[0]]; }).length;
      document.getElementById("count").textContent =
        known + " von " + inCat.length + " gewusst" + (deck.length ? " · Karte " + (idx + 1) + "/" + deck.length : "");
      document.getElementById("fill").style.width = (inCat.length ? known / inCat.length * 100 : 0) + "%";
      if (!deck.length) {
        card.innerHTML = '<div class="big">Alles gewusst 🎉</div><div class="hint">Wähle eine andere Kategorie oder setze den Fortschritt zurück.</div>';
        return;
      }
      var w = deck[idx];
      var front = dir === "sr" ? w[0] : w[1];
      var back = dir === "sr" ? w[1] : w[0];
      card.innerHTML = '<div class="hint">' + esc(w[3]) + "</div>" +
        '<div class="big">' + esc(flipped ? back : front) + "</div>" +
        (flipped || dir === "sr" ? '<div class="pron">' + esc(w[2]) + "</div>" : "") +
        (flipped || dir === "sr" ? speakBtn(w[0]) : "") +
        '<div class="hint">' + (flipped ? "" : "Tippen zum Umdrehen") + "</div>";
    }
    function next() { idx = (idx + 1) % deck.length; flipped = false; render(); }

    card.addEventListener("click", function () { if (deck.length) { flipped = !flipped; render(); } });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
    });
    document.getElementById("flip").onclick = function () { card.click(); };
    document.getElementById("again").onclick = function () {
      if (!deck.length) return;
      delete progress[deck[idx][0]]; save(progress); next();
    };
    document.getElementById("known").onclick = function () {
      if (!deck.length) return;
      progress[deck[idx][0]] = true; save(progress);
      if (onlyOpen) { deck.splice(idx, 1); if (idx >= deck.length) idx = 0; flipped = false; render(); }
      else next();
    };
    document.getElementById("shuf").onclick = build;
    document.getElementById("reset").onclick = function () {
      if (confirm("Fortschritt wirklich zurücksetzen?")) { progress = {}; save(progress); build(); }
    };
    document.getElementById("cat").onchange = function (e) { cat = e.target.value; build(); };
    document.getElementById("dir").onchange = function (e) { dir = e.target.value; flipped = false; render(); };
    document.getElementById("open").onchange = function (e) { onlyOpen = e.target.checked; build(); };
    build();
  }

  // ---------- Vokabelquiz ----------
  function quiz() {
    var ROUNDS = 10;
    app.innerHTML =
      '<div class="panel" id="qbox"><div class="row">' + catSelect(WORDS, "qcat") +
      '<select id="qdir" aria-label="Richtung"><option value="sr">Serbisch → Deutsch</option><option value="de">Deutsch → Serbisch</option></select></div>' +
      '<button class="btn primary" id="start">Quiz starten (' + ROUNDS + ' Fragen)</button></div>';

    document.getElementById("start").onclick = function () {
      var cat = document.getElementById("qcat").value;
      var dir = document.getElementById("qdir").value;
      var pool = WORDS.filter(function (w) { return !cat || w[3] === cat; });
      if (pool.length < 4) pool = WORDS;
      var qs = shuffle(pool).slice(0, ROUNDS), i = 0, score = 0, wrong = [];
      var box = document.getElementById("qbox");

      function ask() {
        var w = qs[i];
        var others = shuffle(WORDS.filter(function (x) { return x[0] !== w[0] && x[1] !== w[1]; })).slice(0, 3);
        var options = shuffle([w].concat(others));
        var prompt = dir === "sr" ? w[0] : w[1];
        box.innerHTML =
          '<div class="muted">Frage ' + (i + 1) + " von " + qs.length + " · " + score + ' richtig</div>' +
          '<div class="bar"><i style="width:' + (i / qs.length * 100) + '%"></i></div>' +
          '<div class="big" style="font-size:1.8rem;font-weight:650">' + esc(prompt) + " " + (dir === "sr" ? speakBtn(w[0]) : "") + "</div>" +
          (dir === "sr" ? '<div class="pron" style="color:var(--accent)">' + esc(w[2]) + "</div>" : "") +
          '<div class="opts">' + options.map(function (o, k) {
            return '<button class="btn" data-k="' + k + '">' + esc(dir === "sr" ? o[1] : o[0]) + "</button>";
          }).join("") + '</div><div class="actions" id="nx"></div>';
        box.querySelectorAll(".opts button").forEach(function (b) {
          b.onclick = function () {
            var pick = options[+b.dataset.k], ok = pick === w;
            box.querySelectorAll(".opts button").forEach(function (x) {
              x.disabled = true;
              if (options[+x.dataset.k] === w) x.classList.add("right");
            });
            if (ok) score++; else { b.classList.add("wrong"); wrong.push(w); }
            var last = i === qs.length - 1;
            document.getElementById("nx").innerHTML =
              '<button class="btn primary" id="go">' + (last ? "Ergebnis" : "Weiter") + "</button>";
            document.getElementById("go").onclick = function () { i++; last ? done() : ask(); };
            document.getElementById("go").focus();
          };
        });
      }
      function done() {
        var pct = Math.round(score / qs.length * 100);
        box.innerHTML =
          '<h2 style="margin-top:0">' + score + " von " + qs.length + " richtig (" + pct + " %)</h2>" +
          (wrong.length
            ? '<p class="muted">Zum Wiederholen:</p><ul class="list">' + wrong.map(function (w) {
                return '<li><div><span class="sr">' + esc(w[0]) + "</span> – " + esc(w[1]) +
                  '<div class="pr">' + esc(w[2]) + "</div></div>" + speakBtn(w[0]) + "</li>";
              }).join("") + "</ul>"
            : "<p>Perfekt – alles richtig! 🎉</p>") +
          '<div class="actions"><button class="btn primary" id="again">Nochmal spielen</button></div>';
        document.getElementById("again").onclick = function () { show("quiz"); };
      }
      ask();
    };
  }

  // ---------- 100 Sätze ----------
  function sentences() {
    var cat = "", q = "";
    app.innerHTML =
      '<div class="panel"><div class="row"><input type="search" id="q" class="grow" placeholder="Suchen (Serbisch oder Deutsch)" aria-label="Suchen">' +
      '<span class="muted">' + SENTENCES.length + ' Sätze</span></div>' +
      '<div class="chips" id="chips"></div><ul class="list" id="sl"></ul></div>';

    var chips = ["Alle"].concat(categories(SENTENCES));
    function draw() {
      document.getElementById("chips").innerHTML = chips.map(function (c) {
        var on = (c === "Alle" && !cat) || c === cat;
        return '<button class="btn chip" aria-pressed="' + on + '" data-c="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("");
      var term = q.trim().toLowerCase();
      var html = SENTENCES.map(function (s, n) { return { s: s, n: n + 1 }; })
        .filter(function (o) {
          return (!cat || o.s[3] === cat) &&
            (!term || o.s[0].toLowerCase().indexOf(term) >= 0 || o.s[1].toLowerCase().indexOf(term) >= 0);
        })
        .map(function (o) {
          return '<li><span class="num">' + o.n + '.</span><div style="flex:1"><div class="sr">' + esc(o.s[0]) +
            "</div><div>" + esc(o.s[1]) + '</div><div class="pr">' + esc(o.s[2]) + "</div></div>" + speakBtn(o.s[0]) + "</li>";
        }).join("");
      document.getElementById("sl").innerHTML = html || '<li class="muted">Nichts gefunden.</li>';
    }
    document.getElementById("chips").addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]");
      if (!b) return;
      cat = b.dataset.c === "Alle" ? "" : b.dataset.c; draw();
    });
    document.getElementById("q").oninput = function (e) { q = e.target.value; draw(); };
    draw();
  }

  // ---------- Aussprache ----------
  function sounds() {
    app.innerHTML =
      '<div class="panel"><h2 style="margin-top:0">So liest du die Lautschrift</h2>' +
      '<p>Serbisch wird so gesprochen, wie es geschrieben wird – jeder Buchstabe hat genau einen Laut. ' +
      "Die Lautschrift im Kurs ist für österreichisches Deutsch gedacht, die <b>betonte Silbe</b> steht in GROSSBUCHSTABEN.</p>" +
      "<table><thead><tr><th>Serbisch</th><th>Aussprache</th><th>Beispiel</th></tr></thead><tbody>" +
      LEGEND.map(function (l) {
        return "<tr><td>" + esc(l[0]) + "</td><td>" + esc(l[1]) + "</td><td>" + esc(l[2]) + "</td></tr>";
      }).join("") + "</tbody></table>" +
      '<p class="muted">Hinweis: Dieser Kurs verwendet ausschließlich die lateinische Schrift und den in Serbien üblichen ekavischen Standard (z. B. „mleko“, „lepo“). ' +
      "Das 🔊-Vorlesen nutzt die Stimmen deines Geräts; ist keine serbische Stimme installiert, wird eine kroatische oder bosnische verwendet.</p></div>";
  }

  var start = (location.hash || "").slice(1);
  show(views[start] ? start : "trainer");
})();
