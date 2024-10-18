`use client`
import {DateRange, Range, RangeKeyDict} from 'react-date-range'
import {FC} from "react";

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file


export type CalendarProps = {
  value: Range
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
}

export const Calendar: FC<CalendarProps> = ({
                            value,
                            disabledDates,
                            onChange
                         }) => {
  return (
    <div>
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  )
}
