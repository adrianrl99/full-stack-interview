import classes from '../../lib/classes'
import styles from './HP.module.css'

const HP = ({ value, ...props }) => (
  <span
    className={classes(styles.HP, {
      [styles.HP_high]: value > 75 && value <= 100,
      [styles.HP_medium]: value > 50 && value <= 75,
      [styles.HP_low]: value > 25 && value <= 50,
    })}
    {...props}
  >
    {value}%
  </span>
)

export default HP
