import { useState, useEffect } from 'react';
import { api } from './axios';
import { items } from '../Types/Utils';

export const useTodoApi = () => {
    const [items, setItems] = useState<items[]>([])

    const fetchTodos = async () => {
        try {
            const res = await api.get(`/todo/all`);
            setItems(res.data.data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };


    const createTodo = async (title: string) => {
        try {
            const res = await api.post(`/todo/create`, { title });
            setItems((prev) => [...prev, res.data.data.newTodo]);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const updateTodo = async (_id: string, title: string) => {
        try {
            const res = await api.patch(`/todo/${_id}`, { title });
            const updatedTodo = res.data.data.updated;
            setItems((prev) => prev.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (_id: string) => {
        try {
            await api.delete(`/todo/${_id}`);
            setItems((prev) => prev.filter(todo => todo._id !== _id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };



    useEffect(() => {
        fetchTodos();
    }, []);

    return { items, createTodo, updateTodo, deleteTodo, setItems };
};
