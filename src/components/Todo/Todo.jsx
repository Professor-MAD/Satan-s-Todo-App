import React from "react"

export const Todo = (props) => {
    return <div className="todo">
        {props.todo.text}
    </div>
};