import { useForm } from 'react-hook-form'
import Button from '../../lib/Button'
import TextField from '../../lib/TextField/TextField'
import styles from './RobotForm.module.css'
import { repo } from '../../repository'
import { modalState, robotsState } from '../../state/state'
import { useRecoilState } from 'recoil'

const RobotForm = robot => {
  const [robots, setRobots] = useRecoilState(robotsState)
  const [, setModal] = useRecoilState(modalState)
  const { id, name } = robot
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: robot,
  })

  const onSubmit = handleSubmit(async data => {
    let robotChanged = id
      ? await repo.robot.updateRobot({ ...robot, ...data })
      : await repo.robot.setRobot(data)

    let robotCloned = Object.assign([], robots)
    const index = robots.findIndex(r => r.id === robotChanged.id)
    if (index > -1) {
      robotCloned[index] = robotChanged
    } else {
      robotCloned.push(robotChanged)
    }
    setRobots(robotCloned)
    setModal({ open: false, className: '', render: null })
  })

  return (
    <div className={styles.RobotForm}>
      <h2>{id ? `Edit robot ${name}` : 'Add robot'}</h2>
      <form onSubmit={onSubmit}>
        <TextField
          {...register('name', {
            required: 'Robot name is required',
          })}
          required
          label="Name"
          error={!!errors.name}
          helperErrorText={errors.name?.message}
        />
        <TextField
          {...register('color', {
            required: 'Robot color is required',
          })}
          required
          type="color"
          label="Color"
          error={!!errors.color}
          helperErrorText={errors.color?.message}
          className={styles.RobotForm_color}
        />
        <div className={styles.RobotForm_attack_defense}>
          <TextField
            {...register('attack', {
              required: 'Robot attack is required',
            })}
            required
            type="number"
            label="Attack"
            error={!!errors.attack}
            helperErrorText={errors.attack?.message}
          />
          <TextField
            {...register('defense', {
              required: 'Robot defense is required',
            })}
            type="number"
            required
            label="Defense"
            error={!!errors.defense}
            helperErrorText={errors.defense?.message}
          />
        </div>
        <Button
          fullWith
          size="large"
          color="success"
          type="submit"
          disabled={!isValid}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default RobotForm
