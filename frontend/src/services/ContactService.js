import api from "../api/api";


export const sendMessage = async (contactDto) => {
  const { data } = await api.post("/api/contacts", contactDto);
  return data;
};

// Admin
export const getAllMessages = async () => {
  const { data } = await api.get("/api/contacts");
  return data;
};

export const getMessageById = async (id) => {
  const { data } = await api.get(`/api/contacts/${id}`);
  return data;
};

export const markAsResponded = async (id) => {
  const { data } = await api.put(`/api/contacts/${id}/responded`);
  return data;
};

export const deleteMessage = async (id) => {
  const { data } = await api.delete(`/api/contacts/${id}`);
  return data;
};