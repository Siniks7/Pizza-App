import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
export function Success() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const finish = () => {
		dispatch(cartActions.clean());
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