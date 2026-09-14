/* Public content model. Keep product copy separate from interaction logic. */
window.CHORE_CALM_CONTENT = {
  metadata: {
    version: "0.1.0",
    updatedAt: "Unavailable without build provenance",
    updatedAtLabel: "Updated at"
  },
  scenarios: [
    {
      id: "dishes",
      label: { en: "A sink full of dishes", zh: "一個塞滿碗碟的鋅盆" },
      description: { en: "A sink full of dishes is a lot of visual noise. Start with one handle.", zh: "滿滿一盆碗碟令人眼花，先處理一件就夠。" },
      steps: [
        { id: "notice", label: { en: "Notice", zh: "留意" }, text: { en: "You noticed the task. That is already useful information.", zh: "你已經留意到件事，呢個已經係有用嘅資料。" } },
        { id: "breakdown", label: { en: "Break it down", zh: "拆細一步" }, text: { en: "Choose one dish, not the whole sink. One handle gives your brain somewhere to begin.", zh: "揀一隻碗，唔使一次過處理成盆。先有一個落腳點。" } },
        { id: "coach", label: { en: "Coach", zh: "陪住做" }, text: { en: "Put the dish beside the sink. The next step can wait until this one feels real.", zh: "先將隻碗放到鋅盆旁邊。呢一步穩陣咗，先再諗下一步。" } },
        { id: "recover", label: { en: "Recover", zh: "重新嚟過" }, text: { en: "If water spills, pause. Get a cloth, make one safe patch, and restart from there.", zh: "如果有水濺出嚟，停一停。拎條布整好一小處，再由嗰度開始。" } },
        { id: "complete", label: { en: "Calm completion", zh: "平靜完成" }, text: { en: "One dish is done. The room did not need a perfect performance to move forward.", zh: "一隻碗完成咗。向前行唔需要交一份完美功課。" } }
      ]
    },
    {
      id: "laundry",
      label: { en: "Laundry on the chair", zh: "椅上嘅衫" },
      description: { en: "Sorting clothes can become a maze. Start with one category and stop there if needed.", zh: "分類衫褲可以好似行迷宮，先揀一類，夠鐘就停。" },
      steps: [
        { id: "notice", label: { en: "Notice", zh: "留意" }, text: { en: "The chair is carrying a lot. You do not have to carry all of it at once.", zh: "張椅承受緊好多衫，你唔需要一次過承受晒。" } },
        { id: "breakdown", label: { en: "Break it down", zh: "拆細一步" }, text: { en: "Find one kind of clothing, such as socks. Ignore the rest for this round.", zh: "先搵一類衫，例如襪。今一輪其他嘢可以唔理。" } },
        { id: "coach", label: { en: "Coach", zh: "陪住做" }, text: { en: "Make one small pile. The finish line is not required for a useful start.", zh: "整一小堆就得。有用嘅開始唔需要即刻到終點。" } },
        { id: "recover", label: { en: "Recover", zh: "重新嚟過" }, text: { en: "If sorting stops working, put everything in one safe basket and leave a note for later.", zh: "如果分類唔再行得通，就先放入一個安全籃，再留句字畀之後嘅自己。" } },
        { id: "complete", label: { en: "Calm completion", zh: "平靜完成" }, text: { en: "One category has a home. That is a real change, even if the chair is not empty.", zh: "一類衫有咗位置。就算張椅未清空，呢個都係真實改變。" } }
      ]
    },
    {
      id: "spill",
      label: { en: "A spill after a hard day", zh: "辛苦一日後整瀉咗" },
      description: { en: "Recovery after a mistake needs less drama and one safe action.", zh: "出錯後重新整理，少啲戲劇性，多一個安全動作。" },
      steps: [
        { id: "notice", label: { en: "Notice", zh: "留意" }, text: { en: "Something went wrong. The next useful move is information, not blame.", zh: "有件事出錯咗。下一個有用動作係搵資料，唔係怪責。" } },
        { id: "breakdown", label: { en: "Break it down", zh: "拆細一步" }, text: { en: "Move your feet away from the spill and name what needs protection first.", zh: "先移開雙腳，再講清楚邊樣要優先保護。" } },
        { id: "coach", label: { en: "Coach", zh: "陪住做" }, text: { en: "Bring one cloth. A single safe patch is enough for this minute.", zh: "拎一條布。呢一分鐘，整好一小處已經足夠。" } },
        { id: "recover", label: { en: "Recover", zh: "重新嚟過" }, text: { en: "Take a breath, check the floor, and choose whether to finish now or pause safely.", zh: "抖一抖，望清楚地面，再決定而家做完定係安全咁停。" } },
        { id: "complete", label: { en: "Calm completion", zh: "平靜完成" }, text: { en: "The mistake is contained. You are still allowed to need support afterward.", zh: "件事控制住喇。之後仍然需要人幫手，係完全可以嘅。" } }
      ]
    }
  ],
  tone: {
    en: ["Steady support is available.", "A small next step is available.", "No heroic performance required.", "The plan is small on purpose.", "The tiny plan is doing its quiet job."],
    zh: ["可以慢慢嚟。", "先行一小步就得。", "唔使表演英雄式效率。", "個計劃咁細，係有原因嘅。", "呢個細細個計劃，安安靜靜做緊佢份內事。"]
  },
  docs: {
    pagePurpose: "An offline-friendly concept page for calm chore coaching.",
    contentContract: "Each scenario has an id, bilingual label and description, and five ordered bilingual steps.",
    privacy: "The page uses local assets and browser storage only. It does not send analytics or make network requests."
  }
};
