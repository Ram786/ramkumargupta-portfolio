'use client';
import { motion, useScroll } from 'framer-motion';
export default function NavProgress(){
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed inset-x-0 top-0 h-1 z-[60] bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 origin-left" style={{ scaleX: scrollYProgress }} />;
}
