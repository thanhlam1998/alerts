import PageWrapper from "components/PageWrapper/PageWrapper";
import Home from "components/svgs/Home";

const DashboardWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <PageWrapper
      className="dashboard__wrapper"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
      ]}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </PageWrapper>
  );
};

export default DashboardWrapper;
