export const dateFormatter = (date) => {
  // Check if the date is a string and convert it to a Date object
  if (typeof date === "string") {
    date = new Date(date);
  }

  // Check if the date is a valid Date object
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date provided");
  }

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
