import { Popover } from "@headlessui/react";

const timeOptions = [
  { label: "Early Morning", times: ["12:00 AM", "01:00 AM", "02:00 AM"] },
  { label: "Morning", times: ["07:00 AM", "08:00 AM", "09:00 AM"] },
  { label: "Evening", times: ["05:00 PM", "06:00 PM", "07:00 PM"] },
];

export default function TimePicker({ type, selectedTime, onSelect }) {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="border-gray-300 border rounded px-3 py-2">
            {selectedTime || "Select Time"}
          </Popover.Button>

          {open && (
            <Popover.Panel className="absolute z-10 mt-2 w-56 bg-white rounded shadow-lg p-4 sm:left-0 left-[-130px]">
              <div className="font-bold text-center mb-2">
                {type === "pickup" ? "Select pickup time" : ""}
                {type === "return" ? "Select return time" : ""}
              </div>
              <hr className="mb-3" />
              {timeOptions.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-semibold mb-1">{group.label}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {group.times.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          onSelect(time);
                          close();
                        }}
                        className="bg-gray-100 hover:bg-primary hover:text-white rounded px-3 py-1 text-sm"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
}
