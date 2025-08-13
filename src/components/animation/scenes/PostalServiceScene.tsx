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
  return (
    <div className="w-full h-full bg-slate-900">
      {/* Clean canvas - ready for animation */}
    </div>
  );
};