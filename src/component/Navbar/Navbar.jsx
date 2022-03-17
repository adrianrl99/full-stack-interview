import { Link } from 'react-router-dom'
import Button from '../../lib/Button'
import styles from './Navbar.module.css'

const Navbar = () => (
  <div className={styles.Navbar}>
    <Link to="/">
      <Button variant="text">Home</Button>
    </Link>
    <Link to="/battles">
      <Button variant="text">Battles</Button>
    </Link>
  </div>
)

export default Navbar
