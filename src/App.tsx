import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { BackgroundParticles } from './components/BackgroundParticles';
import { CelebrationParticles, type Particle } from './components/CelebrationParticles';
import { MainCard } from './components/MainCard';
import { seededRandom } from './utils/random';

function App() {
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    if (loading) {
        return <SplashScreen onFinish={() => setLoading(false)} />;
    }

    const handleReveal = (): void => {
        if (!isRevealed) {
            setIsRevealed(true);

            // Create celebration particles deterministically
            const timestamp = Date.now();
            const newParticles: Particle[] = Array.from(
                { length: 30 },
                (_, i): Particle => ({
                    id: timestamp + i,
                    x: seededRandom(timestamp + i * 111) * 100,
                    y: seededRandom(timestamp + i * 222) * 100
                })
            );
            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-light relative overflow-hidden flex items-center justify-center p-6">
            <BackgroundParticles />
            <CelebrationParticles particles={particles} />

            {/* Main Content */}
            <div className="max-w-4xl w-full">
                <MainCard isRevealed={isRevealed} onReveal={handleReveal} />

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
                    Design minimalista — Teste de conceito
                </footer>
            </div>
        </div>
    );
}

export default App;
