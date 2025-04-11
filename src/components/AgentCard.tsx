import { Agent } from '../types/agent';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  const renderLogo = () => {
    if (typeof agent.logo === 'string') {
      // Check if the logo URL is valid
      if (!agent.logo || agent.logo.includes('undefined') || agent.logo.includes('null')) {
        // Fallback to initials if URL is invalid
        return (
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-base font-medium bg-gray-400"
          >
            {agent.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        );
      }
      // Valid URL logo
      return (
        <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 p-1.5">
          <img 
            src={agent.logo} 
            alt={agent.name} 
            className="w-full h-full object-contain" 
            onError={(e) => {
              // Fallback to initials if image fails to load
              const parent = e.currentTarget.parentElement;
              if (parent) {
                  parent.innerHTML = agent.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();
                parent.classList.add('text-white', 'text-base', 'font-medium', 'bg-gray-400', 'items-center', 'justify-center', 'flex'); // Ensure fallback has styles
                parent.style.padding = ''; // Remove padding if set for image container
              }
            }}
          />
        </div>
      );
    }

    // Initials logo (if agent.logo is not a string or is undefined)
    return (
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-base font-medium"
        style={{ backgroundColor: agent.logo?.color || '#9CA3AF' }} // Use optional chaining for color
      >
        {agent.logo?.initials || agent.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-start gap-4">
        {renderLogo()}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{agent.description}</p>
        </div>
      </div>
    
      <div className="mt-4 flex flex-wrap gap-2 items-center"> 
        {agent.category.map((cat) => (
          <span 
            key={cat}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {cat}
          </span>
        ))}
        {agent.isOpenSource && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Open Source
          </span>
        )}
        {typeof agent.githubStars === 'number' && agent.githubStars >= 0 && (
          <span 
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              agent.githubStars > 0 
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            <Star className="mr-1" size={14} /> 
            {agent.githubStars.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}