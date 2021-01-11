import {React} from 'react';

const Welcome = (props) => {

  const { userProfileUrl, userDisplayName } = props

  return(
      <div >
        <h1>
          Hi there, <a href={userProfileUrl}>{userDisplayName}</a><br />
        </h1>
      </div>
  )
}

export default Welcome