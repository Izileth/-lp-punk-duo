import { motion } from "framer-motion";
import { useState } from "react";
import { Music, Shield, Cpu, Clock, Terminal, ArrowRight, Activity, Zap } from "lucide-react";

interface Album {
    year: string;
    title: string;
    description: string;
    status: string;
    techSpec: string;
}

export default function About() {
    const [activeUnit, setActiveUnit] = useState<"both" | "bangalter" | "homem">("both");
    const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

    const units = {
        bangalter: {
            id: "UNIT-01",
            codename: "BANGALTER",
            color: "from-amber-500/20 via-yellow-600/10 to-transparent",
            borderColor: "border-amber-500/30",
            glowColor: "shadow-amber-500/20",
            textColor: "text-amber-400",
            specs: ["Vocal/Talkbox Integration", "Analog Synthesizer Design", "Drum Machine Sequencing", "Guitar/Bass Instrumentation"],
            description: "Characterized by the iconic gold helmet with a simple, elegant visor. Focuses on upbeat, synth-driven melodies, funk baselines, and structural arrangements."
        },
        homem: {
            id: "UNIT-02",
            codename: "HOMEM-CHRISTO",
            color: "from-cyan-500/20 via-blue-600/10 to-transparent",
            borderColor: "border-cyan-500/30",
            glowColor: "shadow-cyan-500/20",
            textColor: "text-cyan-400",
            specs: ["LED Array Control", "Sampler & Effects Customization", "Guitar & Vocoder Operations", "Rhythm/Groove Direction"],
            description: "Represented by the silver helmet with a horizontal multi-color LED display visor. Specializes in dark, repetitive textures, house rhythms, and disco-sampled filters."
        }
    };

    const timeline: Album[] = [
        {
            year: "1993",
            title: "IGNITION",
            description: "Guy-Manuel de Homem-Christo and Thomas Bangalter form Daft Punk in Paris, transitioning from their indie rock group 'Darlin'.",
            status: "SYS_INIT",
            techSpec: "Sampler Rate: 12-bit // Synthesis: Analog"
        },
        {
            year: "1997",
            title: "HOMEWORK",
            description: "Revolutionized French House music with raw, dirty, distortion-filled tracks like 'Da Funk' and 'Around the World'.",
            status: "COMMISSIONED",
            techSpec: "Main Output: Roland TB-303 // TR-909 Sync"
        },
        {
            year: "2001",
            title: "DISCOVERY",
            description: "A synth-pop and disco masterpiece. Introduced their famous robotic personas and became the soundtrack to anime movie Interstella 5555.",
            status: "OPTIMIZED",
            techSpec: "Compression: High // Visual Module: LED Visor"
        },
        {
            year: "2005",
            title: "HUMAN AFTER ALL",
            description: "A raw, mechanical rock-electronic hybrid created in just six weeks, highlighting societal reliance on technology.",
            status: "MECHANIZED",
            techSpec: "Drums: Acoustic Sampler // Guitar Riffs: Digitech Whammy"
        },
        {
            year: "2013",
            title: "RANDOM ACCESS MEMORIES",
            description: "A tribute to late-1970s and early-1980s American music. Won Album of the Year at the Grammys, featuring 'Get Lucky'.",
            status: "MAX_PERFORMANCE",
            techSpec: "Recording: 100% Analog Tape // Orchestral Array"
        },
        {
            year: "2021",
            title: "EPILOGUE",
            description: "After 28 years of sonic evolution, the duo officially terminated the system, leaving an eternal legacy.",
            status: "TERMINATED",
            techSpec: "System State: Dormant // Legacy: Active"
        }
    ];

    return (
        <div className="relative w-full min-h-screen bg-black text-white pt-28 px-4 sm:px-8 pb-16 overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── HEADER READOUT ──────────────────────────────── */}
                <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-4 h-4 text-white/40 animate-pulse" />
                            <span className="text-[10px] text-white/40 font-mono tracking-[0.3em]">SECURE_DATABASE // ACCESS_GRANTED</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            THE DUO <span className="text-white/30 font-light font-mono">/</span> CORE
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-none text-right font-mono">
                        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <div className="text-[10px] tracking-widest text-white/60">
                            SYSTEM STATUS: <span className="text-emerald-400 font-bold">LEGENDARY (OFFLINE)</span>
                        </div>
                    </div>
                </div>

                {/* ── BIO SUMMARY ────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2 flex flex-col justify-between border border-white/10 bg-white/[0.02] p-8 relative">
                        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-white/20 w-4 h-4" />
                        <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-white/20 w-4 h-4" />
                        <div>
                            <h2 className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase mb-6">// HISTORICAL CONTEXT</h2>
                            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed tracking-wide mb-6 uppercase">
                                DAFT PUNK WERE A FRENCH ELECTRONIC MUSIC DUO FORMED IN 1993 IN PARIS BY GUY-MANUEL DE HOMEM-CHRISTO AND THOMAS BANGALTER.
                            </p>
                            <p className="text-sm text-white/50 leading-relaxed uppercase tracking-wider mb-6">
                                They achieved global popularity as part of the late 90s French house movement, combining elements of synth-pop, disco, funk, and techno. By adopting mechanical personas, they integrated music, visuals, and robotics into an inseparable art form.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-4">
                            <div>
                                <span className="block text-[9px] text-white/30 uppercase tracking-widest">ORIGIN</span>
                                <span className="text-xs uppercase font-semibold text-white/70">PARIS, FRANCE</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-white/30 uppercase tracking-widest">ACTIVE ERA</span>
                                <span className="text-xs uppercase font-semibold text-white/70">1993 – 2021</span>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <span className="block text-[9px] text-white/30 uppercase tracking-widest">SIGNATURE</span>
                                <span className="text-xs uppercase font-semibold text-white/70">ROBOTIC INTERFACE</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Specs Sidebar */}
                    <div className="border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between">
                        <h2 className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase mb-4">// CORE ATTRIBUTES</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 border-b border-white/5 pb-2">
                                <Music className="w-4 h-4 text-white/40" />
                                <div>
                                    <span className="block text-[9px] text-white/30 tracking-wider">GENRES</span>
                                    <span className="text-xs uppercase text-white/80 font-mono">HOUSE / TECHNO / DISCO / FUNK</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 border-b border-white/5 pb-2">
                                <Shield className="w-4 h-4 text-white/40" />
                                <div>
                                    <span className="block text-[9px] text-white/30 tracking-wider">ROBOT PERSONAS</span>
                                    <span className="text-xs uppercase text-white/80 font-mono">ESTABLISHED 1999 (TRANSITION)</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 border-b border-white/5 pb-2">
                                <Cpu className="w-4 h-4 text-white/40" />
                                <div>
                                    <span className="block text-[9px] text-white/30 tracking-wider">MAIN GEAR</span>
                                    <span className="text-xs uppercase text-white/80 font-mono">CUSTOM MODULAR SYNTH ARRAYS</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-white/40" />
                                <div>
                                    <span className="block text-[9px] text-white/30 tracking-wider">RUNNING TIME</span>
                                    <span className="text-xs uppercase text-white/80 font-mono">28 YEARS OF TRANSMISSION</span>
                                </div>
                            </li>
                        </ul>
                        <div className="text-[10px] font-mono text-white/30 bg-white/5 p-3 mt-6 text-center border border-white/5 uppercase tracking-widest">
                            [TRANSMISSION COMPLETED]
                        </div>
                    </div>
                </div>

                {/* ── UNIT CONFIGURATIONS (Thomas vs Guy-Man) ────────── */}
                <div className="mb-16">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">UNIT CONFIGURATIONS</h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Analyzing the individual modules making up the collective duo</p>
                        </div>
                        <div className="flex bg-white/5 border border-white/10 p-1 font-mono text-[9px] self-start sm:self-auto">
                            <button 
                                onClick={() => setActiveUnit("both")} 
                                className={`px-3 py-1.5 uppercase transition-colors tracking-widest cursor-pointer ${activeUnit === "both" ? "bg-white text-black font-bold" : "text-white/60 hover:text-white"}`}
                            >
                                ALL SYSTEMS
                            </button>
                            <button 
                                onClick={() => setActiveUnit("bangalter")} 
                                className={`px-3 py-1.5 uppercase transition-colors tracking-widest cursor-pointer ${activeUnit === "bangalter" ? "bg-amber-500 text-black font-bold" : "text-white/60 hover:text-white"}`}
                            >
                                UNIT-01
                            </button>
                            <button 
                                onClick={() => setActiveUnit("homem")} 
                                className={`px-3 py-1.5 uppercase transition-colors tracking-widest cursor-pointer ${activeUnit === "homem" ? "bg-cyan-500 text-black font-bold" : "text-white/60 hover:text-white"}`}
                            >
                                UNIT-02
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Unit 1: Thomas */}
                        {(activeUnit === "both" || activeUnit === "bangalter") && (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className={`border ${units.bangalter.borderColor} bg-gradient-to-br ${units.bangalter.color} p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg ${units.bangalter.glowColor}`}
                            >
                                <div className="absolute top-0 right-0 font-mono text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110">
                                    01
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-mono text-xs text-white/40 tracking-wider">{units.bangalter.id}</span>
                                        <span className={`font-mono text-[10px] px-2 py-0.5 border ${units.bangalter.borderColor} ${units.bangalter.textColor} uppercase tracking-widest`}>
                                            GOLD HELMET // SOLAR VISOR
                                        </span>
                                    </div>
                                    <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 ${units.bangalter.textColor}`}>
                                        THOMAS BANGALTER
                                    </h3>
                                    <p className="text-white/70 text-sm uppercase tracking-wide leading-relaxed mb-6">
                                        {units.bangalter.description}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">// INTEGRATED SUB-SYSTEMS:</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {units.bangalter.specs.map((spec, i) => (
                                            <li key={i} className="flex items-center gap-2 text-white/60 text-[10px] tracking-wide uppercase">
                                                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                                                <span>{spec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* Unit 2: Guy-Man */}
                        {(activeUnit === "both" || activeUnit === "homem") && (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className={`border ${units.homem.borderColor} bg-gradient-to-br ${units.homem.color} p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg ${units.homem.glowColor}`}
                            >
                                <div className="absolute top-0 right-0 font-mono text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110">
                                    02
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-mono text-xs text-white/40 tracking-wider">{units.homem.id}</span>
                                        <span className={`font-mono text-[10px] px-2 py-0.5 border ${units.homem.borderColor} ${units.homem.textColor} uppercase tracking-widest`}>
                                            SILVER HELMET // LED ARRAY
                                        </span>
                                    </div>
                                    <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 ${units.homem.textColor}`}>
                                        GUY-MANUEL
                                    </h3>
                                    <p className="text-white/70 text-sm uppercase tracking-wide leading-relaxed mb-6">
                                        {units.homem.description}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">// INTEGRATED SUB-SYSTEMS:</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {units.homem.specs.map((spec, i) => (
                                            <li key={i} className="flex items-center gap-2 text-white/60 text-[10px] tracking-wide uppercase">
                                                <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
                                                <span>{spec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* ── INTERACTIVE TIMELINE ──────────────────────────── */}
                <div className="border border-white/10 bg-white/[0.01] p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight">TRANSMISSION TIMELINE</h2>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Select milestone nodes to inspect phase data</p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8 border border-white/10 p-1.5 bg-black/60">
                        {timeline.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedMilestone(idx)}
                                className={`py-4 px-2 flex flex-col items-center justify-center border font-mono transition-all text-center rounded-none cursor-pointer ${selectedMilestone === idx ? "bg-white text-black border-white font-bold" : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5"}`}
                            >
                                <span className="text-[10px] tracking-widest opacity-65">PHASE_{idx + 1}</span>
                                <span className="text-sm font-black tracking-tight">{item.year}</span>
                            </button>
                        ))}
                    </div>

                    <motion.div 
                        key={selectedMilestone}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 border border-white/15 bg-white/5 relative min-h-[220px]"
                    >
                        <div className="lg:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-white/10 border border-white/15 text-white text-[9px] px-2 py-0.5 font-mono tracking-widest">
                                        {timeline[selectedMilestone].status}
                                    </span>
                                    <span className="text-white/30 text-[10px] font-mono tracking-widest">{timeline[selectedMilestone].year}</span>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">
                                    {timeline[selectedMilestone].title}
                                </h3>
                                <p className="text-white/70 text-sm uppercase tracking-wide leading-relaxed">
                                    {timeline[selectedMilestone].description}
                                </p>
                            </div>
                        </div>

                        <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between font-mono">
                            <div>
                                <span className="block text-[8px] text-white/40 tracking-[0.2em] uppercase mb-4">// TELEMETRY & HARDWARE SPECS</span>
                                <div className="text-[10px] text-white/80 leading-relaxed uppercase tracking-wider space-y-2">
                                    {timeline[selectedMilestone].techSpec.split("//").map((spec, i) => (
                                        <div key={i} className="flex items-center gap-2 border-b border-white/5 pb-1">
                                            <ArrowRight className="w-3 h-3 text-white/40" />
                                            <span>{spec.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-[9px] text-white/20 mt-4 uppercase tracking-[0.2em] text-right">
                                SYSTEM RECORD REF: DP-{timeline[selectedMilestone].year}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
