"use client";

import { RefreshCw, Trash } from "lucide-react";

interface FileActionButtonsProps {
  activeTab: string;
  trashCount: number;
  folderPath: Array<{ id: string; name: string }>;
  onRefresh: () => void;
  onEmptyTrash: () => void;
}

export default function FileActionButtons({
  activeTab,
  trashCount,
  folderPath,
  onRefresh,
  onEmptyTrash,
}: FileActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <h2 className="text-xl sm:text-2xl font-semibold truncate max-w-full">
        {activeTab === "all" &&
          (folderPath.length > 0
            ? folderPath[folderPath.length - 1].name
            : "All Files")}
        {activeTab === "starred" && "Starred Files"}
        {activeTab === "trash" && "Trash"}
      </h2>
      <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
        <button
          onClick={onRefresh}
          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
        {activeTab === "trash" && trashCount > 0 && (
          <button
            onClick={onEmptyTrash}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 transition"
          >
            <Trash className="h-4 w-4 mr-2" />
            Empty Trash
          </button>
        )}
      </div>
    </div>
  );
}
