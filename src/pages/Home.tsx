import { motion } from "framer-motion";
import heroImg from "../assets/imgs/dk.jpg";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
            {/* ── LEFT DOTS — hidden on small mobile ──────────── */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden sm:flex absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
            >
                {[0, 1, 2].map((i) => (
                    <span key={i} className="text-white text-[9px] tracking-widest opacity-60">·</span>
                ))}
            </motion.div>

            {/* ── RIGHT VERTICAL LABEL — hidden on small mobile ── */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden sm:flex absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30"
            >
                <span
                    className="text-white text-[8px] tracking-[0.25em] uppercase opacity-40 font-light"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    About the duo
                </span>
            </motion.div>

            {/* ── GIANT TITLE ─────────────────────────────────── */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-2">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white font-black uppercase leading-none select-none text-center"
                    style={{
                        fontSize: "clamp(52px, 16vw, 200px)",
                        letterSpacing: "-0.02em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                        textShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)",
                    }}
                >
                    DAFT PUNK
                </motion.h1>
            </div>

            {/* ── IMAGE CONTENT ───────────────────────────── */}
            <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-end justify-center overflow-hidden"
                    style={{
                        width: "clamp(260px, 65%, 600px)",
                        height: "clamp(55%, 75%, 85%)",
                    }}
                >
                    <img 
                        src={heroImg} 
                        alt="Daft Punk Hero" 
                        className="w-full h-full object-cover grayscale opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>
            </div>

            {/* ── BOTTOM SCROLL ICON ──────────────────────────── */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
            >
                <div className="w-[1px] h-4 bg-white opacity-30" />
                <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-4 rounded-full border border-white opacity-40 flex items-center justify-center"
                >
                    <div className="w-[3px] h-[3px] rounded-full bg-white opacity-70" />
                </motion.div>
            </motion.div>
        </div>
    );
}
