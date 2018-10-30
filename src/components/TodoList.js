import React, { Component } from 'react'
import nanoid from 'nanoid'
import Todo from './Todo'

class TodoList extends Component {
    static invertStatus = id => task => task.id === id
        ? ({ ...task, lineThrough: !task.lineThrough })
        : task

    state = {
        list: []
    }

    componentDidMount() {
        const list = localStorage.getItem('todoList')
            ? JSON.parse(localStorage.getItem('todoList'))
            : []
        this.setState({ list })
    }

    saveTaskList = (list) => {
        localStorage.setItem('todoList', JSON.stringify(list))
        this.setState({list})
    }

    addTask = e => {
        e.preventDefault()
 
        const list = [
            ...this.state.list,
            {
                id: nanoid(),
                text: e.target.task.value,
                lineThrough: false,
                currentTask: false
            }
        ]
        this.saveTaskList(list)

        e.target.reset()
    }

    deleteTask = id => {
        const list = this.state.list.filter(task => task.id !== id)
        this.saveTaskList(list)
    }

    // hendleTextDecor = (id) => {
    //     const list = this.state.list.map(task => ({
    //             id: task.id, 
    //             text: task.text, 
    //             //lineThrough: (task.id === id) && (task.lineThrough = !task.lineThrough)
    //             lineThrough: (task.id === id) && (!task.lineThrough)
    //         })
    //     )
    //     this.setState({list})
    // }
    toggleCurrentTask = id => {
        const list = this.state.list.map(task => ({
            ...task,
            currentTask: (task.id === id) && (!task.currentTask)
        }))
        this.saveTaskList(list)
    }

    

    toggleTask = id => {
        const list = this.state.list.map(TodoList.invertStatus(id))
        this.saveTaskList(list)
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.addTask}>
                    <h2>Task list</h2>
                    <div className="add-task">
                        <input type="text" name="task" required />
                        <button type="submit" className="btn">Ok</button>
                    </div>
                </form>
                <ol>
                    {this.state.list.map(task => (
                        <Todo 
                            key={task.id}
                            task={task} 
                            deleteTask={this.deleteTask} 
                            toggleTask={this.toggleTask}
                            toggleCurrentTask={this.toggleCurrentTask}
                        />
                    ))}
                </ol>
            </div>
         )
    }


}
 
export default TodoList