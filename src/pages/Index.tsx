import {
  FileText,
  Receipt,
  Landmark,
  Truck,
  ShoppingCart,
  Users,
  Wallet,
  CreditCard,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import InfoCard from "@/components/dashboard/InfoCard";
import { MonthlyBillyChart, IncomeExpenseChart } from "@/components/dashboard/Charts";
import { BillySection, InvoiceSection } from "@/components/dashboard/EmptySections";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-xs text-primary mt-0.5"></p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-xs">
            <p className="text-muted-foreground">
              Cash Balance: <span className="text-foreground font-semibold">₹5.00 Cr</span>
            </p>
            <p className="text-muted-foreground">
              Bank Balance: <span className="text-foreground font-semibold">₹5.00 Cr</span>
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-accent transition-colors border border-border">
            View Profile
          </button>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Bilty" value="0/00" subtitle="Total Bilty created" icon={Receipt} color="red" />
        <StatCard title="Invoices" value="0/50" subtitle="Total invoices" icon={FileText} color="green" />
        <StatCard title="Load Advices" value="0/00" subtitle="Total load advices" icon={Landmark} color="blue" />
        <InfoCard title="Supplier Ledger" value="0" subtitle="Total supplier ledgers" icon={Users} />
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InfoCard title="Own Vehicle" value="0" subtitle="Owned by the company" icon={Truck} />
        <InfoCard title="Market Vehicle" value="0" subtitle="Hired as per demand" icon={ShoppingCart} />
        <InfoCard title="Customer Ledger" value="0" subtitle="Total customer ledgers" icon={Users} />
        <div className="bg-card rounded-lg p-4 border border-border animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-stat-orange" />
                <span className="text-xs text-muted-foreground">Total Income</span>
              </div>
              <span className="text-sm font-bold text-foreground">₹0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-stat-red" />
                <span className="text-xs text-muted-foreground">Total Expense</span>
              </div>
              <span className="text-sm font-bold text-foreground">₹0.00</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-stat-green" />
                <span className="text-xs text-muted-foreground">GST Call Balance</span>
              </div>
              <span className="text-sm font-bold text-foreground">20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <MonthlyBillyChart />
        <IncomeExpenseChart />
      </div>

      {/* Empty Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BillySection />
        <InvoiceSection />
      </div>
    </DashboardLayout>
  );
};

export default Index;
