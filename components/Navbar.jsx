import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/Nav.module.css';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity)

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src="/images/telephone.png" alt="" width="32px" height="32px" />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW</div>
                    <div className={styles.text}>090 545 446 41</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                <Link href='/' passHref>
                    <li className={styles.listItem}>Homepage</li>
                </Link>
                    <li className={styles.listItem}>Products</li>
                    <li className={styles.listItem}>Menu</li>
                    <Image src='/images/logo.png' alt='' width='160px' height='96px' className={styles.o_f} />
                    <li className={styles.listItem}>Event</li>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
            </div>
            <Link href='/cart' passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src='/images/cart.png' alt='' width='30px' height='30px' className={styles.o_f} />
                        <div className={styles.counter}> {quantity} </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Navbar