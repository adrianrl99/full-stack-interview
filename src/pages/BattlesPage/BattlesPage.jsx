import { useLayoutEffect } from 'react'
import styles from './BattlesPage.module.css'
import { useRecoilState } from 'recoil'
import { repo } from '../../repository'
import { battlesState, robotsState } from '../../state'
import BattleCard from '../../component/BattleCard/BattleCard'

const BattlesPage = () => {
  const [battles, setBattles] = useRecoilState(battlesState)
  const [, setRobots] = useRecoilState(robotsState)

  useLayoutEffect(() => {
    repo.battle.getBattles().then(async battles => {
      let robots = (
        await Promise.allSettled(
          battles
            .map(battle => battle.robots)
            .flat()
            .sort()
            .reduce(
              (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
              [],
            )
            .map(repo.robot.getRobot),
        )
      )
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)

      setRobots(robots)
      setBattles(battles)
    })
  }, [setBattles, setRobots])

  const renderBattle = battle => <BattleCard key={battle.id} {...battle} />

  return (
    <div className={styles.BattlesPage}>
      <header>
        <h1>Battles</h1>
      </header>
      <div className={styles.BattleList}>{battles.map(renderBattle)}</div>
    </div>
  )
}

export default BattlesPage
