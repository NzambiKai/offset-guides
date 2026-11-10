(() => {
  const NS = "http://www.w3.org/2000/svg", $ = s => document.querySelector(s);
  const el = (n, a, t) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  // Simple box, mm: one 70 x 93 rectangle. 0,0 = its top-left corner (60,40).
  const CUT = "M60 40 H130 V133 H60 Z";
  const FOLD = "";
  document.querySelectorAll(".die-g").forEach(g => g.append(el("path", { class: "cut", d: CUT, "vector-effect": "non-scaling-stroke" }), el("path", { class: "fold", d: FOLD, "vector-effect": "non-scaling-stroke" })));

  // Panel controller, bound per artboard
  function panel({ root, svg, gA, gP, status, M, PX, MAX, box, labels, initial }) {
    const sides = { top: true, left: true, right: true, bottom: true };
    let applied = [];
    const q = s => root.querySelector(s), inp = q("input");
    const off = () => { const v = parseFloat(inp.value.replace(",", ".")); return isFinite(v) && v >= 0 ? v : null; };
    const gf = mm => { const d = Math.min(mm, MAX) * PX, o = []; if (sides.top) o.push({ k: "h", p: M.y - d, mm: -mm }); if (sides.bottom) o.push({ k: "h", p: M.y + d, mm }); if (sides.left) o.push({ k: "v", p: M.x - d, mm: -mm }); if (sides.right) o.push({ k: "v", p: M.x + d, mm }); return o; };
    const key = g => g.k + Math.round(g.p * 100);
    const fmt = mm => (mm > 0 ? "+" : mm < 0 ? "−" : "") + Math.abs(+mm.toFixed(2)) + " mm";
    const ln = (g, lab) => { const f = document.createDocumentFragment(); f.append(g.k === "h" ? el("line", { x1: box.x0, x2: box.x1, y1: g.p, y2: g.p }) : el("line", { y1: box.y0, y2: box.y1, x1: g.p, x2: g.p }));
      if (lab && labels) f.append(g.k === "h" ? el("text", { x: box.x0 + 2, y: g.p - 1.4 }, fmt(g.mm)) : el("text", { x: g.p + 1.4, y: box.y0 + 6 }, fmt(g.mm))); return f; };
    const draw = () => { gA.replaceChildren(...applied.map(g => ln(g, 1))); gP.replaceChildren(); const mm = off(); if (mm === null) return; const h = new Set(applied.map(key)); gf(mm).filter(g => !h.has(key(g))).forEach(g => gP.append(ln(g, 0))); };
    const say = m => status.textContent = m;
    root.querySelectorAll("button.sq").forEach(b => b.addEventListener("click", () => { const s = b.dataset.side; sides[s] = !sides[s]; b.setAttribute("aria-pressed", sides[s]); root.querySelector(`g.s[data-side=${s}]`).classList.toggle("on", sides[s]); draw(); }));
    inp.addEventListener("input", draw);
    const apply = () => { const mm = off(); if (mm === null) return say("Type an offset in mm."); const h = new Set(applied.map(key)); const add = gf(mm).filter(g => !h.has(key(g))); if (!add.length) return say("Nothing new to add. A guide already there is left as it is."); applied = applied.concat(add); draw(); say(`Applied ${add.length} guide${add.length > 1 ? "s" : ""} at ${mm} mm from 0,0.`); };
    q("[data-act=apply]").addEventListener("click", apply);
    if (initial) applied = gf(off());
    draw();
  }

  // Hero artboard: rulers + origin
  const hs = $("#hs"), OX = 60, OY = 40, R = hs.querySelector(".rulers");
  R.append(el("rect", { class: "rbg", x: -30, y: -28, width: 244, height: 8 }), el("rect", { class: "rbg", x: -30, y: -28, width: 8, height: 230 }));
  for (let mm = -70; mm <= 170; mm += 5) { const x = OX + mm; if (x < -22 || x > 214) continue; const big = mm % 20 === 0; R.append(el("line", { class: "tick", x1: x, x2: x, y1: -20, y2: big ? -24.5 : mm % 10 === 0 ? -22.5 : -21.3 })); if (big) R.append(el("text", { class: "rl", x: x + .8, y: -24.2 }, mm)); }
  for (let mm = -70; mm <= 160; mm += 5) { const y = OY + mm; if (y < -20 || y > 202) continue; const big = mm % 20 === 0; R.append(el("line", { class: "tick", y1: y, y2: y, x1: -22, x2: big ? -26.5 : mm % 10 === 0 ? -24.5 : -23.3 })); if (big) R.append(el("text", { class: "rl", x: -24.2, y: y + .8, transform: `rotate(-90 -24.2 ${y + .8})`, "text-anchor": "end" }, mm)); }
  R.append(el("rect", { class: "rcorner", x: -30, y: -28, width: 8, height: 8 }));
  const og = hs.querySelector(".origin");
  og.append(el("line", { class: "ox", x1: OX - 4, x2: OX + 4, y1: OY, y2: OY }), el("line", { class: "ox", x1: OX, x2: OX, y1: OY - 4, y2: OY + 4 }), el("circle", { class: "oc", cx: OX, cy: OY, r: 1.6 }), el("text", { class: "ot", x: OX + 2.2, y: OY + 5.2 }, "0,0"));
  const hv = $(".hero-visual");
  panel({ root: hv.querySelector(".panel"), svg: hs, gA: hs.querySelector(".g-applied"), gP: hs.querySelector(".g-preview"), status: hv.querySelector(".panel-msg"), M: { x: OX, y: OY }, PX: 1, MAX: 40, box: { x0: -18, x1: 210, y0: -16, y1: 196 }, labels: true, initial: true });
  // Try-it section
  const ts = $("#ts");
  panel({ root: $(".try-stage .panel"), svg: ts, gA: $("#t-applied"), gP: $("#t-preview"), status: $(".try-stage .panel-msg"), M: { x: 200, y: 120 }, PX: 4, MAX: 28, box: { x0: 0, x1: 560, y0: 0, y1: 380 }, labels: false });

  // Silent file. muted stays on so autoplay is allowed. Native controls remain if motion is reduced or play() is rejected.
  const video = $("#demo-video");
  if (video) {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const arm = () => { video.muted = true; video.defaultMuted = true; video.playsInline = true; video.controls = true; video.setAttribute("muted", ""); video.setAttribute("playsinline", ""); video.setAttribute("controls", ""); };
    const play = () => { arm(); const pending = video.play(); if (pending && pending.catch) pending.catch(() => {}); };
    const hold = () => { video.autoplay = false; video.removeAttribute("autoplay"); video.loop = false; video.pause(); arm(); };
    const applyMotion = () => {
      arm();
      if (motion.matches) hold();
      else { video.loop = true; video.autoplay = true; video.setAttribute("autoplay", ""); video.setAttribute("loop", ""); play(); }
    };
    if (motion.addEventListener) motion.addEventListener("change", applyMotion);
    applyMotion();
  }
})();
