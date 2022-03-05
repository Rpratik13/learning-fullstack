import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../actions";
import { formFields } from "./formFields";

const SurveyFormReview = (props) => {
  console.log("SurveyFormReview ~ props", props);
  const { onCancel, formValues, submitSurvey } = props;
  const navigate = useNavigate();

  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, navigate)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
