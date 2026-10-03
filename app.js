"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const safeStore = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};
const body = document.body;
let toastTimer;
function toast(text) {
  const node = $("#toast");
  node.textContent = text;
  node.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("visible"), 1800);
}
const toc = $("#toc"),
  shade = $("#toc-shade"),
  tocToggle = $("#toc-toggle");
function setToc(open) {
  toc.hidden = !open;
  shade.hidden = !open;
  body.classList.toggle("toc-open", open);
  $("#main").inert = open;
  $(".topbar").inert = open;
  tocToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    $("#toc-close").focus({ preventScroll: true });
  } else {
    tocToggle.focus({ preventScroll: true });
  }
}
tocToggle.addEventListener("click", () => setToc(toc.hidden));
$("#toc-close").addEventListener("click", () => setToc(false));
shade.addEventListener("click", () => setToc(false));
$$("#toc a").forEach((link) =>
  link.addEventListener("click", () => setToc(false)),
);
document.addEventListener("keydown", (event) => {
  if (toc.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    setToc(false);
  }
  if (event.key === "Tab") {
    const controls = $$("a,button", toc),
      first = controls[0],
      last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
function setTheme(dark) {
  body.classList.toggle("dark", dark);
  $("#theme-toggle").setAttribute("aria-pressed", String(dark));
  $("#theme-toggle").setAttribute(
    "aria-label",
    dark ? "切换浅色模式" : "切换深色模式",
  );
}
setTheme(safeStore.get("study-theme") === "dark");
$("#theme-toggle").addEventListener("click", () => {
  const dark = !body.classList.contains("dark");
  setTheme(dark);
  safeStore.set("study-theme", dark ? "dark" : "light");
  toast(dark ? "已切换为深色阅读" : "已切换为浅色阅读");
});
function setLarge(large) {
  body.classList.toggle("large-text", large);
  $("#font-toggle").setAttribute("aria-pressed", String(large));
  $("#font-toggle").setAttribute(
    "aria-label",
    large ? "恢复标准字号" : "切换大字号",
  );
}
setLarge(safeStore.get("study-large") === "true");
$("#font-toggle").addEventListener("click", () => {
  const large = !body.classList.contains("large-text");
  setLarge(large);
  safeStore.set("study-large", String(large));
  toast(large ? "正文已放大" : "已恢复标准字号");
});
function setMotion(paused) {
  body.classList.toggle("no-motion", paused);
  document.documentElement.classList.toggle("no-motion", paused);
  $("#motion-toggle").setAttribute("aria-pressed", String(paused));
  $("#motion-toggle").setAttribute(
    "aria-label",
    paused ? "恢复动画" : "暂停动画",
  );
  $("#motion-toggle").firstElementChild.textContent = paused ? "▷" : "Ⅱ";
}
setMotion(safeStore.get("study-motion") === "paused");
$("#motion-toggle").addEventListener("click", () => {
  const paused = !body.classList.contains("no-motion");
  setMotion(paused);
  safeStore.set("study-motion", paused ? "paused" : "on");
  toast(paused ? "已暂停动画" : "已恢复动画；仍遵循系统减少动态设置");
});
$("#print").addEventListener("click", () => window.print());
let ticking = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width =
    `${max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 0}%`;
  ticking = false;
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  },
  { passive: true },
);
addEventListener("resize", updateProgress);
updateProgress();
const tocLinks = $$("#toc a");
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        tocLinks.forEach((a) => {
          const active = a.hash === "#" + entry.target.id;
          a.classList.toggle("active", active);
          if (active) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      }
    }
  },
  { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
);
$$("section[id]").forEach((section) => observer.observe(section));
const stageData = {
  creation: [
    "创造：先有良善的礼物，才谈恩赐被滥用。",
    "创1:31；2:16–17 · 神造万物甚好，人受造是要在祂的话之下享用、治理与感恩。",
  ],
  fall: [
    "堕落：人把受造物，放在创造主的位置上。",
    "创3:1–7；罗5:12 · 罪不只是做错一件事，也是拒绝神作主，使欲望与爱失去次序。",
  ],
  promise: [
    "应许：神主动呼召、拯救，并应许新心。",
    "创12:1–3；结36:25–27 · 人不能靠外在命令自我更新，必须领受神所赐的赦免与圣灵。",
  ],
  christ: [
    "基督：那义者为罪人，成就真实的和好。",
    "太4:1–11；约一2:1–2 · 祂顺服至死，为罪作挽回祭，又从死里复活，是新生命的根基。",
  ],
  church: [
    "教会：已属于父，仍在世界中忠心生活。",
    "约一2:12–17；3:16–24 · 分别为圣同时包括拒绝罪、持守真理，以及具体地爱人。",
  ],
  new: [
    "新创造：神使与祂同住的应许完全实现。",
    "启21:1–5；22:1–5 · 旧秩序过去，罪与死亡被除去；神的百姓在祂面前常存。",
  ],
};
$$("[data-stage]").forEach((button) =>
  button.addEventListener("click", () => {
    const data = stageData[button.dataset.stage];
    $$("[data-stage]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b === button)),
    );
    $("#stage-focus b").textContent = data[0];
    $("#stage-focus span").textContent = data[1];
  }),
);
$$(".flashcard").forEach((button) =>
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    $(".flash-answer", button).hidden = !open;
    $(".flash-hint", button).textContent = open ? "点击收起" : "点击揭示";
  }),
);
$$(".quiz-options button").forEach((button) =>
  button.addEventListener("click", () => {
    const field = button.closest("fieldset");
    $$("button", field).forEach((b) => {
      b.classList.remove("correct", "incorrect");
      b.setAttribute("aria-pressed", String(b === button));
    });
    const correct = button.dataset.correct === "true";
    button.classList.add(correct ? "correct" : "incorrect");
    const feedback = $(".quiz-feedback", field);
    feedback.textContent =
      (correct ? "✓ 正确。" : "再想一想。") + feedback.dataset.explanation;
  }),
);
$("#answers-toggle").addEventListener("click", () => {
  const show = $("#answers-toggle").getAttribute("aria-expanded") !== "true";
  $$(".answer").forEach((a) => (a.hidden = !show));
  $("#answers-toggle").setAttribute("aria-expanded", String(show));
  $("#answers-toggle").textContent = show ? "隐藏全部答案" : "显示全部答案";
});
addEventListener("beforeprint", () => {
  if (!toc.hidden) setToc(false);
});
