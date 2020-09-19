import moment from "moment";

//getDatesBetween - to get the dates in between start and end dates
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = moment(startDate).format("YYYY-MM-DD");
  while (currentDate <= endDate) {
    dates.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
  }

  return dates;
};
