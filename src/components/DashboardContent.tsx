"use client";

import { useState, useCallback, useEffect } from "react";
import { FileUp, FileText, User } from "lucide-react";
import FileUploadForm from "@/components/FileUploadForm";
import FileList from "@/components/FileList";
import UserProfile from "@/components/UserProfile";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Hi,{" "}
          <span style={{ color: "#0070f3" }}>
            {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
          </span>
          !
        </h2>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          Your images are waiting for you.
        </p>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("files")}
          style={{
            padding: "0.5rem 1rem",
            borderBottom: activeTab === "files" ? "2px solid #0070f3" : "none",
            fontWeight: activeTab === "files" ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          <FileText style={{ verticalAlign: "middle", marginRight: "0.5rem" }} />
          My Files
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "0.5rem 1rem",
            borderBottom: activeTab === "profile" ? "2px solid #0070f3" : "none",
            fontWeight: activeTab === "profile" ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          <User style={{ verticalAlign: "middle", marginRight: "0.5rem" }} />
          Profile
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "files" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <div style={{ flex: "1 1 30%", minWidth: "280px", border: "1px solid #ccc", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <FileUp style={{ marginRight: "0.5rem", color: "#0070f3" }} />
              <h3 style={{ margin: 0 }}>Upload</h3>
            </div>
            <FileUploadForm
              userId={userId}
              onUploadSuccess={handleFileUploadSuccess}
              currentFolder={currentFolder}
            />
          </div>

          <div style={{ flex: "1 1 65%", minWidth: "280px", border: "1px solid #ccc", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <FileText style={{ marginRight: "0.5rem", color: "#0070f3" }} />
              <h3 style={{ margin: 0 }}>Your Files</h3>
            </div>
            <FileList
              userId={userId}
              refreshTrigger={refreshTrigger}
              onFolderChange={handleFolderChange}
            />
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
          <UserProfile />
        </div>
      )}
    </div>
  );
}
