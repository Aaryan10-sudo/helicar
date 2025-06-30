"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseURL } from "@/config/config";
import DeleteIcon from "@/ui/DeleteIcon";
import UpdateIcon from "@/ui/UpdateIcon";
import axios from "axios";
import Swal from "sweetalert2";

const page = () => {
  const router = useRouter();
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const result = await axios(`${baseURL}/popular-destination/get`);
        setDestination(result.data.data);
      } catch (error) {
        console.error("Error fetching popular destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This destination will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/popular-destination/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDestination((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Destination has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete destination.", "error");
      }
    }
  };

  return (
    <section className="p-5">
      <main className="mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Popular Destination
          </h2>
          <input
            type="text"
            placeholder="Search destination"
            className="border border-gray-500 bg-gray-300 px-2 py-1 outline-none rounded-sm w-full sm:w-[250px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-5">
          <span className="text-gray-500">
            Manage and explore all your popular travel destinations here.
          </span>
          <div className="flex items-center gap-4">
            <button className="bg-gray-200 text-black rounded-sm border-none px-3 py-2 text-sm">
              Sort by
            </button>
            <Link
              href="/admin/popular-destination/add"
              className="bg-blue-600 text-white px-3 py-2 rounded-sm text-sm"
            >
              Add New Destination
            </Link>
          </div>
        </div>
      </main>

      <div className="relative w-full">
        <div className="flex justify-between items-center flex-wrap gap-5">
          {!destination || destination.length === 0 ? (
            <div className="text-gray-500 text-lg w-full text-center py-20">
              No destination found.
            </div>
          ) : (
            destination.map((value, index) => (
              <section
                key={value._id}
                className="w-[440px] h-[440px] rounded-lg bg-cover bg-center flex flex-col justify-end overflow-hidden cursor-pointer transition-transform"
                style={{
                  backgroundImage: `url(${value.image || "/default-hero.jpg"})`,
                }}
              >
                <div
                  className="w-full h-[130px] text-white px-5"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1 className="text-[30px] font-semibold font-Comfortaa">
                    {value.name}
                  </h1>
                  <p>Rs.{value.pricing}</p>
                  <span className="flex justify-between items-center mt-2">
                    <button
                      className="bg-red-700 w-[150px] h-[40px] cursor-pointer flex items-center justify-center gap-3 rounded-md"
                      onClick={() => handleDelete(value.id)}
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                    <Link
                      href={`/admin/popular-destination/update?destination=${value.name}`}
                      className="bg-blue-600 w-[150px] h-[40px] cursor-pointer flex items-center justify-center gap-3 rounded-md"
                    >
                      <UpdateIcon /> Update
                    </Link>
                  </span>
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
