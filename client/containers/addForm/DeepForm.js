import React, { Component, PropTypes } from 'react'
import { reduxForm, addArrayValue } from 'redux-form'
import { Link } from 'react-router';
import PureInput from './PureInput'
import validate from './validateDeepForm'


export const fields = [
  'ListHeader',
  'categories',
  'children[].title',
  'children[].image',
  'children[].content'
]

class DeepForm extends Component {
  render() {
    const {
      addValue,
      fields: { ListHeader, categories, children },
      handleSubmit,
      invalid,
      submitting
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <legend>Create a new list!</legend>
          <div>
            <label className="control-label">Title for your list</label>
            <PureInput className="form-control" type="text" placeholder="List Title" field={ListHeader} title={ListHeader.error}/>
          </div>
          <div>
            <label className="control-label">Categories for your list</label>
            <PureInput className="form-control" type="text" placeholder="List categories" field={categories} title={categories.error}/>
          </div>
        </div>

<<<<<<< b7e4a207f7ca1489ceedd510205a308dfb557c29
        {!children.length && <div><label>Add some items to your list!</label></div>}
=======

        {!children.length && <div>Add some items to your list!</div>}
>>>>>>> [Component:refactor] Pulled out excess code from redux forms

        <div className="form-group">
          {/*
          <button className="btn btn-primary btn-sm" type="button" onClick={() => {
            children.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Item
          </button>
          */}

          <button className="btn btn-primary btn-sm" type="button" onClick={() => {
            for (let childIndex = 0; childIndex < 10; childIndex++) {
              addValue('deep', 'children')
            }
          }}><i/> Show me 10!</button>

        </div>

        {children.map((child, index) => <div key={index}>
          <div className="form-group">
            <label className="control-label">List item #{index + 1}</label>
            <div>
              <PureInput className="form-control" type="text" placeholder="Title for list item" field={child.title}/>
            </div>

            <label className="control-label">Image for list item #{index + 1}</label>
            <div>
              <PureInput className="form-control" type="text" placeholder="img URL" field={child.image}/>
            </div>

            <label className="control-label">Details for list item #{index + 1}</label>
            <div>
              <textarea className="form-control" type="text" placeholder="Describe your list item" field={child.content}/>
            </div>

            <div>
              <div>
                <button className="fa fa-chevron-up btn-link" type="button" disabled={index === 0} onClick={() => {
                  children.swapFields(index, index - 1)  // swap field with it's predecessor
                }}><i/>
                </button>

                <button className="fa fa-chevron-down btn-link" type="button" disabled={index === children.length - 1} onClick={() => {
                  children.swapFields(index, index + 1)  // swap field with it's successor
                }}><i/>
                </button>
              </div>

              <button className="btn btn-danger btn-sm" type="button" onClick={() => {
                children.removeField(index)  // remove from index
              }}><i/> Remove
              </button>
            </div>

          </div>
        </div>)}

        <div>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => {
            children.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Item
          </button>

          <legend>List done, time to submit!</legend>
          <button className="btn btn-success" type="submit" disabled={submitting || invalid}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <Link to="/" className="btn btn-error">Cancel</Link>
        </div>
      </form>
    )
  }
}

DeepForm.propTypes = {
  addValue: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'deep',
  fields,
  validate
}, undefined, {
  addValue: addArrayValue // mapDispatchToProps (will bind action creator to dispatch)
})(DeepForm)
