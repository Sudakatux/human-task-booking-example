import { OrganizationTable } from "./components/organizationTable";
import { deleteOrganization, getOrganizations } from "../services/organization";
import { Layout } from "../components/PageLayout";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function OrganizationPage() {
  const organizations = await getOrganizations();
  const handleDelete = async (id: number | string) => {
    "use server";
    await deleteOrganization(Number(id));
    revalidatePath("/organization");
  };
  return (
    <Layout title="Organization Page">
      <OrganizationTable
        organizations={organizations}
        onDelete={handleDelete}
      />
    </Layout>
  );
}
