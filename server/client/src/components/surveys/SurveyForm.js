import _ from "lodash";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { formFields } from "./formFields";
import SurveyField from "./SurveyField";

import validateEmail from "../../utils/validateEmails";

export class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => (
      <Field
        component={SurveyField}
        key={name}
        label={label}
        name={name}
        type="text"
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmail(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
