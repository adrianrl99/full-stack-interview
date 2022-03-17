import Button from '../../lib/Button'
import Card from '../../lib/Card'
import Space from '../../lib/Space'
import RobotIcon from '../../lib/icons/Robot'

import styles from './RobotCard.module.css'
import { useRecoilState } from 'recoil'
import { modalState } from '../../state/state'
import RobotForm from '../RobotForm/RobotForm'
import RobotConfirmDelete from '../RobotConfirmDelete'

const RobotCard = robot => {
  const { name, color, attack, defense } = robot
  const [, setModal] = useRecoilState(modalState)

  const handleEdit = () =>
    setModal({
      open: true,
      render: <RobotForm {...robot} />,
    })

  const handleDelete = () =>
    setModal({
      open: true,
      render: <RobotConfirmDelete {...robot} />,
    })

  return (
    <div className={styles.RobotCard}>
      <div className={styles.RobotCard_inner}>
        <Card className={styles.RobotCard_front}>
          <RobotIcon color={color} className={styles.RobotCard_icon} />
          <h4>{name}</h4>
        </Card>
        <Card className={styles.RobotCard_back}>
          <RobotIcon color={color} className={styles.RobotCard_icon} />
          <h4>{name}</h4>
          <div className={styles.RobotCard_attack_defense}>
            <span className={styles.RobotCard_attack}>
              Attack: <h4>{attack}</h4>
            </span>
            |
            <span className={styles.RobotCard_defense}>
              Defense: <h4>{defense}</h4>
            </span>
          </div>
          <Space />
          <div className={styles.RobotCard_buttons}>
            <Button color="success" onClick={handleEdit}>
              Edit
            </Button>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default RobotCard
