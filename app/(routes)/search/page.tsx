import { MainLayout } from "@/components/layout/MainLayout";
import { Gamepad2 } from 'lucide-react';

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Search Free Online Games - Find Your Next Adventure</h1>
          <p className="text-gray-400">Search functionality is coming soon</p>
        </div>

        {/* Feature Introduction */}
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 text-gray-500 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-white mb-3">Search Feature in Development</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            We're building powerful game search and filtering capabilities for you.
            In the meantime, you can browse games through the category navigation on the homepage and sidebar.
          </p>
          <div className="mt-6">
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 