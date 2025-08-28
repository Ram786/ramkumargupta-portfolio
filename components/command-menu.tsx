'use client';
import * as React from 'react';
interface Item { href: string; label: string; }
export default function CommandMenu({ items }:{ items: Item[] }){
  const [open,setOpen] = React.useState(false);
  const [q,setQ] = React.useState('');
  React.useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); setOpen(o=>!o); }
      if(e.key === '/' && !open){ e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('keydown', onKey); return ()=>window.removeEventListener('keydown', onKey);
  },[open]);
  const results = items.filter(i=>i.label.toLowerCase().includes(q.toLowerCase()));
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={()=>setOpen(false)}>
      <div className="mx-auto max-w-lg mt-24 rounded-2xl border shadow-glow bg-white dark:bg-slate-900" onClick={e=>e.stopPropagation()}>
        <div className="p-3 border-b">
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type to search sections..." className="w-full bg-transparent outline-none text-sm" />
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          {results.map(r=> (
            <a key={r.href} href={r.href} className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-sm" onClick={()=>setOpen(false)}>
              {r.label}
            </a>
          ))}
          {results.length===0 && <div className="px-3 py-6 text-center text-sm text-slate-500">No matches</div>}
        </div>
        <div className="p-2 text-xs text-right text-slate-500">Press <kbd className='px-1 py-0.5 border rounded'>Esc</kbd> to close</div>
      </div>
    </div>
  );
}
