import React from 'react';
import './Welcome.css'



const Welcome = (props) => {

  // eslint-disable-next-line
  const { userProfileUrl, userDisplayName } = props

  return(
      <div className='welcome'>
        <h1 id={'welcome-text'} className={'hide-welcome'}>
          Welcome, {userDisplayName}.<br />
        </h1>
      </div>
  )
}

export default Welcome