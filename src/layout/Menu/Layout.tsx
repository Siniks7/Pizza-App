import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
	return <div className={styles.layout}>
		<div className={styles.menu}>
			<div className={styles.wrapper}>
				<div className={styles.main}>
					<div className={styles.avatar}>
						<img src="avatar.png" alt="Аватар" />
					</div>
					<div className={styles.user}>
						<div className={styles.name}>Антон Ларичев</div>
						<div className={styles.email} >alaricode@ya.ru</div>
					</div>
					<div className={styles.links}>						
						<Link to='/' className={styles.link} ><img src="menu-icon.svg" alt="Меню" />Меню</Link>	
						<Link to='/cart'  className={styles.link} ><img src="cart-icon.svg" alt="Корзина" />Корзина<span className={styles['cart-number']}>2</span></Link>
						
					</div>
				</div>
				<Button appearence='small' className={styles['exit-button']} ><img src="exit-icon.svg" alt="Выход" />Выйти</Button>
			</div>
		</div>
		<div>
			<Outlet />
		</div>
	</div>;
}