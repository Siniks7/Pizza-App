import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
// import Button from '../../components/Button/Button';


export function AuthLayout() {
	return <div className={styles.layout}>
		<div className={styles.logo}>
			<img  className={styles.logotip} src="/logo.svg" alt="Логотип" />
		</div>
		<div className={styles.content}>
			<Outlet />
		</div>
	</div>;
}