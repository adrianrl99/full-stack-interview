import classes from '../classes'

import styles from './HelperText.module.css'

const HelperText = ({ className, children, error, ...props }) => (
  <span
    className={classes(styles.HelperText, className, {
      [styles.HelperText_error]: error,
    })}
    {...props}
  >
    {children}
  </span>
)

export default HelperText
