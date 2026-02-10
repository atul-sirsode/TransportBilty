import { useState } from "react";
import { Search, Plus, Pencil, Eye, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Unit {
  id: string;
  name: string;
  shortName: string;
  status: string;
}

const Units = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [form, setForm] = useState({ name: "", shortName: "", status: "Active" });

  const filtered = units.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.name) return;
    setUnits((prev) => [...prev, { id: Date.now().toString(), ...form }]);
    setForm({ name: "", shortName: "", status: "Active" });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Unit
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Add Unit</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Unit Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Short Name</label>
              <input type="text" value={form.shortName} onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status *</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={handleSubmit} className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Submit</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-md bg-secondary text-foreground text-sm border border-border hover:bg-accent transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Units</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">Unit Name</span>
          <span className="text-xs font-medium text-muted-foreground">Short Name</span>
          <span className="text-xs font-medium text-muted-foreground">Status</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No records found.</p>
        ) : (
          filtered.map((u) => (
            <div key={u.id} className="grid grid-cols-[1fr_1fr_1fr_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded">
              <span className="text-sm text-foreground">{u.name}</span>
              <span className="text-sm text-foreground">{u.shortName}</span>
              <span className="text-sm text-foreground">{u.status}</span>
              <div className="flex justify-center gap-2">
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Eye className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Units;
