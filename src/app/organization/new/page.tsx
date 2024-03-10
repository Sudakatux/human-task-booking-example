import { Organization } from "@/app/models";
import { redirect } from "next/navigation";
import { OrganizationForm } from "../components/organizationForm";
import { createOrganizations } from "@/app/services/organization";
import { Layout } from "@/app/components/PageLayout";

const initialState = {
  name: "",
};

const CreateOrganizationPage = () => {
  const handleCreateProduct = async (organization: Organization) => {
    "use server";
    const newOrganization = await createOrganizations(organization);
    redirect(`/organization`);
  };
  return (
    <Layout title="Organization Page">
      <OrganizationForm
        onSubmit={handleCreateProduct}
        organization={initialState}
      />
    </Layout>
  );
};

export default CreateOrganizationPage;
