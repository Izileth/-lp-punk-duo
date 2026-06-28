import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const beamsContainerRef = useRef<HTMLDivElement>(null);
    const sideLabelRef = useRef<HTMLSpanElement>(null);

    const words = ["DAFT", "PUNK"];

    useEffect(() => {
        // Wait a tiny frame for layout calculation
        const timer = setTimeout(() => {
            const chars = document.querySelectorAll(".cyber-char");
            const parent = containerRef.current;
            if (!parent || !beamsContainerRef.current) return;
            const parentRect = parent.getBoundingClientRect();

            const tl = gsap.timeline();

            // 1. Setup elements for animation
            gsap.set(".cyber-char", { opacity: 0 });
            gsap.set(".cyber-dot", { opacity: 0, x: -20 });
            gsap.set(".cyber-side-label", { opacity: 0 });
            gsap.set(".cyber-scroll", { opacity: 0, y: 20 });

            // 2. Animate Beams and Character Decrypts
            chars.forEach((charEl, idx) => {
                const char = charEl.getAttribute("data-char");
                if (!char) return;

                const rect = charEl.getBoundingClientRect();
                const relativeX = rect.left + rect.width / 2 - parentRect.left;

                // Create a falling beam
                const beam = document.createElement("div");
                beam.className = "absolute w-[2px] h-[180px] opacity-0 pointer-events-none rounded-full z-10";
                beam.style.left = `${relativeX}px`;

                // Alternating neon colors matching Daft Punk helmets
                // Thomas (silver/cyan), Guy-Manuel (gold/red)
                const isThomas = idx % 2 === 0;
                const beamColor = isThomas 
                    ? "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 1), rgba(6, 182, 212, 0.8), transparent)" 
                    : "linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 1), rgba(239, 68, 68, 0.8), transparent)";
                
                beam.style.background = beamColor;
                beam.style.boxShadow = isThomas 
                    ? "0 0 16px rgba(6, 182, 212, 0.9), 0 0 32px rgba(6, 182, 212, 0.6)" 
                    : "0 0 16px rgba(239, 68, 68, 0.9), 0 0 32px rgba(239, 68, 68, 0.6)";

                beamsContainerRef.current?.appendChild(beam);

                // We stagger the start of each beam randomly between 0s and 0.4s
                const beamDelay = Math.random() * 0.4;

                // Beam shoots down from top to bottom
                tl.fromTo(beam, 
                    { top: "-180px", opacity: 0 },
                    { 
                        top: "100%", 
                        opacity: 1, 
                        duration: 1.4, 
                        ease: "power2.inOut",
                        onStart: () => { gsap.set(beam, { opacity: 1 }); },
                        onComplete: () => { beam.remove(); }
                    },
                    beamDelay
                );

                // Trigger decryption of character at some delay
                // When the beam is roughly at 50% height (around 0.5s of the 1.4s animation)
                const decryptDelay = beamDelay + 0.5;

                const glyphs = "$@#%&?*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█";
                const scrambleObj = { val: 0 };

                tl.to(scrambleObj, {
                    val: 1,
                    duration: 0.9,
                    ease: "none",
                    onStart: () => {
                        gsap.set(charEl, { opacity: 1 });
                    },
                    onUpdate: () => {
                        if (scrambleObj.val < 1) {
                            if (Math.random() < 0.15) {
                                charEl.textContent = char;
                            } else {
                                const randomChar = glyphs[Math.floor(Math.random() * glyphs.length)];
                                charEl.textContent = randomChar;
                            }
                            (charEl as HTMLElement).style.color = isThomas ? "#06b6d4" : "#ef4444";
                            (charEl as HTMLElement).style.filter = "drop-shadow(0 0 10px currentColor)";
                        } else {
                            charEl.textContent = char;
                            (charEl as HTMLElement).style.color = "";
                            (charEl as HTMLElement).style.filter = "";
                        }
                    },
                    onComplete: () => {
                        charEl.textContent = char;
                        (charEl as HTMLElement).style.color = "";
                        (charEl as HTMLElement).style.filter = "";
                    }
                }, decryptDelay);
            });

            // 3. Decrypt/Animate secondary elements in parallel
            // Left dots slide in and fade in
            tl.to(".cyber-dot", {
                opacity: 0.6,
                x: 0,
                duration: 1.0,
                stagger: 0.1,
                ease: "power2.out"
            }, 0.8);

            // Right vertical label progressive decrypt
            const sideLabelEl = sideLabelRef.current;
            if (sideLabelEl) {
                const originalText = "About the duo";
                const sideGlyphs = "@#%&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const sideObj = { val: 0 };
                
                tl.to(sideObj, {
                    val: 1,
                    duration: 1.4,
                    ease: "none",
                    onStart: () => {
                        gsap.set(sideLabelEl, { opacity: 0.4 });
                    },
                    onUpdate: () => {
                        let result = "";
                        for (let i = 0; i < originalText.length; i++) {
                            if (originalText[i] === " ") {
                                result += " ";
                            } else if (Math.random() < sideObj.val) {
                                result += originalText[i];
                            } else {
                                result += sideGlyphs[Math.floor(Math.random() * sideGlyphs.length)];
                            }
                        }
                        sideLabelEl.textContent = result;
                    },
                    onComplete: () => {
                        sideLabelEl.textContent = originalText;
                    }
                }, 0.6);
            }

            // Bottom scroll icon slide up and fade in, then bob
            tl.to(".cyber-scroll", {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                onComplete: () => {
                    // Bobbing animation after entering
                    gsap.to(".cyber-scroll-dot", {
                        y: 5,
                        duration: 1.0,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut"
                    });
                }
            }, 1.2);

        }, 50);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
            {/* ── BEAMS CONTAINER ─────────────────────────────── */}
            <div ref={beamsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20" />

            {/* ── LEFT DOTS ──────────────────────────────────── */}
            <div className="hidden sm:flex absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="cyber-dot text-white text-[9px] tracking-widest opacity-0">·</span>
                ))}
            </div>

            {/* ── RIGHT VERTICAL LABEL ────────────────────────── */}
            <div className="hidden sm:flex absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30">
                <span
                    ref={sideLabelRef}
                    className="cyber-side-label text-white text-[8px] tracking-[0.25em] uppercase opacity-0 font-light"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    About the duo
                </span>
            </div>

            {/* ── GIANT TITLE ─────────────────────────────────── */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-2">
                <h1
                    className="cyber-title text-white font-black uppercase leading-none select-none text-center flex flex-wrap justify-center"
                    style={{
                        fontSize: "clamp(52px, 16vw, 200px)",
                        letterSpacing: "-0.02em",
                        fontFamily: "'Arial Black', 'Arial', sans-serif",
                        textShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)",
                    }}
                >
                    {words.map((word, wordIdx) => (
                        <span key={wordIdx} className="inline-block whitespace-nowrap mx-[0.1em]">
                            {word.split("").map((char, charIdx) => (
                                <span
                                    key={charIdx}
                                    className="cyber-char inline-block opacity-0"
                                    data-char={char}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            </div>

            {/* ── BOTTOM SCROLL ICON ──────────────────────────── */}
            <div className="cyber-scroll absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-0">
                <div className="w-[1px] h-4 bg-white opacity-30" />
                <div className="w-4 h-4 rounded-full border border-white opacity-40 flex items-center justify-center">
                    <div className="cyber-scroll-dot w-[3px] h-[3px] rounded-full bg-white opacity-70" />
                </div>
            </div>
        </div>
    );
}
