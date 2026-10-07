/* 譯文中的亮度標記 {{B:主星:亮時|暗時}}：依實際亮度挑一句 */
(function(root){
const RE=/\{\{B:([^:}]*):([^|}]*)\|([^}]*)\}\}/g;
const STRONG=['廟','旺','得'];
/* stars：該宮主星陣列（iztro 格式）；無主星時傳對宮主星 */
function fit(t,p,src){
  if(!t)return t;
  const stars=(p&&p.majorStars&&p.majorStars.length?p.majorStars:(src||[]));
  return String(t).replace(RE,(m,star,good,bad)=>{
    const s=stars.find(x=>x.name===star)||stars[0];
    if(!s||!s.brightness)return good.trim();
    return (STRONG.includes(s.brightness)?good:bad).trim();
  });
}
/* 沒有宮位資訊時：保留「亮」的說法 */
const strip=t=>t?String(t).replace(RE,(m,s,good)=>good.trim()):t;
root.StoryFit={fit,strip,RE};
})(typeof globalThis!=='undefined'?globalThis:this);
