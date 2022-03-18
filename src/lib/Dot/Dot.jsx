import classes from '../classes'
import styles from './Dot.module.css'

const Dot = ({
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  className,
  ...props
}) => (
  <span
    className={classes(
      styles.Dot,
      styles[`Dot_${size}`],
      styles[`Dot_${color}`],
      styles[`Dot_${variant}`],
      className,
    )}
    {...props}
  />
)

export default Dot
