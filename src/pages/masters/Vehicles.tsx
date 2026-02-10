import { useState } from "react";
import { Search, Plus, Pencil, Eye, Upload, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { vehicleTypes } from "@/data/vehicleTypes";

interface Vehicle {
  id: string;
  vehicleNo: string;
  vehicleType: string;
  vehicleTypeImg: string;
  status: string;
  isOwn: boolean;
}

const Vehicles = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      vehicleNo: "MH40N4755",
      vehicleType: "Tipper Truck",
      vehicleTypeImg: "https://res.cloudinary.com/dinu2gkts/image/upload/v1760691170/tipper-truck-dark_wp4d1a.svg",
      status: "Active",
      isOwn: true,
    },
  ]);

  const [form, setForm] = useState({
    vehicleNo: "",
    vehicleType: "",
    status: "Active",
    isOwn: false,
  });

  const filtered = vehicles.filter((v) =>
    v.vehicleNo.toLowerCase().includes(search.toLowerCase()) ||
    v.vehicleType.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.vehicleNo || !form.vehicleType) return;
    const selectedType = vehicleTypes.find((vt) => vt.name === form.vehicleType);
    setVehicles((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        vehicleNo: form.vehicleNo,
        vehicleType: form.vehicleType,
        vehicleTypeImg: selectedType?.dark_img || "",
        status: form.status,
        isOwn: form.isOwn,
      },
    ]);
    setForm({ vehicleNo: "", vehicleType: "", status: "Active", isOwn: false });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      {/* Create Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Create Vehicles
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Create Vehicles</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Vehicle No. *</label>
              <input
                type="text"
                placeholder="Vehicle No."
                value={form.vehicleNo}
                onChange={(e) => setForm({ ...form, vehicleNo: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Vehicle Type *</label>
              <select
                value={form.vehicleType}
                onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((vt) => (
                  <option key={vt._id} value={vt.name}>{vt.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">RC Photo</label>
              <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-xs">Drop or click to upload image</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">jpeg .png .pdf file formats are accepted only</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">DL Photo</label>
              <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-xs">Drop or click to upload image</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">jpeg .png .pdf file formats are accepted only</p>
            </div>
          </div>

          {/* Is Own + Status */}
          <div className="flex items-center gap-8 mb-6">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <span>Is Own</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, isOwn: !form.isOwn })}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.isOwn ? "bg-primary" : "bg-secondary border border-border"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${form.isOwn ? "left-5" : "left-0.5"}`} />
              </button>
            </label>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="h-10 px-3 text-sm rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-w-[180px]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Deleted">Deleted</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-md bg-secondary text-foreground text-sm border border-border hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Vehicles</h2>
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

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">Vehicle No. ⇅</span>
          <span className="text-xs font-medium text-muted-foreground">Vehicle Type Name</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="grid grid-cols-[1fr_1fr_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded"
            >
              <span className="text-sm text-foreground">{v.vehicleNo}</span>
              <div className="flex items-center gap-2">
                <img src={v.vehicleTypeImg} alt={v.vehicleType} className="h-6 w-10 object-contain" />
                <span className="text-sm text-foreground">{v.vehicleType}</span>
              </div>
              <div className="flex justify-center gap-2">
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            Show
            <select className="h-7 px-2 rounded bg-secondary border border-border text-foreground text-xs">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            Per Page
          </div>
          <span>← page 1 of 1 →</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Vehicles;
