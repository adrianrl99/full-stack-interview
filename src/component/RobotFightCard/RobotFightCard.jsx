import Card from '../../lib/Card'
import RobotIcon from '../../lib/icons/Robot'
import styles from './RobotFightCard.module.css'

const RobotFightCard = ({ color, name, attack, defense }) => (
  <Card className={styles.RobotFightCard}>
    <RobotIcon color={color} className={styles.RobotFightCard_icon} />
    <h4>{name}</h4>
    <div className={styles.RobotFightCard_attack_defense}>
      <span className={styles.RobotFightCard_attack}>
        Attack: <h4>{attack}</h4>
      </span>
      <span className={styles.RobotFightCard_defense}>
        Defense: <h4>{defense}</h4>
      </span>
    </div>
  </Card>
)

export default RobotFightCard
