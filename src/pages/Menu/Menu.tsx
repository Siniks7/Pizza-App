import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';


export function Menu() {

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);


	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			// await new Promise<void>((resolve) => {
			// 	setTimeout(() => {
			// 		resolve();
			// 	}, 2000);
			// });
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name: name
				}
			});
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
	}, []);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};
	
	return (
		<div>
			<div className={styles['header']}>
				<Headling>Меню</Headling>
				<Search placeholder='Введите блюдо или состав' onChange={updateFilter}></Search>
			</div>
			<div className={styles['cardlist']}>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <>Загружаем продукты...</>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			</div>
		</div>
	);
}

export default Menu;