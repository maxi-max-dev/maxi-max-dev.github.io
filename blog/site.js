const search=document.querySelector('[data-search]');
let activeTag='全部';
function filterPosts(){
 const query=(search?.value||'').trim().toLocaleLowerCase();let visible=0;
 document.querySelectorAll('[data-post]').forEach(card=>{
  const tags=JSON.parse(card.dataset.tags);const match=(activeTag==='全部'||tags.includes(activeTag))&&card.dataset.search.toLocaleLowerCase().includes(query);
  card.hidden=!match;if(match)visible++;
 });
 const empty=document.querySelector('[data-empty]');if(empty)empty.hidden=visible>0;
 const count=document.querySelector('[data-count]');if(count)count.textContent=`${visible} 篇`;
}
search?.addEventListener('input',filterPosts);
document.querySelectorAll('[data-tag]').forEach(button=>button.addEventListener('click',()=>{
 activeTag=button.dataset.tag;document.querySelectorAll('[data-tag]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterPosts();
}));
const toc=document.querySelector('.toc');
if(toc&&matchMedia('(max-width:760px)').matches)toc.open=false;
const progress=document.querySelector('.progress');
if(progress){const update=()=>{const range=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${range?Math.min(100,100*scrollY/range):0}%`;};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();}
if('IntersectionObserver'in window){
 const anchors=[...document.querySelectorAll('.toc a[href^="#section-"]')];
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){anchors.forEach(a=>a.classList.toggle('current',a.hash===`#${e.target.id}`));}}),{rootMargin:'-10% 0px -65% 0px'});
 document.querySelectorAll('.prose h2').forEach(h=>observer.observe(h));
}
