import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface Props {
  children: JSX.Element;
  index?: number;
  className?: string;
  width?: 'fit-content' | '100%';
  showEaseIn?: boolean;
}

export const Reveal = ({
  children,
  index = 0,
  className = '',
  width = 'fit-content',
  showEaseIn = false,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
      slideControls.start('visible');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      className={className}
      ref={ref}
      style={{ position: 'relative', width, overflow: 'hidden' }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: index % 2 === 0 ? -150 : 150, scale: 0.5 },
          visible: { opacity: 1, x: 0, scale: 1 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
      {showEaseIn && (
        <motion.div
          variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
          initial='hidden'
          animate={slideControls}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: 'var(--brand)',
            zIndex: 20,
          }}
        ></motion.div>
      )}
    </div>
  );
};
