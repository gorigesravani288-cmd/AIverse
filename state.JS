// ============================================================
// AIverse - State & Helpers
// App state, persistence, formatting helpers, filtering logic
// ============================================================

const STORAGE_KEY = "aiverse-state-v1";
let persistedState = {};
try{ persistedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }catch(error){}

const state = {
  theme:persistedState.theme==="light" ? "light" : "dark",
  activeNav:"Dashboard",
  search:"",
  activeCategory:"All",
  pricingFilter:"All",
  sortBy:"popularity",
  bookmarked:new Set(Array.isArray(persistedState.bookmarked) ? persistedState.bookmarked : ["Claude","Cursor"]),
  reviews:persistedState.reviews && typeof persistedState.reviews==="object" ? persistedState.reviews : {},
  selectedTool:null,
  collectionMatcher:null,
};

function persistState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    theme:state.theme,
    bookmarked:[...state.bookmarked],
    reviews:state.reviews,
  }));
}


function usersToNumber(u){
  const num = Number.parseFloat(u) || 0;
  if(u.includes("M")) return num*1000000;
  if(u.includes("K")) return num*1000;
  return num;
}
function starsHtml(rating){
  const full = Math.round(rating);
  let s = "";
  for(let i=0;i<5;i++){ s += i<full ? "★" : "<span class='empty'>★</span>"; }
  return `<span class="stars">${s}<span class="num">${rating.toFixed(1)}</span></span>`;
}
function badgeClass(pricing){
  if(pricing==="Free") return "badge badge-free";
  if(pricing==="Freemium") return "badge badge-freemium";
  return "badge badge-paid";
}
function openLink(url){
  try{
    const safeUrl = new URL(url, window.location.href);
    if(["http:", "https:"].includes(safeUrl.protocol)) window.open(safeUrl.href, "_blank", "noopener,noreferrer");
  }catch(error){}
}

function categoryCounts(){
  const counts = {};
  TOOLS.forEach(t=>{ counts[t.category] = (counts[t.category]||0)+1; });
  return counts;
}

const TOOL_SEARCH_INDEX = TOOLS.map(tool => ({
  tool,
  haystack: [tool.name, tool.desc, tool.category, tool.pricing].join(" ").toLowerCase(),
}));

function getFilteredTools(){
  const query = state.search.trim().toLowerCase();
  return TOOL_SEARCH_INDEX.filter(({tool, haystack})=>{
    const t = tool;
    const catOk = state.activeCategory==="All" || t.category===state.activeCategory;
    const priceOk = state.pricingFilter==="All" || t.pricing===state.pricingFilter;
    const searchOk = !query || haystack.includes(query);
    const favOk = state.activeNav!=="Favorites" || state.bookmarked.has(t.name);
    const collectionOk = !state.collectionMatcher || state.collectionMatcher(t);
    return catOk && priceOk && searchOk && favOk && collectionOk;
  }).sort((a,b)=>{
    a = a.tool;
    b = b.tool;
    if(state.sortBy==="rating") return b.rating - a.rating;
    if(state.sortBy==="newest") return (b.tag==="New")-(a.tag==="New");
    return usersToNumber(b.users) - usersToNumber(a.users);
  }).map(({tool})=>tool);
}
