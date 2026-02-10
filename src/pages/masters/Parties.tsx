import { useState } from "react";
import { Search, Plus, Eye, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const ledgerTypes = ["Billing Party", "Consignor", "Consignee", "Loading", "Shipping", "Supplier"];

interface Party {
  id: string;
  companyName: string;
  legalName: string;
  ledgerType: string;
  contactPerson: string;
  phone: string;
  status: string;
}

const Parties = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [parties, setParties] = useState<Party[]>([]);

  const [form, setForm] = useState({
    companyName: "",
    legalName: "",
    ledgerType: "Billing Party",
    address: "",
    state: "",
    city: "",
    pincode: "",
    contactPerson: "",
    phone: "",
    altPhone: "",
    gstNo: "",
    panNo: "",
    status: "Active",
  });

  const filtered = parties.filter((p) =>
    p.companyName.toLowerCase().includes(search.toLowerCase()) ||
    p.ledgerType.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.companyName || !form.ledgerType) return;
    setParties((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        companyName: form.companyName,
        legalName: form.legalName,
        ledgerType: form.ledgerType,
        contactPerson: form.contactPerson,
        phone: form.phone,
        status: form.status,
      },
    ]);
    setForm({
      companyName: "", legalName: "", ledgerType: "Billing Party", address: "",
      state: "", city: "", pincode: "", contactPerson: "", phone: "", altPhone: "",
      gstNo: "", panNo: "", status: "Active",
    });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Party
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Add Party</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Ledger Type *</label>
              <select
                value={form.ledgerType}
                onChange={(e) => setForm({ ...form, ledgerType: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {ledgerTypes.map((lt) => (
                  <option key={lt} value={lt}>{lt}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Company Name *</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Legal Name</label>
                <input
                  type="text"
                  value={form.legalName}
                  onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Address *</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full h-20 px-3 py-2 text-sm rounded-md bg-secondary border border-border text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">State</label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select State</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Postal Code *</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Contact Person</label>
                <input type="text" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Alternate Phone</label>
                <input type="text" value={form.altPhone} onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">GST No.</label>
                <input type="text" value={form.gstNo} onChange={(e) => setForm({ ...form, gstNo: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">PAN No.</label>
                <input type="text" value={form.panNo} onChange={(e) => setForm({ ...form, panNo: e.target.value })}
                  className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleSubmit} className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Submit</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-md bg-secondary text-foreground text-sm border border-border hover:bg-accent transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Parties</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">Company Name</span>
          <span className="text-xs font-medium text-muted-foreground">Ledger Type</span>
          <span className="text-xs font-medium text-muted-foreground">Contact</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No records found.</p>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_1fr_1fr_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded">
              <span className="text-sm text-foreground">{p.companyName}</span>
              <span className="text-sm text-foreground">{p.ledgerType}</span>
              <span className="text-sm text-foreground">{p.contactPerson}</span>
              <div className="flex justify-center">
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Parties;
