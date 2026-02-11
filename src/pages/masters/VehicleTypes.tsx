import { useState } from "react";
import { Search, Pencil, Eye, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { vehicleTypes, VehicleType } from "@/data/vehicleTypes";

type FormMode = "edit" | "view" | null;

const VehicleTypes = () => {
  const [search, setSearch] = useState("");
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [selectedVT, setSelectedVT] = useState<VehicleType | null>(null);

  const filtered = vehicleTypes.filter((vt) =>
    vt.name.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (vt: VehicleType) => {
    setSelectedVT(vt);
    setFormMode("edit");
  };

  const openView = (vt: VehicleType) => {
    setSelectedVT(vt);
    setFormMode("view");
  };

  const closeForm = () => {
    setFormMode(null);
    setSelectedVT(null);
  };

  const isReadOnly = formMode === "view";

  return (
    <DashboardLayout>
      {formMode && selectedVT && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">
              {formMode === "edit" ? "Edit Vehicle Type" : "View Vehicle Type"}
            </h2>
            <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Vehicle Type Name</label>
              <input
                type="text"
                defaultValue={selectedVT.name}
                readOnly={isReadOnly}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status</label>
              <select
                defaultValue={selectedVT.status}
                disabled={isReadOnly}
                className={`w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Preview</label>
              <div className="h-10 flex items-center gap-3">
                <img src={selectedVT.dark_img} alt={selectedVT.name} className="h-8 w-12 object-contain dark:block hidden" />
                <img src={selectedVT.light_img} alt={selectedVT.name} className="h-8 w-12 object-contain dark:hidden block" />
                <span className="text-sm text-foreground">{selectedVT.name}</span>
              </div>
            </div>
          </div>
          {!isReadOnly && (
            <div className="flex justify-end gap-3">
              <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Update</button>
              <button onClick={closeForm} className="px-5 py-2 rounded-md bg-secondary text-foreground text-sm border border-border hover:bg-accent transition-colors">Cancel</button>
            </div>
          )}
        </div>
      )}

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Vehicle Types</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-primary">Vehicle Type Name ⇅</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>

        <div className="space-y-1">
          {filtered.map((vt) => (
            <div
              key={vt._id}
              className="grid grid-cols-[1fr_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded"
            >
              <div className="flex items-center gap-3">
                <img src={vt.dark_img} alt={vt.name} className="h-8 w-12 object-contain dark:block hidden" />
                <img src={vt.light_img} alt={vt.name} className="h-8 w-12 object-contain dark:hidden block" />
                <span className="text-sm text-primary">{vt.name}</span>
              </div>
              <div className="flex justify-center gap-2">
                <button onClick={() => openEdit(vt)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => openView(vt)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VehicleTypes;
