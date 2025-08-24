export function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function generate15MinTimeSlots() {
  const startHour = 8;
  const endHour = 24;
  const slotsPerHour = 4;
  const totalSlots = (endHour - startHour) * slotsPerHour;
  return Array.from({ length: totalSlots }, (_, i) => {
    const totalMinutes = startHour * 60 + i * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  });
}
