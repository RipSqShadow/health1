import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeUp, viewportOnce } from '@/lib/motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <h1 className="section-title mb-2">{title}</h1>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
      {children}
    </motion.div>
  );
}
