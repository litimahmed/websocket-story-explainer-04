import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '../../data/animationChapters';
import { PostalServiceScene } from './scenes/PostalServiceScene';
import { FrustratedDeveloperScene } from './scenes/FrustratedDeveloperScene';

interface AnimationSceneProps {
  chapter: Chapter;
  isPlaying: boolean;
  progress: number;
  onProgressUpdate: (progress: number) => void;
}

export const AnimationScene: React.FC<AnimationSceneProps> = ({
  chapter,
  isPlaying,
  progress,
  onProgressUpdate,
}) => {
  const [internalProgress, setInternalProgress] = useState(progress);

  // Auto-advance progress when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setInternalProgress(prev => {
        const newProgress = prev + 0.1; // 100ms updates
        if (newProgress >= chapter.duration) {
          onProgressUpdate(chapter.duration);
          return chapter.duration;
        }
        onProgressUpdate(newProgress);
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, chapter.duration, onProgressUpdate]);

  // Sync with external progress changes
  useEffect(() => {
    setInternalProgress(progress);
  }, [progress]);

  const renderScene = () => {
    switch (chapter.id) {
      case 1:
        return (
          <PostalServiceScene 
            progress={internalProgress}
            duration={chapter.duration}
            isPlaying={isPlaying}
          />
        );
      case 2:
        return (
          <FrustratedDeveloperScene 
            progress={internalProgress}
            duration={chapter.duration}
            isPlaying={isPlaying}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {chapter.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {chapter.description}
              </p>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  Animation scene coming in next chunk...
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Chapter Title Overlay - Hidden */}

      {/* Scene Content */}
      <div className="w-full h-full">
        {renderScene()}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-lg border">
        <div className="text-xs text-muted-foreground">
          {Math.round((internalProgress / chapter.duration) * 100)}%
        </div>
      </div>
    </div>
  );
};