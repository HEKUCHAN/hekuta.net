import Header from "@/components/header";

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Template;
