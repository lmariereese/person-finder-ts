import React from 'react';
import {Person} from './PersonFinder';

interface CardProps {
  person: Person;
}

const PersonList = ({person}: CardProps) => {
  return (
    <div className="person-card" key={person.id}>
        <div className="person-avatar">
          <img src={person.avatar} alt={`Avatar for ${person.name}`}></img>
        </div>
        <div className="person-info">
          <h3>{person.name}</h3>
          <p>{person.description}</p>
        </div>
      </div>
  )
}

export default PersonList;
