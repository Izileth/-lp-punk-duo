import { motion } from "framer-motion";
import img1 from "../assets/imgs/dk2.jpg";
import img2 from "../assets/imgs/dk3.jpg";
import img3 from "../assets/imgs/dk4.jpg";
import img4 from "../assets/imgs/dk5.jpg";

export default function Shop() {
    const products = [
        { id: 1, name: "Discovery Vinyl", price: "$34.99", image: img1 },
        { id: 2, name: "Random Access Memories", price: "$39.99", image: img2 },
        { id: 3, name: "Homework CD", price: "$14.99", image: img3 },
        { id: 4, name: "Helmet Poster", price: "$19.99", image: img4 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative w-full min-h-screen bg-black pt-24 px-8 pb-8 flex flex-col items-center">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter my-12"
            >
                Official Shop
            </motion.h1>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
            >
                {products.map((product) => (
                    <motion.div 
                        key={product.id} 
                        variants={itemVariants}
                        whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.3)" }}
                        className="group border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="aspect-square bg-black border border-white/10 mb-4 overflow-hidden">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <h3 className="text-white text-[10px] tracking-[0.2em] uppercase mb-2 font-bold">{product.name}</h3>
                        <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase">{product.price}</p>
                        <button className="mt-4 w-full py-2 border border-white/20 text-white text-[8px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors">
                            Add to Cart
                        </button>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-20 border-t border-white/10 pt-8 w-full max-w-6xl flex justify-between items-center"
            >
                <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase">Limited Edition releases available soon</span>
                <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase underline cursor-pointer">View all items</span>
            </motion.div>
        </div>
    );
}
