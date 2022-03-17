import { atom } from 'recoil'

const localStorageEffect =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const themeState = atom({
  key: 'themeState',
  default: 'system',
  effects: [localStorageEffect('theme')],
})

export const robotsState = atom({
  key: 'robotsState',
  default: [],
  effects: [localStorageEffect('robots')],
})

export const battlesState = atom({
  key: 'battleState',
  default: [],
  effects: [localStorageEffect('battles')],
})

export const modalState = atom({
  key: 'modalState',
  default: {
    open: false,
    render: null,
    className: '',
  },
})
