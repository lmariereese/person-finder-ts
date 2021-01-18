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
  isLoading: boolean;
  noResults: boolean;
  data: Array<Person>;
}

type Action =
| {type: "DISPLAY_RESULTS", payload: Array<Person>}
| {type: "NO_RESULTS"}
| {type: "LOADING"}


const personReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DISPLAY_RESULTS": {
      return {...state, isLoading: false, noResults: false, data: action.payload}
    }
    case "NO_RESULTS": {
      return {...state, isLoading: false, noResults: true, data: []}
    }
    case "LOADING": {
      return {...state, isLoading: true, noResults: false}
    }
    default: throw new Error();
  }
}

const PersonFinder = () => {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(personReducer, {
    isLoading: false,
    noResults: false,
    data: mockData
  })

  useEffect(() => {
    dispatch({type: "LOADING"})
    const timer = setTimeout(() => {
      const results: Array<Person> = searchData(search);
      if (search !== "" && results.length === 0) {
        dispatch({type: "NO_RESULTS"})
      } else {
        dispatch({type: "DISPLAY_RESULTS", payload: results})
      }
    }, 500)
    return () => clearTimeout(timer);
  }, [search])

  return (
    <>
      <div className="form-wrapper">
        <form autoComplete="off">
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
        {state.isLoading && <div>Loading results...</div>}
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
