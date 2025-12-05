"use client";

import { motion } from "framer-motion";

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-9999 bg-linear-to-r from-orange-500 to-yellow-300 top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-sm">
            <motion.div
                className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
        </div>
    );
};

export default LoadingOverlay;
