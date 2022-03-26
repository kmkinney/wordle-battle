import Link from "next/link"
import styles from '../styles/Home.module.css'

export default function BackButton() {
    return (
        <div className={styles.backButton}>
            <Link href='/'>
                <a className={styles.button}>Back to Home</a>
            </Link>
        </div>
    )
}