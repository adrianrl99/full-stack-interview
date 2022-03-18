import Button from '../../lib/Button'
import Card from '../../lib/Card'
import Dot from '../../lib/Dot'
import Space from '../../lib/Space'
import RobotIcon from '../../lib/icons/Robot'

import styles from './RobotCard.module.css'
import { useRecoilState } from 'recoil'
import { modalState, selectedRobotsState } from '../../state/state'
import RobotForm from '../RobotForm/RobotForm'
import RobotConfirmDelete from '../RobotConfirmDelete'
import classes from '../../lib/classes'

const RobotCard = robot => {
  const { name, color, attack, defense } = robot
  const [, setModal] = useRecoilState(modalState)
  const [selected, setSelected] = useRecoilState(selectedRobotsState)

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

  const handleSelect = () => {
    if (selected.length < 2 || selected.includes(robot.id)) {
      const newSelected = [...selected]
      const index = newSelected.indexOf(robot.id)
      if (index === -1) {
        newSelected.push(robot.id)
      } else {
        newSelected.splice(index, 1)
      }
      setSelected(newSelected)
    }
  }

  const renderDot = () => (
    <Dot
      size="large"
      color="warning"
      variant={selected.includes(robot.id) ? 'contained' : 'outlined'}
      className={classes(styles.RobotCard_dot, {
        [styles.RobotCard_dot_disabled]:
          selected.length === 2 && !selected.includes(robot.id),
      })}
      onClick={handleSelect}
    />
  )

  return (
    <div className={styles.RobotCard}>
      <div className={styles.RobotCard_inner}>
        <Card className={styles.RobotCard_front}>
          {renderDot()}
          <RobotIcon color={color} className={styles.RobotCard_icon} />
          <h4>{name}</h4>
        </Card>
        <Card className={styles.RobotCard_back}>
          {renderDot()}
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
