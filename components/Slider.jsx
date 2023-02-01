import styles from '../styles/Slider.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react'

const Slider = () => {
    const [index, setIndex] = useState(0)

    const images = [
        "/images/pizzaD1.png",
        "/images/featured4.png",
        "/images/featured3.jpg",
    ]

    const handleClick = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : 2)
        }
        if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(index < 2? index + 1: index - 2)
        }, 6000);

        return() => {
            clearInterval(interval)
        }
    }, [index])


    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: '0' }} onClick={(e) => handleClick('l')}>
                <Image src='/images/arrowl.png' alt='' layout='fill' />
            </div>
            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
                {
                    images.map((image, i) => {
                        return (
                            <div className={styles.imgContainer} key={i}>
                                <Image src={image} alt={i} layout='fill' className={styles.img} />
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.arrowContainer} style={{ right: '0' }} onClick={() => handleClick('r')} >
                <Image src='/images/arrowr.png' alt='' layout='fill' />
            </div>
        </div>
    )
}

export default Slider
