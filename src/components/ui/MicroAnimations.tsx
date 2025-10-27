'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ children, scale = 1.03, duration = 0.3, className }) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverLiftProps {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({ children, y = -5, duration = 0.3, className }) => {
  return (
    <motion.div
      whileHover={{ y }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ButtonPressProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const ButtonPress: React.FC<ButtonPressProps> = ({ children, scale = 0.98, duration = 0.2, className }) => {
  return (
    <motion.div
      whileTap={{ scale }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, duration = 0.8, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
