import StudentNavbar from "./StudentNavbar";
import MobileTabBar from "./MobileTabBar";
import Footer from "./Footer";

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper-gradient text-navy font-body flex flex-col">
      <StudentNavbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileTabBar />
    </div>
  );
}
