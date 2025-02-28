const minutesInHour = 60;
const mileSeconds = 1000;

export const getMinutesBetweenDates = (startDate: Date, endDate: Date): number => {
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMs / (mileSeconds * minutesInHour));
};
