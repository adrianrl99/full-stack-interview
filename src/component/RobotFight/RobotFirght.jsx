import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Button from '../../lib/Button'
import classes from '../../lib/classes'
import random from '../../lib/random'
import round from '../../lib/round'
import HP from '../HP/HP'
import RobotFightCard from '../RobotFightCard'
import { modalState } from '../../state'
import styles from './RobotFight.module.css'
import { useRecoilState } from 'recoil'
import { repo } from '../../repository'

const RobotFight = ({ robots }) => {
  const [, setModal] = useRecoilState(modalState)
  const timer = useRef()
  const hpTimer = useRef()
  const hpRef = useRef([100, 100])
  const [lastDamaged, setLastDamaged] = useState('')
  const [battle, setBattle] = useState(false)
  const [hps, setHP] = useState([100, 100])
  const renderInfo = () => <div className={styles.RobotFight_info}>VS</div>

  const removeTimerInterval = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }

  const removeHpTimerInterval = () => {
    if (hpTimer.current) {
      clearInterval(hpTimer.current)
      hpTimer.current = null
    }
  }

  const removeInterval = useCallback(() => {
    removeTimerInterval()
    removeHpTimerInterval()
  }, [])

  const calculateDamage = useCallback(() => {
    const newHp = [...hpRef.current]

    const attacker = round(random(0, 1), 0)
    const defender = attacker ? 0 : 1

    let damage = Math.round(
      robots[attacker].attack * random(0, 3.5) - robots[defender].defense,
    )
    if (damage > 0) {
      if (damage <= newHp[defender]) newHp[defender] -= damage
      else newHp[defender] = 0

      hpRef.current = newHp
      setHP(newHp)
      setLastDamaged(defender)
    }
  }, [robots])

  const handleStart = useCallback(() => {
    setBattle(!battle)
    removeInterval()
  }, [battle, removeInterval])

  const isBattleFinished = useMemo(() => hps.some(v => v <= 0), [hps])

  useEffect(() => {
    removeTimerInterval()

    if (battle && !timer.current) {
      timer.current = setInterval(calculateDamage, [500])
    }
  }, [battle, calculateDamage, removeInterval, robots])

  useEffect(() => {
    if (battle && isBattleFinished) {
      handleStart()
      repo.battle
        .setBattle({
          win: robots[hps.findIndex(v => v > 0)].id,
          robots: robots.map(r => r.id),
        })
        .then(() => {
          setTimeout(() => {
            setModal({ open: false, className: '', render: null })
          }, 1000)
        })
    }
  }, [battle, handleStart, hps, isBattleFinished, robots, setModal])

  useEffect(() => removeInterval, [removeInterval])

  const renderSide = (robot, hp) => (
    <div className={styles.RobotFight_side}>
      <h4
        className={classes({
          [styles.RobotFight_side_winner]: isBattleFinished && hp > 0,
          [styles.RobotFight_side_looser]: isBattleFinished && hp <= 0,
        })}
      >
        {isBattleFinished ? hp > 0 ? 'Winner' : 'Looser' : <HP value={hp} />}
      </h4>
      <RobotFightCard
        damaged={robots.indexOf(robot) === lastDamaged}
        {...robot}
      />
    </div>
  )

  return (
    <div className={styles.RobotFight}>
      <header>
        <h2>Fight</h2>
        <Button
          variant="text"
          color="info"
          active={battle}
          onClick={handleStart}
        >
          {battle ? 'pause' : 'start'}
        </Button>
      </header>
      <div className={styles.RobotFight_content}>
        {renderSide(robots[0], hps[0])}
        {renderInfo()}
        {renderSide(robots[1], hps[1])}
      </div>
    </div>
  )
}

export default RobotFight
