import { forwardRef } from 'react'
import HelperText from '../HelperText'
import styles from './TextField.module.css'

export const TextField = forwardRef(
  (
    { label, slotAfterInput, error, helperText, helperErrorText, ...props },
    ref,
  ) => (
    <label className={styles.TextField}>
      <span className={styles.TextField_label}>
        {label}
        {props.required && (
          <span className={styles.TextField_label_asterisk}>*</span>
        )}
      </span>
      <input {...props} ref={ref} />
      {slotAfterInput}
      <HelperText error={error}>
        {error ? helperErrorText : helperText}
      </HelperText>
    </label>
  ),
)

export default TextField
