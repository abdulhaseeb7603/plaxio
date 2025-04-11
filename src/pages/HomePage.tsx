import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AgentCard } from '../components/AgentCard';
import type { Agent } from '../data/agents';
import { generateDefaultLogo } from '../data/agents';

function getUniqueCategories(agentsList: Agent[]): string[] {
  if (!agentsList || agentsList.length === 0) {
    return [];
  }
  const allCategories = agentsList.flatMap(agent =>
    Array.isArray(agent.category) ? agent.category : []
  );
  return Array.from(new Set(allCategories)).sort();
}

export function HomePage() {
  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://plaxio-backend.vercel.app/api/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let fetchedAgents: Agent[] = await response.json();

        fetchedAgents = fetchedAgents.map(agent => ({
            ...agent,
            logo: agent.logo || generateDefaultLogo(agent.name)
        }));

        setAllAgents(fetchedAgents);
        setFilteredAgents(fetchedAgents);
        setCategories(getUniqueCategories(fetchedAgents));
      } catch (e) {
        console.error("Failed to fetch agents:", e);
        setError(e instanceof Error ? e.message : "Failed to load agents.");
        setAllAgents([]);
        setFilteredAgents([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    const filterAndSearch = () => {
      const agentsToFilter = allAgents.filter(agent => {
          const agentCategories = Array.isArray(agent.category) ? agent.category : [];
          const matchesCategory = !selectedCategory || agentCategories.includes(selectedCategory);

          const matchesSearch = !searchTerm ||
              (agent.name && agent.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (agent.description && agent.description.toLowerCase().includes(searchTerm.toLowerCase()));

          return matchesCategory && matchesSearch;
      });
      setFilteredAgents(agentsToFilter);
    };

    filterAndSearch();
  }, [allAgents, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onSearch={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto py-8">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Supercharge Your AI with {''}
            <span className="inline-block bg-blue-600 text-white dark:bg-white dark:text-black px-2 py-1 rounded transform rotate-2">
              MCPs
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             Handpicked MCP servers to boost your AI agents with tools and data.
          </p>
          <div className="mt-4 flex justify-center">
            <a 
              href="https://www.producthunt.com/posts/github-915ffd46-5c12-48c9-a233-96c8c7710ce0?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github&#0045;915ffd46&#0045;5c12&#0045;48c9&#0045;a233&#0045;96c8c7710ce0" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=560712&theme=light" 
                alt="GitHub - Dambrubaba/directory-boilerplate | Product Hunt" 
                style={{ width: '250px', height: '54px' }}
                width="250" 
                height="54" 
              />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 py-4 px-4 sm:px-6 lg:px-8 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${selectedCategory === null
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === category
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 px-4 sm:px-6 lg:px-8">
          {isLoading && <p className="text-center text-gray-600 dark:text-gray-400">Loading agents...</p>}
          {error && <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>}
          {!isLoading && !error && filteredAgents.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400">No agents found matching your criteria.</p>
          )}
          {!isLoading && !error && filteredAgents.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}