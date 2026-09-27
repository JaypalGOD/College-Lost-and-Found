import * as React from "react";
import { HashRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ItemDetailsDialog } from "@/components/items/ItemDetails";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ItemsProvider } from "@/lib/items-store";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import Legal from "@/pages/Legal";
import MyReports from "@/pages/MyReports";
import NotFound from "@/pages/NotFound";
import Report from "@/pages/Report";

/** Scroll to top on page change, or to the #anchor for in-page links. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Wait a frame so the target section has rendered after navigation.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <ItemDetailsDialog />
    </div>
  );
}

export default function App() {
  return (
    <ItemsProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="report" element={<Report />} />
            <Route path="my-reports" element={<MyReports />} />
            <Route path="privacy" element={<Legal page="privacy" />} />
            <Route path="terms" element={<Legal page="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ItemsProvider>
  );
}
