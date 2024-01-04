import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';

export function Product() {
	const { id } = useParams();
	const myID = Number(id);

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			const myProducts = data.filter((p) => p.id === myID);
			if (myProducts !== undefined) {
				setProducts(myProducts);
				setIsLoading(false);
			} else {
				return;
			}
			
		} catch (e) {
			console.error(e);
			setIsLoading(false);
			return;
		}
	};
	
	useEffect(() => {
		getMenu();
	}, []);
		
	if (!isLoading && products[0] !== undefined ) {
		console.log(products);
		
		return <div className={styles['product']}>    
			<div className={styles['header']}>
				<div className={styles['headling']}>
					<Link to={'/'} className={styles['return-button']}><img className={styles['img_exit']} src="/Rectangle.svg" alt="Возврат" /></Link>
					<Headling>{products[0].name}</Headling>
				</div>
				<Button className={styles['cart']}><img className={styles['img_cart']} src="/cart-button-icon.svg" alt="Корзина" />В корзину</Button>
			</div>
			<div className={styles['product_description']}>
				<img src={products[0].image} className={styles['image']} alt="Продукт" />
				<div className={styles['product_description_data']}>
					<div className={styles['price']}>
						<span>Цена</span>
						<div>
							<span className={styles['price_cost']}>{products[0].price}</span>&nbsp;
							<span className={styles['currency']}>₽</span>
						</div>
					</div>
					<div className={styles['rating']}>
						<span>Рейтинг</span>
						<div className={styles['rate']}>{products[0].rating}&nbsp;<img src="/star-icon.svg" className={styles['star']} alt="Звезда" /></div>
					</div>
					<div className={styles['consistency']}>
						<div>Состав:</div>
						<div className={styles['consistency_all']}>
							<ul>
								{products[0].ingredients.map(i => (
									<li>{i}</li>))}	
							</ul>
						</div>
					</div>
                
				</div>
			</div>
		</div>;
	} else {
		return <>Загружается продукт...</>;
	}
}