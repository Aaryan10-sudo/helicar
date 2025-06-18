"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateDropdown() {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ⛔ Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border px-4 py-2 rounded bg-white"
      >
        {range.from && range.to
          ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
          : "Select Date"}
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50 bg-white shadow-lg border rounded">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
          />
        </div>
      )}
    </div>
  );
}
