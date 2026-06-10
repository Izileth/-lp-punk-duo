import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="shop" element={<Shop />} />
            </Route>
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
