import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import img1 from "../assets/imgs/dk2.jpg";
import img2 from "../assets/imgs/dk3.jpg";
import img3 from "../assets/imgs/dk4.jpg";
import img4 from "../assets/imgs/dk5.jpg";
import img5 from "../assets/imgs/dk.jpg";
import img6 from "../assets/imgs/dk6.jpg";
import { ShoppingBag, X, Trash2, ShieldCheck, Terminal, Heart, Sparkles, SlidersHorizontal, Loader2 } from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: number;
    priceStr: string;
    image: string;
    category: "audio" | "apparel" | "collectibles";
    stock: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    serial: string;
    spec: string;
}

interface CartItem extends Product {
    quantity: number;
}

export default function Shop() {
    const products: Product[] = [
        { 
            id: 1, 
            name: "Discovery Vinyl (Double LP)", 
            price: 34.99,
            priceStr: "$34.99", 
            image: img1, 
            category: "audio",
            stock: "IN_STOCK",
            serial: "VINYL-1997-DISC",
            spec: "180g Audiophile Vinyl // Gatefold Sleeve"
        },
        { 
            id: 2, 
            name: "Random Access Memories", 
            price: 39.99,
            priceStr: "$39.99", 
            image: img2, 
            category: "audio",
            stock: "LOW_STOCK",
            serial: "VINYL-2013-RAM",
            spec: "Double 180g Vinyl // 8-Page Booklet Included"
        },
        { 
            id: 3, 
            name: "Homework CD (Classic Edition)", 
            price: 14.99,
            priceStr: "$14.99", 
            image: img3, 
            category: "audio",
            stock: "IN_STOCK",
            serial: "CD-1997-HW",
            spec: "Remastered Compact Disc // Jewel Case"
        },
        { 
            id: 4, 
            name: "Signature Helmet Poster", 
            price: 19.99,
            priceStr: "$19.99", 
            image: img4, 
            category: "collectibles",
            stock: "IN_STOCK",
            serial: "POSTER-HM-01",
            spec: "18x24 Screenprinted Poster // Holographic Finish"
        },
        { 
            id: 5, 
            name: "Alive 2007 Deluxe Boxset", 
            price: 89.99,
            priceStr: "$89.99", 
            image: img5, 
            category: "audio",
            stock: "LOW_STOCK",
            serial: "BOXSET-A07",
            spec: "Limited Edition White Vinyl // Alive 1997 Bonus Track"
        },
        { 
            id: 6, 
            name: "Daft Punk Slipmat Set", 
            price: 24.99,
            priceStr: "$24.99", 
            image: img6, 
            category: "collectibles",
            stock: "IN_STOCK",
            serial: "SLIP-DP-02",
            spec: "Felt Turntable Slipmats // Dual Helmet Print"
        },
    ];

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<"all" | "audio" | "collectibles">("all");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success">("idle");

    const filteredProducts = activeFilter === "all" 
        ? products 
        : products.filter(p => p.category === activeFilter);

    const addToCart = (product: Product) => {
        if (product.stock === "OUT_OF_STOCK") return;
        
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    const handleCheckout = () => {
        setCheckoutState("processing");
        setTimeout(() => {
            setCheckoutState("success");
            setTimeout(() => {
                setCart([]);
                setCheckoutState("idle");
                setIsCartOpen(false);
            }, 3000);
        }, 2500);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="relative w-full min-h-screen bg-black text-white pt-28 px-4 sm:px-8 pb-16 overflow-hidden">
            {/* Background Laser lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── TOP HEADER ───────────────────────────────────── */}
                <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-4 h-4 text-white/40" />
                            <span className="text-[10px] text-white/40 font-mono tracking-[0.3em]">SECURE_MERCHANDISE_NODE_CONNECTED</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            OFFICIAL <span className="text-white/30 font-light font-mono">/</span> SHOP
                        </h1>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-none transition-colors cursor-pointer"
                        >
                            <ShoppingBag className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-mono tracking-widest uppercase">CART_INDEX</span>
                            {cart.length > 0 && (
                                <span className="bg-white text-black font-bold font-mono text-[9px] px-1.5 py-0.5 rounded-none ml-1 animate-pulse">
                                    {cart.reduce((s, i) => s + i.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── FILTER & CONTROLS ──────────────────────────────── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border border-white/10 bg-white/[0.02] p-4 mb-8 gap-4 font-mono">
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="w-4 h-4 text-white/40" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40">// FILTER_CATALOGUE</span>
                    </div>

                    <div className="flex bg-black border border-white/10 p-0.5 text-[9px]">
                        {(["all", "audio", "collectibles"] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 uppercase tracking-widest transition-colors cursor-pointer ${activeFilter === filter ? "bg-white text-black font-bold" : "text-white/60 hover:text-white"}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── PRODUCTS GRID ─────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => {
                        const isFav = favorites.includes(product.id);
                        return (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between"
                            >
                                {/* Futuristic Top Border Scanner Line */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                
                                {/* Product Image Container */}
                                <div className="relative aspect-square overflow-hidden bg-black/60 border-b border-white/10 group">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105 group-hover:brightness-110"
                                    />
                                    
                                    {/* Action overlays */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="px-4 py-2 border border-white bg-black/80 text-white hover:bg-white hover:text-black transition-colors font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                                        >
                                            [ ADD TO CART ]
                                        </button>
                                    </div>

                                    {/* Favorite & Tag Badges */}
                                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-auto">
                                        <span className="font-mono text-[8px] bg-black/80 border border-white/10 px-2 py-0.5 uppercase tracking-widest text-white/60">
                                            {product.serial}
                                        </span>
                                        <button 
                                            onClick={() => toggleFavorite(product.id)}
                                            className="p-1.5 bg-black/80 border border-white/10 hover:border-white/40 transition-colors text-white cursor-pointer"
                                        >
                                            <Heart className={`w-3 h-3 ${isFav ? "fill-white text-white" : "text-white/60"}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                                                // CATEGORY_{product.category}
                                            </span>
                                            <span className={`text-[8px] font-mono tracking-widest uppercase ${
                                                product.stock === "OUT_OF_STOCK" ? "text-rose-500" :
                                                product.stock === "LOW_STOCK" ? "text-amber-500 animate-pulse" : "text-emerald-500"
                                            }`}>
                                                [{product.stock.replace("_", " ")}]
                                            </span>
                                        </div>
                                        <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-1 leading-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-[10px] font-mono text-white/40 uppercase mb-4">
                                            {product.spec}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-lg font-mono font-black text-white">
                                            {product.priceStr}
                                        </span>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white text-white/80 hover:text-white transition-colors font-mono text-[8px] uppercase tracking-widest cursor-pointer"
                                        >
                                            <ShoppingBag className="w-3 h-3" />
                                            <span>PURCHASE</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── FOOTER STATS ──────────────────────────────────── */}
                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase text-center sm:text-left">
                        SECURE PAYMENTS HANDLED VIA DAFT_SYS CORE
                    </span>
                    <div className="flex gap-6 text-[10px] font-mono uppercase text-white/50 tracking-wider">
                        <span className="hover:text-white transition-colors cursor-pointer underline">Shipping Policies</span>
                        <span className="hover:text-white transition-colors cursor-pointer underline">Returns Terminology</span>
                    </div>
                </div>
            </div>

            {/* ── CART SIDE-DRAWER ──────────────────────────────── */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 z-50 bg-black"
                        />

                        {/* Drawer Panel */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[450px] bg-black border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
                        >
                            <div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-4 h-4 text-white" />
                                        <h2 className="text-lg font-black uppercase tracking-tight">CART_ITEMS</h2>
                                    </div>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="p-1 hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors text-white cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {checkoutState === "processing" ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center font-mono">
                                        <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                                        <p className="text-xs uppercase tracking-widest text-white/70">SECURE_TUNNEL_ESTABLISHED</p>
                                        <p className="text-[10px] text-white/40 mt-1 uppercase">AUTHORIZING SYSTEM TRANSACTIONS...</p>
                                    </div>
                                ) : checkoutState === "success" ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center font-mono">
                                        <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
                                        <p className="text-sm uppercase tracking-widest text-emerald-400 font-bold">TRANSACTION COMPLETED</p>
                                        <p className="text-[10px] text-white/50 mt-2 uppercase">DAFT_PUNK_SECURE SYSTEM OK</p>
                                        <p className="text-[8px] text-white/30 mt-1 uppercase">Order Reference: TX-{Math.floor(Math.random() * 89999 + 10000)}</p>
                                    </div>
                                ) : cart.length === 0 ? (
                                    <div className="py-20 text-center font-mono text-white/40">
                                        <Terminal className="w-6 h-6 mx-auto mb-4 opacity-30" />
                                        <p className="text-[10px] uppercase tracking-widest">NO_ITEMS_IN_CART</p>
                                        <p className="text-[8px] mt-1">Please populate the transaction vector.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div 
                                                key={item.id} 
                                                className="flex items-center gap-4 border border-white/5 bg-white/[0.02] p-3 group relative"
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-16 h-16 object-cover border border-white/10 shrink-0"
                                                />
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="text-xs font-bold uppercase tracking-wide truncate text-white">
                                                        {item.name}
                                                    </h3>
                                                    <span className="block font-mono text-[8px] text-white/30 uppercase mt-0.5">
                                                        {item.serial}
                                                    </span>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center bg-black border border-white/10 text-[9px] font-mono">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="px-2 py-1 hover:bg-white/10 text-white cursor-pointer"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-2 text-white font-bold">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="px-2 py-1 hover:bg-white/10 text-white cursor-pointer"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="font-mono text-xs font-bold text-white">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 hover:bg-rose-950/20 text-white/40 hover:text-rose-500 transition-colors absolute top-2 right-2 cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Total and Checkout Section */}
                            {cart.length > 0 && checkoutState === "idle" && (
                                <div className="border-t border-white/10 pt-6 mt-6">
                                    <div className="flex justify-between items-center font-mono mb-4 text-xs uppercase tracking-widest">
                                        <span className="text-white/40">ESTIMATED_TOTAL</span>
                                        <span className="text-lg font-black text-white">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <button 
                                        onClick={handleCheckout}
                                        className="w-full py-4 border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all font-mono font-bold text-[10px] uppercase tracking-widest cursor-pointer text-center"
                                    >
                                        [ SECURE CHECKOUT ]
                                    </button>
                                    <p className="text-center text-[8px] font-mono text-white/30 uppercase mt-3 tracking-widest">
                                        TRANSACTIONS ARE SIGNED CRYPTOGRAPHICALLY
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
