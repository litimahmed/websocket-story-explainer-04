import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Zap, ArrowRight, Timer, Wifi, WifiOff } from 'lucide-react';
import postOfficeImg from '@/assets/post-office.png';
import clientBuildingImg from '@/assets/client-building.png';
import flyingLetterImg from '@/assets/flying-letter.png';

// Animation calculation utilities
const calculateLinearPath = (startX: number, startY: number, endX: number, endY: number, progress: number) => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  return {
    x: startX + (deltaX * progress),
    y: startY + (deltaY * progress)
  };
};

const getPhaseProgress = (totalProgress: number, phaseStart: number, phaseEnd: number) => {
  if (totalProgress < phaseStart) return 0;
  if (totalProgress > phaseEnd) return 1;
  return (totalProgress - phaseStart) / (phaseEnd - phaseStart);
};

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
  // Precise phase timing based on progress percentage
  const progressPercent = (progress / duration) * 100;
  
  // Define exact positions for components (mathematical coordinates)
  const CLIENT_POS = { x: 120, y: 200 };
  const SERVER_POS = { x: 680, y: 200 };
  const CANVAS_CENTER = { x: 400, y: 200 };
  
  // Phase definitions with exact timing
  const PHASES = {
    INTRO: { start: 0, end: 15 },
    HTTP_DEMO: { start: 15, end: 60 },
    ISSUES: { start: 60, end: 85 },
    SOLUTION: { start: 85, end: 100 }
  };
  
  // Calculate current phase states
  const introProgress = getPhaseProgress(progressPercent, PHASES.INTRO.start, PHASES.INTRO.end);
  const httpProgress = getPhaseProgress(progressPercent, PHASES.HTTP_DEMO.start, PHASES.HTTP_DEMO.end);
  const issuesProgress = getPhaseProgress(progressPercent, PHASES.ISSUES.start, PHASES.ISSUES.end);
  const solutionProgress = getPhaseProgress(progressPercent, PHASES.SOLUTION.start, PHASES.SOLUTION.end);
  
  // HTTP Request/Response cycle calculation
  const cycleTime = 4; // seconds per complete cycle
  const cycleDuration = (PHASES.HTTP_DEMO.end - PHASES.HTTP_DEMO.start);
  const httpCycleProgress = ((progressPercent - PHASES.HTTP_DEMO.start) % (cycleDuration / 3)) / (cycleDuration / 3);
  
  // Request path (Client to Server)
  const requestPath = calculateLinearPath(
    CLIENT_POS.x + 32, CLIENT_POS.y,
    SERVER_POS.x - 32, SERVER_POS.y,
    Math.min(httpCycleProgress * 2, 1)
  );
  
  // Response path (Server to Client) - starts when request completes
  const responseProgress = Math.max(0, (httpCycleProgress - 0.5) * 2);
  const responsePath = calculateLinearPath(
    SERVER_POS.x - 32, SERVER_POS.y + 40,
    CLIENT_POS.x + 32, CLIENT_POS.y + 40,
    Math.min(responseProgress, 1)
  );
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-postal-bg font-inter">
      {/* Professional Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--postal-secondary))" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-8">
        {/* Professional Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center pt-16 mb-20"
        >
          <h1 className="text-4xl font-semibold text-postal-primary mb-4 tracking-tight">
            HTTP Communication Model
          </h1>
          <motion.p 
            className="text-lg text-postal-secondary max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Understanding request-response limitations in real-time applications
          </motion.p>
        </motion.div>

        {/* Main Animation Stage with Mathematical Positioning */}
        <div className="relative h-96 mb-16">
          {/* Client Building - Precise positioning */}
          <motion.div
            initial={{ opacity: 0, x: CLIENT_POS.x - 100, scale: 0.8 }}
            animate={introProgress > 0 ? { 
              opacity: 1, 
              x: CLIENT_POS.x, 
              scale: 1
            } : {}}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className="absolute"
            style={{ left: CLIENT_POS.x, top: CLIENT_POS.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <img 
                src={clientBuildingImg} 
                alt="Client Application" 
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={introProgress > 0.3 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32"
              >
                <div className="bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-postal-accent shadow-sm">
                  <h3 className="font-semibold text-center text-postal-primary text-sm">CLIENT</h3>
                  <p className="text-xs text-center text-postal-secondary">Web Application</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${httpProgress > 0 ? 'bg-postal-warn animate-pulse' : 'bg-postal-secondary'}`} />
                    <span className="text-xs text-postal-secondary">
                      {httpProgress > 0 ? 'Requesting...' : 'Idle'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Server Building - Precise positioning */}
          <motion.div
            initial={{ opacity: 0, x: SERVER_POS.x + 100, scale: 0.8 }}
            animate={introProgress > 0 ? { 
              opacity: 1, 
              x: SERVER_POS.x, 
              scale: 1
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2, 
              ease: "easeOut"
            }}
            className="absolute"
            style={{ left: SERVER_POS.x, top: SERVER_POS.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <img 
                src={postOfficeImg} 
                alt="Server Infrastructure" 
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={introProgress > 0.5 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32"
              >
                <div className="bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-postal-accent shadow-sm">
                  <h3 className="font-semibold text-center text-postal-primary text-sm">SERVER</h3>
                  <p className="text-xs text-center text-postal-secondary">Backend API</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-postal-success mr-2" />
                    <span className="text-xs text-postal-secondary">Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mathematical HTTP Request Animation */}
          <AnimatePresence>
            {httpProgress > 0 && isPlaying && (
              <>
                {/* Request Letter - Linear path calculation */}
                <motion.div
                  key="request"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: httpCycleProgress <= 0.5 ? 1 : 0,
                    scale: 1,
                    x: requestPath.x,
                    y: requestPath.y
                  }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ 
                    duration: 0.1,
                    ease: "linear"
                  }}
                  className="absolute z-20"
                >
                  <div className="relative">
                    <img 
                      src={flyingLetterImg} 
                      alt="HTTP Request" 
                      className="w-12 h-12 object-contain"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-postal-primary rounded-full flex items-center justify-center">
                      <ArrowRight className="w-2 h-2 text-white" />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium text-postal-primary bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                        Request
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Response Letter - Linear path calculation */}
                {responseProgress > 0 && (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: responseProgress < 1 ? 1 : 0,
                      scale: 1,
                      x: responsePath.x,
                      y: responsePath.y
                    }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ 
                      duration: 0.1,
                      ease: "linear"
                    }}
                    className="absolute z-20"
                  >
                    <div className="relative">
                      <img 
                        src={flyingLetterImg} 
                        alt="HTTP Response" 
                        className="w-12 h-12 object-contain transform scale-x-[-1]"
                      />
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-postal-success rounded-full flex items-center justify-center">
                        <ArrowRight className="w-2 h-2 text-white transform rotate-180" />
                      </div>
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-medium text-postal-success bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                          Response
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Performance Issues Analysis */}
          <AnimatePresence>
            {issuesProgress > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30"
              >
                <div className="bg-card/95 backdrop-blur-lg border border-postal-warn/20 p-6 rounded-xl shadow-lg max-w-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-postal-warn" />
                    <h3 className="font-semibold text-postal-primary">Performance Constraints</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Timer className="w-4 h-4 text-postal-warn" />
                      <span className="text-postal-secondary">Round-trip latency: 200-500ms</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-postal-warn" />
                      <span className="text-postal-secondary">Connection overhead per request</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <WifiOff className="w-4 h-4 text-postal-warn" />
                      <span className="text-postal-secondary">No persistent connection</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WebSocket Solution Preview */}
          <AnimatePresence>
            {solutionProgress > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30"
              >
                <div className="bg-card/95 backdrop-blur-lg border border-postal-primary/20 p-8 rounded-xl shadow-lg text-center max-w-lg">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Zap className="w-10 h-10 text-postal-primary mx-auto" />
                  </motion.div>
                  <h3 className="font-semibold text-xl text-postal-primary mb-3">
                    WebSocket Solution
                  </h3>
                  <p className="text-postal-secondary font-medium">
                    Persistent connection • Real-time bidirectional communication • Low latency
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Professional Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: issuesProgress > 0.3 ? 1 : 0, y: issuesProgress > 0.3 ? 0 : 15 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-6"
        >
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-postal-accent text-center">
            <Clock className="w-6 h-6 text-postal-warn mx-auto mb-3" />
            <h4 className="font-semibold text-postal-primary mb-2">Request-Response Cycle</h4>
            <p className="text-sm text-postal-secondary">Full round trip required for each interaction</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-postal-accent text-center">
            <Timer className="w-6 h-6 text-postal-warn mx-auto mb-3" />
            <h4 className="font-semibold text-postal-primary mb-2">Latency Accumulation</h4>
            <p className="text-sm text-postal-secondary">Network delays compound over time</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-postal-accent text-center">
            <WifiOff className="w-6 h-6 text-postal-warn mx-auto mb-3" />
            <h4 className="font-semibold text-postal-primary mb-2">No Real-time Updates</h4>
            <p className="text-sm text-postal-secondary">Polling creates unnecessary overhead</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};