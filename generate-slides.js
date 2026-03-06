const pptxgen = require("pptxgenjs");

const prs = new pptxgen();
prs.layout = "LAYOUT_WIDE"; // 16:9

// ── 공통 색상 팔레트 ─────────────────────────────────────────
const BG = "0F172A";
const TEXT_MAIN = "F1F5F9";
const TEXT_SUB = "94A3B8";
const TEXT_DIM = "64748B";

const AGENTS = [
  {
    name: "Foxy",
    role: "General News Anchor & Daily Briefer",
    greeting:
      "Good morning! I'm Foxy, your news anchor. Let me brief you on what's happening in the world right now.",
    schedule: "09:00",
    keywords: ["World news", "Top headlines", "Business", "Politics", "Science & Tech"],
    behavior:
      "Sharp and witty TV news anchor covering politics, business, science, and more. Replies in concise 1–2 sentences.",
    accent: "0EA5E9",   // sky-500
    dark: "075985",     // sky-900
  },
  {
    name: "Kitty",
    role: "Marketing Strategist & Growth Planner",
    greeting:
      "Hey! I'm Kitty, your marketing strategist. I'll turn your idea into a growth plan that actually works.",
    schedule: "11:00",
    keywords: ["Product marketing", "User acquisition", "Growth hacking", "Content marketing", "Indie dev launch"],
    behavior:
      "Creative marketing strategist obsessed with growth and traction. Gives actionable answers naming specific channels or tactics.",
    accent: "A855F7",   // purple-500
    dark: "581C87",     // purple-900
  },
  {
    name: "Bunny",
    role: "Budget Analyst & Cost Strategist",
    greeting:
      "Hello! I'm Bunny, your budget analyst. I'll check all the costs and APIs so you know exactly what you're spending.",
    schedule: "14:00",
    keywords: ["API pricing", "SaaS cost breakdown", "OpenAI API cost", "Cloud infra pricing", "Startup budget"],
    behavior:
      "Meticulous budget analyst who always speaks in numbers and hard facts. Always includes specific numbers or cost ranges.",
    accent: "22C55E",   // green-500
    dark: "14532D",     // green-900
  },
];

// ════════════════════════════════════════════════════════════
// 슬라이드 1 : 타이틀
// ════════════════════════════════════════════════════════════
const titleSlide = prs.addSlide();
titleSlide.background = { color: BG };

titleSlide.addText("AI Agent Squad", {
  x: 0.5, y: 2.0, w: "90%", h: 1.2,
  fontSize: 54, bold: true, color: TEXT_MAIN, align: "center",
});
titleSlide.addText("Foxy · Kitty · Bunny  —  Your Personal AI Team", {
  x: 0.5, y: 3.4, w: "90%", h: 0.6,
  fontSize: 20, color: TEXT_SUB, align: "center",
});
titleSlide.addText(`Generated: ${new Date().toISOString().slice(0, 10)}`, {
  x: 0.5, y: 6.8, w: "90%", h: 0.3,
  fontSize: 12, color: TEXT_DIM, align: "center",
});

