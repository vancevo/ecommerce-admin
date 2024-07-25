import prismadb from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <>
      <UserButton />
      <div>Active mode: {store?.name}</div>
    </>
  );
};

export default DashboardPage;
