import { assets } from "@/assets/assets";

export const dummyCars = [
  {
    _id: "kvjfvfjvfj122333",
    vehicleName: "Toyota Corolla",
    vehicleImage: assets.car1.src,
    vehiclePrice: 3500,
    features: {
      luggage: 2,
      seats: 5,
      transmission: "Manual",
    },
  },
  {
    _id: "834ghhgggfaaaa123",
    vehicleName: "Honda Civic",
    vehicleImage: assets.car3.src,
    vehiclePrice: 4000,
    features: {
      luggage: 3,
      seats: 5,
      transmission: "Automatic",
    },
  },
  {
    _id: "834ghhgggfaaaa124",
    vehicleName: "Suzuki Swift",
    vehicleImage: assets.car4.src,
    vehiclePrice: 3000,
    features: {
      luggage: 1,
      seats: 4,
      transmission: "Manual",
    },
  },
  {
    _id: "834ghhgggfaaaa125",
    vehicleName: "Hyundai Creta",
    vehicleImage: assets.car5.src,
    vehiclePrice: 4500,
    features: {
      luggage: 3,
      seats: 5,
      transmission: "Automatic",
    },
  },
];
