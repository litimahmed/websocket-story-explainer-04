import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { Chapter } from '../../data/animationChapters';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapter: number;
  onChapterSelect: (chapterIndex: number) => void;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  chapters,
  currentChapter,
  onChapterSelect,
}) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSceneTypeColor = (sceneType: Chapter['sceneType']) => {
    switch (sceneType) {
      case 'introduction':
        return 'bg-primary text-primary-foreground';
      case 'technical':
        return 'bg-secondary text-secondary-foreground';
      case 'demonstration':
        return 'bg-accent text-accent-foreground';
      case 'conclusion':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sidebar-foreground mb-2">
          WebSocket Story adzaygduza
        </h2>
        <p className="text-sm text-sidebar-foreground/70">
          Professional Animation Series
        </p>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={currentChapter === index ? "default" : "ghost"}
              onClick={() => onChapterSelect(index)}
              className="w-full justify-start p-4 h-auto text-left"
            >
              <div className="flex items-start space-x-3 w-full">
                {/* Chapter Number */}
                <div className="flex-shrink-0">
                  {currentChapter === index ? (
                    <div className="w-6 h-6 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {chapter.id}
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                      {chapter.id}
                    </div>
                  )}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate">
                    {chapter.title}
                  </h3>
                  <p className="text-xs opacity-70 mb-2 line-clamp-2">
                    {chapter.description}
                  </p>
                  
                  {/* Duration and Type */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs opacity-60">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(chapter.duration)}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getSceneTypeColor(chapter.sceneType)}`}
                    >
                      {chapter.sceneType}
                    </Badge>
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/70 mb-2">
          Progress: {currentChapter + 1} of {chapters.length} chapters
        </div>
        <div className="w-full bg-sidebar-accent rounded-full h-2">
          <div 
            className="bg-sidebar-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};