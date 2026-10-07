/* Starlit AI 中繼站（Cloudflare Worker）
 * - API key 放在 Worker 的 Secret：ANTHROPIC_API_KEY（不要寫進這個檔）
 * - 選用：綁定 KV namespace，變數名 RL，用來做每人每天次數限制
 * 網頁送來排好的盤面摘要，這裡組好提示詞後呼叫 Claude，串流回傳。 */
const ALLOWED_ORIGINS = ['https://rickyyenli-eng.github.io', 'http://localhost:8765'];
const MODEL = 'claude-sonnet-5-5';
const DAILY_LIMIT = 5;          // 每個 IP 每天最多幾次（需綁定 KV：RL）
const MAX_INPUT = 24000;        // 盤面摘要最多幾個字元

const LANG_NAME = { zh: '繁體中文（台灣用語）', en: 'English', ja: '日本語', fr: 'français' };
const FOCUS = {
  all: { zh: '整體人生故事', en: 'the whole life story', ja: '人生全体の物語', fr: 'l’histoire de vie dans son ensemble' },
  career: { zh: '事業與工作', en: 'career and work', ja: '仕事とキャリア', fr: 'la carrière et le travail' },
  wealth: { zh: '金錢與財運', en: 'money', ja: 'お金', fr: 'l’argent' },
  love: { zh: '感情與關係', en: 'love and relationships', ja: '恋愛と人間関係', fr: 'l’amour et les relations' },
  year: { zh: '今年與明年的運勢', en: 'this year and next year', ja: '今年と来年の流れ', fr: 'cette année et la suivante' },
};

function system(lang, focus) {
  return `You are a warm, experienced reader of Zi Wei Dou Shu (紫微斗數), Western astrology and Human Design, writing for the Starlit website.
You receive one person's computed charts (all three systems) as structured notes. Write a personal reading focused on: ${focus}.

Rules:
- Write entirely in ${LANG_NAME[lang] || LANG_NAME.zh}. Address the reader as "you".
- Tell it as a story with concrete everyday scenes (work meetings, money decisions, arguments, travel, friends), so the reader thinks "that's me". Open with a fitting image or metaphor.
- Weave the three systems together: point out where they agree, and where they pull in different directions. Cite the specific placements you rely on (e.g. "官祿宮 天同巨門", "Venus in Pisces", "channel 19-49"), but explain them in plain language.
- Use only the chart data provided. Do not invent placements, stars, gates or dates. If something is not in the data, do not mention it.
- Strengths and blind spots, then 3–5 concrete things to try. Warm, direct, never fatalistic or frightening. Health: lifestyle reminders only, no diagnosis. Money: no investment advice.
- No fake classical quotations. Avoid clichés and filler. Short paragraphs, a few subheadings in Markdown (##). About 900–1400 words (in Chinese/Japanese about 1500–2200 characters).`;
}

function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
const json = (obj, status, h) => new Response(JSON.stringify(obj), { status, headers: { ...h, 'Content-Type': 'application/json' } });

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const h = cors(origin);
    if (req.method === 'OPTIONS') return new Response(null, { headers: h });
    if (req.method !== 'POST') return json({ error: 'method' }, 405, h);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: 'origin' }, 403, h);
    if (!env.ANTHROPIC_API_KEY) return json({ error: 'no_key' }, 500, h);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'bad_json' }, 400, h); }
    const lang = LANG_NAME[body.lang] ? body.lang : 'zh';
    const focusKey = FOCUS[body.focus] ? body.focus : 'all';
    const chart = String(body.chart || '').slice(0, MAX_INPUT);
    if (chart.length < 200) return json({ error: 'no_chart' }, 400, h);

    // 每日次數限制（有綁 KV 才啟用）
    if (env.RL) {
      const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
      const key = `${new Date().toISOString().slice(0, 10)}:${ip}`;
      const n = parseInt((await env.RL.get(key)) || '0', 10);
      if (n >= DAILY_LIMIT) return json({ error: 'limit', limit: DAILY_LIMIT }, 429, h);
      await env.RL.put(key, String(n + 1), { expirationTtl: 60 * 60 * 26 });
    }

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 3000,
        stream: true,
        system: system(lang, FOCUS[focusKey][lang] || FOCUS[focusKey].en),
        messages: [{ role: 'user', content: `Chart data:\n\n${chart}` }],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return json({ error: 'upstream', status: r.status, detail: t.slice(0, 300) }, 502, h);
    }
    return new Response(r.body, { headers: { ...h, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
  },
};
