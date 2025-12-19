import { motion } from "framer-motion";

const ParticleField = () => {
  // Create particles with varied properties for cosmic effect
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 10,
    type: i % 4, // 0: gold, 1: white, 2: sky-blue, 3: prism
  }));

  const getParticleColor = (type: number) => {
    switch (type) {
      case 0:
        return "hsl(43 90% 65% / 0.7)";
      case 1:
        return "hsl(45 30% 96% / 0.6)";
      case 2:
        return "hsl(200 70% 75% / 0.5)";
      case 3:
        return "hsl(280 60% 75% / 0.4)";
      default:
        return "hsl(43 90% 65% / 0.7)";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Very subtle cosmic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(250 30% 15%) 0%, transparent 60%)"
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: "-5%",
            background: getParticleColor(particle.type),
            boxShadow: `0 0 ${particle.size * 3}px ${getParticleColor(particle.type)}`,
          }}
          animate={{
            y: [0, -1500],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle sacred geometry hexagon overlay */}
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-[0.015]"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern id="hexagons" width="10" height="17.32" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              points="5,0 10,2.89 10,8.66 5,11.55 0,8.66 0,2.89" 
              fill="none" 
              stroke="hsl(43 90% 55%)" 
              strokeWidth="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

export default ParticleField;
