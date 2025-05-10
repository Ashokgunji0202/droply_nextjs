import SignInForm from "@/components/SignInForm";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Use the unified Navbar component */}
      <div style={{ flexShrink: 0 }}>
        <Navbar />
      </div>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem",
        }}
      >
        <SignInForm />
      </main>

      {/* Dark mode footer */}
      <footer
        style={{
          backgroundColor: "#111827",
          color: "#ffffff",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            &copy; {new Date().getFullYear()} Droply. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
