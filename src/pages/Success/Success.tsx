import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success() {

	const navigate = useNavigate();
	const finish = () => {
		navigate('/');
	};

	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="Изображение пиццы" />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearence="big" onClick={finish}>Сделать новый</Button>
		</div>
	);
}