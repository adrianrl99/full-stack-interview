import { useRecoilState } from 'recoil'
import Button from '../../lib/Button'
import { repo } from '../../repository'
import { modalState, robotsState } from '../../state/state'
import styles from './RobotConfirmDelete.module.css'

const RobotConfirmDelete = robot => {
  const { id, name } = robot
  const [robots, setRobots] = useRecoilState(robotsState)
  const [, setModal] = useRecoilState(modalState)

  const handleDelete = async () => {
    const idDeleted = await repo.robot.deleteRobot(id)
    let robotCloned = Object.assign([], robots)
    const index = robots.findIndex(r => r.id === idDeleted)
    if (index > -1) {
      robotCloned.splice(index, 1)
    }
    setRobots(robotCloned)
    setModal({ open: false, className: '', render: null })
  }

  return (
    <div className={styles.RobotConfirmDelete}>
      <h2>Delete robot {name}</h2>
      <div className={styles.RobotConfirmDelete_action}>
        <h4>Are you sure?</h4>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default RobotConfirmDelete
