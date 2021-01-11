import {React} from 'react';

const Welcome = (props) => {

  const { userProfileUrl, userDisplayName } = props

  return(
      <div >
        <p >
        Your name is: {userDisplayName}<br />
        Your profile can be found <a href={userProfileUrl}>here.</a>
        </p>
      </div>
  )
}

export default Welcome