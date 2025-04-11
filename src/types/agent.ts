export interface Agent {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string | {
    type: 'initials';
    initials: string;
    color: string;
  };
  category: string[];
  isOpenSource: boolean;
  github?: string;
  githubStars?: number;
  twitter?: string;
  discord?: string;
  lastUpdated: string;
}