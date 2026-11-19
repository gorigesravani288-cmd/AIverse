// ============================================================
// AIverse - Data Layer
// Navigation items, the AI tools dataset, categories & collections
// ============================================================

const NAV_ITEMS = [
  { label:"Dashboard", ico:"🏠" },
  { label:"AI Tools", ico:"🤖" },
  { label:"Favorites", ico:"⭐" },
  { label:"Latest Tools", ico:"✨" },
  { label:"Trending", ico:"🔥", hot:true },
  { label:"Categories", ico:"📂" },
  { label:"Compare Tools", ico:"📊" },
  { label:"Productivity", ico:"💼" },
];
const BOTTOM_NAV_ITEMS = [ { label:"Settings", ico:"⚙️" }, { label:"Profile", ico:"👤" } ];
const MOBILE_NAV = [
  { label:"Dashboard", ico:"🏠" },
  { label:"AI Tools", ico:"🤖" },
  { label:"Trending", ico:"🔥" },
  { label:"Compare Tools", ico:"📊" },
  { label:"Favorites", ico:"⭐" },
];

const BASE_TOOLS = [
  { name:"ChatGPT", logo:"🤖", desc:"Conversational AI for writing, code, and reasoning tasks.", category:"Chatbots", pricing:"Freemium", rating:4.9, users:"180M", free:true, platform:"Web, Desktop, Mobile", tag:"Editor's Choice", website:"https://chatgpt.com" },
  { name:"Claude", logo:"✦", desc:"Thoughtful AI assistant built for deep reasoning and long context.", category:"Chatbots", pricing:"Freemium", rating:4.9, users:"40M", free:true, platform:"Web, Desktop, Mobile", tag:"Trending", website:"https://claude.ai" },
  { name:"Gemini", logo:"◆", desc:"Google's multimodal AI across search, docs, and workspace.", category:"Chatbots", pricing:"Freemium", rating:4.7, users:"95M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://gemini.google.com" },
  { name:"Perplexity", logo:"❖", desc:"Answer engine that cites sources in real time.", category:"Research", pricing:"Freemium", rating:4.8, users:"30M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://www.perplexity.ai" },
  { name:"Midjourney", logo:"🎨", desc:"Best-in-class AI art and image generation via Discord & web.", category:"Image Generation", pricing:"Paid", rating:4.8, users:"20M", free:false, platform:"Web, Discord", tag:"Popular", website:"https://www.midjourney.com" },
  { name:"Runway", logo:"🎬", desc:"Generative video editing and text-to-video creation suite.", category:"Video Editing", pricing:"Freemium", rating:4.6, users:"8M", free:true, platform:"Web", tag:"New", website:"https://runwayml.com" },
  { name:"Cursor", logo:"💻", desc:"AI-native code editor built for pair-programming with models.", category:"Coding", pricing:"Freemium", rating:4.9, users:"5M", free:true, platform:"Desktop", tag:"Editor's Choice", website:"https://www.cursor.com" },
  { name:"GitHub Copilot", logo:"🐙", desc:"AI pair programmer embedded right in your IDE.", category:"Coding", pricing:"Paid", rating:4.7, users:"15M", free:false, platform:"Desktop, Web", tag:"Popular", website:"https://github.com/features/copilot" },
  { name:"Notion AI", logo:"📝", desc:"Writing, summarizing, and Q&A built into your workspace.", category:"Productivity", pricing:"Paid", rating:4.6, users:"10M", free:false, platform:"Web, Desktop, Mobile", tag:"Popular", website:"https://www.notion.com/product/ai" },
  { name:"Canva AI", logo:"🖌️", desc:"Magic design tools for social posts, decks, and branding.", category:"Image Generation", pricing:"Freemium", rating:4.7, users:"50M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://www.canva.com/ai-image-generator" },
  { name:"ElevenLabs", logo:"🎙️", desc:"Ultra-realistic AI voice generation and cloning.", category:"Voice AI", pricing:"Freemium", rating:4.8, users:"6M", free:true, platform:"Web, API", tag:"New", website:"https://elevenlabs.io" },
  { name:"Synthesia", logo:"🎥", desc:"Turn text into studio-quality AI avatar videos.", category:"Video Editing", pricing:"Paid", rating:4.5, users:"3M", free:false, platform:"Web", tag:"Popular", website:"https://www.synthesia.io" },
  { name:"Leonardo AI", logo:"🦁", desc:"Fine-tuned image generation for game and product art.", category:"Image Generation", pricing:"Freemium", rating:4.6, users:"7M", free:true, platform:"Web", tag:"New", website:"https://leonardo.ai" },
  { name:"Adobe Firefly", logo:"🔥", desc:"Commercially safe generative art integrated with Creative Cloud.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"12M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://www.adobe.com/products/firefly.html" },
  { name:"DeepSeek", logo:"🌊", desc:"Open, efficient reasoning models for research and code.", category:"Coding", pricing:"Free", rating:4.4, users:"9M", free:true, platform:"Web, API", tag:"Trending", website:"https://www.deepseek.com" },
  { name:"Jasper", logo:"✍️", desc:"AI copywriting platform for blogs, ads, and brand voice content.", category:"Writing", pricing:"Paid", rating:4.6, users:"4M", free:false, platform:"Web", tag:"Popular", website:"https://www.jasper.ai" },
  { name:"Suno", logo:"🎵", desc:"Generate full songs with vocals from a text prompt.", category:"Music Generation", pricing:"Freemium", rating:4.7, users:"9M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://suno.com" },
  { name:"Julius AI", logo:"📊", desc:"Chat with your data to get instant analysis and visualizations.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"2M", free:true, platform:"Web", tag:"New", website:"https://julius.ai" },
  { name:"AdCreative.ai", logo:"📣", desc:"Generates high-converting ad creatives and campaign copy.", category:"Marketing", pricing:"Paid", rating:4.5, users:"1M", free:false, platform:"Web", tag:"Popular", website:"https://www.adcreative.ai" },
  { name:"Mem", logo:"🗂️", desc:"AI-organized workspace for notes, docs, and business knowledge.", category:"Business", pricing:"Freemium", rating:4.4, users:"1M", free:true, platform:"Web, Desktop", tag:"New", website:"https://mem.ai" },
  { name:"Khanmigo", logo:"🎓", desc:"AI tutor from Khan Academy for personalized learning.", category:"Education", pricing:"Freemium", rating:4.6, users:"3M", free:true, platform:"Web", tag:"Popular", website:"https://www.khanmigo.ai" },
  { name:"Zapier AI", logo:"⚡", desc:"Automate workflows across thousands of apps with natural language.", category:"Automation", pricing:"Freemium", rating:4.6, users:"6M", free:true, platform:"Web", tag:"Trending", website:"https://zapier.com" },
  { name:"Surfer SEO", logo:"🏄", desc:"Optimizes content for search rankings with AI-driven analysis.", category:"SEO", pricing:"Paid", rating:4.5, users:"1M", free:false, platform:"Web", tag:"Popular", website:"https://surferseo.com" },
  { name:"Lavender", logo:"📧", desc:"AI email coach that improves sales email reply rates.", category:"Email", pricing:"Freemium", rating:4.4, users:"500K", free:true, platform:"Web", tag:"New", website:"https://www.lavender.ai" },
  { name:"Buffer AI", logo:"📱", desc:"Generates and schedules social media posts across platforms.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"2M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://buffer.com" },
  { name:"Adobe Podcast", logo:"🎧", desc:"AI audio cleanup and enhancement for podcasts and recordings.", category:"Audio", pricing:"Free", rating:4.6, users:"3M", free:true, platform:"Web", tag:"Trending", website:"https://podcast.adobe.com" },
  { name:"Rogo", logo:"💰", desc:"AI research assistant built for financial analysts.", category:"Finance", pricing:"Paid", rating:4.5, users:"200K", free:false, platform:"Web", tag:"New", website:"https://rogo.ai" },
  { name:"Harvey", logo:"⚖️", desc:"AI assistant for legal research, drafting, and analysis.", category:"Legal", pricing:"Paid", rating:4.6, users:"300K", free:false, platform:"Web", tag:"Popular", website:"https://www.harvey.ai" },
  { name:"Abridge", logo:"🩺", desc:"Converts clinical conversations into structured medical notes.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"500K", free:false, platform:"Web, Mobile", tag:"New", website:"https://www.abridge.com" },
  { name:"Inworld AI", logo:"🎮", desc:"AI-driven NPC dialogue and character behavior for games.", category:"Gaming", pricing:"Freemium", rating:4.4, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://inworld.ai" },
  { name:"Shopify Magic", logo:"🛒", desc:"AI product descriptions and storefront tools for e-commerce.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"4M", free:true, platform:"Web", tag:"Popular", website:"https://www.shopify.com/magic" },
  { name:"Darktrace", logo:"🛡️", desc:"Self-learning AI that detects and responds to cyber threats.", category:"Cybersecurity", pricing:"Paid", rating:4.6, users:"1M", free:false, platform:"Web", tag:"Popular", website:"https://darktrace.com" },
  { name:"Mistral Le Chat", logo:"💬", desc:"Fast conversational AI assistant powered by Mistral models.", category:"Chatbots", pricing:"Freemium", rating:4.6, users:"8M", free:true, platform:"Web, Mobile", tag:"New", website:"https://chat.mistral.ai" },
  { name:"Poe", logo:"🧠", desc:"Access multiple AI models from one unified interface.", category:"Chatbots", pricing:"Freemium", rating:4.7, users:"15M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://poe.com" },
  { name:"Pi AI", logo:"😊", desc:"Personal AI assistant focused on natural conversations.", category:"Chatbots", pricing:"Free", rating:4.7, users:"10M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://pi.ai" },
  { name:"You.com AI", logo:"🔍", desc:"AI search engine with chat, writing, and research capabilities.", category:"Research", pricing:"Freemium", rating:4.6, users:"12M", free:true, platform:"Web", tag:"Popular", website:"https://you.com" },
  { name:"Copy.ai", logo:"📄", desc:"Generate blogs, ads, emails, and marketing content with AI.", category:"Writing", pricing:"Freemium", rating:4.7, users:"12M", free:true, platform:"Web", tag:"Popular", website:"https://www.copy.ai" },
  { name:"Writesonic", logo:"✍️", desc:"AI writing platform for articles and SEO content.", category:"Writing", pricing:"Freemium", rating:4.6, users:"8M", free:true, platform:"Web", tag:"Trending", website:"https://writesonic.com" },
  { name:"Rytr", logo:"🖋️", desc:"Affordable AI writing assistant for creators.", category:"Writing", pricing:"Freemium", rating:4.5, users:"7M", free:true, platform:"Web", tag:"Popular", website:"https://rytr.me" },
  { name:"Grammarly AI", logo:"📚", desc:"Grammar correction and AI writing assistant.", category:"Writing", pricing:"Freemium", rating:4.8, users:"40M", free:true, platform:"Web, Desktop", tag:"Editor's Choice", website:"https://www.grammarly.com" },
  { name:"Ideogram", logo:"🖼️", desc:"AI image generation with exceptional text rendering.", category:"Image Generation", pricing:"Freemium", rating:4.8, users:"12M", free:true, platform:"Web", tag:"Trending", website:"https://ideogram.ai" },
  { name:"Playground AI", logo:"🎨", desc:"Generate and edit high-quality AI images.", category:"Image Generation", pricing:"Freemium", rating:4.6, users:"10M", free:true, platform:"Web", tag:"Popular", website:"https://playground.com" },
  { name:"DreamStudio", logo:"✨", desc:"Official Stable Diffusion image generation platform.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"5M", free:true, platform:"Web", tag:"New", website:"https://dreamstudio.ai" },
  { name:"Microsoft Designer", logo:"🖌️", desc:"AI-powered graphic design and image creation.", category:"Image Generation", pricing:"Free", rating:4.7, users:"20M", free:true, platform:"Web", tag:"Popular", website:"https://designer.microsoft.com" },
  { name:"Pika", logo:"🎬", desc:"Generate cinematic videos from text prompts.", category:"Video Editing", pricing:"Freemium", rating:4.7, users:"6M", free:true, platform:"Web", tag:"Trending", website:"https://pika.art" },
  { name:"Luma Dream Machine", logo:"🎥", desc:"AI video generation with realistic motion.", category:"Video Editing", pricing:"Freemium", rating:4.8, users:"8M", free:true, platform:"Web", tag:"Editor's Choice", website:"https://lumalabs.ai" },
  { name:"HeyGen", logo:"🎤", desc:"Create AI avatar videos in multiple languages.", category:"Video Editing", pricing:"Freemium", rating:4.7, users:"7M", free:true, platform:"Web", tag:"Popular", website:"https://www.heygen.com" },
  { name:"CapCut AI", logo:"✂️", desc:"AI-powered editing tools for creators.", category:"Video Editing", pricing:"Freemium", rating:4.7, users:"100M", free:true, platform:"Desktop, Mobile", tag:"Trending", website:"https://www.capcut.com" },
  { name:"Codeium", logo:"⚡", desc:"Free AI coding assistant with autocomplete.", category:"Coding", pricing:"Free", rating:4.8, users:"10M", free:true, platform:"Desktop", tag:"Popular", website:"https://codeium.com" },
  { name:"Tabnine", logo:"⌨️", desc:"AI code completion for developers.", category:"Coding", pricing:"Freemium", rating:4.6, users:"8M", free:true, platform:"Desktop", tag:"Popular", website:"https://www.tabnine.com" },
  { name:"Replit AI", logo:"🚀", desc:"Cloud coding platform with integrated AI.", category:"Coding", pricing:"Freemium", rating:4.7, users:"20M", free:true, platform:"Web", tag:"Trending", website:"https://replit.com" },
  { name:"Amazon Q Developer", logo:"☁️", desc:"AI coding assistant from AWS.", category:"Coding", pricing:"Freemium", rating:4.5, users:"4M", free:true, platform:"Desktop", tag:"New", website:"https://aws.amazon.com/q" },
  { name:"Taskade AI", logo:"✅", desc:"AI-powered project and task management.", category:"Productivity", pricing:"Freemium", rating:4.6, users:"5M", free:true, platform:"Web", tag:"Trending", website:"https://www.taskade.com" },
  { name:"ClickUp AI", logo:"📋", desc:"AI assistant built into ClickUp workspace.", category:"Productivity", pricing:"Paid", rating:4.6, users:"10M", free:false, platform:"Web", tag:"Popular", website:"https://clickup.com" },
  { name:"Motion", logo:"📅", desc:"AI calendar and smart scheduling assistant.", category:"Productivity", pricing:"Paid", rating:4.5, users:"2M", free:false, platform:"Web", tag:"New", website:"https://www.usemotion.com" },
  { name:"Elicit", logo:"📖", desc:"Research assistant for scientific literature.", category:"Research", pricing:"Freemium", rating:4.8, users:"3M", free:true, platform:"Web", tag:"Popular", website:"https://elicit.com" },
  { name:"Consensus", logo:"📑", desc:"Search scientific papers with AI summaries.", category:"Research", pricing:"Freemium", rating:4.7, users:"4M", free:true, platform:"Web", tag:"Trending", website:"https://consensus.app" },
  { name:"Scite", logo:"📚", desc:"Citation-aware AI research assistant.", category:"Research", pricing:"Paid", rating:4.6, users:"1M", free:false, platform:"Web", tag:"Popular", website:"https://scite.ai" },
  { name:"Hex AI", logo:"📊", desc:"AI notebook for data analysis and visualization.", category:"Data Analytics", pricing:"Freemium", rating:4.6, users:"2M", free:true, platform:"Web", tag:"Trending", website:"https://hex.tech" },
  { name:"Power BI Copilot", logo:"📈", desc:"AI assistant integrated into Microsoft Power BI.", category:"Data Analytics", pricing:"Paid", rating:4.7, users:"15M", free:false, platform:"Desktop", tag:"Popular", website:"https://powerbi.microsoft.com" },
  { name:"Ocoya", logo:"📢", desc:"AI-powered social media marketing platform.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"2M", free:true, platform:"Web", tag:"Popular", website:"https://www.ocoya.com" },
  { name:"Predis.ai", logo:"📣", desc:"Generate social media posts and creatives with AI.", category:"Marketing", pricing:"Freemium", rating:4.6, users:"3M", free:true, platform:"Web", tag:"Trending", website:"https://predis.ai" },
  { name:"Beautiful.ai", logo:"📊", desc:"AI-powered presentation creation platform.", category:"Business", pricing:"Freemium", rating:4.6, users:"4M", free:true, platform:"Web", tag:"Popular", website:"https://www.beautiful.ai" },
  { name:"Tome", logo:"📚", desc:"Create presentations and documents with AI.", category:"Business", pricing:"Freemium", rating:4.7, users:"5M", free:true, platform:"Web", tag:"Trending", website:"https://tome.app" },
  { name:"MagicSchool AI", logo:"🏫", desc:"AI platform built for teachers and students.", category:"Education", pricing:"Freemium", rating:4.8, users:"5M", free:true, platform:"Web", tag:"Popular", website:"https://www.magicschool.ai" },
  { name:"Make AI", logo:"🔄", desc:"Workflow automation using AI and integrations.", category:"Automation", pricing:"Freemium", rating:4.7, users:"8M", free:true, platform:"Web", tag:"Popular", website:"https://www.make.com" },
  { name:"Bardeen AI", logo:"🤖", desc:"Browser automation powered by AI.", category:"Automation", pricing:"Freemium", rating:4.6, users:"3M", free:true, platform:"Web", tag:"Trending", website:"https://www.bardeen.ai" },
  { name:"Frase", logo:"📈", desc:"AI-powered SEO content optimization platform.", category:"SEO", pricing:"Paid", rating:4.6, users:"2M", free:false, platform:"Web", tag:"Popular", website:"https://www.frase.io" },
  { name:"Murf AI", logo:"🎙️", desc:"Professional AI voice generator and narrator.", category:"Voice AI", pricing:"Freemium", rating:4.7, users:"6M", free:true, platform:"Web", tag:"Popular", website:"https://murf.ai" },
  { name:"PlayHT", logo:"🗣️", desc:"Generate realistic AI voices from text.", category:"Voice AI", pricing:"Freemium", rating:4.7, users:"5M", free:true, platform:"Web", tag:"Trending", website:"https://play.ht" },
  { name:"Descript", logo:"🎙️", desc:"AI-powered podcast, audio, and video editing.", category:"Audio", pricing:"Freemium", rating:4.8, users:"8M", free:true, platform:"Desktop", tag:"Editor's Choice", website:"https://www.descript.com" },
  { name:"Scenario", logo:"🎮", desc:"Generate AI game assets and textures.", category:"Gaming", pricing:"Freemium", rating:4.6, users:"2M", free:true, platform:"Web", tag:"Trending", website:"https://scenario.com" }
];


const EXTRA_TOOLS = [
  { name:"GrammarlyGO", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"New", website:"https://grammarly.com" },
  { name:"QuillBot", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://quillbot.com" },
  { name:"Wordtune", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://wordtune.com" },
  { name:"Anyword", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://anyword.com" },
  { name:"Sudowrite", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://sudowrite.com" },
  { name:"Lex", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://lex.page" },
  { name:"Stable Diffusion", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://stability.ai" },
  { name:"Krea AI", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"New", website:"https://krea.ai" },
  { name:"Fooocus", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://github.com/lllyasviel/Fooocus" },
  { name:"ComfyUI", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://github.com/comfyanonymous/ComfyUI" },
  { name:"Photoroom", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://photoroom.com" },
  { name:"Kling AI", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://klingai.com" },
  { name:"OpusClip", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://opus.pro" },
  { name:"VEED AI", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://veed.io" },
  { name:"Descript Video", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"New", website:"https://descript.com" },
  { name:"InVideo AI", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://invideo.io" },
  { name:"Kapwing AI", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://kapwing.com" },
  { name:"Udio", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://udio.com" },
  { name:"AIVA", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://aiva.ai" },
  { name:"Soundraw", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://soundraw.io" },
  { name:"Boomy", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://boomy.com" },
  { name:"Beatoven.ai", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://beatoven.ai" },
  { name:"Mubert", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://mubert.com" },
  { name:"Loudly AI", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://loudly.com" },
  { name:"Musicfy", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://musicfy.lol" },
  { name:"Windsurf", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://windsurf.com" },
  { name:"Amazon CodeWhisperer", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://amazon-codewhisperer.com" },
  { name:"Sourcegraph Cody", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Trending", website:"https://sourcegraph-cody.com" },
  { name:"Aider", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"New", website:"https://aider.com" },
  { name:"Continue", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://continue.com" },
  { name:"Cline", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Trending", website:"https://cline.com" },
  { name:"Blackbox AI", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://blackbox-ai.com" },
  { name:"Pieces for Developers", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://pieces-for-developers.com" },
  { name:"JetBrains AI Assistant", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Trending", website:"https://jetbrains-ai-assistant.com" },
  { name:"Dataiku", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://dataiku.com" },
  { name:"DataRobot", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://datarobot.com" },
  { name:"Obviously AI", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://obviously-ai.com" },
  { name:"Pecan AI", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://pecan-ai.com" },
  { name:"Akkio", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://akkio.com" },
  { name:"Polymer", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://polymer.com" },
  { name:"Formula Bot", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://formula-bot.com" },
  { name:"Rows AI", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://rows-ai.com" },
  { name:"ThoughtSpot", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://thoughtspot.com" },
  { name:"HubSpot AI", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://hubspot-ai.com" },
  { name:"Mailchimp AI", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://mailchimp-ai.com" },
  { name:"MarketMuse", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://marketmuse.com" },
  { name:"Hoppy Copy", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://hoppy-copy.com" },
  { name:"Smartly.io", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://smartly-io.com" },
  { name:"Phrasee", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://phrasee.com" },
  { name:"Albert.ai", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://albert-ai.com" },
  { name:"Microsoft 365 Copilot", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://microsoft-365-copilot.com" },
  { name:"Google Workspace Gemini", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://google-workspace-gemini.com" },
  { name:"Slack AI", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://slack-ai.com" },
  { name:"Atlassian Intelligence", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://atlassian-intelligence.com" },
  { name:"Glean", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://glean.com" },
  { name:"Guru", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://guru.com" },
  { name:"Domo AI", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://domo-ai.com" },
  { name:"Tableau Pulse", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://tableau-pulse.com" },
  { name:"Salesforce Einstein", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://salesforce-einstein.com" },
  { name:"Quizlet Q-Chat", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://quizlet-q-chat.com" },
  { name:"Duolingo Max", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://duolingo-max.com" },
  { name:"Photomath", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://photomath.com" },
  { name:"WolframAlpha", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://wolframalpha.com" },
  { name:"Socratic", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"New", website:"https://socratic.com" },
  { name:"StudyFetch", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://studyfetch.com" },
  { name:"Knowt", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://knowt.com" },
  { name:"SchoolAI", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://schoolai.com" },
  { name:"Brisk Teaching", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://brisk-teaching.com" },
  { name:"NotebookLM", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://notebooklm.com" },
  { name:"Semantic Scholar", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://semantic-scholar.com" },
  { name:"ResearchRabbit", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://researchrabbit.com" },
  { name:"Connected Papers", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://connected-papers.com" },
  { name:"Litmaps", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://litmaps.com" },
  { name:"Iris.ai", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://iris-ai.com" },
  { name:"SciSpace", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://scispace.com" },
  { name:"Zotero AI", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://zotero-ai.com" },
  { name:"Grok", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://grok.com" },
  { name:"Meta AI", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"New", website:"https://meta-ai.com" },
  { name:"Microsoft Copilot", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://microsoft-copilot.com" },
  { name:"Character.AI", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://character-ai.com" },
  { name:"Pi", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://pi.com" },
  { name:"Qwen Chat", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://qwen-chat.com" },
  { name:"You.com", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://you-com.com" },
  { name:"Make", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://make.com" },
  { name:"n8n", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://n8n.com" },
  { name:"Bardeen", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://bardeen.com" },
  { name:"Lindy", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://lindy.com" },
  { name:"Reclaim AI", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://reclaim-ai.com" },
  { name:"Relay.app", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://relay-app.com" },
  { name:"Activepieces", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://activepieces.com" },
  { name:"Pipedream", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://pipedream.com" },
  { name:"Latenode", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://latenode.com" },
  { name:"Ahrefs AI", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://ahrefs-ai.com" },
  { name:"Semrush AI", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://semrush-ai.com" },
  { name:"Clearscope", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://clearscope.com" },
  { name:"Outranking", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://outranking.com" },
  { name:"NeuronWriter", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://neuronwriter.com" },
  { name:"Scalenut", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://scalenut.com" },
  { name:"WriterZen", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://writerzen.com" },
  { name:"Alli AI", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://alli-ai.com" },
  { name:"SEO.ai", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://seo-ai.com" },
  { name:"Superhuman AI", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://superhuman-ai.com" },
  { name:"Shortwave", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://shortwave.com" },
  { name:"SaneBox AI", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://sanebox-ai.com" },
  { name:"Fyxer AI", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://fyxer-ai.com" },
  { name:"Inbox Zero", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://inbox-zero.com" },
  { name:"Mailbutler", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://mailbutler.com" },
  { name:"Flowrite", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://flowrite.com" },
  { name:"Hoppy Copy Email", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://hoppy-copy-email.com" },
  { name:"Ellie AI", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://ellie-ai.com" },
  { name:"Hootsuite OwlyWriter AI", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://hootsuite-owlywriter-ai.com" },
  { name:"Sprout Social AI", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://sprout-social-ai.com" },
  { name:"FeedHive", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"New", website:"https://feedhive.com" },
  { name:"Taplio", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://taplio.com" },
  { name:"Publer AI", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://publer-ai.com" },
  { name:"Predis Social", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://predis-social.com" },
  { name:"Vista Social", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://vista-social.com" },
  { name:"SocialBee AI", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://socialbee-ai.com" },
  { name:"ContentStudio", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://contentstudio.com" },
  { name:"Murf", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"New", website:"https://murf.com" },
  { name:"Resemble AI", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Trending", website:"https://resemble-ai.com" },
  { name:"WellSaid Labs", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Popular", website:"https://wellsaid-labs.com" },
  { name:"LOVO AI", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Popular", website:"https://lovo-ai.com" },
  { name:"Speechify", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Trending", website:"https://speechify.com" },
  { name:"Cartesia", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Popular", website:"https://cartesia.com" },
  { name:"OpenAI Voice Engine", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Popular", website:"https://openai-voice-engine.com" },
  { name:"Respeecher", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"New", website:"https://respeecher.com" },
  { name:"Adobe Enhance Speech", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://adobe-enhance-speech.com" },
  { name:"Auphonic", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://auphonic.com" },
  { name:"Krisp", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://krisp.com" },
  { name:"Moises", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://moises.com" },
  { name:"LANDR", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://landr.com" },
  { name:"AudioShake", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://audioshake.com" },
  { name:"Cleanvoice AI", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://cleanvoice-ai.com" },
  { name:"Podcastle", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://podcastle.com" },
  { name:"Riverside Magic Clips", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://riverside-magic-clips.com" },
  { name:"AlphaSense", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://alphasense.com" },
  { name:"Hebbia", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://hebbia.com" },
  { name:"FinChat", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Trending", website:"https://finchat.com" },
  { name:"StockGPT", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://stockgpt.com" },
  { name:"Tikr Terminal", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"New", website:"https://tikr-terminal.com" },
  { name:"Kavout", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Trending", website:"https://kavout.com" },
  { name:"Composer", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://composer.com" },
  { name:"Numerai", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://numerai.com" },
  { name:"Fiscal.ai", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Trending", website:"https://fiscal-ai.com" },
  { name:"CoCounsel", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://cocounsel.com" },
  { name:"Lexis+ AI", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://lexis-ai.com" },
  { name:"Westlaw Precision AI", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"New", website:"https://westlaw-precision-ai.com" },
  { name:"Clio Duo", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://clio-duo.com" },
  { name:"Spellbook", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://spellbook.com" },
  { name:"Luminance", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://luminance.com" },
  { name:"Robin AI", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://robin-ai.com" },
  { name:"DoNotPay", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://donotpay.com" },
  { name:"Paxton AI", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://paxton-ai.com" },
  { name:"Aiva Health", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"New", website:"https://aiva-health.com" },
  { name:"Nabla Copilot", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://nabla-copilot.com" },
  { name:"Suki AI", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://suki-ai.com" },
  { name:"Nuance DAX Copilot", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://nuance-dax-copilot.com" },
  { name:"Ambience Healthcare", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://ambience-healthcare.com" },
  { name:"Freed AI", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://freed-ai.com" },
  { name:"Glass Health", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://glass-health.com" },
  { name:"Hippocratic AI", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"New", website:"https://hippocratic-ai.com" },
  { name:"Viz.ai", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://viz-ai.com" },
  { name:"Convai", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://convai.com" },
  { name:"Unity Muse", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://unity-muse.com" },
  { name:"Rosebud AI", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://rosebud-ai.com" },
  { name:"Leonardo AI Canvas", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://leonardo-ai-canvas.com" },
  { name:"Meshy", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://meshy.com" },
  { name:"Luma Genie", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://luma-genie.com" },
  { name:"Hidden Door", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://hidden-door.com" },
  { name:"Amazon Rufus", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://amazon-rufus.com" },
  { name:"Gorgias AI", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://gorgias-ai.com" },
  { name:"Yotpo AI", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://yotpo-ai.com" },
  { name:"Nosto", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://nosto.com" },
  { name:"Constructor.io", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://constructor-io.com" },
  { name:"Syte", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://syte.com" },
  { name:"Vue.ai", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://vue-ai.com" },
  { name:"LimeSpot", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://limespot.com" },
  { name:"Motion AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://motion-ai.com" },
  { name:"Sunsama AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://sunsama-ai.com" },
  { name:"Akiflow AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://akiflow-ai.com" },
  { name:"Todoist AI Assistant", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://todoist-ai-assistant.com" },
  { name:"Evernote AI Edit", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"New", website:"https://evernote-ai-edit.com" },
  { name:"Mem AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://mem-ai.com" },
  { name:"Reflect Notes", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://reflect-notes.com" },
  { name:"Capacities AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://capacities-ai.com" },
  { name:"CrowdStrike Charlotte AI", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://crowdstrike-charlotte-ai.com" },
  { name:"Microsoft Security Copilot", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://microsoft-security-copilot.com" },
  { name:"Google Security AI Workbench", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://google-security-ai-workbench.com" },
  { name:"SentinelOne Purple AI", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"New", website:"https://sentinelone-purple-ai.com" },
  { name:"Vectra AI", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://vectra-ai.com" },
  { name:"Abnormal Security", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://abnormal-security.com" },
  { name:"Trellix Wise", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Trending", website:"https://trellix-wise.com" },
  { name:"Hunters AI", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://hunters-ai.com" },
  { name:"ProWritingAid", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://prowritingaid.com" },
  { name:"LanguageTool", logo:"✍️", desc:"AI writing and editing assistant for faster content creation.", category:"Writing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Trending", website:"https://languagetool.com" },
  { name:"Artbreeder", logo:"🎨", desc:"AI image creation and design tool for visual content.", category:"Image Generation", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"New", website:"https://artbreeder.com" },
  { name:"PixVerse", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"Popular", website:"https://pixverse.com" },
  { name:"Stable Audio", logo:"🎵", desc:"AI music generation tool for songs, soundtracks, and ideas.", category:"Music Generation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://stable-audio.com" },
  { name:"Tabnine Enterprise", logo:"💻", desc:"AI coding assistant for software development and debugging.", category:"Coding", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Desktop", tag:"Popular", website:"https://tabnine-enterprise.com" },
  { name:"DataCamp AI", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://datacamp-ai.com" },
  { name:"Elicit Assistant", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://elicit-assistant.com" },
  { name:"Character.AI Rooms", logo:"🤖", desc:"Conversational AI assistant for questions, ideas, and everyday work.", category:"Chatbots", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://character-ai-rooms.com" },
  { name:"Zapier Central", logo:"⚡", desc:"AI automation platform for connecting apps and repetitive tasks.", category:"Automation", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://zapier-central.com" },
  { name:"SE Ranking AI", logo:"🌐", desc:"AI SEO platform for content optimization and search visibility.", category:"SEO", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://se-ranking-ai.com" },
  { name:"Mailbutler Smart Assistant", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://mailbutler-smart-assistant.com" },
  { name:"Later AI", logo:"📱", desc:"AI social media tool for content creation and publishing.", category:"Social Media", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://later-ai.com" },
  { name:"Vapi", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Trending", website:"https://vapi.com" },
  { name:"ElevenLabs Voice Isolator", logo:"🎧", desc:"AI audio tool for recording, cleanup, editing, or production.", category:"Audio", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://elevenlabs-voice-isolator.com" },
  { name:"BloombergGPT", logo:"🧮", desc:"AI finance platform for analysis, research, and decision support.", category:"Finance", pricing:"Freemium", rating:4.5, users:"250K", free:true, platform:"Web", tag:"Popular", website:"https://bloomberggpt.com" },
  { name:"Clio Manage AI", logo:"⚖️", desc:"AI legal assistant for research, drafting, and document review.", category:"Legal", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"New", website:"https://clio-manage-ai.com" },
  { name:"Rad AI", logo:"🏥", desc:"AI healthcare tool for clinical, administrative, or patient workflows.", category:"Healthcare", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://rad-ai.com" },
  { name:"Modl.ai", logo:"🎮", desc:"AI game development tool for assets, worlds, and characters.", category:"Gaming", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://modl-ai.com" },
  { name:"Rebuy AI", logo:"🛒", desc:"AI commerce tool for merchandising, support, and conversion.", category:"E-commerce", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://rebuy-ai.com" },
  { name:"Supernotes AI", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://supernotes-ai.com" },
  { name:"Wiz AI", logo:"🔒", desc:"AI cybersecurity platform for detection, response, and protection.", category:"Cybersecurity", pricing:"Paid", rating:4.5, users:"100K", free:false, platform:"Web", tag:"Popular", website:"https://wiz-ai.com" },
  { name:"Meta Segment Anything", logo:"📊", desc:"AI-powered analytics platform for exploring data and insights.", category:"Data Analytics", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://meta-segment-anything.com" },
  { name:"Lavender Email Coach", logo:"📣", desc:"AI marketing platform for campaigns, content, and growth.", category:"Marketing", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"New", website:"https://lavender-email-coach.com" },
  { name:"Notta", logo:"💼", desc:"AI workspace tool for teams, operations, and business workflows.", category:"Business", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://notta.com" },
  { name:"Microsoft Math Solver", logo:"🎓", desc:"AI learning and teaching assistant for education workflows.", category:"Education", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Trending", website:"https://microsoft-math-solver.com" },
  { name:"Elicit Literature Review", logo:"🧠", desc:"AI research tool for finding, reading, and organizing knowledge.", category:"Research", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Popular", website:"https://elicit-literature-review.com" },
  { name:"Fathom", logo:"📦", desc:"AI productivity assistant for planning, notes, and daily work.", category:"Productivity", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, Mobile", tag:"Popular", website:"https://fathom.com" },
  { name:"Fireflies.ai", logo:"📧", desc:"AI email assistant for drafting, triage, and follow-ups.", category:"Email", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web", tag:"Trending", website:"https://fireflies-ai.com" },
  { name:"AssemblyAI", logo:"🎤", desc:"AI voice platform for speech generation and voice workflows.", category:"Voice AI", pricing:"Freemium", rating:4.5, users:"500K", free:true, platform:"Web, API", tag:"Popular", website:"https://assemblyai.com" },
  { name:"Tavus", logo:"🎬", desc:"AI video creation and editing workspace for creators.", category:"Video Editing", pricing:"Freemium", rating:4.5, users:"1M", free:true, platform:"Web", tag:"New", website:"https://tavus.com" }
];

const VALID_CATEGORY_NAMES = new Set([
  "Writing","Image Generation","Video Editing","Music Generation","Coding","Data Analytics","Marketing","Business","Education","Research","Chatbots","Automation","SEO","Email","Social Media","Voice AI","Audio","Finance","Legal","Healthcare","Gaming","E-commerce","Productivity","Cybersecurity"
]);

function normalizeAndDedupeTools(items){
  const seen = new Set();
  return items.filter(tool => {
    const key = String(tool.name || "").trim().toLowerCase();
    if(!key || seen.has(key) || !VALID_CATEGORY_NAMES.has(tool.category)) return false;
    seen.add(key);
    return true;
  });
}

const TOOLS = normalizeAndDedupeTools([...BASE_TOOLS, ...EXTRA_TOOLS]);

const CATEGORIES = [
  { name:"Writing", ico:"📝", color:"#a5b4fc", bg:"rgba(99,102,241,0.15)" },
  { name:"Image Generation", ico:"🎨", color:"#d8b4fe", bg:"rgba(168,85,247,0.15)" },
  { name:"Video Editing", ico:"🎬", color:"#67e8f9", bg:"rgba(34,211,238,0.15)" },
  { name:"Music Generation", ico:"🎵", color:"#6ee7b7", bg:"rgba(52,211,153,0.15)" },
  { name:"Coding", ico:"💻", color:"#a5b4fc", bg:"rgba(99,102,241,0.15)" },
  { name:"Data Analytics", ico:"📊", color:"#67e8f9", bg:"rgba(34,211,238,0.15)" },
  { name:"Marketing", ico:"📈", color:"#f0abfc", bg:"rgba(232,121,249,0.15)" },
  { name:"Business", ico:"💼", color:"#6ee7b7", bg:"rgba(52,211,153,0.15)" },
  { name:"Education", ico:"📚", color:"#d8b4fe", bg:"rgba(168,85,247,0.15)" },
  { name:"Research", ico:"🧠", color:"#a5b4fc", bg:"rgba(99,102,241,0.15)" },
  { name:"Chatbots", ico:"🤖", color:"#67e8f9", bg:"rgba(34,211,238,0.15)" },
  { name:"Automation", ico:"⚡", color:"#6ee7b7", bg:"rgba(52,211,153,0.15)" },
  { name:"SEO", ico:"🌐", color:"#f0abfc", bg:"rgba(232,121,249,0.15)" },
  { name:"Email", ico:"📧", color:"#d8b4fe", bg:"rgba(168,85,247,0.15)" },
  { name:"Social Media", ico:"📱", color:"#a5b4fc", bg:"rgba(99,102,241,0.15)" },
  { name:"Voice AI", ico:"🎤", color:"#67e8f9", bg:"rgba(34,211,238,0.15)" },
  { name:"Audio", ico:"🎧", color:"#6ee7b7", bg:"rgba(52,211,153,0.15)" },
  { name:"Finance", ico:"🧮", color:"#f0abfc", bg:"rgba(232,121,249,0.15)" },
  { name:"Legal", ico:"⚖️", color:"#d8b4fe", bg:"rgba(168,85,247,0.15)" },
  { name:"Healthcare", ico:"🏥", color:"#a5b4fc", bg:"rgba(99,102,241,0.15)" },
  { name:"Gaming", ico:"🎮", color:"#67e8f9", bg:"rgba(34,211,238,0.15)" },
  { name:"E-commerce", ico:"🛒", color:"#6ee7b7", bg:"rgba(52,211,153,0.15)" },
  { name:"Productivity", ico:"📦", color:"#f0abfc", bg:"rgba(232,121,249,0.15)" },
  { name:"Cybersecurity", ico:"🔒", color:"#d8b4fe", bg:"rgba(168,85,247,0.15)" },
];

const COLLECTIONS = [
  { title:"Best AI Tools for Students", cls:"collection1", ico:"🎓", matcher:t => ["Education","Research","Writing","Productivity"].includes(t.category) },
  { title:"Top AI Coding Assistants", cls:"collection2", ico:"💻", category:"Coding" },
  { title:"Free AI Tools", cls:"collection3", ico:"🏆", pricing:"Free" },
];

function collectionCount(collection){
  if(collection.matcher) return TOOLS.filter(collection.matcher).length;
  if(collection.category) return TOOLS.filter(t=>t.category===collection.category).length;
  if(collection.pricing) return TOOLS.filter(t=>t.pricing===collection.pricing).length;
  return TOOLS.length;
}
/* AIverse "Goal → Stack" — drop-in feature.
 * Load AFTER Data.js:  <script src="stack.js"></script>
 * Optional: put <div id="stack-root"></div> where you want it inline.
 * Without that div, a floating "Build my stack" button opens it as a dialog.
 * API: AIverseStack.open(), AIverseStack.build(goal, {free:true}) */
(() => {
  'use strict';
  if (typeof TOOLS === 'undefined') { console.warn('[AIverse Stack] load Data.js first'); return; }

  // Hand-written BASE_TOOLS are better vetted than the generated EXTRA_TOOLS, so rank them higher.
  const CURATED = new Set(typeof BASE_TOOLS !== 'undefined' ? BASE_TOOLS.map(t => t.name) : []);

  const RECIPES = [
    { label: 'Video & channel', words: ['youtube', 'video', 'channel', 'reels', 'shorts', 'tiktok', 'vlog', 'creator'], steps: [
      { role: 'Script & ideas', cats: ['Chatbots', 'Writing'] },
      { role: 'Thumbnails & visuals', cats: ['Image Generation'] },
      { role: 'Edit the video', cats: ['Video Editing'] },
      { role: 'Voice-over', cats: ['Voice AI', 'Audio'] },
      { role: 'Get discovered', cats: ['SEO', 'Social Media'] }] },
    { label: 'Build an app or site', words: ['website', 'app', 'saas', 'startup', 'code', 'build', 'develop', 'software', 'portfolio'], steps: [
      { role: 'Plan & research', cats: ['Chatbots', 'Research'] },
      { role: 'Write the code', cats: ['Coding'] },
      { role: 'Design assets', cats: ['Image Generation'] },
      { role: 'Automate chores', cats: ['Automation'] },
      { role: 'Get traffic', cats: ['SEO', 'Marketing'] }] },
    { label: 'Study & learn', words: ['study', 'exam', 'student', 'learn', 'school', 'homework', 'college', 'revise'], steps: [
      { role: 'Understand the topic', cats: ['Education', 'Chatbots'] },
      { role: 'Find sources', cats: ['Research'] },
      { role: 'Organise notes', cats: ['Productivity'] },
      { role: 'Write it up', cats: ['Writing'] }] },
    { label: 'Write content', words: ['blog', 'article', 'newsletter', 'write', 'writing', 'book', 'essay', 'copy'], steps: [
      { role: 'Research', cats: ['Research'] },
      { role: 'Draft', cats: ['Writing', 'Chatbots'] },
      { role: 'Polish', cats: ['Writing'] },
      { role: 'Rank in search', cats: ['SEO'] },
      { role: 'Share it', cats: ['Social Media'] }] },
    { label: 'Grow a business', words: ['business', 'marketing', 'ads', 'brand', 'sell', 'store', 'shop', 'ecommerce', 'customers', 'sales'], steps: [
      { role: 'Market research', cats: ['Research', 'Chatbots'] },
      { role: 'Campaign copy', cats: ['Marketing', 'Writing'] },
      { role: 'Creative assets', cats: ['Image Generation'] },
      { role: 'Social presence', cats: ['Social Media'] },
      { role: 'Follow-ups', cats: ['Email'] }] },
    { label: 'Podcast & music', words: ['podcast', 'music', 'song', 'audio', 'beat', 'soundtrack'], steps: [
      { role: 'Plan the episode or track', cats: ['Chatbots'] },
      { role: 'Create or record', cats: ['Music Generation', 'Voice AI'] },
      { role: 'Clean up the sound', cats: ['Audio'] },
      { role: 'Promote it', cats: ['Social Media'] }] },
    { label: 'Analyse data', words: ['data', 'analysis', 'analyze', 'analyse', 'dashboard', 'spreadsheet', 'excel', 'report', 'insights'], steps: [
      { role: 'Explore the data', cats: ['Data Analytics'] },
      { role: 'Ask questions', cats: ['Chatbots'] },
      { role: 'Present findings', cats: ['Business'] },
      { role: 'Automate the report', cats: ['Automation'] }] },
    { label: 'Job search', words: ['job', 'resume', 'cv', 'interview', 'career', 'hired'], steps: [
      { role: 'Research the company', cats: ['Research'] },
      { role: 'Write & polish', cats: ['Writing', 'Chatbots'] },
      { role: 'Reach out', cats: ['Email'] },
      { role: 'Stay organised', cats: ['Productivity'] }] }
  ];

  const EXAMPLES = ['Start a YouTube channel', 'Study for my exams', 'Launch a small online store', 'Build a portfolio website'];

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : '#';
  const users = s => { const m = /^([\d.]+)\s*([KM]?)/i.exec(s || ''); return m ? parseFloat(m[1]) * ({ K: 1e3, M: 1e6 }[m[2].toUpperCase()] || 1) : 1; };
  const tokens = s => (s.toLowerCase().match(/[a-z0-9+#.]{4,}/g) || []);
  const hits = (text, words) => words.filter(w => text.toLowerCase().includes(w)).length;

  function rank(cats, words, free, used) {
    return TOOLS
      .filter(t => cats.includes(t.category) && (!free || t.free) && !used.has(t.name))
      .map(t => ({ t, s: t.rating * 10 + (CURATED.has(t.name) ? 8 : 0) + Math.log10(users(t.users) || 1) * 2 + hits(t.name + ' ' + t.desc, words) * 3 }))
      .sort((a, b) => b.s - a.s)
      .map(x => x.t);
  }

  function pickRecipe(goal) {
    const g = goal.toLowerCase();
    let best = null, top = 0;
    RECIPES.forEach(r => {
      const n = r.words.filter(w => new RegExp('\\b' + w).test(g)).length;
      if (n > top) { top = n; best = r; }
    });
    return best;
  }

  function build(goal, opts = {}) {
    const free = !!opts.free, words = tokens(goal), used = new Set();
    let steps = [];
    const recipe = pickRecipe(goal);
    if (recipe) {
      recipe.steps.forEach(st => {
        const r = rank(st.cats, words, free, used);
        if (r.length) { used.add(r[0].name); steps.push({ role: st.role, tool: r[0], alt: r[1] || null }); }
      });
    } else if (words.length) {
      // No recipe matched: score every tool against the goal's words and group by category.
      const scored = TOOLS.filter(t => !free || t.free)
        .map(t => ({ t, h: hits(t.name + ' ' + t.desc + ' ' + t.category, words) }))
        .filter(x => x.h > 0).sort((a, b) => b.h - a.h || b.t.rating - a.t.rating);
      const cats = [];
      scored.forEach(x => { if (!cats.includes(x.t.category) && cats.length < 4) cats.push(x.t.category); });
      cats.forEach(c => {
        const r = rank([c], words, free, used);
        if (r.length) { used.add(r[0].name); steps.push({ role: c, tool: r[0], alt: r[1] || null }); }
      });
    }
    return { goal, label: recipe ? recipe.label : null, steps };
  }

  function summary(res) {
    const n = res.steps.length, f = res.steps.filter(s => s.tool.free).length;
    if (f === n) return `${n} tools, and every one has a free plan.`;
    const paid = res.steps.filter(s => !s.tool.free).map(s => s.tool.name).join(', ');
    return `${n} tools. ${f} have a free plan; ${paid} ${n - f === 1 ? 'is' : 'are'} paid.`;
  }

  function asText(res) {
    return `My AI stack for "${res.goal}"\n` + res.steps.map((s, i) => `${i + 1}. ${s.role}: ${s.tool.name} (${s.tool.website})`).join('\n') + '\nBuilt with AIverse';
  }

  function wrap(ctx, text, max) {
    const out = []; let line = '';
    text.split(/\s+/).forEach(w => {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > max && line) { out.push(line); line = w; } else line = t;
    });
    if (line) out.push(line);
    return out;
  }

  function downloadCard(res) {
    const c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
    const x = c.getContext('2d'), F = 'system-ui, -apple-system, "Segoe UI", sans-serif';
    x.fillStyle = '#0f1020'; x.fillRect(0, 0, 1080, 1350);
    x.fillStyle = '#818cf8'; x.font = `600 34px ${F}`; x.fillText('My AI stack', 80, 120);
    x.fillStyle = '#ffffff'; x.font = `700 60px ${F}`;
    let y = 210;
    wrap(x, res.goal, 920).slice(0, 3).forEach(l => { x.fillText(l, 80, y); y += 74; });
    y += 40;
    res.steps.forEach(s => {
      x.fillStyle = '#8b8fb0'; x.font = `500 28px ${F}`; x.fillText(s.role, 80, y); y += 48;
      x.fillStyle = '#ffffff'; x.font = `600 44px ${F}`; x.fillText(`${s.tool.logo} ${s.tool.name}`, 80, y); y += 84;
    });
    x.fillStyle = '#6366f1'; x.font = `600 30px ${F}`; x.fillText('aiverse-lyart.vercel.app', 80, 1270);
    const a = document.createElement('a');
    a.download = 'my-ai-stack.png'; a.href = c.toDataURL('image/png'); a.click();
  }

  const CSS = `
.avs{--a:#818cf8;--ink:#eef0ff;--mut:#9a9dc2;--line:rgba(255,255,255,.12);color:var(--ink);font:inherit;max-width:680px;margin:0 auto;padding:4px}
.avs h2{margin:0 0 4px;font-size:1.5rem;line-height:1.2}
.avs p.avs-sub{margin:0 0 16px;color:var(--mut)}
.avs-f{display:flex;gap:8px;flex-wrap:wrap}
.avs-f input[type=text]{flex:1 1 240px;min-width:0;padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--ink);font:inherit}
.avs button{font:inherit;cursor:pointer;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--ink);padding:10px 14px}
.avs button.avs-go{background:#4f46e5;border-color:#4f46e5;font-weight:600}
.avs button:hover{border-color:var(--a)}
.avs :focus-visible,.avs-fab:focus-visible{outline:2px solid var(--a);outline-offset:2px}
.avs-opt{display:flex;gap:8px;align-items:center;margin:12px 0;color:var(--mut);font-size:.92rem}
.avs-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.avs-chips button{font-size:.88rem;padding:6px 12px;border-radius:99px}
.avs-sum{margin:20px 0 12px;font-weight:600}
.avs-steps{list-style:none;margin:0;padding:0;counter-reset:s}
.avs-steps li{counter-increment:s;position:relative;padding:0 0 22px 46px}
.avs-steps li::before{content:counter(s);position:absolute;left:0;top:0;width:30px;height:30px;border-radius:50%;background:#4f46e5;display:grid;place-items:center;font-weight:700;font-size:.9rem}
.avs-steps li::after{content:"";position:absolute;left:14px;top:34px;bottom:4px;width:2px;background:var(--line)}
.avs-steps li:last-child{padding-bottom:4px}.avs-steps li:last-child::after{display:none}
.avs-role{color:var(--mut);font-size:.85rem}
.avs-tool{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin:2px 0}
.avs-tool a{color:var(--ink);font-weight:700;font-size:1.1rem;text-decoration:none;border-bottom:1px solid var(--a)}
.avs-badge{font-size:.75rem;padding:2px 8px;border-radius:99px;border:1px solid var(--line);color:var(--mut)}
.avs-desc{margin:2px 0;color:var(--mut);font-size:.93rem}
.avs-alt{font-size:.85rem;color:var(--mut)}.avs-alt a{color:var(--a)}
.avs-act{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.avs-empty{margin:20px 0 0;color:var(--mut)}
.avs-fab{position:fixed;left:16px;bottom:88px;z-index:900;padding:12px 16px;border-radius:99px;border:0;background:#4f46e5;color:#fff;font:600 .95rem system-ui,sans-serif;cursor:pointer;box-shadow:0 6px 24px rgba(79,70,229,.45)}
dialog.avs-dlg{width:min(720px,94vw);max-height:90vh;overflow:auto;background:#12132a;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:22px;color:#eef0ff}
dialog.avs-dlg::backdrop{background:rgba(5,5,20,.7)}
.avs-x{float:right}`;

  function mount(el) {
    el.innerHTML = `<div class="avs">
      <h2>What do you want to get done?</h2>
      <p class="avs-sub">Describe a goal in plain words. You get a step-by-step stack of tools from the AIverse directory.</p>
      <form class="avs-f"><input type="text" maxlength="140" aria-label="Your goal" placeholder="e.g. Start a YouTube channel"><button class="avs-go" type="submit">Build my stack</button></form>
      <label class="avs-opt"><input type="checkbox" class="avs-free"> Only tools with a free plan</label>
      <div class="avs-chips">${EXAMPLES.map(e => `<button type="button">${esc(e)}</button>`).join('')}</div>
      <div class="avs-out" aria-live="polite"></div></div>`;
    const form = el.querySelector('form'), input = el.querySelector('input[type=text]'),
      free = el.querySelector('.avs-free'), out = el.querySelector('.avs-out');
    let last = null;

    function run() {
      const goal = input.value.trim();
      if (!goal) { out.innerHTML = '<p class="avs-empty">Type a goal above, or tap one of the examples.</p>'; return; }
      const res = last = build(goal, { free: free.checked });
      if (!res.steps.length) {
        out.innerHTML = '<p class="avs-empty">No match yet. Try naming the outcome, like “make a podcast” or “analyse sales data”.</p>';
        return;
      }
      out.innerHTML = `<p class="avs-sum">${esc(summary(res))}</p><ol class="avs-steps">` + res.steps.map(s => `
        <li><div class="avs-role">${esc(s.role)}</div>
          <div class="avs-tool"><span aria-hidden="true">${esc(s.tool.logo)}</span><a href="${esc(safeUrl(s.tool.website))}" target="_blank" rel="noopener noreferrer">${esc(s.tool.name)}</a><span class="avs-badge">${esc(s.tool.pricing)}</span></div>
          <p class="avs-desc">${esc(s.tool.desc)}</p>
          ${s.alt ? `<div class="avs-alt">Alternative: <a href="${esc(safeUrl(s.alt.website))}" target="_blank" rel="noopener noreferrer">${esc(s.alt.name)}</a></div>` : ''}</li>`).join('') + `</ol>
        <div class="avs-act"><button type="button" data-a="copy">Copy as text</button><button type="button" data-a="png">Download share card</button></div>`;
    }
    form.addEventListener('submit', e => { e.preventDefault(); run(); });
    free.addEventListener('change', () => input.value.trim() && run());
    el.querySelectorAll('.avs-chips button').forEach(b => b.addEventListener('click', () => { input.value = b.textContent; run(); }));
    out.addEventListener('click', e => {
      const a = e.target.dataset && e.target.dataset.a;
      if (!a || !last) return;
      if (a === 'png') downloadCard(last);
      if (a === 'copy') navigator.clipboard.writeText(asText(last)).then(() => { e.target.textContent = 'Copied'; }, () => { e.target.textContent = 'Copy failed'; });
    });
  }

  let dlg = null;
  function open() {
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.className = 'avs-dlg';
      dlg.innerHTML = '<button class="avs-x avs-btn" type="button" aria-label="Close" style="background:none;border:0;color:inherit;font-size:1.4rem;cursor:pointer">×</button><div class="avs-host"></div>';
      dlg.querySelector('.avs-x').addEventListener('click', () => dlg.close());
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
      mount(dlg.querySelector('.avs-host'));
    }
    dlg.showModal();
    dlg.querySelector('input[type=text]').focus();
  }

  function init() {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    const root = document.getElementById('stack-root');
    if (root) { mount(root); return; }
    const fab = document.createElement('button');
    fab.className = 'avs-fab'; fab.type = 'button'; fab.textContent = '✨ Build my stack';
    fab.addEventListener('click', open);
    document.body.appendChild(fab);
  }

  window.AIverseStack = { open, mount, build };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
