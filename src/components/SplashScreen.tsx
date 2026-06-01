import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_TEXTS = [
    "SYSTEM.INIT(DP_PROTOCOL)",
    "LOADING_MODULES... [OK]",
    "MEMORY.LINKED(VIRTUAL_VIBE)",
    "AUTHENTICATING_USERS...",
    "ACCESS_GRANTED",
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < BOOT_TEXTS.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 400);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(onFinish, 800);
            return () => clearTimeout(timer);
        }
    }, [currentLine, onFinish]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                scale: 1.1,
                filter: "blur(10px) brightness(2)",
                transition: { duration: 0.8, ease: "circIn" }
            }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
        >
            {/* ── SCANLINE EFFECT ────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <motion.div 
                    animate={{ y: ["0%", "1000%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-[2px] bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />
            </div>

            {/* ── CRT FLICKER OVERLAY ────────────────────────── */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* ── CENTRAL LOGO ───────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: [0, 1, 0.8, 1],
                    scale: 1,
                    filter: ["none", "none", "invert(1) opacity(0.5)", "none"]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="mb-12 relative"
            >
                <div className="flex items-center gap-4 text-4xl font-bold tracking-[0.3em] text-white">
                    <span>D</span>
                    <span className="w-8 h-[2px] bg-white" />
                    <span>P</span>
                </div>
                {/* Glitch layers */}
                <motion.div 
                    animate={{ x: [-2, 2, -1, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 text-white/30 blur-[1px] translate-x-1"
                >
                    <div className="flex items-center gap-4 text-4xl font-bold tracking-[0.3em]">
                        <span>D</span>
                        <span className="w-8 h-[2px] bg-white/30" />
                        <span>P</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* ── BOOT SEQUENCE TEXT ─────────────────────────── */}
            <div className="flex flex-col gap-2 min-h-[120px]">
                {BOOT_TEXTS.map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                            opacity: i <= currentLine ? 1 : 0,
                            x: i <= currentLine ? 0 : -10
                        }}
                        className={`text-[10px] sm:text-xs tracking-[0.2em] ${
                            i === currentLine ? "text-white" : "text-white/40"
                        }`}
                    >
                        <span className="mr-3">{i === currentLine ? ">" : " "}</span>
                        {text}
                    </motion.div>
                ))}
            </div>

            {/* ── LOADING BAR ────────────────────────────────── */}
            <div className="mt-12 w-48 h-[1px] bg-white/10 relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentLine / BOOT_TEXTS.length) * 100}%` }}
                    className="absolute inset-y-0 left-0 bg-white shadow-[0_0_8px_white]"
                />
            </div>

            <div className="absolute bottom-8 text-[8px] tracking-[0.5em] text-white/20 uppercase">
                Hardware: Cyberdeck v2.6.1
            </div>
        </motion.div>
    );
}
