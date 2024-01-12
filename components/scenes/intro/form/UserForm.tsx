import styles from '@/styles/UserForm.module.css'

const UserForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Spacescape</h1>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input className={styles.input} type="text" id="username" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input className={styles.input} type="password" id="password" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input className={styles.input} type="email" id="email" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input className={styles.input} type="password" id="confirmPassword" />
        </div>
        <button className={styles.button}>Sign Up</button>
      </div>
    </div>
  )
}

export default UserForm
