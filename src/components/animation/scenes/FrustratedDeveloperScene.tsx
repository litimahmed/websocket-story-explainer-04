import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, RefreshCw, AlertTriangle, User, Zap } from 'lucide-react';

interface FrustratedDeveloperSceneProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
}

export const FrustratedDeveloperScene: React.FC<FrustratedDeveloperSceneProps> = ({
  progress,
  duration,
  isPlaying,
}) => {
  // Calculate animation phases
  const phase1 = progress > 15; // Show chat app
  const phase2 = progress > 60; // Show polling issues
  const phase3 = progress > 120; // Show frustration
  const phase4 = progress > 180; // Show solution need

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-950">
      <div className="max-w-6xl w-full px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            The Frustrated Developer
          </h1>
          <p className="text-lg text-muted-foreground">
            Struggling with real-time chat using HTTP polling
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 h-96">
          {/* Developer Side */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="relative">
                <User className="w-24 h-24 text-primary" />
                {phase3 && (
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: isPlaying ? Infinity : 0,
                      repeatDelay: 2 
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </motion.div>
                )}
              </div>
              <h3 className="text-xl font-bold mt-4">Developer Sarah</h3>
              <p className="text-sm text-muted-foreground">Building a chat app</p>
            </motion.div>

            {/* Thought Bubble */}
            {phase3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-4 rounded-lg border shadow-lg relative"
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-card border-l border-t transform rotate-45"></div>
                <p className="text-sm italic text-muted-foreground">
                  "Why is my chat so slow? 😤<br/>
                  Users are complaining about delays!"
                </p>
              </motion.div>
            )}
          </div>

          {/* Chat Application Mockup */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={phase1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-card border rounded-lg h-full overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-primary text-primary-foreground p-3 border-b">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Real-time Chat</span>
                  {phase2 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 1, 
                        repeat: isPlaying ? Infinity : 0,
                        ease: "linear" 
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-3 h-64 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                  className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg max-w-xs"
                >
                  <p className="text-sm">Hey! How's the app coming along?</p>
                  <span className="text-xs text-muted-foreground">10:30 AM</span>
                </motion.div>

                {phase2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg max-w-xs ml-auto"
                  >
                    <p className="text-sm">It's slow... HTTP polling issues 😓</p>
                    <span className="text-xs text-muted-foreground">10:31 AM</span>
                  </motion.div>
                )}

                {phase3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg max-w-xs"
                  >
                    <p className="text-sm">This message took 5 seconds to appear!</p>
                    <span className="text-xs text-muted-foreground">10:31 AM</span>
                  </motion.div>
                )}
              </div>

              {/* Loading Indicator */}
              {phase2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: isPlaying ? Infinity : 0 
                  }}
                  className="absolute bottom-4 left-4 flex items-center space-x-2 text-muted-foreground"
                >
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  <span className="text-xs">Checking for new messages...</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Problem Indicators */}
        {phase2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg text-center">
              <RefreshCw className="w-8 h-8 text-destructive mx-auto mb-2" />
              <h4 className="font-bold text-destructive mb-1">Constant Polling</h4>
              <p className="text-sm text-muted-foreground">
                Server requests every second
              </p>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg text-center">
              <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <h4 className="font-bold text-destructive mb-1">High Latency</h4>
              <p className="text-sm text-muted-foreground">
                3-5 second message delays
              </p>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg text-center">
              <Zap className="w-8 h-8 text-destructive mx-auto mb-2" />
              <h4 className="font-bold text-destructive mb-1">Resource Waste</h4>
              <p className="text-sm text-muted-foreground">
                Unnecessary server load
              </p>
            </div>
          </motion.div>
        )}

        {/* Solution Teaser */}
        {phase4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg inline-block">
              <h3 className="text-xl font-bold text-primary mb-2">
                There must be a better way...
              </h3>
              <p className="text-muted-foreground">
                What if we could maintain a persistent connection?
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};