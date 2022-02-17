import styles from './header.module.scss'

export default function Header(props) {
  {
    if (props.margin === "home") {
      return (
        <div className={styles.home}>
          <img src="/Logo.svg" alt="Logo da SpaceTravelling" />
        </div>
      )} else if (props.margin === "post") {
        return (
        <div className={styles.post}>
          <img src="/Logo.svg" alt="Logo da SpaceTravelling" />
        </div>
        )}
  }
}
