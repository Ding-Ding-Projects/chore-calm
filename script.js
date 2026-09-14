(function () {
  "use strict";

  const content = window.CHORE_CALM_CONTENT;
  const storageKey = "chore-calm-settings-v1";
  const defaultSettings = {
    language: "en",
    theme: "system",
    englishFunny: 5,
    cantoneseFunny: 5,
    showEmojis: true,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    scenario: "dishes",
    narrationEnabled: false,
    narrationLanguage: "en",
    englishVoice: "auto",
    cantoneseVoice: "auto",
    speechRate: 1,
    speechPitch: 1,
    vocabulary: null
  };
  let settings = loadSettings();
  let activeScenario = getScenario(settings.scenario);
  let activeStep = 0;
  let playTimer = null;
  let lastNarratedStep = -1;
  const $ = (id) => document.getElementById(id);

  function loadSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
      return { ...defaultSettings, ...(stored && typeof stored === "object" ? stored : {}) };
    } catch {
      return { ...defaultSettings };
    }
  }

  function saveSettings() {
    const safe = { ...settings };
    localStorage.setItem(storageKey, JSON.stringify(safe));
  }

  function getScenario(id) {
    return content.scenarios.find((scenario) => scenario.id === id) || content.scenarios[0];
  }

  function localized(value) {
    if (settings.language === "zh") return value.zh;
    return value.en;
  }

  function bilingual(value) {
    return settings.language === "bilingual" ? `${value.en}<span class="secondary-copy">${value.zh}</span>` : localized(value);
  }

  function emoji(text) {
    return settings.showEmojis ? text : "";
  }

  function announce(message, detail) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<strong>${emoji("✦ ")}${escapeHtml(message)}</strong><p>${escapeHtml(detail)}</p>`;
    $("toast-region").appendChild(toast);
    window.setTimeout(() => toast.remove(), 4800);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function renderMetadata() {
    $("version-value").textContent = content.metadata.version;
    $("updated-value").textContent = content.metadata.updatedAt;
    const timezoneMatch = String(content.metadata.updatedAt).match(/([+-]\d{2}:\d{2})$/);
    $("updated-timezone").textContent = timezoneMatch ? `Timezone: UTC${timezoneMatch[1]}` : "Timezone unavailable";
    document.documentElement.dataset.theme = settings.theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : settings.theme;
    document.documentElement.lang = settings.language === "zh" ? "zh-Hant" : "en";
    document.body.classList.toggle("lang-zh", settings.language === "zh");
    document.body.classList.toggle("lang-bilingual", settings.language === "bilingual");
    $("scenario-description").innerHTML = bilingual(activeScenario.description);
    $("scenario-select").value = activeScenario.id;
    $("language-mode").value = settings.language;
    $("theme-mode").value = settings.theme;
    $("english-funny").value = settings.englishFunny;
    $("cantonese-funny").value = settings.cantoneseFunny;
    $("show-emojis").checked = settings.showEmojis;
    $("reduced-motion").checked = settings.reducedMotion;
    $("narration-enabled").checked = settings.narrationEnabled;
    $("narration-language").value = settings.narrationLanguage;
    $("speech-rate").value = settings.speechRate;
    $("speech-pitch").value = settings.speechPitch;
    $("speech-rate-value").textContent = Number(settings.speechRate).toFixed(1);
    $("speech-pitch-value").textContent = Number(settings.speechPitch).toFixed(1);
    $("vocabulary-status").textContent = settings.vocabulary ? "Validated local file loaded" : "No file loaded";
    const toneIndex = Math.max(1, Math.min(5, settings.language === "zh" ? settings.cantoneseFunny : settings.englishFunny)) - 1;
    const cantoneseToneIndex = Math.max(1, Math.min(5, settings.cantoneseFunny)) - 1;
    $("tone-note").innerHTML = bilingual({ en: content.tone.en[toneIndex], zh: content.tone.zh[cantoneseToneIndex] });
  }

  function renderScenarios() {
    const select = $("scenario-select");
    select.innerHTML = content.scenarios.map((scenario) => `<option value="${scenario.id}">${escapeHtml(localized(scenario.label))}</option>`).join("");
    select.value = activeScenario.id;
  }

  function renderSteps() {
    const list = $("story-steps");
    list.innerHTML = activeScenario.steps.map((step, index) => {
      const selected = index === activeStep;
      return `<li class="story-step ${selected ? "is-current" : ""}" data-index="${index}">
        <md-step-marker class="step-marker" aria-label="Go to step ${index + 1}: ${escapeHtml(localized(step.label))}" aria-current="${selected ? "step" : "false"}">${index + 1}</md-step-marker>
        <div><h3>${bilingual(step.label)}</h3><p class="primary-copy">${escapeHtml(localized(step.text))}</p><p class="secondary-copy">${escapeHtml(step.text.zh)}</p></div>
      </li>`;
    }).join("");
    list.querySelectorAll(".story-step").forEach((row) => {
      row.addEventListener("click", (event) => {
        if (event.target.closest(".step-marker")) setStep(Number(row.dataset.index), true);
      });
      row.querySelector(".step-marker").addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); focusStep(Number(row.dataset.index) + 1); }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); focusStep(Number(row.dataset.index) - 1); }
      });
    });
  }

  function focusStep(index) {
    const bounded = Math.max(0, Math.min(activeScenario.steps.length - 1, index));
    const target = $("story-steps").querySelector(`[data-index="${bounded}"] .step-marker`);
    if (target) { target.focus(); setStep(bounded, true); }
  }

  function setStep(index, speak) {
    activeStep = Math.max(0, Math.min(activeScenario.steps.length - 1, index));
    const step = activeScenario.steps[activeStep];
    renderSteps();
    $("story-status").textContent = localized(step.label);
    $("narration-kicker").textContent = localized({ en: "Now coaching", zh: "而家陪住你" });
    $("narration-text").innerHTML = bilingual(step.text);
    $("narration-step-label").innerHTML = bilingual(step.label);
    $("narration-progress-bar").style.width = `${((activeStep + 1) / activeScenario.steps.length) * 100}%`;
    $("step-count").textContent = `${activeStep + 1} of ${activeScenario.steps.length}`;
    const isRecovery = step.id === "recover";
    $("story-character").src = isRecovery ? "assets/chore-calm-reset-pose.png" : "assets/chore-calm-first-step.png";
    $("story-character").alt = isRecovery ? "The companion robot pausing calmly beside a small timer" : "The companion robot carrying a folded towel toward a basket";
    if (speak && settings.narrationEnabled && activeStep !== lastNarratedStep) speakStep(step);
  }

  function speakStep(step) {
    if (!("speechSynthesis" in window)) {
      announce("Narration unavailable", "This browser does not provide speech synthesis. The written sequence remains available.");
      return;
    }
    window.speechSynthesis.cancel();
    const parts = [];
    if (settings.narrationLanguage === "en" || settings.narrationLanguage === "both") parts.push({ text: step.text.en, lang: "en" });
    if (settings.narrationLanguage === "zh" || settings.narrationLanguage === "both") parts.push({ text: step.text.zh, lang: "zh-HK" });
    parts.forEach((part, index) => {
      const utterance = new SpeechSynthesisUtterance(part.text);
      utterance.lang = part.lang;
      utterance.rate = Number(settings.speechRate);
      utterance.pitch = Number(settings.speechPitch);
      const voiceValue = part.lang === "en" ? settings.englishVoice : settings.cantoneseVoice;
      const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.voiceURI === voiceValue);
      if (voice) utterance.voice = voice;
      if (index > 0) utterance.onstart = () => {};
      window.speechSynthesis.speak(utterance);
    });
    lastNarratedStep = activeStep;
  }

  function togglePlayback() {
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
      $("play-story").textContent = "Play sequence";
      $("play-story").setAttribute("aria-pressed", "false");
      announce("Sequence paused", "The written steps are still available at your pace.");
      return;
    }
    if (settings.reducedMotion) {
      announce("Reduced motion is on", "Automatic movement is paused. Select a step to move through the sequence.");
      return;
    }
    if (activeStep >= activeScenario.steps.length - 1) setStep(0, false);
    setStep(activeStep, true);
    playTimer = window.setInterval(() => {
      if (activeStep >= activeScenario.steps.length - 1) { clearInterval(playTimer); playTimer = null; $("play-story").textContent = "Play sequence"; $("play-story").setAttribute("aria-pressed", "false"); announce("Sequence complete", "You can replay it, choose a different scenario, or take the next step offline."); return; }
      setStep(activeStep + 1, true);
    }, 4300);
    $("play-story").textContent = "Pause sequence";
    $("play-story").setAttribute("aria-pressed", "true");
  }

  function openDialog(dialog) { if (!dialog.open) dialog.showModal(); }
  function closeDialogs() { document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close()); }

  function populateVoices() {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    [
      { id: "english-voice", selected: settings.englishVoice, filter: (voice) => /^en(-|_)/i.test(voice.lang) },
      { id: "cantonese-voice", selected: settings.cantoneseVoice, filter: (voice) => /^(zh-HK|yue)/i.test(voice.lang) }
    ].forEach(({ id, selected, filter }) => {
      const select = $(id);
      const options = ['<option value="auto">Choose automatically</option>'].concat(voices.filter(filter).map((voice) => `<option value="${escapeHtml(voice.voiceURI)}">${escapeHtml(voice.name)} (${escapeHtml(voice.lang)})</option>`));
      select.innerHTML = options.join("");
      select.value = [...select.options].some((option) => option.value === selected) ? selected : "auto";
    });
  }

  function validateVocabulary(file, text) {
    if (file.size > 100 * 1024) throw new Error("The local file is larger than 100 KB.");
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || parsed.schemaVersion !== 1 || !parsed.replacements || typeof parsed.replacements !== "object" || Array.isArray(parsed.replacements)) throw new Error("Use schemaVersion 1 with a replacements object.");
    const keys = Object.keys(parsed.replacements);
    if (keys.length > 200 || keys.some((key) => !key || key.length > 80 || ["__proto__", "constructor", "prototype"].includes(key))) throw new Error("The local file exceeds the bounded entry rules.");
    if (keys.some((key) => typeof parsed.replacements[key] !== "string" || parsed.replacements[key].length > 160)) throw new Error("Replacement values must be short strings.");
    return { schemaVersion: 1, replacements: parsed.replacements };
  }

  const paletteCommands = [
    { label: "Read the no-yelling promise", hint: "Boundary", action: () => $("promise").scrollIntoView({ behavior: settings.reducedMotion ? "auto" : "smooth" }) },
    { label: "Start the calm loop", hint: "Motion", action: () => { $("story").scrollIntoView({ behavior: "smooth" }); setStep(0, false); } },
    { label: "Open settings", hint: "Preferences", action: () => openDialog($("settings-dialog")) },
    { label: "Choose a scenario", hint: "Motion", action: () => { $("story").scrollIntoView({ behavior: "smooth" }); $("scenario-select").focus(); } },
    { label: "Toggle reduced motion", hint: "Accessibility", action: () => { settings.reducedMotion = !settings.reducedMotion; saveSettings(); renderMetadata(); announce("Motion preference updated", settings.reducedMotion ? "Automatic movement is paused." : "Automatic movement is available."); } },
    { label: "Show concept controls", hint: "About", action: () => $("controls").scrollIntoView({ behavior: "smooth" }) }
  ];
  let paletteIndex = 0;

  function renderPalette(query = "") {
    const lower = query.toLowerCase();
    const matches = paletteCommands.filter((command) => command.label.toLowerCase().includes(lower) || command.hint.toLowerCase().includes(lower));
    $("palette-results").innerHTML = matches.length ? matches.map((command, index) => `<li><md-button role="option" aria-selected="${index === paletteIndex}" data-palette-index="${paletteCommands.indexOf(command)}"><span>${escapeHtml(command.label)}</span><small>${escapeHtml(command.hint)}</small></md-button></li>`).join("") : `<li class="palette-empty">No matching command</li>`;
    $("palette-results").querySelectorAll("md-button").forEach((button) => button.addEventListener("click", () => { paletteCommands[Number(button.dataset.paletteIndex)].action(); $("palette-dialog").close(); }));
  }

  function bindEvents() {
    $("start-story").addEventListener("click", () => { $("story").scrollIntoView({ behavior: settings.reducedMotion ? "auto" : "smooth" }); setStep(0, false); });
    $("scroll-promise").addEventListener("click", () => $("promise").scrollIntoView({ behavior: settings.reducedMotion ? "auto" : "smooth" }));
    $("play-story").addEventListener("click", togglePlayback);
    $("narrate-now").addEventListener("click", () => speakStep(activeScenario.steps[activeStep]));
    $("scenario-select").addEventListener("change", (event) => { activeScenario = getScenario(event.target.value); settings.scenario = activeScenario.id; activeStep = 0; lastNarratedStep = -1; saveSettings(); renderMetadata(); renderSteps(); setStep(0, false); announce("Scenario changed", localized(activeScenario.label)); });
    $("reduced-motion").addEventListener("change", (event) => { settings.reducedMotion = event.target.checked; if (settings.reducedMotion && playTimer) togglePlayback(); saveSettings(); announce("Motion preference updated", settings.reducedMotion ? "Automatic movement is paused." : "Automatic movement is available."); });
    $("open-settings").addEventListener("click", () => openDialog($("settings-dialog")));
    $("open-settings-bottom").addEventListener("click", () => openDialog($("settings-dialog")));
    $("open-palette").addEventListener("click", () => { openDialog($("palette-dialog")); $("palette-input").focus(); renderPalette(); });
    document.querySelectorAll(".close-dialog").forEach((button) => button.addEventListener("click", closeDialogs));
    $("language-mode").addEventListener("change", (event) => { settings.language = event.target.value; saveSettings(); renderMetadata(); renderScenarios(); renderSteps(); setStep(activeStep, false); announce("Language updated", localized({ en: "The page now uses your selected language mode.", zh: "頁面已經轉用你揀嘅語言模式。" })); });
    $("theme-mode").addEventListener("change", (event) => { settings.theme = event.target.value; saveSettings(); renderMetadata(); announce("Theme updated", localized({ en: "The theme is stored on this device.", zh: "主題會儲存喺呢部裝置。" })); });
    $("english-funny").addEventListener("input", (event) => { settings.englishFunny = Number(event.target.value); saveSettings(); renderMetadata(); });
    $("cantonese-funny").addEventListener("input", (event) => { settings.cantoneseFunny = Number(event.target.value); saveSettings(); renderMetadata(); });
    $("show-emojis").addEventListener("change", (event) => { settings.showEmojis = event.target.checked; saveSettings(); announce("Message decoration updated", "The same factual message remains available."); });
    $("narration-enabled").addEventListener("change", (event) => { settings.narrationEnabled = event.target.checked; saveSettings(); announce("Narration updated", event.target.checked ? "Spoken coaching is on." : "Spoken coaching is off."); });
    $("narration-language").addEventListener("change", (event) => { settings.narrationLanguage = event.target.value; saveSettings(); });
    $("english-voice").addEventListener("change", (event) => { settings.englishVoice = event.target.value; saveSettings(); });
    $("cantonese-voice").addEventListener("change", (event) => { settings.cantoneseVoice = event.target.value; saveSettings(); });
    $("speech-rate").addEventListener("input", (event) => { settings.speechRate = Number(event.target.value); $("speech-rate-value").textContent = settings.speechRate.toFixed(1); saveSettings(); });
    $("speech-pitch").addEventListener("input", (event) => { settings.speechPitch = Number(event.target.value); $("speech-pitch-value").textContent = settings.speechPitch.toFixed(1); saveSettings(); });
    $("reset-panel").addEventListener("click", () => { $("settings-dialog").style.removeProperty("width"); announce("Panel layout reset", "The settings panel is back to its default size."); });
    $("clear-vocabulary").addEventListener("click", () => { settings.vocabulary = null; saveSettings(); renderMetadata(); announce("Local vocabulary cleared", "Original page wording is active again."); });
    $("vocabulary-file").addEventListener("change", async (event) => { const file = event.target.files[0]; if (!file) return; try { const validated = validateVocabulary(file, await file.text()); settings.vocabulary = validated; saveSettings(); renderMetadata(); announce("Local vocabulary loaded", "Validated content stays in this browser and is not sent anywhere."); } catch (error) { event.target.value = ""; announce("Local vocabulary not loaded", error.message); } });
    $("palette-input").addEventListener("input", (event) => { paletteIndex = 0; renderPalette(event.target.value); });
    $("palette-input").addEventListener("keydown", (event) => { const buttons = [...$("palette-results").querySelectorAll("md-button")]; if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); paletteIndex = Math.max(0, Math.min(buttons.length - 1, paletteIndex + (event.key === "ArrowDown" ? 1 : -1))); buttons[paletteIndex]?.focus(); } if (event.key === "Enter" && buttons[paletteIndex]) buttons[paletteIndex].click(); });
    document.addEventListener("keydown", (event) => { if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "f") { event.preventDefault(); openDialog($("palette-dialog")); $("palette-input").value = ""; renderPalette(); $("palette-input").focus(); } if (event.key === "Escape") closeDialogs(); });
    if ("speechSynthesis" in window) { window.speechSynthesis.addEventListener("voiceschanged", populateVoices); populateVoices(); }
  }

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting && !playTimer) setStep(Number(entry.target.dataset.index), false); }), { threshold: .55 });
  renderMetadata(); renderScenarios(); renderSteps(); setStep(0, false); bindEvents();
  document.querySelectorAll(".story-step").forEach((step) => observer.observe(step));
}());
