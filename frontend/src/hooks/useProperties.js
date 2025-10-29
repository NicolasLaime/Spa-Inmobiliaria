// src/hooks/useProperties.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as PropertiesService from "../services/PropertiesService";

// =======================
// Propiedades públicas
// =======================
export const useSearchProperties = (filters) => {
  const { city, type, minPrice, maxPrice, page, size } = filters;

  const params = {
    city: city || "",
    type: type || "",
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
    page: page || 0,
    size: size || 10,
  };

  return useQuery({
    queryKey: ["properties", params], 
    queryFn: () => PropertiesService.searchProperties(params), 
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, 
  });
};

// =======================
// Propiedad por ID
// =======================
export const usePropertyById = (id) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => PropertiesService.getPropertyById(id),
    enabled: !!id,
  });
};

// =======================
// Propiedades admin
// =======================

export const useAllPropertiesAdmin = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["admin-properties", page, size],
    queryFn: () => PropertiesService.getAllPropertiesAdmin(page, size),
    keepPreviousData: true,
  });
};



export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PropertiesService.createProperty,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["properties"] }),
  });
};


export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto, files = [] }) => PropertiesService.updateProperty(id, dto, files),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-properties"] }),
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PropertiesService.deleteProperty,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["properties"] }),
  });
};
