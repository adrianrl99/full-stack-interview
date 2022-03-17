const classes = (...args) =>
  args
    .map(value =>
      !value || typeof value === 'string'
        ? value
        : Object.entries(value)
            .filter(([, value]) => value)
            .map(([key]) => key),
    )
    .flat()
    .join(' ')

export default classes
