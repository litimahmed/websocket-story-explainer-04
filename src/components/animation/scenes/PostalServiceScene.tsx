import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, ArrowRight, Building2 } from 'lucide-react';

interface PostalServiceSceneProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
}

export const PostalServiceScene: React.FC<PostalServiceSceneProps> = ({
  progress,
  duration,
  isPlaying,
}) => {
  // Calculate animation phases based on progress
  const phase1 = progress > 20; // Show traditional HTTP
  const phase2 = progress > 60; // Show inefficiencies
  const phase3 = progress > 120; // Show need for real-time

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
      <div className="max-w-6xl w-full px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            The Digital Postal Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding traditional HTTP communication
          </p>
        </motion.div>

        {/* Main Animation Area */}
        <div className="relative h-96">
          {/* Client Building */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={phase1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
          >
            <div className="flex flex-col items-center">
              <Building2 className="w-20 h-20 text-primary mb-2" />
              <div className="bg-card p-4 rounded-lg border shadow-lg">
                <h3 className="font-bold text-center">Client</h3>
                <p className="text-sm text-muted-foreground">Web Browser</p>
              </div>
            </div>
          </motion.div>

          {/* Server Building */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={phase1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
          >
            <div className="flex flex-col items-center">
              <Building2 className="w-20 h-20 text-secondary mb-2" />
              <div className="bg-card p-4 rounded-lg border shadow-lg">
                <h3 className="font-bold text-center">Server</h3>
                <p className="text-sm text-muted-foreground">Web Server</p>
              </div>
            </div>
          </motion.div>

          {/* HTTP Request Letters */}
          {phase1 && (
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ 
                x: phase2 ? 400 : 200,
                opacity: 1,
              }}
              transition={{ 
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 3,
              }}
              className="absolute top-1/3 transform -translate-y-1/2"
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-8 h-8 text-blue-600" />
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">HTTP Request</span>
              </div>
            </motion.div>
          )}

          {/* HTTP Response Letters */}
          {phase1 && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ 
                x: phase2 ? 80 : 200,
                opacity: 1,
              }}
              transition={{ 
                duration: 2,
                delay: 1,
                repeat: isPlaying ? Infinity : 0,
                repeatDelay: 3,
              }}
              className="absolute top-2/3 transform -translate-y-1/2"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">HTTP Response</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180" />
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>
          )}

          {/* Inefficiency Indicators */}
          {phase2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-destructive">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Inefficient!</span>
                </div>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Round-trip delays</li>
                  <li>• HTTP overhead</li>
                  <li>• Connection setup cost</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Real-time Need */}
          {phase3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-center">
                <h4 className="font-bold text-primary mb-2">
                  Need for Real-time Communication
                </h4>
                <p className="text-sm text-muted-foreground">
                  Chat apps, live updates, real-time data
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase2 ? 1 : 0 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="bg-card p-4 rounded-lg border text-center">
            <h4 className="font-bold mb-2">Request-Response</h4>
            <p className="text-sm text-muted-foreground">
              Traditional HTTP pattern
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border text-center">
            <h4 className="font-bold mb-2">High Latency</h4>
            <p className="text-sm text-muted-foreground">
              Network round trips
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border text-center">
            <h4 className="font-bold mb-2">Resource Heavy</h4>
            <p className="text-sm text-muted-foreground">
              Connection overhead
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};