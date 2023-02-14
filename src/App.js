import { DateRangePicker } from "./DateRangePicker";
import { DatePicker } from "./DatePicker";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function App() {
  return (
    <div className="ml-12 max-w-lg text-gray-700">
      {/* prettier-ignore */}
      <p className="mt-8 mb-16 text-gray-600">This sandbox shows examples of <strong><code>DatePicker</code></strong>, and <strong><code>DateRangePicker</code></strong> components built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank" className="text-blue-700 underline">React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" className="text-blue-700 underline">Tailwind CSS</a>.</p>
      <h2 className="mb-2 font-bold text-xl text-left">DatePicker</h2>
      <DatePicker
        label="Appointment date"
        minValue={today(getLocalTimeZone())}
      />
      <h2 className="mt-12 mb-2 font-bold text-xl text-left">
        DateRangePicker
      </h2>
      <DateRangePicker
        label="Trip dates"
        minValue={today(getLocalTimeZone())}
      />
    </div>
  );
}
