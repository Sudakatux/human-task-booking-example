import { Organization } from "@/app/models";
import { redirect } from "next/navigation";
import {
  getOrganizationById,
  updateOrganizations,
} from "@/app/services/organization";
import { OrganizationForm } from "../components/organizationForm";
import { Layout } from "@/app/components/PageLayout";

type ExistingOrganizationPageProps = {
  params: {
    organizationId: string;
  };
};

const ExistingOrganizationPage = async ({
  params,
}: ExistingOrganizationPageProps) => {
  const organization = await getOrganizationById(Number(params.organizationId));
  const handleUpdateOrganization = async (organization: Organization) => {
    "use server";
    const updatedOrganization = await updateOrganizations(organization);

    redirect(`/organization`);
  };
  return (
    <Layout title="Organization Page">
      <OrganizationForm
        onSubmit={handleUpdateOrganization}
        organization={organization}
        submitText="Update"
      />
    </Layout>
  );
};

export default ExistingOrganizationPage;
