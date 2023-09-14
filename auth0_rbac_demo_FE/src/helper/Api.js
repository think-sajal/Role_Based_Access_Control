import axiosInstance from "./axios";

export const Api = {
    getUsers: async () =>  {
        return axiosInstance.get('/users');
    },
    getUser: async (id) =>  {
        return axiosInstance.get(`/user/${id}`);
    },
    createUser: async (data) =>  {
        return axiosInstance.post('/user', data);
    },
    updateUser: async (id, data) =>  {
        delete data.id;
        id = encodeURIComponent(id);
        return axiosInstance.put(`/user/${id}`, data);
    },
    deleteUser: async (id) => {
        id = encodeURIComponent(id);
        return axiosInstance.delete(`/user/${id}`);
    }
}