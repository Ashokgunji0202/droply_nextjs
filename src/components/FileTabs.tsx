"use client";

import { File, Star, Trash } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { File as FileType } from "@/lib/db/schema";

interface FileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  files: FileType[];
  starredCount: number;
  trashCount: number;
}

export default function FileTabs({
  activeTab,
  onTabChange,
  files,
  starredCount,
  trashCount,
}: FileTabsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-full border-b border-gray-200">
        <button
          onClick={() => onTabChange("all")}
          className={`py-3 px-6 flex items-center gap-3 sm:gap-4 transition-all duration-300 ${
            activeTab === "all"
              ? "bg-primary text-white border-b-4 border-primary font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-primary"
          } rounded-t-lg`}
        >
          <File className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-medium">All Files</span>
          <Badge
            variant="flat"
            color="default"
            size="sm"
            aria-label={`${files.filter((file) => !file.isTrash).length} files`}
          >
            {files.filter((file) => !file.isTrash).length}
          </Badge>
        </button>

        <button
          onClick={() => onTabChange("starred")}
          className={`py-3 px-6 flex items-center gap-3 sm:gap-4 transition-all duration-300 ${
            activeTab === "starred"
              ? "bg-primary text-white border-b-4 border-primary font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-primary"
          } rounded-t-lg`}
        >
          <Star className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-medium">Starred</span>
          <Badge
            variant="flat"
            color="warning"
            size="sm"
            aria-label={`${starredCount} starred files`}
          >
            {starredCount}
          </Badge>
        </button>

        <button
          onClick={() => onTabChange("trash")}
          className={`py-3 px-6 flex items-center gap-3 sm:gap-4 transition-all duration-300 ${
            activeTab === "trash"
              ? "bg-primary text-white border-b-4 border-primary font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-primary"
          } rounded-t-lg`}
        >
          <Trash className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-medium">Trash</span>
          <Badge
            variant="solid"
            color="danger"
            size="sm"
            aria-label={`${trashCount} files in trash`}
          >
            {trashCount}
          </Badge>
        </button>
      </div>
    </div>
  );
}
