import styles from './header.module.scss'
import Link from 'next/link'

export default function Header() {
      return (
          <Link href="/">
            <img className={styles.headerImg} src="/Logo.svg" alt="logo" />
          </Link>
      )
}
