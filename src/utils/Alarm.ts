import AlarmWithOccurrence from "@/utils/AlarmWithOccurrence";

interface Alarm {
  time: string;          // "HH:MM"
  date: string | null;   // ISO date string or null
  weekdays: string[];    // e.g. ["Mon", "Tue"]
}


function getNextAlarm(alarms: Alarm[]): AlarmWithOccurrence | null {
  const now = new Date();

  // Map weekday names to numeric indices (0=Sunday, 1=Monday, ...)
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  function parseTime(timeStr: string): { hours: number; minutes: number } {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  }

  function getNextOccurrence(alarm: Alarm): Date | null {
    const { time, date, weekdays } = alarm;
    const { hours, minutes } = parseTime(time);

    if (date) {
      // One-time alarm at a specific date
      const alarmDate = new Date(date);
      return alarmDate > now ? alarmDate : null;
    } else if (weekdays && weekdays.length > 0) {
      // Recurring alarm on specific weekdays
      const currentDayIndex = now.getDay();

      // Check the next 7 days (one full week)
      for (let addDays = 0; addDays < 7; addDays++) {
        const checkDate = new Date(now);
        checkDate.setHours(hours, minutes, 0, 0);
        checkDate.setDate(now.getDate() + addDays);

        const checkDayIndex = (currentDayIndex + addDays) % 7;
        const weekdayName = Object.keys(weekdayMap).find(
          (day) => weekdayMap[day] === checkDayIndex
        );

        if (weekdayName && weekdays.includes(weekdayName) && checkDate > now) {
          return checkDate;
        }
      }

      return null;
    } else {
      // Daily alarm (no specific weekdays)
      const candidateToday = new Date(now);
      candidateToday.setHours(hours, minutes, 0, 0);

      if (candidateToday > now) {
        return candidateToday;
      } else {
        // Tomorrow
        const candidateTomorrow = new Date(now);
        candidateTomorrow.setDate(now.getDate() + 1);
        candidateTomorrow.setHours(hours, minutes, 0, 0);
        return candidateTomorrow;
      }
    }
  }

  // Compute occurrences for all alarms
  const occurrences: { alarm: Alarm; occurrence: Date | null }[] = alarms.map((a) => ({
    alarm: a,
    occurrence: getNextOccurrence(a),
  }));

  // Filter to only alarms that have a future occurrence
  const validOccurrences = occurrences.filter((o) => o.occurrence !== null) as {
    alarm: Alarm;
    occurrence: Date;
  }[];

  if (validOccurrences.length === 0) {
    return null;
  }

  // Find the earliest occurrence
  validOccurrences.sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime());
  const next = validOccurrences[0];

  return {
    ...next.alarm,
    nextOccurrence: next.occurrence,
  };
}



export default Alarm;
export { getNextAlarm }