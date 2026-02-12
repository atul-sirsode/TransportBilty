export interface VehicleMaster {
  id: string;
  vehicleNo: string;
  vehicleType: string;
  vehicleTypeImg: string;
  status: string;
  isOwn: boolean;
}

export const vehicleMasterList: VehicleMaster[] = [
  {
    id: "1",
    vehicleNo: "MH40N4755",
    vehicleType: "Tipper Truck",
    vehicleTypeImg: "https://res.cloudinary.com/dinu2gkts/image/upload/v1760691170/tipper-truck-dark_wp4d1a.svg",
    status: "Active",
    isOwn: true,
  },
];
