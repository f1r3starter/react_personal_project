// Core
import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    static propTypes = {
        _removeTaskAsync: func.isRequired,
        _updateTaskAsync: func.isRequired,
        completed:        bool.isRequired,
        created:          string.isRequired,
        favorite:         bool.isRequired,
        id:               string.isRequired,
        message:          string.isRequired,
        modified:         string.isRequired,
    };

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _setTaskEditingState = () => {

    };

    _updateTask = () => {

    };

    _updateNewTaskMessage = () => {

    };

    _updateTaskMessageOnClick = () => {

    };

    _cancelUpdatingTaskMessage = () => {

    };

    _updateTaskMessageOnKeyDown = () => {

    };

    _toggleTaskCompletedState = () => {

    };

    _toggleTaskFavoriteState = () => {

    };

    _removeTask = () => {

    };

    render () {
        return <li className = { Styles.task }>Задача: стартовая точка</li>;
    }
}
