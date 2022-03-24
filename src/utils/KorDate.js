
export default () => {
  const date = new Date()

  return new Date((date.getTime() + (date.getTimezoneOffset * 60 * 1000)) + (9 * 60 * 60 * 1000))

}