// ════════════════════════════════════════════════════════════
// 슬라이드 2~4 : 에이전트별 상세
// ════════════════════════════════════════════════════════════
AGENTS.forEach((agent) => {
  const sld = prs.addSlide();
  sld.background = { color: BG };

  // 왼쪽 컬러 사이드바
  sld.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: 0.12, h: "100%",
    fill: { color: agent.accent }, line: { color: agent.accent },
  });

  // 이름 배지
  sld.addShape(prs.ShapeType.roundRect, {
    x: 0.25, y: 0.25, w: 1.5, h: 0.55,
    fill: { color: agent.accent }, line: { color: agent.accent },
    rectRadius: 0.08,
  });
  sld.addText(agent.name, {
    x: 0.25, y: 0.25, w: 1.5, h: 0.55,
    fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle",
  });

  // 역할
  sld.addText(agent.role, {
    x: 2.0, y: 0.3, w: 7.5, h: 0.45,
    fontSize: 15, color: TEXT_SUB, valign: "middle",
  });

  // 구분선
  sld.addShape(prs.ShapeType.line, {
    x: 0.25, y: 0.95, w: 9.25, h: 0,
    line: { color: "334155", width: 1 },
  });

  // GREETING
  sld.addText("GREETING", {
    x: 0.25, y: 1.05, w: 9.25, h: 0.25,
    fontSize: 9, bold: true, color: agent.accent,
  });
  sld.addText(`"${agent.greeting}"`, {
    x: 0.25, y: 1.3, w: 9.25, h: 0.65,
    fontSize: 12, color: TEXT_MAIN, italic: true,
  });

  // SCHEDULE
  sld.addText("SCHEDULE", {
    x: 0.25, y: 2.1, w: 4.0, h: 0.25,
    fontSize: 9, bold: true, color: agent.accent,
  });
  sld.addText(`${agent.schedule}  (daily briefing)`, {
    x: 0.25, y: 2.35, w: 4.0, h: 0.35,
    fontSize: 12, color: TEXT_MAIN,
  });

  // SEARCH KEYWORDS
  sld.addText("SEARCH KEYWORDS", {
    x: 0.25, y: 2.85, w: 9.25, h: 0.25,
    fontSize: 9, bold: true, color: agent.accent,
  });
  const kw = agent.keywords.map((k) => ({ text: `  •  ${k}`, options: { color: TEXT_MAIN } }));
  sld.addText(kw, {
    x: 0.25, y: 3.1, w: 9.25, h: 0.55,
    fontSize: 11, color: TEXT_MAIN,
  });

  // BEHAVIOR
  sld.addText("BEHAVIOR", {
    x: 0.25, y: 3.8, w: 9.25, h: 0.25,
    fontSize: 9, bold: true, color: agent.accent,
  });
  sld.addText(agent.behavior, {
    x: 0.25, y: 4.05, w: 9.25, h: 0.75,
    fontSize: 11, color: "CBD5E1",
  });

  // 하단 푸터
  sld.addShape(prs.ShapeType.rect, {
    x: 0, y: 6.75, w: "100%", h: 0.75,
    fill: { color: agent.dark }, line: { color: agent.dark },
  });
  sld.addText(`AI Agent Squad  ·  ${agent.name}`, {
    x: 0, y: 6.75, w: "100%", h: 0.75,
    fontSize: 10, color: "FFFFFF", align: "center", valign: "middle",
  });
});

// ════════════════════════════════════════════════════════════
// 슬라이드 5 : 요약 비교표
// ════════════════════════════════════════════════════════════
const tableSld = prs.addSlide();
tableSld.background = { color: BG };

tableSld.addText("Agent Overview", {
  x: 0.5, y: 0.3, w: "90%", h: 0.6,
  fontSize: 28, bold: true, color: TEXT_MAIN,
});

const tableRows = [
  [
    { text: "Agent",    options: { bold: true, color: "CBD5E1", fill: { color: "1E293B" } } },
    { text: "Role",     options: { bold: true, color: "CBD5E1", fill: { color: "1E293B" } } },
    { text: "Schedule", options: { bold: true, color: "CBD5E1", fill: { color: "1E293B" } } },
    { text: "Keywords", options: { bold: true, color: "CBD5E1", fill: { color: "1E293B" } } },
  ],
  ...AGENTS.map((a) => [
    { text: a.name,                           options: { bold: true, color: "FFFFFF", fill: { color: a.accent } } },
    { text: a.role,                           options: { color: TEXT_MAIN, fill: { color: "1E293B" } } },
    { text: a.schedule,                       options: { color: TEXT_MAIN, fill: { color: "1E293B" } } },
    { text: a.keywords.slice(0, 3).join(", "), options: { color: TEXT_MAIN, fill: { color: "1E293B" } } },
  ]),
];

tableSld.addTable(tableRows, {
  x: 0.5, y: 1.1, w: 9.0,
  rowH: 0.65,
  fontSize: 12,
  border: { color: "334155", pt: 0.5 },
});

// ════════════════════════════════════════════════════════════
// 파일 저장
// ════════════════════════════════════════════════════════════
prs.writeFile({ fileName: "agents.pptx" }).then(() => {
  console.log("✅  agents.pptx 생성 완료!");
});
