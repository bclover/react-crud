import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;
    const title = this.props.fields.title;
    const categories = this.props.fields.categories;
    const content = this.props.fields.content;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" { ...title } />
          <div className="text-danger">
            {title.touched ? title.error : ''}
          </div>
        </div> 
        
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" { ...categories } />
          <div className="text-danger">
            {categories.touched ? categories.error : '' }
          </div>
        </div> 
        
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea  className="form-control" { ...content } />
          <div className="text-danger">
            {content.touched ? content.error : ''}
          </div>
        </div> 
        
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link id="cancel-button"  to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Please enter a username.';
  }

  if(!values.categories) {
    errors.categories = 'Please enter a category.';
  }
  
  if(!values.content) {
    errors.content = 'Please enter some content.';
  }

  return errors;
}

export default reduxForm({ 
  form: 'PostsNewForm',
  fields: [ 'title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
