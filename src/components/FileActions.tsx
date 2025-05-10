import { Star, Trash, X, ArrowUpFromLine, Download } from "lucide-react";
import type { File as FileType } from "@/lib/db/schema";

interface FileActionsProps {
  file: FileType;
  onStar: (id: string) => void;
  onTrash: (id: string) => void;
  onDelete: (file: FileType) => void;
  onDownload: (file: FileType) => void;
}

export default function FileActions({
  file,
  onStar,
  onTrash,
  onDelete,
  onDownload,
}: FileActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {/* Download button */}
      {!file.isTrash && !file.isFolder && (
        <button
          onClick={() => onDownload(file)}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 min-w-0"
        >
          <Download className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Download</span>
        </button>
      )}

      {/* Star button */}
      {!file.isTrash && (
        <button
          onClick={() => onStar(file.id)}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 min-w-0"
        >
          <Star
            className={`h-4 w-4 mr-2 ${
              file.isStarred ? "text-yellow-400 fill-current" : "text-gray-400"
            }`}
          />
          <span className="hidden sm:inline">{file.isStarred ? "Unstar" : "Star"}</span>
        </button>
      )}

      {/* Trash/Restore button */}
      <button
        onClick={() => onTrash(file.id)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          file.isTrash ? "bg-green-100 hover:bg-green-200 text-green-700" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        } min-w-0`}
      >
        {file.isTrash ? (
          <ArrowUpFromLine className="h-4 w-4 mr-2" />
        ) : (
          <Trash className="h-4 w-4 mr-2" />
        )}
        <span className="hidden sm:inline">{file.isTrash ? "Restore" : "Delete"}</span>
      </button>

      {/* Delete permanently button */}
      {file.isTrash && (
        <button
          onClick={() => onDelete(file)}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-100 hover:bg-red-200 text-red-700 min-w-0"
        >
          <X className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      )}
    </div>
  );
}
