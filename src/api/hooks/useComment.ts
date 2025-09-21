import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const useComment = () => {
  const client = useQueryClient();

  const getComment = () =>
    useQuery<any, any>({
      queryKey: ["commentKey"],
      queryFn: () => api.get("comment").then((res) => res.data),
    });

    const getCommentById = (id: string) =>
      useQuery<any, any>({
        queryKey: ["commentKey", id],
        queryFn: () => api.get(`comment/${id}`).then((res) => res.data),
      });

  const createComment = useMutation<any, any, any>({
    mutationFn: (body: any) =>
      api.post("comment", body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["commentKey"] });
    },
    onError: () => {},
  });

  const deleteComment = useMutation<any, any, any>({
    mutationFn: (id) => api.delete(`comment/${id}`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["commentKey"] });
    },
  });

  const updateComment=useMutation<any, any, any>({
    mutationFn: ({id, body})=>api.put(`comment/${id}`, body),
    onSuccess:()=>{
        client.invalidateQueries({queryKey: ["commentKey"]})
    }
  })

  return { getComment, createComment, deleteComment, getCommentById, updateComment};
};
