import React from 'react'

const decorate = ({ task: { lineThrough } }) => ({ 
    textDecoration: lineThrough ? 'line-through' : 'none' 
})

const Todo = props => (
    <li>
        <div 
            className="currentTask"
            onClick={() => props.toggleCurrentTask(props.task.id)}
        >
            {props.task.currentTask ? '▹' : ''}
        </div>
        <span 
            style={decorate(props)}
            onClick={() => props.toggleTask(props.task.id)}
        >
            {props.task.text}
        </span>
        <button className="close"
            onClick={() => props.deleteTask(props.task.id)} 
        >×</button>
    </li>
)
 
export default Todo