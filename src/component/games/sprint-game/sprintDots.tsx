import { FC } from 'react';
import styles from './sprintGame.module.scss';

interface SprintDotsProps {
  winStrike: number
}

const SprintDots: FC<SprintDotsProps> = ({ winStrike }) => {

  if (winStrike === 1) {
    return (
      <div className={styles.dots}>
        <ul>
          <li className={styles.activeLi}></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }

  if (winStrike === 2) {
    return (
      <div className={styles.dots}>
        <ul>
          <li className={styles.activeLi}></li>
          <li className={styles.activeLi}></li>
          <li></li>
        </ul>
      </div>
    )
  }

  if (winStrike === 3) {
    return (
      <div className={styles.dots}>
        <ul>
          <li className={styles.activeLi}></li>
          <li className={styles.activeLi}></li>
          <li className={styles.activeLi}></li>
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.dots}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}

export default SprintDots;