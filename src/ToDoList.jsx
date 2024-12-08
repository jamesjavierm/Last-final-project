import React, { useState } from 'react';
import './index.css';

function ToDoList() {
    const [tasks, setTasks] = useState(["Learn how to solve a Rubik's Cube", "Go wash the car", "Build the gaming PC", "Drink 3.5L of water"]);
    const [newTask, setNewTask] = useState("");
    const [backupTasks, setBackupTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);  
    const [completedTasks, setCompletedTasks] = useState([]); 

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setCompletedTasks([...completedTasks, false]); 
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
    }

    function moveTaskUp(index) {
        if (index === 0) return;
        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
        const newCompletedTasks = [...completedTasks];
        [newCompletedTasks[index - 1], newCompletedTasks[index]] = [newCompletedTasks[index], newCompletedTasks[index - 1]];
        setTasks(newTasks);
        setCompletedTasks(newCompletedTasks);
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
        const newCompletedTasks = [...completedTasks];
        [newCompletedTasks[index], newCompletedTasks[index + 1]] = [newCompletedTasks[index + 1], newCompletedTasks[index]];
        setTasks(newTasks);
        setCompletedTasks(newCompletedTasks);
    }
        // Store tasks 
    function eliminateEverything() {
        setBackupTasks([...tasks]); 
        setTasks([]); // Clear
    }

    function returnTasks() {
        setTasks(backupTasks); // Restore button
        setBackupTasks([]); 
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function searchTasks() {
        if (searchTerm.trim() === "") return;
        const filteredTasks = tasks.filter((task) =>
            task.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredTasks);
        setIsSearching(true);
    }

    function resetSearch() {
        setSearchTerm("");
        setSearchResults([]);
        setIsSearching(false);
    }

    // light and dark mode
    function toggleMode() {
        setIsLightMode((prevMode) => !prevMode);
        if (!isLightMode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }
    }

    // Completed task
    function markAsCompleted(index) {
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[index] = !updatedCompletedTasks[index]; 
        setCompletedTasks(updatedCompletedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>NOTES</h1>

            {/* Add Task */}
            <div>
                <input
                    type="text"
                    placeholder="Create Task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                Add➕
                </button>
            </div>

            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-button" onClick={searchTasks}>
                🔎Search🔍
                </button>
                {isSearching && (
                    <button className="reset-button" onClick={resetSearch}>
                        Reset🔙
                    </button>
                )}
            </div>

            {/* List */}
            <ol>
                {(isSearching ? searchResults : tasks).map((task, index) => (
                    <li key={index} className={completedTasks[index] ? 'completed' : ''}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete❌
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            MOVE UP ☝️
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            MOVE DOWN 👇
                        </button>
                        <button className="complete-button" onClick={() => markAsCompleted(index)}>
                            {completedTasks[index] ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                ))}
            </ol>

            {/* Eliminate - UNDO */}
            <div className="action-buttons">
                <button className="eliminate-button" onClick={eliminateEverything}>
                    Eliminate All Tasks💀
                </button>
                <button
                    className="return-button"
                    onClick={returnTasks}
                    disabled={backupTasks.length === 0}
                >
                    UNDO
                </button>
            </div>

            {/* Light/Dark Mode */}
            <button className="toggle-mode" onClick={toggleMode}>
                {isLightMode ? "Dark Mode 🌑" : "Light Mode ☀️"}
            </button>
        </div>
    );
}

export default ToDoList;
