import React from 'react';
import {PersonFinder} from './'

const Main = () => {
  return (
    <div className="main-content-wrapper">
      <div className="main-content">
        <div className="page-title-div">
          <h1>The Person Finder</h1>
          <p>If you just can't find someone and need to know what they look like, you've come to the right place! Just type the name of the person you are looking for below into the search box!</p>
        </div>
      <PersonFinder />
    </div>
  </div>
  )
}

export default Main;
