'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
export default function ThemeToggle(){
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted,setMounted] = React.useState(false);
  React.useEffect(()=>setMounted(true),[]);
  if(!mounted) return null;
  const current = theme === 'system' ? systemTheme : theme;
  return (
    <button onClick={()=>setTheme(current==='dark'?'light':'dark')} aria-label="Toggle theme"
      className="rounded-full p-2 border hover:bg-slate-100 dark:hover:bg-white/10">
      {current==='dark' ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
    </button>
  );
}
