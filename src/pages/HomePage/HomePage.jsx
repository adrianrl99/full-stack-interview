import { useLayoutEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import RobotCard from '../../component/RobotCard/RobotCard'
import RobotFight from '../../component/RobotFight'
import RobotForm from '../../component/RobotForm/RobotForm'
import Button from '../../lib/Button'
import { repo } from '../../repository/repository'
import { modalState, robotsState, selectedRobotsState } from '../../state'

import styles from './HomePage.module.css'

const HomePage = () => {
  const [robots, setRobots] = useRecoilState(robotsState)
  const [, setModal] = useRecoilState(modalState)
  const selectedRobots = useRecoilValue(selectedRobotsState)

  const handleAddRobot = () =>
    setModal({
      open: true,
      render: <RobotForm />,
    })

  const handleFight = () =>
    setModal({
      open: true,
      render: (
        <RobotFight
          robots={robots.filter(r => selectedRobots.includes(r.id))}
        />
      ),
    })

  useLayoutEffect(() => {
    repo.robot.getRobots().then(setRobots)
  }, [setRobots])

  const renderRobotCards = robot => <RobotCard key={robot.id} {...robot} />

  return (
    <div className={styles.HomePage}>
      <header>
        <h1>Robots war</h1>
        <div className={styles.HomePage_buttons}>
          <Button color="info" onClick={handleAddRobot}>
            Add
          </Button>
          <Button
            color="warning"
            onClick={handleFight}
            disabled={selectedRobots.length < 2}
          >
            Fight
          </Button>
        </div>
      </header>
      <div className={styles.RobotsList}>{robots.map(renderRobotCards)}</div>
    </div>
  )
}

export default HomePage
