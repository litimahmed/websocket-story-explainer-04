export interface Chapter {
  id: number;
  title: string;
  duration: number; // in seconds
  transcriptLines: [number, number]; // start and end line numbers
  description: string;
  sceneType: 'introduction' | 'technical' | 'demonstration' | 'conclusion';
  keyPoints: string[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Digital Postal Service",
    duration: 180, // 3 minutes
    transcriptLines: [1, 22],
    description: "Traditional HTTP communication metaphor using postal service",
    sceneType: 'introduction',
    keyPoints: [
      "HTTP request-response model",
      "Inefficiencies of polling",
      "Need for real-time communication"
    ]
  },
  {
    id: 2,
    title: "The Frustrated Developer",
    duration: 240, // 4 minutes
    transcriptLines: [23, 45],
    description: "Developer struggling with HTTP polling limitations",
    sceneType: 'introduction',
    keyPoints: [
      "Chat application challenges",
      "Polling vs long-polling",
      "Server resource consumption",
      "User experience issues"
    ]
  },
  {
    id: 3,
    title: "The Birth of WebSocket",
    duration: 200, // 3.3 minutes
    transcriptLines: [46, 88],
    description: "WebSocket protocol emergence and timeline",
    sceneType: 'introduction',
    keyPoints: [
      "Protocol standardization timeline",
      "RFC 6455 specification",
      "Browser adoption",
      "Industry impact"
    ]
  },
  {
    id: 4,
    title: "The Handshake Ballet",
    duration: 300, // 5 minutes
    transcriptLines: [89, 128],
    description: "WebSocket handshake process choreography",
    sceneType: 'technical',
    keyPoints: [
      "HTTP upgrade request",
      "WebSocket accept key",
      "Protocol negotiation",
      "Connection establishment"
    ]
  },
  // Additional chapters will be added in subsequent chunks
];

export const getTotalDuration = () => {
  return chapters.reduce((total, chapter) => total + chapter.duration, 0);
};

export const getChapterProgress = (chapterIndex: number, progress: number) => {
  const chapter = chapters[chapterIndex];
  return chapter ? (progress / chapter.duration) * 100 : 0;
};