import React, { useEffect, useState } from 'react';
import axios from "axios";

const Todos = ({ token }) => {
    const [todos, setTodos] = useState();

    useEffect(() => {
        if (token) fetchData(token);
    }, [token]);

    const fetchData = async (token) => {
        try {
            const res = await axios.get("/api/todos", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setTodos(res.data.todos);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>LIST OF TODOS</h1>
            <ul>
                {todos?.map((todo, index) => (
                    <li key={index}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
