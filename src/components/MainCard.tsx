interface MainCardProps {
    isRevealed: boolean;
    onReveal: () => void;
}

export function MainCard({ isRevealed, onReveal }: MainCardProps) {
    return (
        <div className="flex justify-center mb-12">
            <div
                onClick={onReveal}
                className={`relative w-full max-w-2xl h-96 cursor-pointer overflow-hidden transition-all duration-700 ${
                    isRevealed
                        ? 'bg-white text-black border-2 border-white shadow-2xl shadow-white/20'
                        : 'bg-black border-2 border-white/30 hover:border-white/60'
                }`}
            >
                {/* Initial State */}
                {!isRevealed && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="w-20 h-20 border-2 border-white rounded-full mb-6 flex items-center justify-center">
                            <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin" />
                        </div>
                        <h2 className="text-3xl tracking-wide text-white/90 mb-3 font-extralight">
                            Clique para começar
                        </h2>
                        <p className="text-gray-400 text-sm tracking-wider uppercase">
                            Uma experiência minimalista
                        </p>
                    </div>
                )}

                {/* Revealed Content */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-12 transition-all duration-1000 ${
                        isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="text-center space-y-8">
                        <div className="w-16 h-px bg-black/20 mx-auto" />
                        
                        <h1 className="text-4xl tracking-[0.2em] text-black font-extralight uppercase">
                            Simplicidade
                        </h1>
                        
                        <p className="text-black/60 text-sm tracking-[0.3em] uppercase">
                            É a sofisticação máxima
                        </p>
                        
                        <div className="w-16 h-px bg-black/20 mx-auto" />
                    </div>
                </div>

                {/* Decorative Borders when revealed */}
                {isRevealed && (
                    <>
                        <div className="absolute top-8 left-8 right-8 h-px bg-black/10" />
                        <div className="absolute bottom-8 left-8 right-8 h-px bg-black/10" />
                        <div className="absolute left-8 top-8 bottom-8 w-px bg-black/10" />
                        <div className="absolute right-8 top-8 bottom-8 w-px bg-black/10" />
                    </>
                )}
            </div>
        </div>
    );
}
