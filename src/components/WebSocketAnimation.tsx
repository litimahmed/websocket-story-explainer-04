import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterNavigation } from './animation/ChapterNavigation';
import { TimelineControls } from './animation/TimelineControls';
import { AnimationScene } from './animation/AnimationScene';
import { chapters } from '../data/animationChapters';

export const WebSocketAnimation = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChapterChange = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
    setProgress(0);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Animation Area */}
      <div className="flex">
        {/* Chapter Navigation Sidebar */}
        <div className="w-80 bg-sidebar border-r border-sidebar-border">
          <ChapterNavigation
            chapters={chapters}
            currentChapter={currentChapter}
            onChapterSelect={handleChapterChange}
          />
        </div>

        {/* Animation Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Animation Scene */}
          <div className="flex-1 relative bg-gradient-to-br from-background to-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <AnimationScene
                  chapter={chapters[currentChapter]}
                  isPlaying={isPlaying}
                  progress={progress}
                  onProgressUpdate={handleProgressChange}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timeline Controls */}
          <div className="bg-card border-t border-border p-4">
            <TimelineControls
              isPlaying={isPlaying}
              progress={progress}
              duration={chapters[currentChapter]?.duration || 0}
              onPlay={handlePlay}
              onPause={handlePause}
              onProgressChange={handleProgressChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};