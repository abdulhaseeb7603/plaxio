import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Github, Twitter, Calendar } from 'lucide-react';
// Remove the static agents import
// import { agents } from '../data/agents';
import type { Agent } from '../data/agents'; // Keep the type import
// Keep utility import if needed, e.g., for default logo fallback
import { generateDefaultLogo } from '../data/agents';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown support

export function AgentDetailPage() {
  const { id } = useParams<{ id: string }>(); // Ensure id is treated as string

  // State for the fetched agent data, loading, and error
  const [agentData, setAgentData] = useState<Agent | null>(null);
  const [isLoadingAgent, setIsLoadingAgent] = useState(true);
  const [agentError, setAgentError] = useState<string | null>(null);

  // State for README fetching remains separate
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // --- Fetch Agent Data ---
  useEffect(() => {
    if (!id) {
      setAgentError("No agent ID provided.");
      setIsLoadingAgent(false);
      return;
    }

    const fetchAgent = async () => {
      setIsLoadingAgent(true);
      setAgentError(null);
      setAgentData(null); // Reset previous agent data

      try {
        const response = await fetch(`http://localhost:3001/api/agents/${id}`); // Fetch from backend
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Agent not found or not approved.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let fetchedAgent: Agent = await response.json();

        // Optional: Apply default logo logic if backend doesn't provide it
        fetchedAgent = {
            ...fetchedAgent,
            logo: fetchedAgent.logo || generateDefaultLogo(fetchedAgent.name)
        };

        setAgentData(fetchedAgent);
      } catch (e) {
        console.error("Failed to fetch agent:", e);
        setAgentError(e instanceof Error ? e.message : "Failed to load agent data.");
      } finally {
        setIsLoadingAgent(false);
      }
    };

    fetchAgent();
  }, [id]); // Re-fetch if the id changes

  // --- Fetch README Data (dependent on agentData) ---
   // Derive potential README URL from agentData state
   const potentialReadmeBaseUrl = agentData?.github || agentData?.website || '';

  useEffect(() => {
    // Only attempt fetch if we have agent data and a potential GitHub URL
    if (!agentData || !potentialReadmeBaseUrl || !potentialReadmeBaseUrl.startsWith('https://github.com/')) {
      // If no suitable URL, or agent hasn't loaded yet, don't attempt fetch
      if (agentData && potentialReadmeBaseUrl) { // Only log/error if agent loaded but URL is bad
          console.warn("Agent website/github URL is not a standard GitHub link:", potentialReadmeBaseUrl);
          setReadmeError("Cannot determine README location from the provided URL.");
      }
      setIsLoadingReadme(false); // Ensure loading is false if not fetching
      setReadmeContent(''); // Clear any old content
      return;
    }

    // Reset state for new fetch attempt
    setReadmeContent('');
    setIsLoadingReadme(true);
    setReadmeError(null);

    const fetchReadme = async () => {
      let rawUrl = '';
      const githubUrlPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
      const match = potentialReadmeBaseUrl.match(githubUrlPattern);

      if (!match) {
        console.warn("Could not parse GitHub user/repo from URL:", potentialReadmeBaseUrl);
        setReadmeError('Invalid GitHub URL format.');
        setIsLoadingReadme(false);
        return;
      }

      const user = match[1];
      const repo = match[2];

      // Determine the path *within* the repo, if any
      const pathSegments = potentialReadmeBaseUrl.split(githubUrlPattern)[3] || ''; // Get the part after user/repo
      const isDirectFileLink = pathSegments.includes('/blob/');

      if (isDirectFileLink) {
        // Handle direct links (often includes branch and path)
        rawUrl = potentialReadmeBaseUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
        // Ensure it points to a .md file, otherwise it might fail
        if (!rawUrl.toLowerCase().endsWith('.md')) {
           console.warn("Direct GitHub link does not point to a Markdown file, trying to fetch anyway:", rawUrl);
        }
      } else {
         // Not a direct file link, assume repo root or subdirectory. Try fetching README.md from common branches.
        const possibleReadmePaths = [
          `main/README.md`,
          `master/README.md`,
          // Add more common default branch names if needed
        ];
        // Construct base raw URL without the branch/file part
        const baseRawUrl = `https://raw.githubusercontent.com/${user}/${repo}/`;

        let foundReadme = false;
        for (const readmePath of possibleReadmePaths) {
            rawUrl = baseRawUrl + readmePath;
            console.log("Attempting to fetch rawUrl:", rawUrl);
            try {
                const response = await fetch(rawUrl);
                if (response.ok) {
                    const text = await response.text();
                    setReadmeContent(text);
                    foundReadme = true;
                    break; // Stop trying once found
                } else {
                    console.log(`Fetching from ${readmePath} failed (${response.status})`);
                }
            } catch (fetchError) {
                 console.error(`Error fetching ${rawUrl}:`, fetchError);
                 // Continue to next path
            }
        }

        if (!foundReadme) {
             setReadmeError('Could not find README.md in common branches (main/master).');
             setIsLoadingReadme(false);
             return; // Exit fetchReadme function
        }


      }

      // If it was a direct file link or found in loop, proceed (or handle failure if direct link failed)
      if (!readmeContent && isDirectFileLink) { // If direct link was used and content wasn't set in loop
          console.log("Attempting to fetch direct link rawUrl:", rawUrl);
           try {
              const response = await fetch(rawUrl);
              if (!response.ok) {
                  throw new Error(`Failed to fetch README. Status: ${response.status}`);
              }
              const text = await response.text();
              setReadmeContent(text);
           } catch (error: any) {
               setReadmeError(error.message || 'Could not load README content from direct link');
               console.error('Error fetching README (direct link):', error, "Used URL:", rawUrl);
           }
      }


    }; // end fetchReadme


    fetchReadme().finally(() => {
        setIsLoadingReadme(false); // Ensure loading is set to false after fetch attempt completes
    });

  // Depend on agentData and potentialReadmeBaseUrl
  }, [agentData, potentialReadmeBaseUrl]);


  // --- Render Loading/Error/Not Found States ---
  if (isLoadingAgent) {
    return (
       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading agent details...</p>
      </div>
    );
  }

  if (agentError) {
     return (
       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Error</h1>
           <p className="text-gray-700 dark:text-gray-300 mb-4">{agentError}</p>
           <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">
             Return to directory
           </Link>
         </div>
       </div>
     );
   }

  if (!agentData) {
    // This case should ideally be covered by agentError, but as a fallback
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Agent not found</h1>
          <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">
            Return to directory
          </Link>
        </div>
      </div>
    );
  }

  // Use agentData for rendering links (ensure agentData is not null here)
  const websiteLink = agentData.website || agentData.github;
  const githubLink = agentData.github || (agentData.website?.startsWith('https://github.com/') ? agentData.website : undefined);


  // --- Render Agent Details ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Use agentData for Header or pass necessary props */}
      <Header onSearch={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>

        {/* Use agentData throughout the component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Logo Logic using agentData */}
              {typeof agentData.logo === 'string' ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-white-300 shrink-0">
                  <img
                    src={agentData.logo}
                    alt={`${agentData.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shrink-0"
                  style={{ backgroundColor: agentData.logo?.color || '#4B5563' }} // Use agentData
                >
                 {/* Ensure logo object exists before accessing initials */}
                 {agentData.logo?.initials || agentData.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{agentData.name}</h1>
                <div className="flex flex-wrap gap-2">
                  {/* Ensure category is an array */}
                  {(Array.isArray(agentData.category) ? agentData.category : []).map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

             {/* Link Buttons using derived websiteLink/githubLink */}
            <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-start sm:justify-end mt-4 sm:mt-0">
              {websiteLink && (
                <a
                  href={websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                   <span>{ (agentData.website && agentData.github && agentData.website === agentData.github) ? 'Repo' : 'Website' }</span>
                </a>
              )}
              {githubLink && githubLink !== websiteLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">{agentData.description}</p>

         

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            {agentData.twitter && (
              <a
                href={`https://twitter.com/${agentData.twitter.replace('@','')}`} // Sanitize handle
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Twitter className="h-4 w-4" />
                @{agentData.twitter.replace('@','')}
              </a>
            )}
             {agentData.discord && ( // Example: Add Discord link if present
              <a
                href={agentData.discord} // Assume discord field contains full URL
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                {/* You might want a Discord icon here */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.54 6.03C18.18 5.02 16.67 4.24 15 3.83V2.3C15 2.12 14.88 2 14.7 2H9.3C9.12 2 9 2.12 9 2.3V3.83C7.33 4.24 5.82 5.02 4.46 6.03C4.31 6.13 4.29 6.34 4.4 6.47L5.16 7.41C5.26 7.52 5.43 7.55 5.57 7.49C6.77 6.9 8.17 6.44 9.69 6.27C9.5 6.64 9.33 7.05 9.2 7.47C6.26 7.87 4 9.72 4 12V16.38C4 16.77 4.27 17.08 4.65 17.15L5.17 17.25C5.5 17.31 5.83 17.06 5.83 16.71V14.15C5.83 11.84 7.63 10 9.95 10H10V11.67C10 11.85 10.12 12 10.3 12H13.7C13.88 12 14 11.85 14 11.67V10H14.05C16.37 10 18.17 11.84 18.17 14.15V16.71C18.17 17.06 18.5 17.31 18.83 17.25L19.35 17.15C19.73 17.08 20 16.77 20 16.38V12C20 9.72 17.74 7.87 14.8 7.47C14.67 7.05 14.5 6.64 14.31 6.27C15.83 6.44 17.23 6.9 18.43 7.49C18.57 7.55 18.74 7.52 18.84 7.41L19.6 6.47C19.71 6.34 19.69 6.13 19.54 6.03Z M9.5 14C8.67 14 8 13.33 8 12.5C8 11.67 8.67 11 9.5 11C10.33 11 11 11.67 11 12.5C11 13.33 10.33 14 9.5 14ZM14.5 14C13.67 14 13 13.33 13 12.5C13 11.67 13.67 11 14.5 11C15.33 11 16 11.67 16 12.5C16 13.33 15.33 14 14.5 14Z"></path></svg>
                <span>Discord</span>
              </a>
            )}
          </div>


           {/* Metadata: Last Updated / Source Type */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
            {agentData.lastUpdated && ( // Check if lastUpdated exists
                <>
                 <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Last updated: {new Date(agentData.lastUpdated).toLocaleDateString()}
                 </div>
                 <span>•</span>
                </>
             )}
             {/* Display Source Type based on agentData */}
             <div className={`${agentData.isOpenSource ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} px-2 py-0.5 rounded-full`}>
               {agentData.isOpenSource ? 'Open Source' : 'Closed Source'}
             </div>
           </div>


          {/* README Section */}
          {/* Only show section if we have a github link to attempt fetch from */}
          {potentialReadmeBaseUrl.startsWith('https://github.com/') && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Documentation (from README)</h2>
              <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[100px]">
                {isLoadingReadme ? (
                  <p className="text-gray-600 dark:text-gray-300">Loading documentation...</p>
                ) : readmeError ? (
                  <p className="text-red-600 dark:text-red-400">Error loading documentation: {readmeError}</p>
                ) : readmeContent ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Improved dark mode styling for all components
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-300 dark:border-gray-600" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-5 mb-3 text-gray-800 dark:text-gray-100 border-b pb-1 border-gray-200 dark:border-gray-700" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-100" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="text-base font-medium mt-3 mb-2 text-gray-800 dark:text-gray-100" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-200 leading-relaxed" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-200 space-y-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-200 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li className="mb-1 text-gray-700 dark:text-gray-200" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 my-4 text-gray-700 dark:text-gray-200 italic bg-gray-100 dark:bg-gray-800" {...props} />
                      ),
                       code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        return !inline && match ? (
                           // Use a proper syntax highlighting component here in a real app
                           // For now, just basic styling
                           <pre className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm text-gray-100 dark:text-gray-50">
                             <code>{codeText}</code>
                           </pre>
                         ) : (
                           <code
                             className={`bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 text-gray-800 dark:text-gray-100 font-mono text-sm ${className || ''}`}
                             {...props}
                           >
                             {children}
                           </code>
                         );
                       },
                       // Remove the custom 'pre' as 'code' block handles it now
                       // pre: ({ children }) => <>{children}</>, // Pass children directly
                      a: ({ node, ...props }) => (
                        <a
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-6 border border-gray-300 dark:border-gray-600 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 text-gray-700 dark:text-gray-200" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
                      ),
                      tbody: ({ node, ...props }) => (
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-850" {...props} /> // Slightly different bg for tbody
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-750" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200 font-semibold" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300" {...props} />
                      ),
                      hr: ({ node, ...props }) => <hr className="my-6 border-gray-300 dark:border-gray-600" {...props} />,
                      img: ({ node, ...props }) => (
                        <img
                          className="max-w-full h-auto my-4 rounded-lg border border-gray-200 dark:border-gray-700"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
                      em: ({ node, ...props }) => <em className="text-gray-800 dark:text-gray-200 italic" {...props} />,
                      del: ({ node, ...props }) => <del className="text-gray-600 dark:text-gray-400" {...props} />,
                    }}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No README content found or loaded.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}