const dateFormat = (input) => {
  let parts = input.split('-');
  const convertDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return convertDate
}

module.exports = {
  dateFormat
}
