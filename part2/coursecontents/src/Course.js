import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

const Header = props => {
  return <h2>{props.course}</h2>;
};

const Content = props => {
  return (
    <>
      {props.parts.map(el => (
        <Part part={el.name} exercises={el.exercises} key={el.id} />
      ))}
    </>
  );
};

const Total = ({ total }) => {
  const sum = total.reduce((acc, current) => {
    return acc + current.exercises;
  }, 0);
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

const Part = props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

export default Course;
