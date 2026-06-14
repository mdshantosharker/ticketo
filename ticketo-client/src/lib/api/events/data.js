import { serverFetch } from "../server";

export const myEvents = async (email) => {
  const result = await serverFetch(`/api/events/${email}`);
  return result;
};
export const fetchEvents = async (query) => {
  const result = await serverFetch(`/api/events?${query.toString()}`);
  return result;
};
export const singleEvent = async (id) => {
  const result = await serverFetch(`/api/events/single-events/${id}`);
  return result;
};
