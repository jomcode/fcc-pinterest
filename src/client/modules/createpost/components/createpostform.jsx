import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const CreatePostForm = (props) => {
  const { handleSubmit, pristine, reset, isFetching } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="title" component="input" type="text" placeholder="Title" />
      </div>
      <div>
        <Field name="imageUrl" component="input" type="text" placeholder="Image Url" />
      </div>
      <button type="submit" disabled={pristine || isFetching}>Create</button>
      <button type="button" disabled={pristine || isFetching} onClick={reset}>
        Clear Values
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'createPost'
})(CreatePostForm);
