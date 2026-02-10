import { useState } from "react";
import { Search, Eye } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { vehicleTypes } from "@/data/vehicleTypes";

const VehicleTypes = () => {
  const [search, setSearch] = useState("");

  const filtered = vehicleTypes.filter((vt) =>
    vt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
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

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_120px] border-b border-border pb-2 mb-2">
          <span className="text-xs font-medium text-primary">Vehicle Type Name ⇅</span>
          <span className="text-xs font-medium text-muted-foreground text-center">Action</span>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {filtered.map((vt) => (
            <div
              key={vt._id}
              className="grid grid-cols-[1fr_120px] items-center py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={vt.dark_img}
                  alt={vt.name}
                  className="h-8 w-12 object-contain dark:block hidden"
                />
                <img
                  src={vt.light_img}
                  alt={vt.name}
                  className="h-8 w-12 object-contain dark:hidden block"
                />
                <span className="text-sm text-primary">{vt.name}</span>
              </div>
              <div className="flex justify-center">
                <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="h-4 w-4" />
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
