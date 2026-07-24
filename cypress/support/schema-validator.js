const Ajv = require('ajv')

const ajv = new Ajv()

const validateSchema = (data, schema) => {
  const validate = ajv.compile(schema)
  const valid = validate(data)

  if (!valid) {
    throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`)
  }

  return true
}

const validateArraySchema = (dataArray, schema) => {
  return dataArray.every(item => {
    try {
      validateSchema(item, schema)
      return true
    } catch (error) {
      console.error(`Item validation failed:`, error.message)
      return false
    }
  })
}

module.exports = {
  validateSchema,
  validateArraySchema
}