import Card from '../../lib/Card'
import RobotIcon from '../../lib/icons/Robot'

import styles from './RobotBattleCard.module.css'

const RobotBattleCard = robot => {
  const { name, color, attack, defense } = robot

  return (
    <Card className={styles.RobotBattleCard}>
      <RobotIcon color={color} className={styles.RobotBattleCard_icon} />
      <h4>{name}</h4>
      <div className={styles.RobotBattleCard_attack_defense}>
        <span className={styles.RobotBattleCard_attack}>
          Attack: <h4>{attack}</h4>
        </span>
        <span className={styles.RobotBattleCard_defense}>
          Defense: <h4>{defense}</h4>
        </span>
      </div>
    </Card>
  )
}

export default RobotBattleCard
