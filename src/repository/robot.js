import mockRobots from '../__mocks__/robots.json'
import { v4 as uuid } from 'uuid'

let robots = Object.assign([], mockRobots)

export const RobotRepositoryErrors = {
  AlreadyExists: 'Robot already exists',
  NotExists: 'Robot not exists',
}

export const mockRobotRepository = {
  getRobots: async () => robots,
  getRobot: async id => {
    const robot = robots.find(r => r.id === id)
    if (!robot) {
      throw new Error(RobotRepositoryErrors.NotExists)
    }
    return robot
  },
  setRobot: async robot => {
    const robotExists = robots.find(r => r.name === robot.name)
    if (robotExists) {
      throw new Error(RobotRepositoryErrors.AlreadyExists)
    }
    const newRobot = { id: uuid(), ...robot }
    robots = [...robots, newRobot]
    return newRobot
  },
  updateRobot: async robot => {
    const robotIndex = robots.findIndex(r => r.id === robot.id)
    if (robotIndex === -1) {
      throw new Error(RobotRepositoryErrors.NotExists)
    }
    robots = robots.map((r, i) => (i === robotIndex ? robot : r))
    return robot
  },
  deleteRobot: async id => {
    const robotIndex = robots.findIndex(r => r.id === id)
    if (robotIndex === -1) {
      throw new Error(RobotRepositoryErrors.NotExists)
    }
    robots = robots.map((r, i) => i !== robotIndex && r).filter(Boolean)
    return id
  },
}
