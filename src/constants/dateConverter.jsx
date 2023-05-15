import moment from "moment-timezone";

export const date = (timestamp) => {
  const date = new Date(timestamp).toDateString();
  return `${date}`;
};

export const time = (timestamp) => {
  const timezone = moment.tz.guess();
  const time = moment.tz(timestamp, timezone).format("hh:mm a");
  return `${time}`;
};
