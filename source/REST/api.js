import { MAIN_URL, TOKEN } from "./config";

export const api = {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error('Tasks were not not loaded.');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },

    async createTask (message) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({
                message,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Task was not created');
        }

        const { data: task } = await response.json();

        return task;
    },

    async updateTask (updatedTask) {
        const response = await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify([
                updatedTask
            ]),
        });

        if (response.status !== 200) {
            throw new Error('Task was not updated');
        }

        const { data: task } = await response.json();

        return task;
    },

    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
        });

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Task was not removed');
        }
    },

    async completeAllTasks (completedTasks) {
        const fetchTasks = completedTasks.map((task) => fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify([task]),
        }));

        await Promise.all(fetchTasks);
    },
};
