import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';

// Define the structure of the form data state explicitly
interface FormDataState {
  name: string;
  website: string;
  description: string;
  gitRepo: string;
  logo: string;
  category: string; // Keep as string for input, split on submit
  pricing: string;
  features: string; // Keep as string for input, split on submit
}

export function SubmitPage() {
  const initialFormData: FormDataState = {
    name: '',
    website: '',
    description: '',
    gitRepo: '',
    logo: '',
    category: '',
    pricing: '',
    features: ''
  };
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Clear previous status

    // Basic client-side validation (can be enhanced)
    if (!formData.name || !formData.website || !formData.description || !formData.logo || !formData.category) {
        setSubmitStatus({ type: 'error', message: 'Please fill in all required fields (*).' });
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/submit-agent', { // Use your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send the form data
        });

        const result = await response.json();

        if (!response.ok) {
            // Handle server-side errors (e.g., validation errors from the backend)
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        // Handle successful submission
        console.log('Submission successful:', result);
        setSubmitStatus({ type: 'success', message: 'Agent submitted successfully! It will be reviewed shortly.' });
        setFormData(initialFormData); // Reset form
        // Optional: Redirect after a short delay
        setTimeout(() => navigate('/'), 2000); // Redirect to homepage after 2 seconds

    } catch (error) {
        console.error('Submission failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
        setSubmitStatus({ type: 'error', message: `Submission failed: ${errorMessage}` });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onSearch={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Submit an AI Agent</h1>

          {/* Submission Status Message */}
          {submitStatus && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              submitStatus.type === 'success'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Agent Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agent Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>
 {/* Description */}
 <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL *
              </label>
              <input
                id="website"
                type="url"
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

           
            {/* GitHub Repository */}
            <div>
              <label htmlFor="gitRepo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub Repository (Optional - Marks as Open Source)
              </label>
              <input
                id="gitRepo"
                type="url"
                name="gitRepo"
                value={formData.gitRepo}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Logo URL */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo URL *
              </label>
              <input
                id="logo"
                type="url"
                name="logo"
                required
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Categories */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories *
              </label>
              <input
                id="category"
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                placeholder="Comma-separated categories (e.g., Productivity, Developer Tools)"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Separate multiple categories with commas.</p>
            </div>

            {/* Pricing */}
            <div>
              <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pricing (Optional)
              </label>
              <input
                id="pricing"
                type="text"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                placeholder="e.g., Free, Freemium, Paid, $10/month"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Features */}
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Features (Optional)
              </label>
              <input
                id="features"
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Comma-separated features (e.g., Code Generation, Data Analysis)"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Separate multiple features with commas.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Agent'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}