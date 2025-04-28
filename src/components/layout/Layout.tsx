
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${fullWidth ? '' : 'container'} py-6 md:py-12`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
