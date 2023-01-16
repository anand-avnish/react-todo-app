import React, { useState, useEffect } from 'react';

function TodoList() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('Todo');
    const [add, setAdd] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        let list = todos;
        list.push({ task: input, status: status });
        list=sortTasks(list);
        setTodos(list);
        setInput('');
        setStatus('Todo');
        setAdd(false);
    };

    const sortTasks = tasks =>{
        let completed = tasks.filter(task=>task.status==="Completed")
        let progress = tasks.filter(task=>task.status==="InProgress")
        let todo = tasks.filter(task=>task.status==="Todo")
        tasks = progress.concat(todo,completed)
        console.log(tasks);
        return tasks;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setAdd(false);
        setInput('');
        setStatus('Todo');
    }

    const handleDelete = index => {
        setTodos(todos.filter((todo, i) => i !== index));
    };

    const handleEdit = (index) => {
        todos.map((todo, i) => {
            if (i === index) {
                handleDelete(index)
                setAdd(true);
                setInput(todo.task);
                setStatus(todo.status);
            }
        })
    };

    useEffect(()=>{
        setTodos(todos=>sortTasks(todos))
    },[])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="p-6 font-sans bg-[#FFF1E0] bg-cover h-screen w-screen flex flex-col overflow-hidden font-courgette">
            <header>
                <h1 className="font-bold text-5xl text-center text-black drop-shadow-xl shadow-black underline">TODO List</h1>
            </header>
            <div className="pt-10 grow">
                <main className="flex flex-col h-full">

                    <div className="p-2">
                        {(add===true)? 
                            <div className="w-full p-2 flex items-center justify-between flex-wrap shadow-xl bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-600 add-form">
                                <form onSubmit={handleSubmit} className="w-full flex flex-wrap items-center justify-between">
                                    <div className="w-min grow">
                                        <label className="pr-4 mt-1">Task Name: 
                                            <input 
                                                type="text" 
                                                id="taskName" 
                                                name="taskName" 
                                                className="border border-black rounded-lg p-1 mt-1 ml-1" 
                                                value={input}
                                                onChange={event => setInput(event.target.value)}/>
                                        </label>
                                        <label className="pr-4 mt-1">Status: 
                                            <select name="status" id="status" className="border border-black rounded-lg p-1 mt-1 ml-1" value={status} onChange={event => setStatus(event.target.value)}>
                                                <option value="Todo">Todo</option>
                                                <option value="Completed">Completed</option>
                                                <option value="InProgress">InProgress</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <button className="add-button bg-cyan-600 rounded-lg text-white p-2 mt-1 mr-1" type="submit">Add</button>
                                        <button className="close-button bg-red-600 rounded-lg text-white p-2 mt-1" onClick={event=>handleCancel(event)}>Cancel</button>
                                    </div>
                                </form>
                            </div>:
                            <div className="flex flex-row w-full justify-end add-task">
                                <button className="add-task-button bg-cyan-600 rounded-lg text-white p-2" onClick={event=>setAdd(true)}>Add Task</button>
                            </div>
                        }
                    </div>

                    <div className="p-2 max-h-[70%] grow shadow-2xl bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-600 overflow-y-scroll">
                        <div className="w-full text-center py-1 min-w-min task-list">
                        {todos.map((todo, index) => (
                            <div key={index} className="flex border-b border-black justify-center flex-wrap font-base p-1 mt-1">
                                <span className="w-7/12 font-bold text-lg">{todo.task}</span>
                                <span className="w-3/12 min-w-min">
                                    {(todo.status==="Completed")?
                                        <span className="bg-green-600 rounded-lg text-white py-1 px-2">{todo.status}</span>:
                                        (todo.status==="InProgress")?
                                        <span className="bg-yellow-600 rounded-lg text-white py-1 px-2">{todo.status}</span>:
                                        <span className="bg-gray-600 rounded-lg text-white py-1 px-2">{todo.status}</span>
                                    }
                                </span>
                                <div className="w-fit">
                                    <span className="edit w-1/12 min-w-min cursor-pointer material-symbols-outlined text-cyan-600 p-1" onClick={() => handleEdit(index)}>
                                        edit
                                    </span>
                                    <span className="del w-1/12 min-w-min cursor-pointer material-symbols-outlined text-center text-red-600 p-1" onClick={() => handleDelete(index)}>
                                        delete
                                    </span>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default TodoList;
