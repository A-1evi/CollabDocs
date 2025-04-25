import { Plus } from "lucide-react";
import DocumentCard from "./DocumentCard";

const RecentDocuments = () => {
    const documents = [
      { title: "Project Proposal", lastEdited: "Edited 2 hours ago" },
      { title: "Meeting Notes", lastEdited: "Edited yesterday" },
      { title: "Research Document", lastEdited: "Edited 3 days ago" },
      { title: "Product Roadmap", lastEdited: "Edited last week" },
    ];
  
    return (
      <div className="py-8 px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Documents</h2>
          <button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.title}
              title={doc.title}
              lastEdited={doc.lastEdited}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default RecentDocuments;
  