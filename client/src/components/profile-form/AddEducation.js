import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisable, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };


    const onSubmit = event => {
        event.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add Your Education
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any school or bootcamp you have attended
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                <input type="text" placeholder="* School or bootcamp" name="school" value={school} onChange={event => {onChange(event)}} required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={event => {onChange(event)}} required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={event => {onChange(event)}} />
                </div>
                <div class="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={event => {onChange(event)}} />
                </div>
                <div class="form-group">
                <p><input type="checkbox" name="current" checked={current} onChange={event => {setFormData({...formData, current: !current});
                                                                                            toggleDisabled(!toDateDisable)}}/>{' '}Current School</p>
                </div>
                <div class="form-group">
                <h4>To Date</h4>

                <input type="date" name="to" value={to} onChange={event => {onChange(event)}} disabled={toDateDisable ? 'disabled' : ''} />
                </div>
                <div class="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Education Description"
                    value={description} onChange={event => {onChange(event)}}
                ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form> 
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation));
