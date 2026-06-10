import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const leftLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Shop", path: "/shop" },
    ];

    const rightLinks = [
        { name: "Spotify", path: "https://open.spotify.com", external: true },
        { name: "iTunes", path: "https://www.apple.com/itunes", external: true },
        { name: "Deezer", path: "https://www.deezer.com", external: true },
    ];

    const pageVariants = {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        exit: { opacity: 0, filter: "blur(10px)" },
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* ── TOP NAV ─────────────────────────────────────── */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-black/50 backdrop-blur-sm"
            >

                {/* Left links — hidden on mobile */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    {leftLinks.map((item) => (
                        <Link key={item.name} to={item.path}
                            className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Hamburger — visible on mobile only */}
                <button
                    className="md:hidden flex flex-col gap-[5px] p-1 z-50"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                    <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-5 h-[1px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
                </button>

                {/* Center logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <span className="text-white text-sm font-bold tracking-[0.15em]">D</span>
                    <span className="text-white text-sm font-bold">—</span>
                    <span className="text-white text-sm font-bold tracking-[0.15em]">P</span>
                </Link>

                {/* Right links — hidden on mobile */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    {rightLinks.map((item) => (
                        <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer"
                            className="text-white text-[10px] tracking-[0.2em] uppercase font-light hover:opacity-60 transition-opacity">
                            {item.name}
                        </a>
                    ))}
                </div>
            </motion.nav>

            {/* ── MOBILE FULLSCREEN MENU ──────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {leftLinks.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link to={item.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white text-2xl tracking-[0.3em] uppercase font-light hover:opacity-50 transition-opacity">
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                        <div className="h-[1px] w-12 bg-white/20 my-2" />
                        {rightLinks.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx + leftLinks.length) * 0.1 }}
                            >
                                <a href={item.path} target="_blank" rel="noopener noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white text-xl tracking-[0.3em] uppercase font-extralight hover:opacity-50 transition-opacity">
                                    {item.name}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <main>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
