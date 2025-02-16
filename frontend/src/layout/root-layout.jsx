import SideBar from "../components/SideBar";

export default function RootLayout({ children }) {
  return (
    <section className="h-screen flex">
      <aside className="">
        <SideBar />
      </aside>
      <main className="flex-1">{children}</main>
    </section>
  );
}
