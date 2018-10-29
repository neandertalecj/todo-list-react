import React from 'react'

const decorate = ({ task: { lineThrough } }) => ({ 
    textDecoration: lineThrough ? 'line-through' : 'none' 
})

const Todo = props => (
    <li>
        <span 
            style={decorate(props)}
            onClick={() => props.toggleTask(props.task.id)}
        >
            {props.task.text}
        </span>
        <span className="close"
            onClick={() => props.deleteTask(props.task.id)} 
        ><p>×</p></span>
    </li>
)
 
export default Todo