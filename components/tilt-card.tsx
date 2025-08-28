'use client';
import * as React from 'react';
import { cn } from './utils';

export default function TiltCard({ className, children }:{ className?:string; children:React.ReactNode }){
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 640px)');
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>)=>{
    if (!enabled) return;
    const el = ref.current; if(!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * 8;
    const ry = (0.5 - px) * 10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--px', String(px));
    el.style.setProperty('--py', String(py));
  };
  const reset = ()=>{ const el=ref.current; if(el) el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };

  if (!enabled) return <div className={cn('relative', className)}>{children}</div>;

  return (
    <div className={cn('relative h-full', className)} onMouseLeave={reset} onMouseMove={handleMove}>
      <div ref={ref} className="transition-transform duration-150 will-change-transform rounded-2xl h-full">
        <div className="relative rounded-2xl overflow-hidden h-full">
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
               style={{background:'radial-gradient(600px circle at calc(var(--px)*100%) calc(var(--py)*100%), rgba(255,255,255,0.15), transparent 40%)'}}/>
          {children}
        </div>
      </div>
    </div>
  );
}
