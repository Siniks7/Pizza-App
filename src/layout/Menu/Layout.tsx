import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	const profile = useSelector((s: RootState) => s.user.profile);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	console.log(profile);
	
	return <div className={styles.layout}>
		<div className={styles.menu}>
			<div className={styles.wrapper}>
				<div className={styles.main}>
					<div className={styles.avatar}>
						<img src="/avatar.png" alt="Аватар" />
					</div>
					<div className={styles.user}>
						<div className={styles.name}>{profile?.name}</div>
						<div className={styles.email} >{profile?.email}</div>
					</div>
					<div className={styles.links}>						
						<NavLink to='/' className={({ isActive }) => cn(styles['link'], {
							[styles.active]: isActive
						})}>
							<img src="/menu-icon.svg" alt="Меню" />Меню</NavLink>	
						<NavLink to='/cart'  className={({ isActive }) => cn(styles['link'], {
							[styles.active]: isActive
						})}>
							<img src="/cart-icon.svg" alt="Корзина" />Корзина<span className={styles['cart-number']}>2</span></NavLink>			
					</div>
				</div>
				<Button appearence='small' onClick={logout} className={styles['exit-button']} ><img src="/exit-icon.svg" alt="Выход" />Выйти</Button>
			</div>
		</div>
		<div className={styles.content}>
			<Outlet />
		</div>
	</div>;
}