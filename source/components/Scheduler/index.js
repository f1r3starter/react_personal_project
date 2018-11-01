// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST';
import Checkbox from "../../theme/assets/Checkbox";
import Spinner from "../Spinner"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        newTaskMessage:  '',
        tasksFilter:     '',
        isTasksFetching: false,
        tasks:           [],
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _updateTasksFilter = (event) => {
        this.setState({
            tasksFilter: event.target.value,
        });
    };

    _updateNewTaskMessage = (event) => {
        const { newTaskMessage } = this.state;
        const newMessage = event.target.value;

        if (newTaskMessage.toLocaleLowerCase() !== newMessage.toLocaleLowerCase()) {
            this.setState({
                newTaskMessage: newMessage,
            });
        }
    };

    _getAllCompleted = () => {
        const { tasks } = this.state;

        return !tasks.some((task) => task.completed === false);
    };

    _setTasksFetchingState = (isFetching) => {
        if (typeof isFetching !== 'boolean') {
            throw new Error(
                'Parameter should be boolean',
            );
        }

        this.setState({
            isTasksFetching: isFetching,
        });
    };

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const tasks = await api.fetchTasks();

        this.setState({
            tasks,
        });

        this._setTasksFetchingState(false);
    };

    _createTaskAsync = async (event) => {
        const { newTaskMessage } = this.state;

        if (newTaskMessage === '') {
            return null;
        }

        event.preventDefault();
        this._setTasksFetchingState(true);

        const task = await api.createTask(newTaskMessage);

        this.setState(({ tasks }) => ({
            tasks:          [task, ...tasks],
            newTaskMessage: '',
        }));

        this._setTasksFetchingState(false);
    };

    _updateTaskAsync = async (taskMessage) => {
        this._setTasksFetchingState(true);

        await api.updateTask(taskMessage);

        this._setTasksFetchingState(false);
    };

    _removeTaskAsync = async (taskId) => {
        const { tasks } = this.state;

        this._setTasksFetchingState(true);

        await api.removeTask(taskId);

        this.setState({
            tasks: tasks.filter((task) => task.id !== taskId),
        });

        this._setTasksFetchingState(false);
    };

    _completeAllTasksAsync = async () => {
        const { tasks } = this.state;
        const uncompletedTasks = tasks.filter((task) => task.completed === false);

        if (uncompletedTasks.length === 0) {
            return 0;
        }

        this._setTasksFetchingState(true);

        await api.completeAllTasks(uncompletedTasks);

        this.setState({
            tasks: tasks.forEach((task) => task.completed = true),
        });

        this._setTasksFetchingState(false);
    };

    render () {
        const { newTaskMessage, tasksFilter, isTasksFetching } = this.state;
        const checked = this._getAllCompleted();

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                maxLength = { 50 }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div>
                            <ul />
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            { ...checked }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
