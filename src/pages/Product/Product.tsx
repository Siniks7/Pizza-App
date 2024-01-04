// import { useParams } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { Link, useParams } from 'react-router-dom';
// import { ProductCardProps } from '../../components/ProductCard/ProductCard.props';

export function Product() {
	const { id } = useParams();
	console.log(id);
	
	return <div className={styles['product']}>    
		<div className={styles['header']}>
			<div className={styles['headling']}>
				<Link to={'/'} className={styles['return-button']}><img className={styles['img_exit']} src="/Rectangle.svg" alt="Возврат" /></Link>
				<Headling>Наслаждение</Headling>
			</div>
			<Button className={styles['cart']}><img className={styles['img_cart']} src="/cart-button-icon.svg" alt="Корзина" />В корзину</Button>
		</div>
		<div className={styles['product_description']}>
			<img src="/pizza_product_demo.png" className={styles['image']} alt="Продукт" />
			<div className={styles['product_description_data']}>
				<div className={styles['price']}>
					<span>Цена</span>
					<div>
						<span className={styles['price_cost']}>300</span>&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
				</div>
				<div className={styles['rating']}>
					<span>Рейтинг</span>
					<div className={styles['rate']}>4.5&nbsp;<img src="/star-icon.svg" className={styles['star']} alt="Звезда" /></div>
				</div>
				<div className={styles['consistency']}>
					<div>Состав:</div>
					<div className={styles['consistency_all']}>
						<ul>
							<li>Салями</li>
							<li>Руккола</li>
							<li>Помидоры</li>
							<li>Оливки</li>
						</ul>
					</div>
				</div>
                
			</div>
		</div>
	</div>;
}