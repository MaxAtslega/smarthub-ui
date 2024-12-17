import Alarm from "@/utils/Alarm";

interface AlarmWithOccurrence extends Alarm {
  nextOccurrence: Date;
}

function formatNextOccurrence(nextOccurrence: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((nextOccurrence.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const occurrenceDayName = weekdayNames[nextOccurrence.getDay()];

  if (diffInDays === 0) {
    return "today";
  } else if (diffInDays === 1) {
    return "tomorrow";
  } else if (diffInDays > 1 && diffInDays <= 7) {
    return occurrenceDayName;
  } else {
    return nextOccurrence.toISOString().split("T")[0];
  }
}

export default AlarmWithOccurrence;
export { formatNextOccurrence };