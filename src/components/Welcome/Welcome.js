import {React} from 'react';
import './Welcome.css'

const Welcome = (props) => {

  const { userProfileUrl, userDisplayName } = props

  return(
      <div className='welcome'>
        <h1>
          Welcome, {userDisplayName}.<br />
        </h1>
      </div>
  )
}

export default Welcome