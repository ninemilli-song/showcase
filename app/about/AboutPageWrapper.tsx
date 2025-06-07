'use client';

import { MDXProvider } from '@mdx-js/react';
import AboutPageContent from './page.mdx';

export default function AboutPageWrapper() {
  return (
    <MDXProvider>
      <div className="max-w-2xl mx-auto px-4 py-8 font-sans">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我</h1>
            <div className="space-y-6">
              <AboutPageContent />
            </div>
          </div>
        </div>
      </div>
    </MDXProvider>
  );
}
