import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shoppig",
  description: "e-shop",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
       {children}
    </div>
  );
};

export default AdminLayout;
