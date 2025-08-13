import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

interface TimelineControlsProps {
  isPlaying: boolean;
  progress: number; // in seconds
  duration: number; // in seconds
  onPlay: () => void;
  onPause: () => void;
  onProgressChange: (progress: number) => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  isPlaying,
  progress,
  duration,
  onPlay,
  onPause,
  onProgressChange,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  const handleSliderChange = (value: number[]) => {
    const newProgress = (value[0] / 100) * duration;
    onProgressChange(newProgress);
  };

  const handleSkipBack = () => {
    const newProgress = Math.max(0, progress - 10);
    onProgressChange(newProgress);
  };

  const handleSkipForward = () => {
    const newProgress = Math.min(duration, progress + 10);
    onProgressChange(newProgress);
  };

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground font-mono">
          {formatTime(progress)}
        </span>
        
        <div className="flex-1">
          <Slider
            value={[progressPercentage]}
            onValueChange={handleSliderChange}
            max={100}
            step={0.1}
            className="w-full"
          />
        </div>
        
        <span className="text-sm text-muted-foreground font-mono">
          {formatTime(duration)}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipBack}
          className="w-10 h-10"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={isPlaying ? onPause : onPlay}
          className="w-12 h-12"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipForward}
          className="w-10 h-10"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Animation Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {isPlaying ? 'Playing...' : 'Paused'} • 
          WebSocket Educational Animation Series
        </p>
      </div>
    </div>
  );
};