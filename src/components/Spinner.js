import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ size = 12, color = "border-recifeBlue" }) => {
  return (
    <motion.div 
      className={`animate-spin rounded-full border-4 ${color} border-t-transparent mx-auto`}
      style={{ width: `${size}px`, height: `${size}px` }}
      role="status"
      aria-label="Carregando..."
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default Spinner;
