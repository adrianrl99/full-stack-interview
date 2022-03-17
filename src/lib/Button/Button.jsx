import classes from '../classes'
import Loader from '../Loader'

import styles from './Button.module.css'

const Button = ({
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  fullWith = false,
  active = false,
  loading = false,
  icon,
  className,
  children,
  ...props
}) => (
  <button
    className={classes(
      styles.Button,
      styles[`Button_${color}`],
      styles[`Button_${variant}`],
      styles[`Button_${size}`],
      {
        [styles.Button_loading]: loading,
        [styles.Button_fullWidth]: fullWith,
        [styles.Button_active]: active,
      },
      className,
    )}
    type="button"
    {...props}
  >
    {loading ? (
      <Loader />
    ) : (
      <>
        {icon}
        {children && <span>{children}</span>}
      </>
    )}
  </button>
)

export default Button
