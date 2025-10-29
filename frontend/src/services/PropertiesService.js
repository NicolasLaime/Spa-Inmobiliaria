import api from "../api/api";

// ----------------------
// Propiedades públicas
// ----------------------
export const searchProperties = async ({ city, type, minPrice, maxPrice, page = 0, size = 10 }) => {
  const params = { city, type, minPrice, maxPrice, page, size };
  const { data } = await api.get("/api/public/properties/search", { params });
  return data;
};

export const getPropertyById = async (id) => {
  const { data } = await api.get(`/api/public/properties/${id}`);
  return data;
};

// ----------------------
// Propiedades privadas (admin)
// ----------------------


export const getAllPropertiesAdmin = async (page = 0, size = 10) => {
  const { data } = await api.get("/api/admin/properties", {
    params: { page, size },
  });
  return data;
};


export const createProperty = async (formData) => {
  const { data } = await api.post("/api/admin/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};


export const updateProperty = async (id, dto = {}, files = []) => {
  const formData = new FormData();

  formData.append("data", new Blob([JSON.stringify(dto)], { type: "application/json" }));

  files.forEach((file) => formData.append("images", file));

  const { data } = await api.put(`/api/admin/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }, // importante
  });

  return data;
};


export const deleteProperty = async (id) => {
  const { data } = await api.delete(`/api/admin/properties/${id}`);
  return data;
};
