import { useEffect, useState, useRef, useMemo } from "react";
import { gsap } from "gsap";

const BOOT_TEXTS = [
    "PROTOCOL: DAFT_PUNK",
    "SYSTEM: READY",
    "LINK: ESTABLISHED",
    "ACCESS: GRANTED",
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const beamsContainerRef = useRef<HTMLDivElement>(null);

    const words = ["DAFT", "PUNK"];

    // Generate reel data for the slot machine spin effect
    const reelsData = useMemo(() => {
        const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&?*";
        const reelLength = 15;
        return words.map((word) =>
            word.split("").map((char) => {
                const reelChars = [char];
                for (let i = 0; i < reelLength - 2; i++) {
                    reelChars.push(glyphs[Math.floor(Math.random() * glyphs.length)]);
                }
                reelChars.push(char);
                // Add two more elements at the end for the bounce buffer
                reelChars.push(glyphs[Math.floor(Math.random() * glyphs.length)]);
                reelChars.push(glyphs[Math.floor(Math.random() * glyphs.length)]);
                return reelChars;
            })
        );
    }, []);



    // Boot lines sequence
    useEffect(() => {
        if (currentLine < BOOT_TEXTS.length) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 250);
            return () => clearTimeout(timer);
        } else if (!isExiting) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                triggerGlitchExit();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentLine, isExiting]);

    // Entrance animation for Logo and basic elements
    useEffect(() => {
        gsap.fromTo(".splash-title",
            { opacity: 0, y: 30, skewX: -20 },
            {
                opacity: 1,
                y: 0,
                skewX: 0,
                duration: 1.2,
                ease: "power4.out",
                keyframes: [
                    { opacity: 0.3, skewX: 10, duration: 0.1 },
                    { opacity: 0.1, duration: 0.05 },
                    { opacity: 0.9, skewX: -5, duration: 0.15 },
                    { opacity: 1, skewX: 0, duration: 0.9 }
                ]
            }
        );
        gsap.fromTo(".splash-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 1, delay: 0.4, ease: "power2.out" }
        );
        gsap.fromTo(".splash-side",
            { opacity: 0 },
            { opacity: 0.4, duration: 1, delay: 0.6, ease: "power1.out" }
        );
        gsap.fromTo(".splash-footer",
            { opacity: 0 },
            { opacity: 0.3, duration: 1, delay: 0.8, ease: "power1.out" }
        );
    }, []);

    const triggerCharacterExit = (containerEl: HTMLElement ) => {
        const parent = containerRef.current;
        if (!parent || !beamsContainerRef.current) return;
        const parentRect = parent.getBoundingClientRect();
        const rect = containerEl.getBoundingClientRect();
        const relativeX = rect.left + rect.width / 2 - parentRect.left;
        const textY = rect.top + rect.height / 2 - parentRect.top;


        // 1. Create upward exit beam (B&W Glow)
        const beam = document.createElement("div");
        beam.className = "absolute w-[3px] h-[250px] opacity-0 pointer-events-none rounded-full z-10";
        beam.style.left = `${relativeX}px`;

        const beamColor = "linear-gradient(to top, transparent, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9), transparent)";
        beam.style.background = beamColor;
        beam.style.boxShadow = "0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.6)";

        beamsContainerRef.current.appendChild(beam);

        gsap.fromTo(beam,
            { top: `${textY}px`, opacity: 0, scaleX: 1 },
            {
                top: "-250px",
                opacity: 1,
                scaleX: 0.1,
                duration: 0.7,
                ease: "power3.in",
                onStart: () => { gsap.set(beam, { opacity: 1 }); },
                onComplete: () => { beam.remove(); }
            }
        );

        // 2. Create rich spark particles (more particles!)
        const particleCount = 25;
        for (let p = 0; p < particleCount; p++) {
            const spark = document.createElement("div");
            spark.className = "absolute bg-white rounded-full pointer-events-none z-10";
            const size = Math.random() * 4 + 2; // 2px to 6px
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            spark.style.left = `${relativeX + (Math.random() - 0.5) * rect.width}px`;
            spark.style.top = `${textY + (Math.random() - 0.5) * rect.height}px`;
            spark.style.boxShadow = "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8)";

            beamsContainerRef.current.appendChild(spark);

            gsap.fromTo(spark,
                { opacity: 1, scale: 1 },
                {
                    x: () => (Math.random() - 0.5) * 120,
                    y: () => -80 - Math.random() * 200,
                    opacity: 0,
                    scale: 0.1,
                    duration: 0.6 + Math.random() * 0.9,
                    ease: "power2.out",
                    onComplete: () => { spark.remove(); }
                }
            );
        }

        // 3. Scramble and fade out the character
        const glyphs = "$@#%&?*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█";
        const scrambleObj = { val: 0 };

        gsap.to(scrambleObj, {
            val: 1,
            duration: 0.6,
            ease: "power1.in",
            onUpdate: () => {
                if (scrambleObj.val < 0.85) {
                    const randomChar = glyphs[Math.floor(Math.random() * glyphs.length)];
                    containerEl.textContent = randomChar;
                    containerEl.style.color = "#ffffff";
                    containerEl.style.filter = "drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))";
                } else {
                    containerEl.style.opacity = "0";
                }
            }
        });
    };

    const triggerGlitchExit = () => {
        const tl = gsap.timeline({
            onComplete: onFinish
        });

        // 1. Fade out secondary elements immediately as the spin begins
        tl.to([".splash-terminal-line", ".splash-line", ".splash-footer", ".splash-side"], {
            duration: 0.4,
            opacity: 0,
            ease: "power2.out"
        }, 0);

        // 2. Start background slot/cyberpunk noise and glitch particles early
        tl.add(() => {
            if (!beamsContainerRef.current) return;

            // 2b. Create B&W Glitch Particles (increased count to 80 for richer details)
            for (let p = 0; p < 80; p++) {
                const particle = document.createElement("div");
                const isLine = Math.random() > 0.5;
                const width = isLine ? Math.floor(Math.random() * 50) + 20 : Math.floor(Math.random() * 10) + 4;
                const height = isLine ? 1 : Math.floor(Math.random() * 10) + 4;

                particle.className = "absolute bg-white pointer-events-none opacity-0 z-10";
                particle.style.width = `${width}px`;
                particle.style.height = `${height}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;

                beamsContainerRef.current.appendChild(particle);

                gsap.fromTo(particle,
                    { opacity: 0, scaleX: 0.1 },
                    {
                        opacity: () => Math.random() * 0.9 + 0.1,
                        scaleX: () => Math.random() > 0.5 ? 3 : 0.5,
                        x: () => (Math.random() - 0.5) * 80,
                        duration: Math.random() * 0.5 + 0.15,
                        delay: Math.random() * 0.8,
                        ease: "none",
                        repeat: Math.floor(Math.random() * 2) + 1,
                        yoyo: true,
                        onComplete: () => { particle.remove(); }
                    }
                );
            }

            // 2c. Create Scrambling Encrypted Words (increased count to 10)
            const cryptoWords = [
                "SYS_TERMINATING", "SIG_ERR_LOCK", "0xFF00FF", "SYSTEM_EXIT_404",
                "MEM_DISSOLVE", "ENCRYPT_SYS_CORE", "NET_DROP_P2P", "DAFT_PUNK_EXIT"
            ];
            for (let w = 0; w < 10; w++) {
                const label = document.createElement("div");
                label.className = "absolute text-white/30 font-mono text-[8px] tracking-[0.2em] pointer-events-none uppercase z-10 select-none";
                label.style.left = `${10 + Math.random() * 80}%`;
                label.style.top = `${25 + Math.random() * 50}%`;

                beamsContainerRef.current.appendChild(label);

                const word = cryptoWords[Math.floor(Math.random() * cryptoWords.length)];
                const scrambleObj = { val: 0 };

                gsap.fromTo(label,
                    { opacity: 0 },
                    {
                        opacity: 0.4,
                        duration: 0.2,
                        delay: Math.random() * 0.5,
                        onStart: () => {
                            gsap.to(scrambleObj, {
                                val: 1,
                                duration: 0.8,
                                ease: "none",
                                onUpdate: () => {
                                    let result = "";
                                    const glyphs = "0123456789ABCDEF!@#%&*";
                                    for (let i = 0; i < word.length; i++) {
                                        if (word[i] === "_" || word[i] === " ") {
                                            result += word[i];
                                        } else if (Math.random() < scrambleObj.val) {
                                            result += word[i];
                                        } else {
                                            result += glyphs[Math.floor(Math.random() * glyphs.length)];
                                        }
                                    }
                                    label.textContent = result;
                                }
                            });
                        },
                        onComplete: () => {
                            gsap.to(label, {
                                opacity: 0,
                                duration: 0.2,
                                delay: 0.3,
                                onComplete: () => { label.remove(); }
                            });
                        }
                    }
                );
            }
        }, 0.2);

        // 3. Slot Machine Reels Spin
        const containers = document.querySelectorAll(".splash-char-container");
        containers.forEach((container, index) => {
            const reel = container.querySelector(".splash-char-reel");
            if (!reel) return;

            // Stagger from left to right
            const delay = index * 0.1;
            // Slightly randomized duration for realistic unsynchronized reel stops
            const duration = 0.8 + Math.random() * 0.4;

            tl.to(reel, {
                y: "-14em", // Translate by 14 characters to stop on the final target character
                duration: duration,
                ease: "back.out(1.5)", // Bounce effect like a real slot machine reel stopping
                delay: delay,
                onComplete: () => {
                    triggerCharacterExit(container as HTMLElement);
                }
            }, 0);
        });

        // 4. Fade out the splash container overall after scramble completes
        tl.to(".splash-container", {
            duration: 0.8,
            opacity: 0,
            ease: "power2.out"
        }, 2.0);
    };

    return (
        <div ref={containerRef} className="splash-container fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* ── BEAMS CONTAINER ─────────────────────────────── */}
            <div ref={beamsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20" />

            {/* ── LEFT DOTS ──────────────────────────────────── */}
            <div className="splash-side absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="text-white text-[10px] opacity-40">·</span>
                ))}
            </div>

            {/* ── RIGHT VERTICAL LABEL ────────────────────────── */}
            <div className="splash-side absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
                <span
                    className="text-white text-[9px] tracking-[0.4em] uppercase opacity-40 font-light"
                    style={{ writingMode: "vertical-rl" }}
                >
                    System Initialization
                </span>
            </div>

            {/* ── SCANLINE EFFECT ────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-10">
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
            </div>

            {/* ── CENTRAL GIANT LOGO ─────────────────────────── */}
            <div className="relative flex items-center justify-center">
                <h1
                    className="splash-title text-white font-black uppercase leading-none select-none text-center flex flex-wrap justify-center"
                    style={{
                        fontSize: "clamp(64px, 12vw, 160px)",
                        letterSpacing: "-0.04em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                    }}
                >
                    {words.map((word, wordIdx) => (
                        <span key={wordIdx} className="inline-block whitespace-nowrap mx-[0.1em]">
                            {word.split("").map((char, charIdx) => {
                                const reelChars = reelsData[wordIdx]?.[charIdx] || [char];
                                return (
                                    <span
                                        key={charIdx}
                                        className="splash-char-container inline-block overflow-hidden relative align-middle"
                                        style={{ height: "1em", lineHeight: "1" }}
                                        data-char={char}
                                    >
                                        {/* Invisible placeholder to preserve natural width and layout spacing */}
                                        <span className="opacity-0 pointer-events-none select-none block" style={{ height: "1em" }}>
                                            {char}
                                        </span>
                                        <span
                                            className="splash-char-reel absolute inset-0 block"
                                            style={{ transform: "translateY(0)" }}
                                        >
                                            {reelChars.map((rc, rcIdx) => (
                                                <span
                                                    key={rcIdx}
                                                    className="block text-center"
                                                    style={{ height: "1em", lineHeight: "1" }}
                                                >
                                                    {rc}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                );
                            })}
                        </span>
                    ))}
                </h1>

                {/* Technical line under Logo */}
                <div className="splash-line absolute -bottom-4 w-full h-[1px] bg-white/20 origin-center" />
            </div>

            {/* ── TERMINAL LINES ─────────────────────────────── */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-1">
                {BOOT_TEXTS.map((text, i) => (
                    <div
                        key={i}
                        className="splash-terminal-line text-white font-mono text-[9px] tracking-[0.2em] uppercase transition-opacity duration-200"
                        style={{ opacity: i <= currentLine ? 0.6 : 0 }}
                    >
                        {text}
                    </div>
                ))}
            </div>

            {/* ── FOOTER ELEMENTS ────────────────────────────── */}
            <div className="splash-footer absolute bottom-8 right-12 text-[8px] tracking-[0.5em] text-white/30 uppercase font-light">
                Ver 2026.1 // Cyberdeck
            </div>
        </div>
    );
}
