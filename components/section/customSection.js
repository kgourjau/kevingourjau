import {Container} from 'react-bootstrap'

import styles from "./customSection.module.css"

function Section({children,id,title,subtitle}) {
    console.log(title)
    return (
        <Container className={styles.container} id={id}>
            <h1>{title}</h1>
            <div className={styles.subtitle}>{subtitle}</div>
            <div className={styles.content}>
            {children}
            </div>
        </Container>
    )
}

export default Section
