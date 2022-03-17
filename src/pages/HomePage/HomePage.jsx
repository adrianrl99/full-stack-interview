import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import RobotCard from '../../component/RobotCard/RobotCard'
import RobotForm from '../../component/RobotForm/RobotForm'
import Button from '../../lib/Button'
import { repo } from '../../repository/repository'
import { modalState, robotsState } from '../../state'

import styles from './HomePage.module.css'

const HomePage = () => {
  const [robots, setRobots] = useRecoilState(robotsState)
  const [, setModal] = useRecoilState(modalState)

  const handleAddRobot = () =>
    setModal({
      open: true,
      render: <RobotForm />,
    })

  useLayoutEffect(() => {
    repo.robot.getRobots().then(setRobots)
  }, [setRobots])

  const renderRobotCards = robot => <RobotCard key={robot.id} {...robot} />

  return (
    <div className={styles.HomePage}>
      <header>
        <h1>Robots war</h1>
        <Button color="info" onClick={handleAddRobot}>
          Add
        </Button>
      </header>
      <div className={styles.RobotsList}>{robots.map(renderRobotCards)}</div>
    </div>
  )
}

export default HomePage
