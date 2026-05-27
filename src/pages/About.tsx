import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="relative w-full min-h-screen bg-black pt-24 px-8 pb-8 flex flex-col items-center justify-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
            >
                About the Duo
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="max-w-2xl text-white/70 text-sm md:text-base leading-relaxed tracking-wide text-center uppercase"
            >
                <p className="mb-6">
                    Daft Punk were a French electronic music duo formed in 1993 in Paris by Guy-Manuel de Homem-Christo and Thomas Bangalter.
                </p>
                <p className="mb-6">
                    They achieved popularity in the late 1990s as part of the French house movement; they also had success in the years following, combining elements of house music with funk, techno, disco, indie rock and synth-pop.
                </p>
                <p>
                    They are regarded as one of the most influential acts in dance music history.
                </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="border border-white/10 p-6 bg-white/5"
                >
                    <h2 className="text-white text-xs tracking-[0.3em] uppercase mb-4">Origins</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Paris, France (1993)</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="border border-white/10 p-6 bg-white/5"
                >
                    <h2 className="text-white text-xs tracking-[0.3em] uppercase mb-4">Genre</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Electronic / House / Disco / Funk</p>
                </motion.div>
            </div>
        </div>
    );
}
