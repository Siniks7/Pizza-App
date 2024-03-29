import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { Link, useParams } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product() {
	const { id } = useParams();
	const myID = Number(id);

	const dispatch = useDispatch<AppDispath>();

	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(myID));
	};

	const [products, setProducts] = useState<Product>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product>(`${PREFIX}/products/${myID}`);
			setProducts(data);
			setIsLoading(false);	
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			console.error(e);
			setIsLoading(false);
			return;
		}
	};
	
	useEffect(() => {
		getMenu();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
		
	if (!isLoading && products) {				
		return <div className={styles['product']}>    
			<div className={styles['header']}>
				<div className={styles['headling']}>
					<Link to={'/'} className={styles['return-button']}><img className={styles['img_exit']} src="/Rectangle.svg" alt="Возврат" /></Link>
					<Headling>{products.name}</Headling>
				</div>
				<Button onClick={add} className={styles['cart']}><img className={styles['img_cart']} src="/cart-button-icon.svg" alt="Корзина" />В корзину</Button>
			</div>
			<div className={styles['product_description']}>
				<img src={products.image} className={styles['image']} alt="Продукт" />
				<div className={styles['product_description_data']}>
					<div className={styles['price']}>
						<span>Цена</span>
						<div>
							<span className={styles['price_cost']}>{products.price}</span>&nbsp;
							<span className={styles['currency']}>₽</span>
						</div>
					</div>
					<div className={styles['rating']}>
						<span>Рейтинг</span>
						<div className={styles['rate']}>{products.rating}&nbsp;<img src="/star-icon.svg" className={styles['star']} alt="Звезда" /></div>
					</div>
					<div className={styles['consistency']}>
						<div>Состав:</div>
						<div className={styles['consistency_all']}>
							<ul>
								{products.ingredients.map(i => (
									<li>{i.charAt(0).toUpperCase() + i.slice(1)}</li>))}	
							</ul>
						</div>
					</div>
                
				</div>
			</div>
		</div>;
	} else if (isLoading)  {
		return <>Загружается продукт...</>;
	} else {
		return <>{error && <>{error}</>}</>;
	}
}