import mockBattles from '../__mocks__/battles.json'
import { v4 as uuid } from 'uuid'

let battles = Object.assign([], mockBattles)

export const BattleRepositoryErrors = {
  AlreadyExists: 'Battle already exists',
  NotExists: 'Battle not exists',
}

export const mockBattleRepository = {
  getBattles: async () => battles,
  getBattle: async id => {
    const battle = battles.find(b => b.id === id)
    if (!battle) {
      throw new Error(BattleRepositoryErrors.NotExists)
    }
    return battle
  },
  setBattle: async battle => {
    const battleExists = battles.find(b => b.name === battle.name)
    if (battleExists) {
      throw new Error(BattleRepositoryErrors.AlreadyExists)
    }
    const newBattle = { id: uuid(), ...battle }
    battles = [...battles, newBattle]
    return newBattle
  },
}
