import AdminSidebar from "./components/AdminSidebar";

const page = ({ children }) => {
  return (
    <div className="relative w-full">
      <aside className="absolute left-0 w-[20%] -top-16 -z-20">
        <AdminSidebar />
      </aside>
      <main className="flex-1 p-6 -top-[20px] w-[80%] h-auto left-[256px]  absolute  -z-30  ">
        {children}
      </main>
    </div>
  );
};

export default page;
