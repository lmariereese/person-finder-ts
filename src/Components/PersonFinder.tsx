import React, {useState, useEffect, useReducer} from 'react';
import {PersonCard} from './';
import {mockData} from '../mockData';
import searchData from '../utils/searchData';

export interface Person {
  id: number;
  name: string;
  email: string;
  description: string;
  avatar: string;
}

interface State {
  noResults: boolean;
  data: Array<Person>;
}

type Action =
| {type: "DISPLAY_RESULTS", payload: Array<Person>}
| {type: "NO_RESULTS"}


const personReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DISPLAY_RESULTS": {
      return {...state, noResults: false, data: action.payload}
    }
    case "NO_RESULTS": {
      return {...state, noResults: true, data: []}
    }
    default: throw new Error();
  }
}

const PersonFinder = () => {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(personReducer, {
    noResults: false,
    data: mockData
  })

  useEffect(() => {
    const results = searchData(search);
    if (search !== "" && results.length === 0) {
      dispatch({type: "NO_RESULTS"})
    } else {
      dispatch({type: "DISPLAY_RESULTS", payload: results})
    }
  }, [search])

  return (
    <>
      <div className="form-wrapper">
        <form>
          <label htmlFor= "search"></label>
          <input
            type="text"
            name="search"
            placeholder="Type a name..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          ></input>
        </form>
      </div>
      <div className="list-wrapper">
        {state.noResults ? (
          <div>
            <p>No results. Please try another name.</p>
          </div>
        ) : (
          <>
          {state.data.map((person: Person) => {
            return (
              <PersonCard person={person} key={person.id}/>
            )
          })}
          </>
        )
      }
        </div>
    </>
  )
}

export default PersonFinder;
