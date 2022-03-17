import classes from '../classes'
import styles from './Paper.module.css'

const Paper = ({ children, className, ...props }) => (
  <div className={classes(styles.Paper, className)} {...props}>
    {children}
  </div>
)

export default Paper
