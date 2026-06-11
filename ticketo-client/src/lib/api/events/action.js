"use server";

import { deleteMutation, serverMutation } from "../server";

export const addEvents = async (data) => {
  const resData = await serverMutation("/api/events", "POST", data);
  return resData;
};
export const updateEvents = async (data, id) => {
  const resData = await serverMutation(`/api/events/${id}`, "PATCH", data);
  return resData;
};

export const deleteEvents = async (id) => {
  const resData = await deleteMutation(`/api/events/${id}`, "DELETE");
  return resData;
};
