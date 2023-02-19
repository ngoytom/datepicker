import { useRef } from "react";
import { useDatePickerState } from "react-stately";
import { useDatePicker } from "react-aria";
import { FieldButton } from "./Button";
import { Calendar } from "./Calendar";
import { DateField } from "./DateField";
import { Popover } from "./Popover";
import { Dialog } from "./Dialog";
import { CalendarIcon } from "@heroicons/react/24/solid";

export function DatePicker(props) {
  let state = useDatePickerState(props);
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="flex group">
        <div className="bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-10 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1 relative flex items-center">
          <DateField {...fieldProps} />
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className="w-5 h-5 text-gray-700 group-focus-within:text-violet-700" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}
