import { Receipt, FileText } from "lucide-react";

const EmptySection = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <div className="bg-card rounded-lg p-5 border border-border animate-fade-in">
    <h3 className="text-sm font-semibold text-foreground mb-6">{title}</h3>
    <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
      <Icon className="h-16 w-16 mb-3 opacity-30" />
      <p className="text-xs">No records found.</p>
    </div>
  </div>
);

const BillySection = () => <EmptySection title="Billy" icon={Receipt} />;
const InvoiceSection = () => <EmptySection title="Invoice" icon={FileText} />;

export { BillySection, InvoiceSection };
