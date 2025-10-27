import DashboardClient from "@/components/DashboardClient";
import { getDashboardData } from "@/utils/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dashboardData = await getDashboardData().catch((error) => {
    console.error(error);
    return null;
  });

  if (!dashboardData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] px-4 text-center text-slate-200">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-semibold text-slate-100">
            No pudimos cargar tu biblioteca orbital.
          </h1>
          <p className="text-sm text-slate-400">
            Verifica tu conexión y vuelve a intentarlo en unos minutos. Si el
            problema persiste, contacta al equipo de soporte de Digital College.
          </p>
        </div>
      </main>
    );
  }

  return <DashboardClient user={dashboardData.user} courses={dashboardData.courses} />;
}
