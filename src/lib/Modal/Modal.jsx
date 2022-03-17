import Card from '../Card'
import classes from '../classes'
import styles from './Modal.module.css'

const Modal = ({ open, children, className, onClose, permanent }) =>
  open && (
    <div className={classes(styles.Modal, className)}>
      <div
        className={styles.Modal_backdrop}
        onClick={() => {
          !permanent && onClose()
        }}
      />
      <Card className={styles.Modal_content}>{children}</Card>
    </div>
  )

export default Modal
