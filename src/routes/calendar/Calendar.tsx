import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./react-big-calendar.css";

const localizer = momentLocalizer(moment)

function Calendar() {
    return (
        <div>
            <BigCalendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 350 }}
            />

        </div>
    )
}

export default Calendar
