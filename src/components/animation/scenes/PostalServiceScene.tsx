import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Zap, ArrowRight, Timer, Wifi, WifiOff } from 'lucide-react';
import postOfficeImg from '@/assets/post-office.png';
import clientBuildingImg from '@/assets/client-building.png';
import flyingLetterImg from '@/assets/flying-letter.png';

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
  // More precise phase timing based on progress percentage
  const progressPercent = (progress / duration) * 100;
  
  const phase1Start = progressPercent >= 10; // Buildings appear
  const phase2Start = progressPercent >= 25; // HTTP communication starts
  const phase3Start = progressPercent >= 50; // Show inefficiencies
  const phase4Start = progressPercent >= 75; // Need for real-time

  // Letter animation timing
  const letterCycleProgress = (progressPercent % 25) / 25; // 4 cycles per 100%
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-postal-bg-start to-postal-bg-end">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-postal-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase1Start ? 0.3 : 0 }}
              transition={{ delay: i * 0.01, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center pt-12 mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-postal-primary to-postal-accent bg-clip-text text-transparent mb-6">
            The Digital Postal Service
          </h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Understanding the limitations of traditional HTTP communication
          </motion.p>
        </motion.div>

        {/* Main Animation Stage */}
        <div className="relative h-96 mb-12">
          {/* Client Building */}
          <motion.div
            initial={{ opacity: 0, x: -200, scale: 0.8 }}
            animate={phase1Start ? { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              rotateY: [0, 5, 0]
            } : {}}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              rotateY: { repeat: Infinity, duration: 6 }
            }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2"
          >
            <div className="relative">
              <img 
                src={clientBuildingImg} 
                alt="Client Building" 
                className="w-32 h-32 object-contain drop-shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase1Start ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40"
              >
                <div className="bg-card/95 backdrop-blur-sm p-4 rounded-xl border-2 border-postal-primary/20 shadow-lg">
                  <h3 className="font-bold text-center text-postal-primary">CLIENT</h3>
                  <p className="text-sm text-center text-muted-foreground">Web Browser</p>
                  <div className="flex items-center justify-center mt-2">
                    <WifiOff className="w-4 h-4 text-postal-warn mr-1" />
                    <span className="text-xs text-postal-warn">Waiting...</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Server Building (Post Office) */}
          <motion.div
            initial={{ opacity: 0, x: 200, scale: 0.8 }}
            animate={phase1Start ? { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              rotateY: [0, -5, 0]
            } : {}}
            transition={{ 
              duration: 1.2, 
              delay: 0.3, 
              ease: "easeOut",
              rotateY: { repeat: Infinity, duration: 6, delay: 3 }
            }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2"
          >
            <div className="relative">
              <img 
                src={postOfficeImg} 
                alt="Post Office Server" 
                className="w-32 h-32 object-contain drop-shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase1Start ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40"
              >
                <div className="bg-card/95 backdrop-blur-sm p-4 rounded-xl border-2 border-postal-success/20 shadow-lg">
                  <h3 className="font-bold text-center text-postal-success">SERVER</h3>
                  <p className="text-sm text-center text-muted-foreground">Post Office</p>
                  <div className="flex items-center justify-center mt-2">
                    <Wifi className="w-4 h-4 text-postal-success mr-1" />
                    <span className="text-xs text-postal-success">Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* HTTP Request Letters Animation */}
          <AnimatePresence>
            {phase2Start && (
              <>
                {/* Request Letter (Client to Server) */}
                <motion.div
                  key={`request-${Math.floor(progressPercent / 25)}`}
                  initial={{ x: 120, y: 120, opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ 
                    x: 420,
                    y: 140,
                    opacity: 1,
                    scale: 1,
                    rotate: 10,
                  }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ 
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: isPlaying ? Infinity : 0,
                    repeatDelay: 1.5,
                  }}
                  className="absolute"
                >
                  <div className="relative">
                    <img 
                      src={flyingLetterImg} 
                      alt="HTTP Request" 
                      className="w-16 h-16 object-contain"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-postal-primary rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-3 h-3 text-white" />
                    </motion.div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-semibold text-postal-primary bg-white/90 px-2 py-1 rounded-full">
                        HTTP Request
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Response Letter (Server to Client) */}
                <motion.div
                  key={`response-${Math.floor(progressPercent / 25)}`}
                  initial={{ x: 420, y: 200, opacity: 0, scale: 0.5, rotate: 10 }}
                  animate={{ 
                    x: 120,
                    y: 180,
                    opacity: 1,
                    scale: 1,
                    rotate: -10,
                  }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ 
                    duration: 2.5,
                    delay: 1,
                    ease: "easeInOut",
                    repeat: isPlaying ? Infinity : 0,
                    repeatDelay: 1.5,
                  }}
                  className="absolute"
                >
                  <div className="relative">
                    <img 
                      src={flyingLetterImg} 
                      alt="HTTP Response" 
                      className="w-16 h-16 object-contain transform scale-x-[-1]"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -left-2 w-6 h-6 bg-postal-success rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-3 h-3 text-white transform rotate-180" />
                    </motion.div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-semibold text-postal-success bg-white/90 px-2 py-1 rounded-full">
                        HTTP Response
                      </span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Performance Issues Overlay */}
          <AnimatePresence>
            {phase3Start && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="bg-postal-warn/10 backdrop-blur-lg border-2 border-postal-warn/30 p-6 rounded-2xl shadow-2xl max-w-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-6 h-6 text-postal-warn" />
                    </motion.div>
                    <h3 className="font-bold text-postal-warn text-lg">Performance Issues</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Timer className="w-4 h-4 text-postal-warn" />
                      <span className="text-sm">Round-trip latency: ~500ms</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-postal-warn" />
                      <span className="text-sm">Connection overhead: High</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <WifiOff className="w-4 h-4 text-postal-warn" />
                      <span className="text-sm">Real-time updates: Impossible</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Real-time Solution Preview */}
          <AnimatePresence>
            {phase4Start && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="bg-gradient-to-r from-postal-primary/20 to-postal-accent/20 backdrop-blur-lg border-2 border-postal-primary/30 p-8 rounded-2xl shadow-2xl text-center max-w-lg">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Zap className="w-12 h-12 text-postal-primary mx-auto" />
                  </motion.div>
                  <h3 className="font-bold text-2xl text-postal-primary mb-3">
                    WebSockets to the Rescue!
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time, bidirectional communication
                    <br />
                    Low latency • Always connected • Efficient
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase3Start ? 1 : 0, y: phase3Start ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6"
        >
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-postal-warn/20 text-center">
            <Clock className="w-8 h-8 text-postal-warn mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">Request-Response</h4>
            <p className="text-sm text-muted-foreground">Every interaction requires a full round trip</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-postal-warn/20 text-center">
            <Timer className="w-8 h-8 text-postal-warn mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">High Latency</h4>
            <p className="text-sm text-muted-foreground">Network delays compound over time</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-postal-warn/20 text-center">
            <WifiOff className="w-8 h-8 text-postal-warn mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">No Real-time</h4>
            <p className="text-sm text-muted-foreground">Polling creates unnecessary overhead</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};