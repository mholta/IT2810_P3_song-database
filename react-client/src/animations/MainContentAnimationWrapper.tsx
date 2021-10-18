import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';

interface MainContentAnimationWrapperProps {
  condition?: boolean;
  children: React.ReactNode;
}

const MainContentAnimationWrapper = ({
  condition,
  children,
}: MainContentAnimationWrapperProps) => {
  return (
    <AnimatePresence>
      {(condition === undefined || condition) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainContentAnimationWrapper;
