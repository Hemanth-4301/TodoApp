import React, { useState, useEffect } from "react";
import "../App.css";

import api from "../context/api";

function TodoForm() {
  const [todo, setTodo] = useState(""); // Input text
  const [data, setData] = useState([]); // All todos
  const [loading, setLoading] = useState(false);
  // Fetch all todos
  const getTodo = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todo/getall");
      setData(res.data.todos || []);
      setLoading(false);
    } catch (e) {
      alert("Error fetching todos: " + e.message);
    }
  };

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      alert("Please enter a task");
      return;
    }
    try {
      const res = await api.post("/todo/add", {
        todo: todo,
      });
      setTodo("");
      await getTodo();
    } catch (e) {
      alert("Error adding todo: " + e.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/delete/${id}`);
      await getTodo();
    } catch (e) {
      alert("Error deleting todo: " + e.message);
    }
  };

  // Update a todo
  const updateTodo = async (id, currentText) => {
    const newText = prompt("Update todo:", currentText);
    if (!newText) return;
    try {
      await api.put(`/todo/update/${id}`, {
        todo: newText,
      });
      await getTodo();
    } catch (e) {
      alert("Error updating todo: " + e.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <section className="">
      <div style={styles.container}>
        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task"
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>
              Add
            </button>
            <button
              type="button"
              style={styles.button}
              onClick={() => setTodo("")}
            >
              Clear
            </button>
          </div>
        </form>

        <div style={styles.listContainer}>
          <h2 style={styles.heading}>Todo List</h2>
          {data.length === 0 && <h3 className="">No tasks yet...</h3>}

          {loading ? (
            <div className="loader rounded-full border-2 border-black h-[30px] w-[30px] border-t-blue-50 animate-spin mx-auto"></div>
          ) : (
            <ol className="px-2">
              {data.map((item) => (
                <li key={item._id} style={styles.listItem}>
                  <span>{item.text}</span>
                  <div style={styles.listButtons}>
                    <button
                      onClick={() => updateTodo(item._id, item.text)}
                      style={styles.smallButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(item._id)}
                      style={styles.smallButton}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid black",
    fontFamily: "monospace",
    backgroundColor: "white",
    color: "black",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid black",
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "6px 12px",
    border: "1px solid black",
    background: "none",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
  },
  listContainer: {
    borderTop: "1px solid black",
    paddingTop: "10px",
    minHeight: "100px",
    maxHeight: "200px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  listButtons: {
    display: "flex",
    gap: "10px",
  },
  smallButton: {
    border: "1px solid black",
    padding: "2px 6px",
    fontSize: "12px",
    background: "none",
    color: "black",
    cursor: "pointer",
  },
};

export default TodoForm;
