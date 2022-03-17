import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Navbar from '../component/Navbar'
import Modal from '../lib/Modal'
import { modalState } from '../state/state'

import styles from './AppLayout.module.css'

const AppLayout = () => {
  const [modal, setModal] = useRecoilState(modalState)

  const handleCloseModal = () =>
    setModal({ open: false, render: null, className: '' })

  return (
    <div className={styles.AppLayout}>
      <Navbar />
      <Outlet />
      <Modal
        open={modal.open}
        onClose={handleCloseModal}
        children={modal.render}
        className={modal.className}
      />
    </div>
  )
}

export default AppLayout
