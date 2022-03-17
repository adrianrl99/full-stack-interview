import classes from '../classes'
import stylesPaper from '../Paper/Paper.module.css'

const styles = require('./Card.module.css')

const Card = ({ children, className, ...props }) => (
  <div
    className={classes(stylesPaper.Paper, styles.Card, className)}
    {...props}
  >
    {children}
  </div>
)

export default Card
