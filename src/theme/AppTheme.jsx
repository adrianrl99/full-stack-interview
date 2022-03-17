import { useCallback, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'

import { themeState } from '../state'
import styles from './AppTheme.module.css'

export const Themes = ['dark', 'light', 'system']

const AppTheme = ({ children }) => {
  const [theme] = useRecoilState(themeState)

  const changeTheme = useCallback(theme => {
    const html = document.querySelector('html')

    theme ? html?.classList.add('dark') : html?.classList.remove('dark')
  }, [])

  useLayoutEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches

    theme === 'system' ? changeTheme(system) : changeTheme(theme === 'dark')
  }, [theme, changeTheme])

  return <div className={styles.AppTheme}>{children}</div>
}

export default AppTheme
