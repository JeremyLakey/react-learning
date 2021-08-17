import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience: {
    company, title, location, current, to, from, description
}}) => {
    return (
        <div className="profile-exp bg-white p-2">
          <div>
            <h3 className="text-dark">{company}</h3>
            <p><Moment formate='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment formate='YYYY/MM/DD'>{to}</Moment>}</p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience:PropTypes.object.isRequired,

}

export default ProfileExperience
