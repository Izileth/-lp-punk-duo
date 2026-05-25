import { useEffect, useMemo, useState } from "react";
import { seededRandom } from "../utils/random";

const MATRIX_CHARS = "01アイウエオカキクケコ" as const;

interface MatrixColumn {
    id: number;
    left: number;
    delay: number;
    duration: number;
    char: string;
}

interface SplashScreenProps {
    onFinish: () => void;
}

function getCharAt(str: string, index: number): string {
    return str.charAt(index % str.length);
}

function MatrixRain() {
    const matrixColumns = useMemo<MatrixColumn[]>(() => {
        return Array.from({ length: 50 }, (_, i): MatrixColumn => {
            const seed1 = i * 123;
            const seed2 = i * 456;
            const seed3 = i * 789;
            const seed4 = i * 321;

            const leftValue = seededRandom(seed1) * 100;
            const delayValue = seededRandom(seed2) * 3;
            const durationValue = 3 + seededRandom(seed3) * 3;
            const charIndex = (seededRandom(seed4) * MATRIX_CHARS.length) | 0;

            return {
                id: i,
                left: leftValue,
                delay: delayValue,
                duration: durationValue,
                char: getCharAt(MATRIX_CHARS, charIndex),
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {matrixColumns.map((col: MatrixColumn) => (
                <div
                    key={col.id}
                    className="absolute text-white/10 animate-matrix"
                    style={{
                        left: `${col.left}%`,
                        top: '-10%',
                        animationDelay: `${col.delay}s`,
                        animationDuration: `${col.duration}s`,
                        fontSize: "12px",
                    }}
                >
                    {col.char}
                </div>
            ))}
            <style>{`
                @keyframes matrix {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(120vh);
                        opacity: 0;
                    }
                }
                .animate-matrix {
                    animation-name: matrix;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let counter = 0;

        const interval = setInterval(() => {
            setProgress((prev: number): number => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinish, 500);
                    return 100;
                }

                const increment = ((seededRandom(counter++) * 6) | 0) + 3;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden flex items-center justify-center">
            <MatrixRain />

            {/* Progress Loader */}
            <div className="relative z-10 flex flex-col items-center gap-5 w-64">
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/60">
                    carregando conteúdo
                </span>

                <div className="w-full h-px bg-white/20">
                    <div
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="text-[10px] text-white/40 tracking-widest">
                    {progress}%
                </span>
            </div>
        </div>
    );
}
