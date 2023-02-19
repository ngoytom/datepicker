import { useRef, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CalendarIcon } from "@heroicons/react/24/solid";

import { useCalendarState } from "react-stately";
import { useCalendar, useLocale } from "react-aria";
import { useDateFormatter } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";

export function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
    ref
  );

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <div className="flex items-center pb-4 justify-center">
        <div className="mr-6">
          <MonthDropdown state={state} />
        </div>
        <YearDropdown state={state} />
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

function MonthDropdown({ state }) {
  let months = [];
  let formatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone,
  });

  // Format the name of each month in the year according to the
  // current locale and calendar system. Note that in some calendar
  // systems, such as the Hebrew, the number of months may differ
  // between years.
  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  let onChange = (e) => {
    let value = Number(e.target.value);
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <div>
      <ChevronUpDownIcon className="absolute h-4 w-4 left-[8.5rem] top-[2.7rem]" />

      <select
        aria-label="Month"
        onChange={onChange}
        value={state.focusedDate.month}
        className="py-1.5 w-32 px-3 border rounded-lg border-black appearance-none"
      >
        {months.map((month, i) => (
          <option key={i} value={i + 1} className="bg-white py-1 w-2">
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

function YearDropdown({ state }) {
  let years = [];
  let formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });

  for (let i = -80; i <= 80; i++) {
    let date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  let onChange = (e) => {
    let index = Number(e.target.value);
    let date = years[index].value;
    state.setFocusedDate(date);
  };

  return (
    <div>
      <ChevronUpDownIcon className="absolute h-4 w-4 right-[2.5rem] top-[2.7rem]" />
      <select
        aria-label="Year"
        onChange={onChange}
        value={80}
        className="py-1.5 px-3 w-32 border rounded-lg border-black appearance-none"
      >
        {years.map((year, i) => (
          // use the index as the value so we can retrieve the full
          // date object from the list in onChange. We cannot only
          // store the year number, because in some calendars, such
          // as the Japanese, the era may also change.
          <option key={i} value={i}>
            {year.formatted}
          </option>
        ))}
      </select>
    </div>
  );
}
