const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    // model: "gemini-2.0-flash",
    model: "gemini-2.5-flash",
    // model: "gemini-2.5-flash-preview-04-17",
    // model: "gemini-2.5-pro-preview-03-25", // rpm is low in free 
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const CodegenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });

    export const GenAiCode = model.startChat({
      CodegenerationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Generate to do app:\nGenerate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   "
            },
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"projectTitle\": \"React To-Do App\",\n  \"explanation\": \"This React To-Do app allows users to manage their tasks efficiently. It includes components for adding, editing, deleting, and marking tasks as complete. The app uses Tailwind CSS for styling and provides a visually appealing and intuitive user interface. It also incorporates the lucide-react library for icons to enhance the user experience. The app persists data using local storage to maintain the task list across sessions.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TaskList from './components/TaskList';\\nimport TaskForm from './components/TaskForm';\\nimport { Trash, Edit, Check, Plus } from 'lucide-react';\\nimport { format } from 'date-fns';\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState(() => {\\n    const savedTasks = localStorage.getItem('tasks');\\n    return savedTasks ? JSON.parse(savedTasks) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('tasks', JSON.stringify(tasks));\\n  }, [tasks]);\\n\\n  const addTask = (text) => {\\n    const newTask = {\\n      id: Date.now(),\\n      text,\\n      completed: false,\\n      createdAt: new Date(),\\n    };\\n    setTasks([...tasks, newTask]);\\n  };\\n\\n  const deleteTask = (id) => {\\n    setTasks(tasks.filter((task) => task.id !== id));\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTasks(\\n      tasks.map((task) =>\\n        task.id === id ? { ...task, completed: !task.completed } : task\\n      )\\n    );\\n  };\\n\\n  const editTask = (id, newText) => {\\n    setTasks(\\n      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))\\n    );\\n  };\\n\\n  return (\\n    <div className=\\\"bg-gray-100 min-h-screen py-10\\\">\\n      <div className=\\\"container mx-auto p-4 shadow-md rounded-md bg-white\\\">\\n        <h1 className=\\\"text-3xl font-bold mb-6 text-center text-gray-800\\\">My To-Do List 📝</h1>\\n        <TaskForm addTask={addTask} />\\n        <TaskList\\n          tasks={tasks}\\n          deleteTask={deleteTask}\\n          toggleComplete={toggleComplete}\\n          editTask={editTask}\\n        />\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n\"\n    },\n    \"/components/TaskForm.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TaskForm({ addTask }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim()) {\\n      addTask(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"mb-4 flex\\\">\\n      <input\\n        type=\\\"text\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        placeholder=\\\"Add a new task...\\\"\\n        className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      />\\n      <button\\n        type=\\\"submit\\\"\\n        className=\\\"ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline\\\"\\n      >\\n        <Plus className=\\\"inline-block mr-1\\\" size={16} />\\n        Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TaskForm;\\n\"\n    },\n    \"/components/TaskList.js\": {\n      \"code\": \"import React from 'react';\\nimport TaskItem from './TaskItem';\\n\\nfunction TaskList({ tasks, deleteTask, toggleComplete, editTask }) {\\n  return (\\n    <div>\\n      {tasks.length === 0 ? (\\n        <p className=\\\"text-gray-500 text-center\\\">No tasks yet. Add some!</p>\\n      ) : (\\n        <ul>\\n          {tasks.map((task) => (\\n            <TaskItem\\n              key={task.id}\\n              task={task}\\n              deleteTask={deleteTask}\\n              toggleComplete={toggleComplete}\\n              editTask={editTask}\\n            />\\n          ))}\\n        </ul>\\n      )}\\n    </div>\\n  );\\n}\\n\\nexport default TaskList;\\n\"\n    },\n    \"/components/TaskItem.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Trash, Edit, Check } from 'lucide-react';\\nimport { format } from 'date-fns';\\n\\nfunction TaskItem({ task, deleteTask, toggleComplete, editTask }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(task.text);\\n\\n  const handleEdit = () => {\\n    editTask(task.id, editText);\\n    setIsEditing(false);\\n  };\\n\\n  return (\\n    <li className=\\\"flex justify-between items-center py-2 border-b border-gray-200\\\">\\n      {isEditing ? (\\n        <input\\n          type=\\\"text\\\"\\n          value={editText}\\n          onChange={(e) => setEditText(e.target.value)}\\n          onBlur={handleEdit}\\n          onKeyDown={(e) => {\\n            if (e.key === 'Enter') {\\n              handleEdit();\\n            }\\n          }}\\n          className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n        />\\n      ) : (\\n        <div className=\\\"flex items-center\\\">\\n          <input\\n            type=\\\"checkbox\\\"\\n            checked={task.completed}\\n            onChange={() => toggleComplete(task.id)}\\n            className=\\\"mr-2 leading-tight\\\"\\n          />\\n          <span\\n            className={` ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}\\n            `}\\n          >\\n            {task.text}\\n          </span>\\n          <span className=\\\"text-xs text-gray-400 ml-2\\\">{format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>\\n        </div>\\n      )}\\n\\n      <div>\\n        {isEditing ? null : (\\n          <>\\n            <button\\n              onClick={() => setIsEditing(true)}\\n              className=\\\"text-blue-500 hover:text-blue-700 mr-2\\\"\\n            >\\n              <Edit className=\\\"inline-block\\\" size={16} />\\n            </button>\\n            <button\\n              onClick={() => deleteTask(task.id)}\\n              className=\\\"text-red-500 hover:text-red-700\\\"\\n            >\\n              <Trash className=\\\"inline-block\\\" size={16} />\\n            </button>\\n          </>\\n        )}\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TaskItem;\\n\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/TaskForm.js\",\n    \"/components/TaskList.js\",\n    \"/components/TaskItem.js\"\n  ]\n}\n```"},
          ],
        },
      ],
    })
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
