import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ PizzaList }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                THE BEST PIZZA IN TOWN
            </h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. to a jumbled Latin version of a
                passage from de Finibus Bonorum et Malorum, a treatise on the theory
                of ethics written by Cicero in 45 B.C. The passage "Lorem ipsum
            </p>
            <div className={styles.wrapper}>
                {
                    PizzaList.map(pizza => (
                        <PizzaCard key={pizza._id} pizza={pizza} />
                    ))
                }

            </div>
        </div>
    )
}

export default PizzaList

