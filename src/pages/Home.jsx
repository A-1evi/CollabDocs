import { FileText, Plus } from "lucide-react";
import React from "react";
import RecentDocuments from "../components/RecentDocument";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#1C1F26]">
      <main>
        {/* Hero Section */}
        <div className="container px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto md:ml-[15%] text-center md:text-left">
            <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto md:mx-0 mb-4 sm:mb-6 text-[#6366F1]" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#6366F1]">
              Create, Collaborate, Share
              <br />
              Documents
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl">
              Work together on documents in real-time. Create and edit documents
              with your team, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <button className="btn bg-[#6366F1] hover:bg-[#5355E1] text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Document
              </button>
              <button className="btn btn-outline text-gray-300 border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Recent Documents Section */}
        <div className="container px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
          <RecentDocuments />
        </div>
      </main>
    </div>
  );
};

export default Home;
