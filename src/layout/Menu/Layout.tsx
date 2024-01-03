import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

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
						<NavLink to='/' className={({ isActive }) => cn(styles['link'], {
							[styles.active]: isActive
						})}>
							<img src="menu-icon.svg" alt="Меню" />Меню</NavLink>	
						<NavLink to='/cart'  className={({ isActive }) => cn(styles['link'], {
							[styles.active]: isActive
						})}>
							<img src="cart-icon.svg" alt="Корзина" />Корзина<span className={styles['cart-number']}>2</span></NavLink>			
					</div>
				</div>
				<Button appearence='small' className={styles['exit-button']} ><img src="exit-icon.svg" alt="Выход" />Выйти</Button>
			</div>
		</div>
		<div className={styles.content}>
			<Outlet />
		</div>
	</div>;
}