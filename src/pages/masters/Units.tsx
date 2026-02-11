import { useState } from "react";
import { Search, Plus, Pencil, Eye, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { units as unitData, Unit as UnitType } from "@/data/units";

interface UnitLocal {
  _id: string;
  name: string;
  code: string;
  type: string;
  status: number;
}

type FormMode = "create" | "edit" | "view" | null;

const Units = () => {
  const [search, setSearch] = useState("");
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [unitsList, setUnitsList] = useState<UnitLocal[]>(unitData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", code: "", type: "weight", status: 1 });

  const filtered = unitsList.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.code.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm({ name: "", code: "", type: "weight", status: 1 });
    setEditingId(null);
    setFormMode("create");
  };

  const openEdit = (unit: UnitLocal) => {
    setForm({ name: unit.name, code: unit.code, type: unit.type, status: unit.status });
    setEditingId(unit._id);
    setFormMode("edit");
  };

  const openView = (unit: UnitLocal) => {
    setForm({ name: unit.name, code: unit.code, type: unit.type, status: unit.status });
    setEditingId(unit._id);
    setFormMode("view");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!form.name || !form.code) return;
    if (formMode === "edit" && editingId) {
      setUnitsList((prev) =>
        prev.map((u) => (u._id === editingId ? { ...u, name: form.name, code: form.code, type: form.type, status: form.status } : u))
      );
    } else {
      setUnitsList((prev) => [...prev, { _id: Date.now().toString(), name: form.name, code: form.code, type: form.type, status: form.status }]);
    }
    closeForm();
  };

  const isReadOnly = formMode === "view";
  const formTitle = formMode === "create" ? "Add Unit" : formMode === "edit" ? "Edit Unit" : "View Unit";

  return (
    <DashboardLayout>
      <div className="flex justify-end mb-4">
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Unit
        </button>
      </div>

      {formMode && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{formTitle}</h2>
            <button onClick={closeForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Unit Name *</label>
              <input type="text" value={form.name} readOnly={isReadOnly}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Code *</label>
              <input type="text" value={form.code} readOnly={isReadOnly}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Type *</label>
              <select value={form.type} disabled={isReadOnly}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}>
                <option value="weight">Weight</option>
                <option value="package">Package</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status *</label>
              <select value={form.status} disabled={isReadOnly}
                onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
          {!isReadOnly && (
            <div className="flex justify-end gap-3">
              <button onClick={handleSubmit} className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                {formMode === "edit" ? "Update" : "Submit"}
              </button>
              <button onClick={closeForm} className="px-5 py-2 rounded-md bg-secondary text-foreground text-sm border border-border hover:bg-accent transition-colors">Cancel</button>
            </div>
          )}
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
        <div className="grid grid-cols-[1fr_100px_100px_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">Unit Name ⇅</span>
          <span className="text-xs font-medium text-muted-foreground">Code</span>
          <span className="text-xs font-medium text-muted-foreground">Status</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No records found.</p>
        ) : (
          filtered.map((u) => (
            <div key={u._id} className="grid grid-cols-[1fr_100px_100px_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded">
              <span className="text-sm text-primary font-medium">{u.name}</span>
              <span className="text-sm text-muted-foreground">{u.code}</span>
              <span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                  {u.status === 1 ? "Active" : "Inactive"}
                </span>
              </span>
              <div className="flex justify-center gap-2">
                <button onClick={() => openEdit(u)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => openView(u)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
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

export default Units;
