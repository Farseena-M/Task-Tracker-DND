import { useState, useEffect } from 'react';
import axios from 'axios';
import { items } from '../Types/Utils';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useTodoApi = () => {
    const [items, setItems] = useState<items[]>([])

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/todo/all`);
            setItems(res.data.data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
    

    const createTodo = async (title: string) => {
        try {
            const res = await axios.post(`${BASE_URL}/todo/create`, { title });
            setItems((prev) => [...prev, res.data.data.newTodo]);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const updateTodo = async (_id: string, title: string) => {
        try {
            const res = await axios.patch(`${BASE_URL}/todo/${_id}`, { title });
            const updatedTodo = res.data.data.updated;
            setItems((prev) => prev.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (_id: string) => {
        try {
            await axios.delete(`${BASE_URL}/todo/${_id}`);
            setItems((prev) => prev.filter(todo => todo._id !== _id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    
    

    useEffect(() => {
        fetchTodos();
    }, []);

    return { items, createTodo, updateTodo, deleteTodo };
};
