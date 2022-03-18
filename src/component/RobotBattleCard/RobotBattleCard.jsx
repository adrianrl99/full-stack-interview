import Card from '../../lib/Card'
import RobotExcited from '../../lib/icons/RobotExcited'
import RobotDead from '../../lib/icons/RobotDead'
import RobotOff from '../../lib/icons/RobotOff'

import styles from './RobotBattleCard.module.css'

const RobotBattleCard = ({ id, name, color, attack, defense, win }) => (
  <Card className={styles.RobotBattleCard}>
    {id ? (
      win ? (
        <RobotExcited color={color} className={styles.RobotBattleCard_icon} />
      ) : (
        <RobotDead color={color} className={styles.RobotBattleCard_icon} />
      )
    ) : (
      <RobotOff className={styles.RobotBattleCard_icon} />
    )}
    <h4>{id ? name : 'Deleted'}</h4>
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

export default RobotBattleCard
