// agents.ts

// Utility functions remain unchanged
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`; // Using HSL for consistent brightness
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); // Get maximum 2 initials
}

export function generateDefaultLogo(name: string) {
  return {
    type: 'initials' as const,
    initials: getInitials(name),
    color: stringToColor(name)
  };
}

// Agent interface remains the same
export interface Agent {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string | { type: 'initials'; initials: string; color: string };
  category: string[];
  isOpenSource: boolean;
  github?: string;
  twitter?: string;
  discord?: string;
  lastUpdated?: string; // Made optional since it's not in agents.json
}

// Import the agents.json data
// Note: The exact import method depends on your build setup
// Option 1: For Node.js with ES Modules
// import agentsData from './agents.json' assert { type: 'json' };

// Option 2: For CommonJS or if using a bundler like Webpack/TypeScript
// const agentsData = require('./agents.json');

// Option 3: If you're using this in a specific framework, you might need to adjust the import
// For this example, I'll use Option 1 syntax

// Map the imported JSON data to include logos and ensure type safety
// export const agents: Agent[] = agentsData.map((agent: any) => ({
//   ...agent,
//   logo: agent.logo || generateDefaultLogo(agent.name),
//   lastUpdated: agent.lastUpdated || new Date().toISOString() // Add default lastUpdated if not present
// }));

// // Generate unique categories from all agents
// export const categories = Array.from(
//   new Set(agents.flatMap(agent => agent.category))
// ).sort();