import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as contactService from "../services/ContactService";

// =======================
// Cliente
// =======================
export const useSendMessage = () => {
  return useMutation({ mutationFn: contactService.sendMessage });
};

// =======================
// Admin
// =======================
export const useGetAllMessages = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: contactService.getAllMessages,
    staleTime: 5 * 60 * 1000, 
  });
};

export const useGetMessageById = (id) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => contactService.getMessageById(id),
    enabled: !!id,
  });
};

export const useMarkAsResponded = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactService.markAsResponded,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactService.deleteMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
