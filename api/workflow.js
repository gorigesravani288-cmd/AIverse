/* AIverse Workflows upgrade: drop-in for index.html.
 * Add <script src="workflows.js"></script> just before </body>, AFTER the main inline script.
 *
 * What it does
 *  - Replaces the 8 fixed workflows with 16. Each step is defined by the JOB to be done
 *    (a category pool + editorial picks specific to that job), and the tools are chosen
 *    from your live TOOLS list when the workflow is opened. Add tools later and they show up.
 *  - Never repeats a tool inside one workflow, and shows real alternatives from the directory.
 *  - Adds a "Show free plans only" switch, "Copy as checklist", and a "How workflows work" guide.
 * Nothing in index.html is edited: it reuses the existing modal, CSS and visit/login flow.
 */
(() => {
  'use strict';
  if (typeof WORKFLOWS === 'undefined' || typeof TOOLS === 'undefined') {
    console.warn('[AIverse Workflows] WORKFLOWS/TOOLS not found: load workflows.js after the main script');
    return;
  }

  const esc = typeof escapeHtml === 'function'
    ? escapeHtml
    : v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Your list has two near-duplicate category pairs; treat them as one.
  const ALIASES = {
    'AI Search & Research': ['AI Search & Research', 'Search'],
    'Presentations': ['Presentations', 'Presentation']
  };
  const expand = cats => [...new Set(cats.flatMap(c => ALIASES[c] || [c]))];
  const isReal = t => t && !/example\.com/.test(t.website || '');

  // ---------- Workflow definitions ----------
  // Step = (title, description, category pool, editorial picks in order of preference).
  // Picks are checked against your TOOLS list; if one is missing or filtered out, the next fits in.
  const S = (title, desc, needs, prefer) => ({ title, desc, needs, prefer });

  const DEFS = [
    { icon: '🎓', title: 'Study Smarter', category: 'Education', difficulty: 'Beginner', time: '~20 min',
      description: 'Learn a topic faster with explanations, cited sources, notes, flashcards and practice questions.',
      outcome: 'Condensed notes, a flashcard deck and a practice quiz for one topic.',
      tip: 'Check facts in AI-generated notes against your textbook before an exam.',
      steps: [
        S('Understand the topic', 'Ask for a plain-language explanation, then keep asking follow-up questions.', ['Education', 'Chatbots'], ['Khanmigo', 'Claude', 'ChatGPT']),
        S('Find reliable sources', 'Get answers with citations instead of guesses.', ['AI Search & Research'], ['Perplexity', 'Consensus', 'Elicit']),
        S('Turn material into notes', 'Upload your own readings and ask questions grounded in them.', ['Education', 'Documents & Knowledge'], ['NotebookLM', 'Humata', 'ChatPDF']),
        S('Make flashcards', 'Build spaced-repetition cards for active recall.', ['Education'], ['Anki AI', 'Knowt', 'StudyFetch']),
        S('Test yourself', 'Generate practice questions to find your gaps.', ['Education'], ['Quizlet AI', 'Quizgecko'])
      ] },

    { icon: '💻', title: 'Build a Website', category: 'Coding', difficulty: 'Intermediate', time: '~45 min',
      description: 'Go from an idea to a live site: plan, generate, refine, check and get found.',
      outcome: 'A working website you have reviewed for bugs and security issues.',
      tip: 'Generate a small first version, then improve it in short rounds rather than one huge prompt.',
      steps: [
        S('Plan structure and content', 'List the pages, the message of each page and the main call to action.', ['Chatbots'], ['Claude', 'ChatGPT', 'Gemini']),
        S('Generate a first version', 'Turn the plan into a working site or app from a description.', ['App & Website Builders', 'Coding'], ['Lovable', 'Bolt.new', 'v0']),
        S('Refine the code', 'Edit and extend the project in a coding assistant.', ['Coding'], ['Cursor', 'Windsurf', 'GitHub Copilot']),
        S('Create visuals', 'Make hero images and graphics that match your brand.', ['Image Generation', 'Design'], ['Midjourney', 'Recraft', 'Canva AI']),
        S('Review for bugs and security', 'Catch problems before visitors do.', ['Code Review & Testing'], ['CodeRabbit', 'Snyk', 'Qodo']),
        S('Get found in search', 'Optimize pages for the terms people actually search.', ['SEO'], ['Surfer SEO', 'Semrush', 'Ahrefs'])
      ] },

    { icon: '🎥', title: 'Create Videos', category: 'Video', difficulty: 'Intermediate', time: '~40 min',
      description: 'Script, generate, narrate, edit and publish a short video.',
      outcome: 'A finished short video with voice-over and captions, scheduled for posting.',
      tip: 'Keep the first version under one minute. It is faster to iterate and easier to finish.',
      steps: [
        S('Write the script', 'Draft a tight script with a hook in the first few seconds.', ['Writing', 'Chatbots'], ['ChatGPT', 'Claude', 'Jasper']),
        S('Plan the visuals', 'Sketch key scenes or thumbnails before generating footage.', ['Image Generation'], ['Midjourney', 'Ideogram', 'Leonardo AI']),
        S('Generate the footage', 'Create clips from text or images.', ['Video Generation'], ['Runway', 'Kling AI', 'Luma Dream Machine']),
        S('Add a voice-over', 'Record a natural narration in the language you need.', ['Audio & Voice'], ['ElevenLabs', 'Murf', 'PlayHT']),
        S('Edit and add captions', 'Trim, add captions and export in the right format.', ['Video Generation', 'Audio & Voice'], ['CapCut AI', 'Descript', 'VEED AI']),
        S('Publish and schedule', 'Post at the right times across platforms.', ['Social Media'], ['Buffer AI', 'Later', 'Hootsuite'])
      ] },

    { icon: '🎨', title: 'Design Graphics', category: 'Design', difficulty: 'Beginner', time: '~25 min',
      description: 'Create polished graphics for social posts, branding and marketing materials.',
      outcome: 'A set of on-brand graphics exported for web, print or social.',
      tip: 'Pick two fonts and three colors first, then reuse them everywhere for a consistent look.',
      steps: [
        S('Explore styles and ideas', 'Generate a quick mood board to find a direction.', ['Image Generation'], ['Krea', 'Midjourney', 'Playground']),
        S('Create the main artwork', 'Make the hero image or illustration, with readable text if needed.', ['Image Generation'], ['Ideogram', 'Leonardo AI', 'Adobe Firefly']),
        S('Lay it out', 'Place artwork and text into templates for each format.', ['Design'], ['Canva AI', 'Adobe Express', 'Microsoft Designer']),
        S('Clean up photos', 'Remove backgrounds and fix lighting on product or portrait shots.', ['Photo Editing'], ['Photoroom', 'Remove.bg', 'Clipdrop']),
        S('Build a brand kit', 'Save logo, colors and fonts so every future design matches.', ['Design', 'Image Generation'], ['Looka', 'Recraft', 'Figma AI'])
      ] },

    { icon: '📈', title: 'Grow a Business', category: 'Marketing', difficulty: 'Advanced', time: '~50 min',
      description: 'Research the market, find prospects, create content and measure what works.',
      outcome: 'A target list, a content plan and a simple dashboard to track results.',
      tip: 'Change one thing at a time so you can tell which change actually moved the numbers.',
      steps: [
        S('Research the market', 'Understand competitors, pricing and what customers say.', ['AI Search & Research', 'Chatbots'], ['Perplexity', 'Kagi', 'You.com']),
        S('Find prospects', 'Build a list of the right people and companies to contact.', ['Sales & CRM'], ['Apollo.io', 'Clay', 'Attio']),
        S('Write campaign content', 'Create ads, landing page copy and posts in your brand voice.', ['Writing', 'Marketing'], ['Copy.ai', 'Typeface', 'Jasper']),
        S('Set up email follow-ups', 'Send targeted sequences to leads and customers.', ['Marketing', 'Email'], ['Klaviyo', 'Mailchimp', 'Lavender']),
        S('Build a social presence', 'Plan and schedule posts across the channels that matter.', ['Social Media'], ['Sprout Social', 'Metricool', 'Buffer AI']),
        S('Measure and improve', 'Track results and ask questions of your data.', ['Data Analytics'], ['Julius AI', 'Rows', 'Tableau AI'])
      ] },

    { icon: '📊', title: 'Analyze Data', category: 'Productivity', difficulty: 'Intermediate', time: '~35 min',
      description: 'Turn raw data into clear findings, dashboards and a short presentation.',
      outcome: 'A cleaned dataset, a dashboard and a short deck summarizing the findings.',
      tip: 'Write down the question you want answered before you open any tool.',
      steps: [
        S('Clean and structure the data', 'Fix formats, duplicates and missing values.', ['Data Analytics'], ['Formula Bot', 'Rows', 'Julius AI']),
        S('Explore patterns', 'Ask questions in plain language and look for trends.', ['Data Analytics'], ['Hex', 'Akkio', 'DataLab']),
        S('Build a dashboard', 'Turn the key numbers into charts people can read quickly.', ['Data Analytics'], ['Power BI', 'Tableau AI', 'Metabase']),
        S('Explain the findings', 'Write a plain-language summary and recommendations.', ['Chatbots'], ['Claude', 'ChatGPT']),
        S('Present the story', 'Turn findings into a short, clear presentation.', ['Presentations'], ['Gamma', 'Beautiful.ai', 'Pitch'])
      ] },

    { icon: '✍️', title: 'Write Content', category: 'Writing', difficulty: 'Beginner', time: '~20 min',
      description: 'Research, outline, draft, edit and optimize a blog post or article.',
      outcome: 'A polished article with a header image, ready to publish.',
      tip: 'Add your own examples and opinions. Readers and search engines both reward original detail.',
      steps: [
        S('Research the topic', 'Collect facts, sources and angles worth covering.', ['AI Search & Research'], ['Perplexity', 'Consensus', 'Kagi']),
        S('Outline the structure', 'Decide the headings and the order of ideas.', ['Chatbots'], ['ChatGPT', 'Claude', 'Gemini']),
        S('Write the first draft', 'Generate a full draft you can then rewrite in your voice.', ['Writing'], ['Jasper', 'Writesonic', 'Copy.ai']),
        S('Edit and polish', 'Fix grammar, tone and readability.', ['Writing'], ['Grammarly AI', 'ProWritingAid', 'LanguageTool']),
        S('Optimize for search', 'Cover the terms top-ranking pages cover.', ['SEO'], ['Surfer SEO', 'Frase', 'Clearscope']),
        S('Add a header image', 'Create a custom image instead of using stock photos.', ['Image Generation'], ['Ideogram', 'Adobe Firefly', 'Midjourney'])
      ] },

    { icon: '🚀', title: 'Launch a Startup', category: 'Business', difficulty: 'Advanced', time: '~60 min',
      description: 'Validate an idea, build a prototype, brand it, pitch it and set up support.',
      outcome: 'A tested idea, a clickable prototype, a brand, a pitch deck and a support setup.',
      tip: 'Talk to five potential customers before building anything beyond a prototype.',
      steps: [
        S('Validate the idea', 'Check demand, competitors and the strongest version of the idea.', ['Chatbots', 'AI Search & Research'], ['Perplexity', 'ChatGPT', 'Claude']),
        S('Build a prototype', 'Create something people can click and react to.', ['App & Website Builders', 'Coding'], ['Lovable', 'Bolt.new', 'v0']),
        S('Create the brand', 'Choose a name style, logo and visual identity.', ['Design'], ['Looka', 'Canva AI']),
        S('Make the pitch deck', 'Turn your story into a short, clear deck.', ['Presentations'], ['Gamma', 'Pitch', 'Tome']),
        S('Set up customer support', 'Answer common questions automatically from day one.', ['Customer Support'], ['Tidio', 'Intercom Fin', 'Freshdesk']),
        S('Automate operations', 'Connect your tools so routine work runs itself.', ['Automation'], ['Zapier AI', 'Make', 'n8n'])
      ] },

    { icon: '🎙️', title: 'Start a Podcast', category: 'Audio', difficulty: 'Beginner', time: '~30 min',
      description: 'Plan, record, clean up, score and promote your first episode.',
      outcome: 'A finished episode with clean audio, theme music, cover art and promo clips.',
      tip: 'Record in a quiet, soft room (a closet full of clothes works). Good source audio beats any fix.',
      steps: [
        S('Plan the episode', 'Draft an outline, questions and a short intro.', ['Chatbots', 'Writing'], ['ChatGPT', 'Claude']),
        S('Record and clean the audio', 'Remove noise and echo so voices sound clear.', ['Audio & Voice'], ['Adobe Podcast', 'Podcastle', 'Krisp']),
        S('Edit through the transcript', 'Cut mistakes by deleting words from the text.', ['Audio & Voice'], ['Descript', 'Podcastle']),
        S('Create theme music', 'Generate a royalty-free intro and background track.', ['Music Generation'], ['Soundraw', 'Beatoven', 'Mubert', 'Suno']),
        S('Design the cover art', 'Make square artwork that stays readable when small.', ['Image Generation'], ['Ideogram', 'Midjourney']),
        S('Cut promo clips', 'Turn the best moments into short videos for social media.', ['Video Generation'], ['OpusClip', 'CapCut AI'])
      ] },

    { icon: '🗣️', title: 'Learn a Language', category: 'Education', difficulty: 'Beginner', time: '~15 min/day',
      description: 'Build a daily habit with practice, conversation, translation and vocabulary review.',
      outcome: 'A daily routine that covers speaking, reading, listening and vocabulary.',
      tip: 'Short daily sessions beat long weekly ones. Aim for 15 minutes every day.',
      steps: [
        S('Practice daily', 'Short guided lessons that keep a streak going.', ['Language Learning'], ['Duolingo', 'Speak', 'Praktika']),
        S('Talk with a partner', 'Practice real conversation without fear of mistakes.', ['Language Learning', 'Chatbots'], ['Talkpal', 'ChatGPT', 'Pi']),
        S('Check exact meanings', 'Look up phrases and see them in context.', ['Translation'], ['DeepL', 'Reverso', 'Google Translate']),
        S('Review vocabulary', 'Use spaced repetition so words stay in memory.', ['Education'], ['Anki AI', 'Knowt', 'Quizlet AI']),
        S('Listen to texts aloud', 'Hear articles read in natural voices to train your ear.', ['Audio & Voice'], ['Speechify', 'ElevenLabs'])
      ] },

    { icon: '🔬', title: 'Research a Topic', category: 'Research', difficulty: 'Intermediate', time: '~40 min',
      description: 'Map a field, find evidence, read papers faster, organize notes and write with citations.',
      outcome: 'A reading list, organized notes and a cited draft.',
      tip: 'Open the original paper for any claim you plan to rely on. Summaries can miss details.',
      steps: [
        S('Map the field', 'Find the key papers, authors and how they connect.', ['AI Search & Research'], ['Elicit', 'Semantic Scholar', 'ResearchRabbit']),
        S('Find supporting evidence', 'Ask a question and see what the studies say.', ['AI Search & Research'], ['Consensus', 'SciSpace', 'Perplexity']),
        S('Read papers faster', 'Upload papers and ask questions about them.', ['Documents & Knowledge', 'Education'], ['NotebookLM', 'Humata', 'ChatPDF']),
        S('Organize your notes', 'Keep highlights and ideas connected and searchable.', ['Documents & Knowledge', 'Productivity'], ['Readwise', 'Tana', 'Mem']),
        S('Write with citations', 'Draft and edit your write-up with references.', ['Writing'], ['Jenni AI', 'Grammarly AI', 'ProWritingAid'])
      ] },

    { icon: '⚙️', title: 'Automate Repetitive Work', category: 'Productivity', difficulty: 'Intermediate', time: '~45 min',
      description: 'Find the tasks you repeat, connect your apps and let assistants handle the rest.',
      outcome: 'Two or three automations running, plus an assistant for routine requests.',
      tip: 'Automate one small, boring task first. Expand only after it runs reliably for a week.',
      steps: [
        S('List the repeating tasks', 'Write down what you do every day or week and rank by time spent.', ['Chatbots'], ['ChatGPT', 'Claude']),
        S('Connect your apps', 'Move data between tools without copy-and-paste.', ['Automation'], ['Zapier AI', 'Make', 'IFTTT']),
        S('Add AI steps to flows', 'Summarize, classify or draft inside the automation.', ['Automation', 'AI Agents'], ['n8n', 'Gumloop', 'Lindy']),
        S('Build an assistant for the rest', 'Create an agent that handles routine requests.', ['AI Agents'], ['Relevance AI', 'Botpress', 'Dify']),
        S('Keep your time protected', 'Let your calendar and tasks organize themselves.', ['Productivity'], ['Reclaim.ai', 'Motion', 'Todoist'])
      ] },

    { icon: '📝', title: 'Run Meetings Smarter', category: 'Productivity', difficulty: 'Beginner', time: '~10 min setup',
      description: 'Protect focus time, record and summarize calls, track actions and send follow-ups.',
      outcome: 'Meetings that produce notes, assigned actions and a follow-up email automatically.',
      tip: 'Tell participants when a call is being recorded or transcribed, and check local rules.',
      steps: [
        S('Schedule around focus time', 'Place meetings where they hurt your work the least.', ['Productivity'], ['Reclaim.ai', 'Motion', 'Sunsama']),
        S('Record and transcribe', 'Capture the conversation so nobody has to take notes.', ['Meetings & Transcription'], ['Otter.ai', 'Fireflies.ai', 'Granola']),
        S('Get summaries and action items', 'Pull out decisions and who owns what.', ['Meetings & Transcription'], ['Fathom', 'Read AI', 'tl;dv']),
        S('Track follow-ups', 'Turn action items into tasks with owners and dates.', ['Productivity'], ['ClickUp', 'Taskade', 'Notion AI']),
        S('Send the follow-up', 'Draft the recap email in seconds.', ['Email'], ['Superhuman', 'Shortwave', 'Fyxer AI'])
      ] },

    { icon: '🌍', title: 'Localize Your Content', category: 'Marketing', difficulty: 'Intermediate', time: '~30 min',
      description: 'Translate text, keep terminology consistent, localize your site and dub your video.',
      outcome: 'Your key content available in a new language that reads naturally.',
      tip: 'Have a native speaker review the first pages, especially marketing copy and legal text.',
      steps: [
        S('Translate the text', 'Get a strong first translation of your core content.', ['Translation'], ['DeepL', 'Microsoft Translator', 'Google Translate']),
        S('Keep terminology consistent', 'Share a glossary so product terms never drift.', ['Translation'], ['Smartcat', 'Crowdin', 'Lokalise']),
        S('Localize your website', 'Serve every page in the visitor\'s language.', ['Translation'], ['Weglot', 'Lokalise']),
        S('Dub your video', 'Create translated voice-overs or lip-synced versions.', ['Video Generation', 'Audio & Voice'], ['HeyGen', 'ElevenLabs']),
        S('Polish the result', 'Smooth awkward phrasing so it sounds native.', ['Writing'], ['Wordtune', 'Grammarly AI', 'LanguageTool'])
      ] },

    { icon: '🧳', title: 'Plan a Trip', category: 'Lifestyle', difficulty: 'Beginner', time: '~20 min',
      description: 'Build an itinerary, compare options, translate on the go and learn key phrases.',
      outcome: 'A day-by-day plan, a list of phrases and tools ready for travel.',
      tip: 'Check opening hours, visa rules and prices on official sites. AI plans can be out of date.',
      steps: [
        S('Get itinerary ideas', 'Turn dates and interests into a first plan on a map.', ['Travel'], ['Mindtrip', 'Layla', 'Wanderlog']),
        S('Compare and refine', 'Ask follow-up questions about areas, timing and budget.', ['Chatbots', 'AI Search & Research'], ['Gemini', 'Perplexity', 'ChatGPT']),
        S('Translate on the go', 'Understand menus, signs and conversations.', ['Translation'], ['Google Translate', 'DeepL', 'Microsoft Translator']),
        S('Learn key phrases', 'Pick up the basics before you leave.', ['Language Learning'], ['Duolingo', 'Speak', 'Talkpal'])
      ] },

    { icon: '🏠', title: 'Run AI Privately on Your Computer', category: 'Coding', difficulty: 'Advanced', time: '~30 min',
      description: 'Install a local model, add a chat interface, connect your documents and reach other models when needed.',
      outcome: 'A private AI assistant on your own machine, with an option to use cloud models.',
      tip: 'Start with a small model. Larger ones need much more memory and run slowly on ordinary laptops.',
      steps: [
        S('Pick a runner', 'Install an app that downloads and runs models locally.', ['Open Source & Local AI'], ['Ollama', 'LM Studio', 'Jan']),
        S('Find a model', 'Browse open models and compare sizes and licenses.', ['Open Source & Local AI'], ['Hugging Face']),
        S('Add a friendly chat interface', 'Use a browser-style chat instead of the command line.', ['Open Source & Local AI'], ['Open WebUI', 'Jan']),
        S('Connect your documents', 'Let the model answer from your own files.', ['AI Development Platforms'], ['LlamaIndex', 'LangChain']),
        S('Reach other models when needed', 'Use one API for stronger cloud models on hard tasks.', ['AI Development Platforms'], ['OpenRouter', 'Together AI', 'Replicate'])
      ] }
  ];

  // Replace the old workflows in place (WORKFLOWS is a const array, so we edit it, not reassign it).
  WORKFLOWS.length = 0;
  DEFS.forEach((d, i) => WORKFLOWS.push(Object.assign({ id: i, toolCount: d.steps.length }, d)));

  // ---------- Picking tools for each step ----------
  const stop = new Set(['about', 'their', 'these', 'those', 'which', 'while', 'after', 'before', 'where', 'other', 'using', 'first', 'every', 'people', 'tools']);
  const words = s => (String(s).toLowerCase().match(/[a-z]{5,}/g) || []).filter(w => !stop.has(w));

  function candidates(step, free, used) {
    const pool = expand(step.needs);
    const kw = words(step.title + ' ' + step.desc);
    const ok = t => isReal(t) && (!free || t.free) && !used.has(t.name);
    const byName = new Map(TOOLS.map(t => [String(t.name).toLowerCase(), t]));
    const out = [];
    step.prefer.forEach(n => { const t = byName.get(n.toLowerCase()); if (t && ok(t) && !out.includes(t)) out.push(t); });
    TOOLS.filter(t => ok(t) && pool.includes(t.category) && !out.includes(t))
      .map(t => ({ t, s: words(t.name + ' ' + t.desc).filter(w => kw.includes(w)).length * 10 + (t.rating || 0) + (t.tag === "Editor's Choice" ? 1 : 0) }))
      .sort((a, b) => b.s - a.s)
      .forEach(x => out.push(x.t));
    return out.slice(0, 6);
  }

  // One tool is chosen per step and never reused in the same workflow; alternatives avoid those picks too.
  function resolve(w, free) {
    const used = new Set();
    const rows = w.steps.map(st => {
      const list = candidates(st, free, used);
      if (list[0]) used.add(list[0].name);
      return { st, list };
    });
    return rows.map(r => ({ st: r.st, main: r.list[0] || null, alts: r.list.slice(1).filter(t => !used.has(t.name)).slice(0, 3) }));
  }

  // ---------- Detail modal (reuses the existing modal and its CSS) ----------
  let cur = { id: null, free: false, refocus: false };
  const $ = id => document.getElementById(id);
  const visit = t => {
    if (typeof attemptVisitTool === 'function') attemptVisitTool(t.website, t.name);
    else window.open(t.website, '_blank', 'noopener,noreferrer');
  };
  const toast = (m, type) => { if (typeof showToast === 'function') showToast(m, type || 'success'); };
  const pill = (t, extra) => '<button type="button" class="tool-pill' + (extra || '') + '" data-visit="' + esc(t.name) + '">' + esc(t.name) + '</button>';
  const price = t => (typeof badgeClass === 'function' ? '<span class="' + badgeClass(t.pricing) + '">' + esc(t.pricing) + '</span>' : '');

  function render() {
    const w = WORKFLOWS.find(x => x.id === cur.id);
    if (!w) return;
    const rows = resolve(w, cur.free);

    $('wfDetailModalIcon').textContent = w.icon;
    $('wfDetailModalTitle').textContent = w.title;
    $('wfDetailModalSub').textContent = w.steps.length + ' steps · ' + w.difficulty;
    $('wfDetailTime').textContent = w.time;
    const diff = $('wfDetailDifficulty');
    diff.textContent = w.difficulty;
    diff.className = 'difficulty-badge ' + w.difficulty.toLowerCase();

    const steps = rows.map((r, i) => {
      let tools;
      if (r.main) {
        tools = '<span class="tool-label">Recommended:</span>' + pill(r.main) + price(r.main) +
          (r.alts.length ? '<span class="tool-label">Or try:</span>' + r.alts.map(a => pill(a, ' alt')).join('') : '');
      } else {
        tools = '<span class="tool-label">' + (cur.free ? 'No free tool listed for this step yet. Turn off the free filter to see all options.' : 'No tool listed for this step yet.') + '</span>';
      }
      return '<div class="wf-detail-step"><div class="step-num">' + (i + 1) + '</div><div class="step-content">' +
        '<div class="step-title">' + esc(r.st.title) + '</div><div class="step-desc">' + esc(r.st.desc) + '</div>' +
        '<div class="step-tool-row">' + tools + '</div></div>' +
        (r.main ? '<button type="button" class="step-action-btn" data-visit="' + esc(r.main.name) + '">Launch →</button>' : '') + '</div>';
    }).join('');

    const related = WORKFLOWS.filter(x => x.id !== w.id)
      .sort((a, b) => (b.category === w.category) - (a.category === w.category)).slice(0, 4);

    $('wfDetailModalBody').innerHTML =
      '<div class="avw-note"><strong>What you will end up with:</strong> ' + esc(w.outcome) + '</div>' +
      '<label class="avw-free"><input type="checkbox" id="avwFree"' + (cur.free ? ' checked' : '') + '> Show tools with a free plan only</label>' +
      steps +
      '<div class="avw-note"><strong>Tip:</strong> ' + esc(w.tip) + '</div>' +
      '<div class="wf-modal-footer">' +
        '<button type="button" class="btn btn-primary" id="avwCopy">Copy as checklist</button>' +
        '<button type="button" class="btn btn-secondary" id="avwBuild">Build one for my goal</button>' +
        '<button type="button" class="btn btn-secondary" id="avwGuide">How workflows work</button>' +
      '</div>' +
      '<div class="wf-related"><h4>More workflows</h4><div class="wf-related-grid">' +
      related.map(x => '<button type="button" class="wf-related-card" data-wf-open="' + x.id + '"><span class="r-icon" aria-hidden="true">' + esc(x.icon) +
        '</span><div class="r-title">' + esc(x.title) + '</div></button>').join('') + '</div></div>';

    if (cur.refocus) { cur.refocus = false; const cb = $('avwFree'); if (cb) cb.focus(); }
  }

  window.openWorkflowDetailModal = function (id) {
    cur.id = id;
    render();
    const bd = $('workflowDetailModalBackdrop');
    if (!bd) return;
    bd.classList.add('show');
    document.body.style.overflow = 'hidden';
    const box = bd.querySelector('.modal-box');
    if (box) box.scrollTop = 0;
  };

  function checklist(w) {
    return w.title + ' (AIverse workflow)\nOutcome: ' + w.outcome + '\n\n' +
      resolve(w, cur.free).map((r, i) =>
        (i + 1) + '. ' + r.st.title + ': ' + (r.main ? r.main.name + ' (' + r.main.website + ')' : 'no tool listed') +
        (r.alts.length ? '\n   Alternatives: ' + r.alts.map(a => a.name).join(', ') : '')).join('\n');
  }

  function bindModal() {
    const body = $('wfDetailModalBody');
    if (!body) return;
    body.addEventListener('click', e => {
      const v = e.target.closest('[data-visit]');
      if (v) { const t = TOOLS.find(x => x.name === v.dataset.visit); if (t) visit(t); return; }
      const o = e.target.closest('[data-wf-open]');
      if (o) { window.openWorkflowDetailModal(+o.dataset.wfOpen); return; }
      if (e.target.closest('#avwCopy')) {
        const w = WORKFLOWS.find(x => x.id === cur.id);
        if (w && navigator.clipboard) navigator.clipboard.writeText(checklist(w)).then(() => toast('Checklist copied'), () => toast('Could not copy automatically', 'error'));
        return;
      }
      if (e.target.closest('#avwBuild')) {
        if (typeof closeWorkflowDetailModal === 'function') closeWorkflowDetailModal();
        setTimeout(() => { const b = $('wfGenerateBtn'); if (b) b.click(); }, 60);
        return;
      }
      if (e.target.closest('#avwGuide')) openGuide();
    });
    body.addEventListener('change', e => {
      if (e.target.id === 'avwFree') { cur.free = e.target.checked; cur.refocus = true; render(); }
    });
  }

  // ---------- Guide ----------
  let guide = null;
  function openGuide() {
    if (!guide) {
      guide = document.createElement('dialog');
      guide.className = 'avw-guide';
      guide.setAttribute('aria-label', 'How workflows work');
      guide.innerHTML =
        '<div class="modal-box">' +
          '<div class="modal-header"><div class="modal-tool-info"><div class="modal-logo" aria-hidden="true">📖</div>' +
          '<div><h3 style="font-weight:700;font-size:18px;">How workflows work</h3>' +
          '<p style="font-size:12px;color:var(--text-dim);">A short guide to getting results from AIverse workflows</p></div></div>' +
          '<button type="button" class="modal-close" aria-label="Close guide">✕</button></div>' +
          '<div class="modal-body">' +
            '<p>A workflow is a step-by-step route from an idea to a finished result. Each step names one job to be done and recommends a tool for it, with alternatives in case you prefer something else.</p>' +
            '<div><h4>How to use one</h4><ol>' +
              '<li>Pick the workflow closest to what you want. Use the search box and the category filters above the cards.</li>' +
              '<li>Read the outcome, time estimate and difficulty at the top.</li>' +
              '<li>Work through the steps in order. Skip any step you do not need.</li>' +
              '<li>If a tool does not suit you because of price, privacy or preference, try one of the alternatives for that step.</li>' +
              '<li>Turn on “Show tools with a free plan only” to hide anything without a free option.</li></ol></div>' +
            '<div><h4>Reading the labels</h4><ul>' +
              '<li><strong>Beginner:</strong> no technical skills needed.</li>' +
              '<li><strong>Intermediate:</strong> you are comfortable learning new software.</li>' +
              '<li><strong>Advanced:</strong> involves setup or several connected tools.</li>' +
              '<li><strong>Time:</strong> a rough estimate for a first run, not a promise.</li>' +
              '<li><strong>Free, Freemium, Paid:</strong> Freemium means a free plan with limits. Always confirm current pricing on the tool\'s own site.</li></ul></div>' +
            '<div><h4>Good habits</h4><ul>' +
              '<li>Check each tool\'s free-plan limits before you rely on it.</li>' +
              '<li>Do not paste confidential or personal data into a tool until you have read its privacy terms.</li>' +
              '<li>Review AI output yourself before you publish or act on it. AI can sound confident and still be wrong.</li>' +
              '<li>Start with one tool per step and add more only if you need to.</li></ul></div>' +
            '<div><h4>Questions</h4>' +
              '<details><summary>Do I need every tool in a workflow?</summary><p>No. A workflow is a suggested route, not a requirement. Skip steps or swap tools freely.</p></details>' +
              '<details><summary>Why this tool for this step?</summary><p>Each recommendation is picked to match the job in that step. Tools change quickly, so alternatives are listed in case a tool no longer fits.</p></details>' +
              '<details><summary>My goal is not listed.</summary><p>Use “Generate My Workflow” to get a route for your own goal.</p></details>' +
              '<details><summary>A link is wrong or a tool has changed.</summary><p>Open the tool\'s page in the directory and use the flag button to report outdated information.</p></details></div>' +
            '<div class="wf-modal-footer"><button type="button" class="btn btn-primary" id="avwGuideBuild">Generate a workflow for my goal</button>' +
            '<button type="button" class="btn btn-secondary" id="avwGuideClose">Close</button></div>' +
          '</div></div>';
      document.body.appendChild(guide);
      guide.querySelector('.modal-close').addEventListener('click', () => guide.close());
      guide.querySelector('#avwGuideClose').addEventListener('click', () => guide.close());
      guide.querySelector('#avwGuideBuild').addEventListener('click', () => {
        guide.close();
        if (typeof closeWorkflowDetailModal === 'function') closeWorkflowDetailModal();
        setTimeout(() => { const b = $('wfGenerateBtn'); if (b) b.click(); }, 60);
      });
      guide.addEventListener('click', e => { if (e.target === guide) guide.close(); });
    }
    guide.showModal();
  }

  // ---------- Styles and page wiring ----------
  const CSS = `
.avw-note{padding:12px 14px;border-radius:12px;background:var(--panel);border:1px solid var(--border);font-size:13px;color:var(--text-dim);line-height:1.6}
.avw-note strong{color:var(--text)}
.avw-free{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-dim);cursor:pointer;width:fit-content}
.avw-free input{accent-color:var(--indigo);width:16px;height:16px}
.wf-detail-step .badge{font-size:10px}
.wf-detail-step .tool-pill.alt{font-weight:400}
#wfDetailModalBody :focus-visible,.avw-guide :focus-visible{outline:2px solid var(--indigo);outline-offset:2px}
.wf-related-card{font:inherit;color:inherit}
dialog.avw-guide{border:0;padding:0;background:transparent;max-width:none;max-height:none;color:var(--text)}
dialog.avw-guide::backdrop{background:rgba(0,0,0,.6);backdrop-filter:blur(4px)}
.avw-guide .modal-box{width:min(640px,94vw);max-height:85vh}
.avw-guide h4{font-size:14px;margin-bottom:8px;color:var(--text)}
.avw-guide p,.avw-guide li{font-size:13px;color:var(--text-dim);line-height:1.7}
.avw-guide ol,.avw-guide ul{padding-left:20px}
.avw-guide li{margin-bottom:4px}
.avw-guide li strong{color:var(--text)}
.avw-guide details{border-top:1px solid var(--border);padding:10px 0}
.avw-guide summary{cursor:pointer;font-weight:600;font-size:13px;color:var(--text)}
.avw-guide details p{margin-top:6px}`;

  function init() {
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    // Three extra filters for the new workflow categories (the existing click handler already supports them).
    const group = $('wfFilterGroup');
    if (group) {
      [['Audio', '🎧 Audio'], ['Research', '🔬 Research'], ['Lifestyle', '🧳 Lifestyle']].forEach(([key, label]) => {
        if (group.querySelector('[data-wf-filter="' + key + '"]')) return;
        const b = document.createElement('button');
        b.className = 'wf-filter-btn';
        b.dataset.wfFilter = key;
        b.textContent = label;
        group.appendChild(b);
      });
    }
    const gen = $('wfGenerateBtn');
    if (gen && gen.parentNode) {
      const g = document.createElement('button');
      g.type = 'button';
      g.id = 'wfGuideBtn';
      g.className = 'wf-filter-btn';
      g.textContent = '📖 How workflows work';
      g.addEventListener('click', openGuide);
      gen.parentNode.insertBefore(g, gen);
    }
    bindModal();
  }

  window.AIverseWorkflows = { openGuide, resolve };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
