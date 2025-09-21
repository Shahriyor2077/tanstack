import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const usePhone = () => {
  const client = useQueryClient();

  const getPhone = () =>
    useQuery<any, any>({
      queryKey: ["phoneKey"],
      queryFn: () => api.get("phone").then((res) => res.data),
    });

  const createPhone = useMutation<any, any, any>({
    mutationFn: (body: any) => api.post("phone", body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
    onError: () => {},
  });

  const updatePhone = useMutation<any, any, any>({
    mutationFn: ({ id, ...body }) => api.put(`phone/${id}`, body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
    onError: () => {},
  });

  const deletePhone = useMutation<any, any, any>({
    mutationFn: (id) => api.delete(`phone/${id}`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
  });

  return { getPhone, createPhone, updatePhone, deletePhone };
};
