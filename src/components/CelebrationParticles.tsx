import { Sparkles } from 'lucide-react';

export interface Particle {
    id: number;
    x: number;
    y: number;
}

interface CelebrationParticlesProps {
    particles: Particle[];
}

export function CelebrationParticles({ particles }: CelebrationParticlesProps) {
    return (
        <>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute pointer-events-none animate-ping"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                >
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
            ))}
        </>
    );
}
