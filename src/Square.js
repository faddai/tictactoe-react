import React from 'react';

// function component
// a component that contains only a render method. when that happens it becomes unnecessary to use
// class that extends React.Component. Simplify by using a function component.
export default function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
