import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { units } from "@/data/units";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Indian states list
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

// ─── Party Form Dialog (reused for Billing Party, Consignor, Consignee, Loading, Shipping) ───
const PartyFormDialog = ({
  open,
  onClose,
  title,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: { companyName: string }) => void;
}) => {
  const [data, setData] = useState({
    gstNumber: "", companyName: "", legalName: "", panNumber: "",
    address: "", state: "", city: "", postalCode: "",
    contactPerson: "", phoneNumber: "", altPhoneNumber: "",
  });
  const s = (k: string, v: string) => setData((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (!data.companyName.trim()) return;
    onSubmit({ companyName: data.companyName.trim() });
    setData({
      gstNumber: "", companyName: "", legalName: "", panNumber: "",
      address: "", state: "", city: "", postalCode: "",
      contactPerson: "", phoneNumber: "", altPhoneNumber: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">GST Number</label>
              <input value={data.gstNumber} onChange={(e) => s("gstNumber", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="GST Number" />
            </div>
            <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">Search</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Company Name <span className="text-destructive">*</span></label>
              <input value={data.companyName} onChange={(e) => s("companyName", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Company Name" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Legal Name</label>
              <input value={data.legalName} onChange={(e) => s("legalName", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Legal Name" />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-xs text-muted-foreground mb-1 block">PAN Number</label>
            <input value={data.panNumber} onChange={(e) => s("panNumber", e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="PAN Number" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Address <span className="text-destructive">*</span></label>
            <textarea value={data.address} onChange={(e) => s("address", e.target.value)} rows={3}
              className="w-full px-3 py-2 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              placeholder="Address" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">State</label>
              <select value={data.state} onChange={(e) => s("state", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground">
                <option value="">State</option>
                {indianStates.map((st) => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">City <span className="text-destructive">*</span></label>
              <input value={data.city} onChange={(e) => s("city", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="City" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Postal Code <span className="text-destructive">*</span></label>
              <input value={data.postalCode} onChange={(e) => s("postalCode", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Postal Code" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Contact Person</label>
              <input value={data.contactPerson} onChange={(e) => s("contactPerson", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Contact Person" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
              <input value={data.phoneNumber} onChange={(e) => s("phoneNumber", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Phone Number" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Alternate Phone Number</label>
              <input value={data.altPhoneNumber} onChange={(e) => s("altPhoneNumber", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Alternate Phone Number" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Submit</button>
            <button onClick={onClose} className="px-6 py-2 bg-muted text-foreground rounded-md text-sm hover:bg-accent">Cancel</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── Insurance Details Dialog ────────────────────
const InsuranceDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [data, setData] = useState({
    holderName: "", policyNumber: "", coverageAmount: "0", insuredValue: "0",
    premiumAmount: "0", policyDocument: "", provider: "", startDate: "", endDate: "",
  });
  const s = (k: string, v: string) => setData((p) => ({ ...p, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Insurance Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Holder Name</label>
              <input value={data.holderName} onChange={(e) => s("holderName", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Holder Name" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Policy Number</label>
              <input value={data.policyNumber} onChange={(e) => s("policyNumber", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Policy Number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Coverage Amount</label>
              <input type="number" value={data.coverageAmount} onChange={(e) => s("coverageAmount", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Insured Value</label>
              <input type="number" value={data.insuredValue} onChange={(e) => s("insuredValue", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Premium Amount</label>
              <input type="number" value={data.premiumAmount} onChange={(e) => s("premiumAmount", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Policy Document</label>
              <input value={data.policyDocument} onChange={(e) => s("policyDocument", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Policy Document" />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-xs text-muted-foreground mb-1 block">Provider</label>
            <input value={data.provider} onChange={(e) => s("provider", e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Provider" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
              <input type="date" value={data.startDate} onChange={(e) => s("startDate", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
              <input type="date" value={data.endDate} onChange={(e) => s("endDate", e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={onClose} className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Confirm</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Reusable searchable dropdown with "add new" support
const SearchableSelect = ({
  label,
  required,
  options,
  value,
  onChange,
  onAddNew,
  placeholder,
  disabled,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  onAddNew?: () => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {label && (
        <label className="text-xs text-muted-foreground mb-1 block">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="w-full h-10 px-3 text-sm text-left rounded-md border border-border bg-card text-foreground flex items-center justify-between disabled:opacity-50"
      >
        <span className={value ? "" : "text-muted-foreground"}>
          {value || placeholder || "Select..."}
        </span>
        <ChevronRight
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-52 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 px-2 text-xs rounded bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-36">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="w-full px-3 py-2 text-xs text-left hover:bg-accent text-foreground"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </button>
              ))
            ) : (
              <div className="p-3 text-xs text-muted-foreground flex items-center justify-between">
                <span>No data found.</span>
                {onAddNew && (
                  <button
                    type="button"
                    className="ml-2 h-6 w-6 flex items-center justify-center bg-primary text-primary-foreground rounded hover:bg-primary/90"
                    onClick={() => {
                      setOpen(false);
                      setSearch("");
                      onAddNew();
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  suffix,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string) => void;
  disabled?: boolean;
  suffix?: string;
}) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">
      {label}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

// ─── Bilty List View ─────────────────────────────
const BiltyList = ({ onCreateNew }: { onCreateNew: () => void }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [perPage, setPerPage] = useState(25);

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex bg-card border border-border rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Create Bilty
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 justify-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-md border border-border bg-card text-foreground hover:bg-accent">
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <div className="text-6xl mb-4 opacity-30">📭</div>
        <p className="text-sm">No records found.</p>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={perPage}
            onChange={(e) => setPerPage(+e.target.value)}
            className="h-8 px-2 rounded border border-border bg-card text-foreground text-xs"
          >
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>Per Page</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-accent rounded">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span>page 1 of 1</span>
          <button className="p-1 hover:bg-accent rounded">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
        <button className="text-primary hover:underline">Cookie Settings</button>
        <span>Copyright ©2026 All rights reserved by TruckBilty.</span>
      </div>
    </div>
  );
};

// ─── Bilty Create Form ───────────────────────────
const BiltyForm = ({ onBack }: { onBack: () => void }) => {
  const [form, setForm] = useState({
    date: "2026-02-11",
    from: "",
    to: "",
    lrNo: "1",
    vehicleNo: "",
    driverNumber: "",
    vehicleOwnership: "",
    billingParty: "",
    type: "To Pay",
    consignor: "",
    consignorGst: "",
    consignee: "",
    consigneeGst: "",
    loading: "",
    shipping: "",
    gstPaidBy: "Consignee",
    insurance: "Owner",
    isFixWeight: false,
    weightUnit: "METRIC TON",
    freightType: "Per METRIC TON",
    freightPaidBy: "Billing Party",
    chargeWeight: "0",
    freightRate: "",
    paidWeight: "0",
    advanceDate: "2026-02-11",
    advancePercent: "0",
    advanceAmount: "0",
    guaranteeCharge: "0",
    biltyCharge: "0",
    loadingCharge: "0",
    unloadingCharge: "0",
    demurrageCharge: "0",
    tollCharge: "0",
    freightAmount: "0",
    grossAmount: "0",
    roundOff: "0",
    netAmount: "0",
    containerNo: "",
    lineSealNo: "",
    customSealNo: "",
    containerSize: "",
    shippingLine: "",
    billNo: "",
    ewayBillNo: "",
    billAmount: "",
    description: "",
  });

  const [billingParties, setBillingParties] = useState<string[]>([]);
  const [consignors, setConsignors] = useState<string[]>([]);
  const [consignees, setConsignees] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [loadingPoints, setLoadingPoints] = useState<string[]>([]);
  const [shippingPoints, setShippingPoints] = useState<string[]>([]);
  const [packages, setPackages] = useState<
    { qty: string; unit: string; commodity: string }[]
  >([]);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState<
    null | "billingParty" | "consignor" | "consignee" | "loading" | "shipping" | "insurance"
  >(null);

  const set = (key: string, val: string | boolean) =>
    setForm((p) => ({ ...p, [key]: val }));

  const addPackage = () => {
    if (packages.length < 5)
      setPackages([...packages, { qty: "", unit: "", commodity: "" }]);
  };

  const unitNames = units.map((u) => u.name);
  const typeOptions = ["To Pay", "Paid", "To Be Billed", "FOC"];
  const freightTypes = [
    "Per METRIC TON",
    "Per KG",
    "Per QUINTAL",
    "Fixed",
    "Per Package",
  ];

  const dialogTitles: Record<string, string> = {
    billingParty: "Add New Billing Party",
    consignor: "Add New Consignor",
    consignee: "Add New Consignee",
    loading: "Add New Loading",
    shipping: "Add New Shipping",
  };

  const handlePartySubmit = (type: string, data: { companyName: string }) => {
    switch (type) {
      case "billingParty":
        setBillingParties((p) => [...p, data.companyName]);
        set("billingParty", data.companyName);
        break;
      case "consignor":
        setConsignors((p) => [...p, data.companyName]);
        set("consignor", data.companyName);
        break;
      case "consignee":
        setConsignees((p) => [...p, data.companyName]);
        set("consignee", data.companyName);
        break;
      case "loading":
        setLoadingPoints((p) => [...p, data.companyName]);
        set("loading", data.companyName);
        break;
      case "shipping":
        setShippingPoints((p) => [...p, data.companyName]);
        set("shipping", data.companyName);
        break;
    }
    setDialogOpen(null);
  };

  return (
    <div className="space-y-6">
      {/* Party Dialog (shared for billing, consignor, consignee, loading, shipping) */}
      {dialogOpen && dialogOpen !== "insurance" && (
        <PartyFormDialog
          open={true}
          onClose={() => setDialogOpen(null)}
          title={dialogTitles[dialogOpen]}
          onSubmit={(data) => handlePartySubmit(dialogOpen, data)}
        />
      )}

      {/* Insurance Dialog */}
      <InsuranceDialog
        open={dialogOpen === "insurance"}
        onClose={() => setDialogOpen(null)}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Create Bilty</h2>
      </div>

      {/* Top Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Date"
          type="date"
          value={form.date}
          onChange={(v) => set("date", v)}
        />
        <SearchableSelect
          label="Billing Party"
          required
          options={billingParties}
          value={form.billingParty}
          onChange={(v) => set("billingParty", v)}
          onAddNew={() => setDialogOpen("billingParty")}
          placeholder="Select Billing Party"
        />
        <SearchableSelect
          label="Type"
          options={typeOptions}
          value={form.type}
          onChange={(v) => set("type", v)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          label="LR No."
          required
          value={form.lrNo}
          onChange={(v) => set("lrNo", v)}
        />
        <InputField
          label="From"
          required
          value={form.from}
          onChange={(v) => set("from", v)}
        />
        <InputField
          label="To"
          required
          value={form.to}
          onChange={(v) => set("to", v)}
        />
        <InputField
          label="Driver Number"
          value={form.driverNumber}
          onChange={(v) => set("driverNumber", v)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchableSelect
          label="Vehicle No."
          required
          options={vehicles}
          value={form.vehicleNo}
          onChange={(v) => set("vehicleNo", v)}
          onAddNew={() => setVehicles((p) => [...p, "NEW"])}
          placeholder="Select Vehicle"
        />
        <SearchableSelect
          label="Vehicle Ownership"
          options={["Own", "Market"]}
          value={form.vehicleOwnership}
          onChange={(v) => set("vehicleOwnership", v)}
        />
        <div />
      </div>

      {/* Consignor / Consignee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="bg-primary/20 text-primary font-semibold text-sm px-3 py-2 rounded">
            CONSIGNOR *
          </div>
          <SearchableSelect
            label=""
            options={consignors}
            value={form.consignor}
            onChange={(v) => set("consignor", v)}
            onAddNew={() => setDialogOpen("consignor")}
            placeholder="Consignor"
          />
          <div className="bg-card border border-border rounded px-3 py-2 text-xs text-muted-foreground">
            GST IN : {form.consignorGst || "-"}
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-primary/20 text-primary font-semibold text-sm px-3 py-2 rounded">
            CONSIGNEE *
          </div>
          <SearchableSelect
            label=""
            options={consignees}
            value={form.consignee}
            onChange={(v) => set("consignee", v)}
            onAddNew={() => setDialogOpen("consignee")}
            placeholder="Consignee"
          />
          <div className="bg-card border border-border rounded px-3 py-2 text-xs text-muted-foreground">
            GST IN : {form.consigneeGst || "-"}
          </div>
        </div>
      </div>

      {/* Loading / Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelect
          label="Loading"
          options={loadingPoints}
          value={form.loading}
          onChange={(v) => set("loading", v)}
          onAddNew={() => setDialogOpen("loading")}
          placeholder="Loading"
        />
        <SearchableSelect
          label="Shipping"
          options={shippingPoints}
          value={form.shipping}
          onChange={(v) => set("shipping", v)}
          onAddNew={() => setDialogOpen("shipping")}
          placeholder="Shipping"
        />
      </div>

      {/* GST / Insurance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            GST PAID BY
          </p>
          {["Consignor", "Consignee", "Transporter"].map((o) => (
            <label key={o} className="flex items-center gap-2 mb-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="gstPaidBy"
                checked={form.gstPaidBy === o}
                onChange={() => set("gstPaidBy", o)}
                className="accent-primary"
              />
              {o}
            </label>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            INSURANCE
          </p>
          {["Owner", "Carrier"].map((o) => (
            <label key={o} className="flex items-center gap-2 mb-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="insurance"
                checked={form.insurance === o}
                onChange={() => set("insurance", o)}
                className="accent-primary"
              />
              {o}
            </label>
          ))}
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setDialogOpen("insurance")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
          >
            + Insurance Details
          </button>
        </div>
      </div>

      {/* Weight & Freight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-xs text-foreground">Is Fix Weight...?</label>
            <button
              type="button"
              onClick={() => set("isFixWeight", !form.isFixWeight)}
              className={`w-10 h-5 rounded-full transition-colors ${form.isFixWeight ? "bg-primary" : "bg-muted"} relative`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${form.isFixWeight ? "left-5" : "left-0.5"}`}
              />
            </button>
          </div>
          <SearchableSelect
            label="Weight Unit"
            required
            options={unitNames}
            value={form.weightUnit}
            onChange={(v) => set("weightUnit", v)}
          />
          <SearchableSelect
            label="Freight Type"
            required
            options={freightTypes}
            value={form.freightType}
            onChange={(v) => set("freightType", v)}
          />
          <SearchableSelect
            label="Freight Paid By"
            options={["Billing Party", "Consignor", "Consignee"]}
            value={form.freightPaidBy}
            onChange={(v) => set("freightPaidBy", v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Charge Weight"
              required
              value={form.chargeWeight}
              onChange={(v) => set("chargeWeight", v)}
            />
            <InputField
              label="Freight Rate"
              required
              value={form.freightRate}
              onChange={(v) => set("freightRate", v)}
              suffix="₹"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Paid Weight"
              required
              value={form.paidWeight}
              onChange={(v) => set("paidWeight", v)}
            />
            <InputField
              label="Advance Date"
              type="date"
              value={form.advanceDate}
              onChange={(v) => set("advanceDate", v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label=""
              value={form.advancePercent}
              onChange={(v) => set("advancePercent", v)}
              suffix="%"
            />
            <InputField
              label="Advance Amount"
              value={form.advanceAmount}
              onChange={(v) => set("advanceAmount", v)}
              suffix="₹"
            />
          </div>
        </div>

        {/* Other Charges + Calculations */}
        <div className="space-y-4">
          <fieldset className="border border-border rounded-md p-4 space-y-3">
            <legend className="text-xs font-semibold text-muted-foreground px-2">
              Other Charges
            </legend>
            {[
              ["guaranteeCharge", "Guarantee Charge"],
              ["biltyCharge", "Bilty Charge"],
              ["loadingCharge", "Loading Charge"],
              ["unloadingCharge", "Unloading Charge"],
              ["demurrageCharge", "Demurrage Charge"],
              ["tollCharge", "Toll Charge"],
            ].map(([key, lbl]) => (
              <InputField
                key={key}
                label={lbl}
                value={(form as any)[key]}
                onChange={(v) => set(key, v)}
                suffix="₹"
              />
            ))}
          </fieldset>
          <fieldset className="border border-border rounded-md p-4 space-y-3">
            <legend className="text-xs font-semibold text-muted-foreground px-2">
              Calculations
            </legend>
            {[
              ["freightAmount", "Freight Amount"],
              ["grossAmount", "Gross Amount"],
              ["roundOff", "Round Off"],
              ["netAmount", "Net Amount"],
            ].map(([key, lbl]) => (
              <InputField
                key={key}
                label={lbl}
                value={(form as any)[key]}
                onChange={(v) => set(key, v)}
                suffix="₹"
              />
            ))}
          </fieldset>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3 bg-primary/10 px-3 py-2 rounded">
          DESCRIPTION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Container No" value={form.containerNo} onChange={(v) => set("containerNo", v)} />
          <InputField label="Line Seal No" value={form.lineSealNo} onChange={(v) => set("lineSealNo", v)} />
          <InputField label="Custom Seal No" value={form.customSealNo} onChange={(v) => set("customSealNo", v)} />
          <InputField label="Container Size" value={form.containerSize} onChange={(v) => set("containerSize", v)} />
          <InputField label="Shipping Line" value={form.shippingLine} onChange={(v) => set("shippingLine", v)} />
          <InputField label="Bill No" value={form.billNo} onChange={(v) => set("billNo", v)} />
          <InputField label="E-Way Bill No" value={form.ewayBillNo} onChange={(v) => set("ewayBillNo", v)} />
          <InputField label="Bill Amount" value={form.billAmount} onChange={(v) => set("billAmount", v)} />
        </div>
      </div>

      {/* Packages */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-primary bg-primary/10 px-3 py-2 rounded">
            PACKAGES <span className="text-xs font-normal text-muted-foreground">(Only 5 Rows Allowed)</span>
          </h3>
        </div>
        {packages.map((pkg, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 mb-2">
            <input
              placeholder="Enter Packages"
              value={pkg.qty}
              onChange={(e) => {
                const p = [...packages];
                p[i].qty = e.target.value;
                setPackages(p);
              }}
              className="h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground"
            />
            <select
              value={pkg.unit}
              onChange={(e) => {
                const p = [...packages];
                p[i].unit = e.target.value;
                setPackages(p);
              }}
              className="h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground"
            >
              <option value="">Unit</option>
              {unitNames.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <input
              placeholder="Enter Commodity"
              value={pkg.commodity}
              onChange={(e) => {
                const p = [...packages];
                p[i].commodity = e.target.value;
                setPackages(p);
              }}
              className="h-10 px-3 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setPackages(packages.filter((_, j) => j !== i))}
              className="h-10 w-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          onClick={addPackage}
          disabled={packages.length >= 5}
          className="mt-1 h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 disabled:opacity-50"
        >
          +
        </button>
      </div>

      {/* Notes description */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-6">
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Submit
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-muted text-foreground rounded-md text-sm hover:bg-accent"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// ─── Main Bilty Page ─────────────────────────────
const Bilty = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout>
      {showForm ? (
        <BiltyForm onBack={() => setShowForm(false)} />
      ) : (
        <BiltyList onCreateNew={() => setShowForm(true)} />
      )}
    </DashboardLayout>
  );
};

export default Bilty;
