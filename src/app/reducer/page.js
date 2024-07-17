"use client"

import { TasksProvider } from "@/hooks/tasksContext";
import AddTask from "@/components/reducer/AddTask";
import TaskList from "@/components/reducer/TaskList";

export default function TaskApp() {
    return (
        <TasksProvider >
            <h1>Day off in Kyoto</h1>
            <AddTask />
            <TaskList />
        </TasksProvider>
    );
}
