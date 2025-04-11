import { useState } from 'react';
import { Mail, Twitter, Github, Star, Coffee } from 'lucide-react';

export function Footer() {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with feedback
    const mailtoLink = `mailto:dev.abdul.js@gmail.com?subject=Plaxio Feedback&body=${encodeURIComponent(feedback)}`;
    window.location.href = mailtoLink;
    setFeedback('');
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/dev_abdulhaseeb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
                <span>Follow on X</span>
              </a>
              <a
                href="https://github.com/abdulhaseeb7603"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
              <a
                href="mailto:dev.abdul.js@gmail.com"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span>Send an Email</span>
              </a>
            </div>

            {/* Support Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* <a
                href="https://github.com/dambrubaba/directory-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Star className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a> */}
              <a
                href="https://buymeacoffee.com/dev_abdulhaseeb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-black rounded-lg hover:bg-[#FFDD00]/90 transition-colors"
              >
                <Coffee className="h-4 w-4" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Send Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or report issues..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Directory Boilerplate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 