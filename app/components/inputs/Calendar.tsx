
import React from "react";
import { Range, RangeKeyDict, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
	dateRange: Range;
	disabledDates: Date[];
	onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({ dateRange, disabledDates, onChange }) => {
	return <DateRange 
            rangeColors={["#262626"]} 
            ranges={[dateRange]} 
            disabledDates={disabledDates} 
            date={new Date()} 
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
        />;
};

export default Calendar;
