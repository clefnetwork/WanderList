const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors
  }, {})

const validateChild = requireFields('ListHeader', 'categories')
const validateDeepForm = data => {
  const errors = {}
  if (!data.ListHeader) {
    errors.ListHeader = 'Required'
  }
  if (!data.categories) {
    errors.categories = 'Required'
  }



  errors.children = data.children.map(validateChild)

  return errors
}

export default validateDeepForm
