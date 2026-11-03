/* Atlas DARWIN — somente interações locais; sem rede, autenticação ou analytics. */
(()=>{
 'use strict';
 const storeKey='atlas-darwin-research-2026'; // Compatível com a V3: preserva leituras e fichamentos.
 let state={read:{},notes:{}};
 let canStore=true;
 try{
   const old=JSON.parse(localStorage.getItem(storeKey)||'null');
   if(old&&typeof old==='object')state={read:old.read||{},notes:old.notes||{}};
 }catch{canStore=false}
 const $=(selector)=>document.querySelector(selector);
 const $$=(selector)=>[...document.querySelectorAll(selector)];
 function save(){if(!canStore)return;try{localStorage.setItem(storeKey,JSON.stringify(state))}catch{canStore=false}}
 function normalize(text){return String(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
 function updateProgress(){
   const count=Object.values(state.read).filter(Boolean).length;
   $$('.read-count').forEach(x=>x.textContent=String(count));
   $$('.read-fraction').forEach(x=>x.textContent=`${count} de 15 artigos`);
   $$('.progress-bar').forEach(x=>x.style.width=`${Math.min(count,15)*100/15}%`);
   $$('.progress-track').forEach(x=>x.setAttribute('aria-valuenow',String(Math.min(count,15))));
   $$('[data-reading-toggle]').forEach(button=>{
      const id=button.dataset.readingToggle,read=!!state.read[id];
      button.setAttribute('aria-pressed',String(read));
      button.textContent=read?'✓ Lido':'Marcar como lido';
   });
 }
 $$('[data-reading-toggle]').forEach(button=>button.addEventListener('click',()=>{
   const id=button.dataset.readingToggle;state.read[id]=!state.read[id];save();updateProgress();
   const msg=$('[data-reading-status]');if(msg)msg.textContent=state.read[id]?'Artigo marcado como lido.':'Marca de leitura desfeita.';
 }));
 updateProgress();
 // Catálogo progressivo: os 15 resultados estão pré-renderizados e navegáveis sem JS.
 const input=$('#catalog-search'),topic=$('#catalog-topic'),priority=$('#catalog-priority');
 if(input&&topic&&priority){
   function runFilter(){
     let visible=0;
     $$('.paper-list-item[data-search]').forEach(card=>{
       const matches=normalize(card.dataset.search).includes(normalize(input.value))&&
         (!topic.value||card.dataset.topic===topic.value)&&
         (!priority.value||card.dataset.priority===priority.value);
       card.hidden=!matches;if(matches)visible++;
     });
     const status=$('#catalog-count');if(status)status.textContent=`${visible} de 15 publicações`;
     const empty=$('#catalog-empty');if(empty)empty.hidden=visible!==0;
   }
   [input,topic,priority].forEach(x=>x.addEventListener('input',runFilter));
   const reset=$('#reset-catalog');if(reset)reset.addEventListener('click',()=>{input.value='';topic.value='';priority.value='';runFilter();input.focus()});
   runFilter();
 }
 // Página individual e caderno. Salvamento sempre local, exportável e compatível com o Atlas V3.
 $$('[data-note-for]').forEach(area=>{
   const id=area.dataset.noteFor;area.value=state.notes[id]||'';
   const status=area.parentElement.querySelector('.note-status');
   area.addEventListener('input',()=>{state.notes[id]=area.value;save();if(status)status.textContent=canStore?'Anotação salva neste navegador.':'Armazenamento indisponível. Exporte seu caderno para não perder as notas.'});
 });
 function download(name,contents,mimetype){
   const blob=new Blob([contents],{type:mimetype||'text/plain;charset=utf-8'});
   const url=URL.createObjectURL(blob),link=document.createElement('a');
   link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();
   setTimeout(()=>URL.revokeObjectURL(url),2000);
 }
 function notesMd(){
   const lines=['# Meu caderno — Atlas DARWIN','','Exportado em: '+new Date().toLocaleString('pt-BR'),'','## Progresso'];
   const db=$('#reading-source');
   if(db){let papers;try{papers=JSON.parse(db.textContent)}catch{papers=[]}
     papers.forEach(p=>lines.push(`- [${state.read[p.id]?'x':' '}] ${p.id} — ${p.title}`));
     lines.push('','## Fichamentos','');
     for(const p of papers){lines.push(`### ${p.id} — ${p.title}`,'',`Fonte: ${p.landing}`,'',state.notes[p.id]||'_Sem anotações._','')}
   }else{
     const id=$('[data-article-id]')?.dataset.articleId||'atual';
     lines.push('',`## Artigo ${id}`,'',state.notes[id]||'_Sem anotações._');
   }
   return lines.join('\n')+'\n';
 }
 $$('[data-export-notes]').forEach(btn=>btn.addEventListener('click',()=>download('caderno-darwin.md',notesMd(),'text/markdown;charset=utf-8')));
 // Caderno: informa quais dos 15 artigos foram marcados ou fichados.
 const readingDb=$('#reading-source'),readingList=$('#reading-items');
 if(readingDb&&readingList){
   let papers=[];try{papers=JSON.parse(readingDb.textContent)}catch{}
   for(const paper of papers){
     if(!state.read[paper.id] && !state.notes[paper.id])continue;
     const article=document.createElement('article');article.className='personal-entry';
     const heading=document.createElement('h3');heading.textContent=paper.id+' · '+paper.title;
     const link=document.createElement('a');link.href=paper.detail;link.textContent='Abrir ficha do artigo';
     article.append(heading,link);
     if(state.notes[paper.id]){let p=document.createElement('p');p.className='note-excerpt';p.textContent=state.notes[paper.id].slice(0,300);article.append(p)}
     readingList.append(article);
   }
   if(!readingList.children.length)$('#reading-empty').hidden=false;
 }
 const quiz=$('#quiz-form');
 if(quiz){
   quiz.addEventListener('submit',event=>{
     event.preventDefault();let correct=0,answered=0;
     $$('.quiz-fieldset').forEach(field=>{
       const chosen=field.querySelector('input[type="radio"]:checked');
       const feedback=field.querySelector('.quiz-feedback');
       const correctValue=field.dataset.correct;
       const explanation=field.dataset.explanation;
       field.removeAttribute('data-result');
       if(!chosen){feedback.textContent='Selecione uma alternativa para conferir.';return}
       answered++;
       const ok=chosen.value===correctValue;
       if(ok)correct++;
       field.dataset.result=ok?'correct':'incorrect';
       feedback.textContent=(ok?'Correto. ':'Não é essa alternativa. ')+explanation;
     });
     const score=$('#quiz-score');if(score)score.textContent=`${correct} de 3 corretas · ${answered} respondidas`;
   });
   const reset=$('#quiz-reset');if(reset)reset.addEventListener('click',()=>{
     quiz.reset();$$('.quiz-fieldset').forEach(x=>{x.removeAttribute('data-result');x.querySelector('.quiz-feedback').textContent=''})
     const score=$('#quiz-score');if(score)score.textContent='';
   });
 }
})();
