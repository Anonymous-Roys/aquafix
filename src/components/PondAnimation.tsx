
import { motion } from 'framer-motion';

interface PondAnimationProps {
  fishCount: number;
  waterFlow: number;
  aeration: boolean;
}

const Fish = ({ index }: { index: number }) => {
  const swimPaths = [
    // Path 1: Left to right
    [
      { x: -20, y: 60 + Math.random() * 80 },
      { x: 100, y: 80 + Math.random() * 60 },
      { x: 200, y: 70 + Math.random() * 70 },
      { x: 320, y: 90 + Math.random() * 50 }
    ],
    [
      { x: -10, y: 60 + Math.random() * 80 },
      { x: 10, y: 80 + Math.random() * 60 },
      { x: 200, y: 70 + Math.random() * 70 },
      { x: 430, y: 90 + Math.random() * 50 }
    ],
    [
      { x: -20, y: 60 + Math.random() * 80 },
      { x: 100, y: 80 + Math.random() * 60 },
      { x: 100, y: 70 + Math.random() * 70 },
      { x: 220, y: 90 + Math.random() * 50 }
    ],
    // Path 2: Right to left
    [
      { x: 320, y: 70 + Math.random() * 80 },
      { x: 200, y: 90 + Math.random() * 60 },
      { x: 100, y: 60 + Math.random() * 70 },
      { x: -20, y: 80 + Math.random() * 50 }
    ],
    // Path 3: Circular motion
    [
      { x: 150, y: 60 },
      { x: 220, y: 90 },
      { x: 180, y: 130 },
      { x: 100, y: 110 },
      { x: 80, y: 80 }
    ]
  ];

  const selectedPath = swimPaths[index % swimPaths.length];
  const colors = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const fishColor = colors[index % colors.length];

  return (
    <motion.div
      className="absolute z-10"
      animate={{
        x: selectedPath.map(p => p.x),
        y: selectedPath.map(p => p.y),
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 1.2
      }}
    >
      <motion.svg
        width="28"
        height="14"
        viewBox="0 0 28 14"
        animate={{
          rotateY: index % 2 === 0 ? [0, 180, 0] : [180, 0, 180],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotateY: {
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        {/* Fish body */}
        <ellipse 
          cx="14" 
          cy="7" 
          rx="9" 
          ry="4" 
          fill={fishColor}
          stroke={fishColor}
          strokeWidth="0.5"
          opacity="0.9"
        />
        {/* Fish tail */}
        <motion.path 
          d="M5 7 L9 3 L9 11 Z" 
          fill={fishColor}
          animate={{
            d: [
              "M5 7 L9 3 L9 11 Z",
              "M5 7 L8 4 L8 10 Z",
              "M5 7 L9 3 L9 11 Z"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Fish eye */}
        <circle cx="18" cy="5" r="1.5" fill="white" />
        <circle cx="18.5" cy="5" r="0.8" fill="black" />
        {/* Dorsal fin */}
        <path d="M14 3 L16 1 L18 3" stroke={fishColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Pectoral fin */}
        <motion.path 
          d="M20 9 L22 11 L24 9" 
          stroke={fishColor} 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round"
          animate={{
            d: [
              "M20 9 L22 11 L24 9",
              "M20 9 L22 12 L24 9",
              "M20 9 L22 11 L24 9"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

const SeaPlant = ({ x, height, delay }: { x: number; height: number; delay: number }) => {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${x}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay * 0.5 }}
    >
      <motion.svg
        width="20"
        height={height}
        viewBox={`0 0 20 ${height}`}
        animate={{
          rotate: [-2, 2, -2],
          scaleX: [1, 1.1, 1]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <motion.path
          d={`M10 ${height} Q8 ${height * 0.7} 10 ${height * 0.5} Q12 ${height * 0.3} 10 0`}
          stroke="#2D7D32"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              `M10 ${height} Q8 ${height * 0.7} 10 ${height * 0.5} Q12 ${height * 0.3} 10 0`,
              `M10 ${height} Q12 ${height * 0.7} 10 ${height * 0.5} Q8 ${height * 0.3} 10 0`,
              `M10 ${height} Q8 ${height * 0.7} 10 ${height * 0.5} Q12 ${height * 0.3} 10 0`
            ]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Plant leaves */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.ellipse
            key={i}
            cx={10 + (i % 2 === 0 ? -3 : 3)}
            cy={height - (i + 1) * (height / 4)}
            rx="2"
            ry="8"
            fill="#4CAF50"
            opacity="0.8"
            animate={{
              rotate: [0, 10, 0, -10, 0],
              opacity: [0.8, 0.6, 0.8]
            }}
            transition={{
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

const Particle = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-200 opacity-30"
      animate={{
        x: [0, Math.random() * 300, Math.random() * 300],
        y: [0, Math.random() * 200, Math.random() * 200],
        opacity: [0.3, 0.1, 0.3]
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
        delay: index * 2
      }}
      style={{
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );
};

export const PondAnimation = ({ fishCount, waterFlow, aeration }: PondAnimationProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="relative h-60 lg:h-72 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 rounded-3xl overflow-hidden shadow-xl">
        
        {/* Animated water surface */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-40"
          animate={{
            x: [-100, 400, -100],
            scaleY: [1, 1.5, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Sea plants */}
        {Array.from({ length: 8 }).map((_, i) => (
          <SeaPlant 
            key={i} 
            x={10 + i * 12} 
            height={40 + Math.random() * 30} 
            delay={i * 0.5}
          />
        ))}

        {/* Fish */}
        {Array.from({ length: Math.min(fishCount, 100) }).map((_, i) => (
          <Fish key={i} index={i} />
        ))}

        {/* Enhanced bubble system */}
        {aeration && (
          <>
            {/* Main bubble stream */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  animate={{
                    y: [0, -280],
                    opacity: [0.8, 0.3, 0],
                    scale: [0.3, 1.5, 0.8],
                    x: [0, (Math.random() - 0.5) * 60]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                  style={{
                    width: `${Math.random() * 8 + 3}px`,
                    height: `${Math.random() * 8 + 3}px`,
                    left: `${(Math.random() - 0.5) * 30}px`,
                    bottom: '15px',
                  }}
                />
              ))}
            </div>
            {/* Secondary bubble streams */}
            {Array.from({ length: 2 }).map((_, streamIndex) => (
              <div 
                key={streamIndex}
                className="absolute bottom-0"
                style={{
                  left: streamIndex === 0 ? '20%' : '80%'
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white opacity-60"
                    animate={{
                      y: [0, -200],
                      opacity: [0.6, 0],
                      scale: [0.5, 1.2]
                    }}
                    transition={{
                      duration: 2.5 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 1.5,
                      ease: "easeOut"
                    }}
                    style={{
                      width: `${Math.random() * 5 + 2}px`,
                      height: `${Math.random() * 5 + 2}px`,
                      left: `${(Math.random() - 0.5) * 20}px`,
                      bottom: '10px',
                    }}
                  />
                ))}
              </div>
            ))}
          </>
        )}

        {/* Animated pond floor with rocks */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 opacity-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 rounded-full bg-gray-600 opacity-70"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
              style={{
                width: `${Math.random() * 15 + 8}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 90 + 5}%`,
              }}
            />
          ))}
        </div>
        
        {/* Clean info displays */}
        <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-white font-medium text-sm">{fishCount} fish</span>
        </div>

        {aeration && (
          <motion.div 
            className="absolute top-4 right-4 bg-white/15 backdrop-blur-md p-3 rounded-full border border-white/20"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse" />
          </motion.div>
        )}

        {/* Water flow indicator */}
        {waterFlow > 0 && (
          <motion.div
            className="absolute top-1/2 left-2 text-blue-200 opacity-60"
            animate={{
              x: [0, 8, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0L12 4H9V12H7V4H4L8 0Z" transform="rotate(90 8 8)" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
};