import { baseURL } from "@/config/config";
import { useState, useEffect } from "react";

export default function LocationAutocomplete({
  id,
  label,
  value,
  onSelect,
  error,
}) {
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.trim().length > 1) {
        fetchSuggestions(input);
      }
    }, 300); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const fetchSuggestions = async (query) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/search?q=${query}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const kathmanduResults = data.filter((place) =>
          [
            "Kathmandu",
            "Lalitpur",
            "Bhaktapur",
            "Godawari",
            "Chitlang",
            "Hetauda",
            "Gokarna",
            "Kapan",
            "Chabahil",
            "Ganesh marg",
            "Chandra Binayak",
            "Municipality",
            "Thimi",
            "Kamalpokhari",
            "Gorkha",
            "White house",
            "Manakamana",
            "Budhanilkantha",
            "Dhading",
            "Ringroad",
            "Bagmati",
          ].some((city) => place.display_name.includes(city))
        );
        setSuggestions(kathmanduResults);
      } else {
        setSuggestions([]);
        console.error("API did not return an array:", data);
      }
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (place) => {
    setInput(place.display_name);
    setShowSuggestions(false);
    onSelect(id, place.display_name);
  };

  return (
    <div className="flex flex-col relative min-w-[150px]">
      <label htmlFor={id} className="mb-1 font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder="Enter area..."
        value={input}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg h-[50px]"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 z-10  bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto sm:w-[500px] py-2">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="px-4 hover:bg-blue-100 cursor-pointer border-b sm:h-[50px] flex items-center"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
