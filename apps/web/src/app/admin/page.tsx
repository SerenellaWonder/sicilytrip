import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Amministrazione",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
