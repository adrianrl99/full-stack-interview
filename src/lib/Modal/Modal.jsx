import { useEffect } from 'react'
import Button from '../Button'
import Card from '../Card'
import classes from '../classes'
import CloseIcon from '../icons/Close'
import styles from './Modal.module.css'

const Modal = ({ open, children, className, onClose, permanent }) => {
  const handleClose = () => !permanent && onClose()

  useEffect(() => {
    open
      ? window.document.body.classList.add('disable-scroll')
      : window.document.body.classList.remove('disable-scroll')
  }, [open])

  return (
    open && (
      <div className={classes(styles.Modal, className)}>
        <div className={styles.Modal_backdrop} onClick={handleClose} />
        <Card className={styles.Modal_content}>
          <Button
            variant="text"
            className={styles.Modal_close}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          {children}
        </Card>
      </div>
    )
  )
}

export default Modal
