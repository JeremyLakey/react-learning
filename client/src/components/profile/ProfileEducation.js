import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education: {
    school, degree, fieldofstudy, current, to, from, description
}}) => {
    return (
        <div className="profile-exp bg-white p-2">
          <div>
            <h3 className="text-dark">{school}</h3>
            <p><Moment formate='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment formate='YYYY/MM/DD'>{to}</Moment>}</p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
        </div>
    )
}

ProfileEducation.propTypes = {
    education:PropTypes.object.isRequired,

}

export default ProfileEducation
