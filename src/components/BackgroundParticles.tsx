import { useMemo } from 'react';
import { seededRandom } from '../utils/random';

interface BackgroundParticle {
    id: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
}

const backgroundParticlesData: BackgroundParticle[] = Array.from(
    { length: 50 },
    (_, i): BackgroundParticle => {
        const seed1 = i * 123;
        const seed2 = i * 456;
        const seed3 = i * 789;
        const seed4 = i * 321;

        return {
            id: i,
            left: seededRandom(seed1) * 100,
            top: seededRandom(seed2) * 100,
            delay: seededRandom(seed3) * 3,
            duration: 2 + seededRandom(seed4) * 3
        };
    }
);

export function BackgroundParticles() {
    const backgroundParticles = useMemo<BackgroundParticle[]>(
        () => backgroundParticlesData,
        []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundParticles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-px h-px bg-white rounded-full opacity-20 animate-float"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`
                    }}
                />
            ))}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-float {
                    animation: float linear infinite;
                }
            `}</style>
        </div>
    );
}
