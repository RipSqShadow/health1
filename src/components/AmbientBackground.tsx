import { motion } from 'framer-motion';

interface AmbientBackgroundProps {
  variant?: 'default' | 'warm' | 'cool' | 'hero';
}

export default function AmbientBackground({ variant = 'default' }: AmbientBackgroundProps) {
  const orbColors =
    variant === 'warm'
      ? ['bg-coral-400/20', 'bg-gold-400/15', 'bg-coral-500/10']
      : variant === 'cool'
        ? ['bg-maatri-300/25', 'bg-sage-400/15', 'bg-maatri-400/10']
        : variant === 'hero'
          ? ['bg-maatri-400/30', 'bg-coral-400/20', 'bg-sage-400/15', 'bg-maatri-300/20']
          : ['bg-maatri-300/20', 'bg-coral-400/10', 'bg-sage-400/10'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      {orbColors.map((color, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${color}`}
          style={{
            width: `${280 + i * 120}px`,
            height: `${280 + i * 120}px`,
            left: `${10 + i * 25}%`,
            top: `${5 + i * 20}%`,
          }}
          animate={{
            x: [0, 30 - i * 15, -20 + i * 10, 0],
            y: [0, -25 + i * 8, 20 - i * 5, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 particle-field opacity-40" />
    </div>
  );
}
