import styles from '@/styles/Vitals.module.css'

const Vitals = () => {
  const hp = 100
  return (
    <div className={styles.vitals}>
      <div className={styles.astronaut}>
        <div className={styles.leftBar} />
        <img className={styles.charImg} src="/hud/icons/character2.png" alt={'Character'} />
        <div className={styles.rightBar} />
      </div>
      <div className={styles.health}>
        <h3 className={styles.hpLabel}>
          VITALS <span className={`${styles.hpValue} ${hp < 30 ? styles.lowHpValue : ''}`}>{hp}</span>
        </h3>
        <div className={styles.hpBar} style={{ width: `${hp * 3}px` }} />
      </div>
    </div>
  )
}

export default Vitals
