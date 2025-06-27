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
    const controller = new AbortController();
    const { signal } = controller;

    if (input.trim().length > 1) {
      const delayDebounce = setTimeout(() => {
        fetchSuggestions(input, signal);
      }, 400);

      return () => clearTimeout(delayDebounce);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [input]);

  const fetchSuggestions = async (query, signal) => {
    setIsLoading(true);
    setShowSuggestions(true);
    try {
      const res = await fetch(`${baseURL}/api/search?q=${query}`, { signal });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setSuggestions(
          data.filter((place) => {
            const name = place.display_name.toLowerCase();
            return (
              name.includes("kathmandu") ||
              name.includes("kapan") ||
              name.includes("chitlang") ||
              name.includes("makwanpur") ||
              name.includes("hetauda") ||
              name.includes("lalitpur") ||
              name.includes("bhaktapur") ||
              name.includes("godawari") ||
              name.includes("chandragiri") ||
              name.includes("budhanilkantha")
            );
          })
        );
      } else {
        setSuggestions([]);
        console.error("API did not return an array:", data);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      console.error("Error fetching suggestions", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (place) => {
    const displayName = place.display_name;
    setInput(displayName);
    setShowSuggestions(false);
    onSelect(id, displayName);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!showSuggestions) {
      setShowSuggestions(true);
    }
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
        autoComplete="off"
        onFocus={() => input.trim().length > 1 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Allow time for click
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg h-[45px]"
      />

      {showSuggestions && input.trim().length > 1 && (
        <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto py-1">
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((place) => (
              <li
                key={place.place_id}
                onMouseDown={() => handleSelect(place)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b"
              >
                {place.display_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found.</li>
          )}
        </ul>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
