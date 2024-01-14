import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispath, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

export function Cart() {

	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const DELIVERY_FEE = 169;
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispath>();
	const navigate = useNavigate();
	const total = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);
	const productQuantity = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count;
	}).reduce((acc, i) => acc += i, 0);


	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	return <>
		<Headling className={styles['headling']}>Корзина</Headling>
		{!items.length && <div className={styles['error']}>У вас нет товаров в корзине</div>}
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
		{!(items.length == 0) && <div>
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Итог <span>({productQuantity})</span></div>
				<div className={styles['price']}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
			</div>
			<div className={styles['checkout']}>
				<Button appearence="big" onClick={checkout}>оформить</Button>
			</div>
		</div>}
	</>;
}
