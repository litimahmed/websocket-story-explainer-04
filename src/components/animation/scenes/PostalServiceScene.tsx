import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Wifi, Monitor } from 'lucide-react';

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
  const showClient = progress <= 5;

  return (
    <div className="w-full h-full bg-background flex items-center justify-center">
      {showClient && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full max-w-4xl mx-auto px-8"
        >
          {/* Modern Client Application Interface */}
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-muted border-b border-border px-6 py-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-background rounded-lg px-4 py-2 mx-4">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Shield className="w-4 h-4" />
                  <span>https://myapp.example.com</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Application Content */}
            <div className="p-8 bg-gradient-to-br from-background to-muted/30">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">Client Application</h1>
                    <p className="text-muted-foreground">Modern Web Interface</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
              </div>

              {/* Main Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Primary Panel */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    <div className="h-32 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="h-3 bg-muted rounded w-full mb-3 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="h-3 bg-muted rounded w-full mb-3 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
                <span>Ready to communicate</span>
                <span>Client v2.1.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};