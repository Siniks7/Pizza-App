import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<div>
			<div className={styles['header']}>
				<Headling>Меню</Headling>
				<Search placeholder='Введите блюдо или состав' ></Search>
			</div>
			<div className={styles['cardlist']}>
				<ProductCard
					id={1}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='/product-demo.png'
				/>
				<ProductCard
					id={2}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={500}
					image='/product-demo.png'
				/>
				<ProductCard
					id={3}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={530}
					image='/product-demo.png'
				/>
				<ProductCard
					id={4}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='/product-demo.png'
				/>
				<ProductCard
					id={5}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='/product-demo.png'
				/>
				<ProductCard
					id={6}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='/product-demo.png'
				/>
			</div>
		</div>
	);
}