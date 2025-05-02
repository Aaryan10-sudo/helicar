"use client"; // ✅ Ensure this is a client component

import { useState, useEffect } from "react";
import vehicleServices from "@/services/vehicleService";
import { notifyError } from "@/utils/toast";

const useGetVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const result = await vehicleServices.getVehicles();
        if (result?.error) {
          notifyError(result.error);
        } else {
          setVehicles(result); // ✅ Store fetched vehicles
        }
      } catch (error) {
        // notifyError("Failed to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return { loading, vehicles };
};

export default useGetVehicle;
