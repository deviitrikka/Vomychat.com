// app/layout.js
import Navbar from "@/components/Navbar"; // Adjust the path based on your project structure
import "./globals.css"; // Make sure global styles are imported

export const metadata = {
  title: "Linktree Clone",
  description: "A simple link-sharing platform like Linktree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar will always be visible */}
        <main>{children}</main> {/* Page content */}
      </body>
    </html>
  );
}
