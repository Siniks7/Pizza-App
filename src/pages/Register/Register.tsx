import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Headling from '../../components/Headling/Headling';

export function Register() {
	return <div className={styles.login}>
		<Headling className={styles['headling']}>Регистрация</Headling>
		<form className={styles['login_form']}>
			<div>
				<label htmlFor ="email" className={styles['form-label']}>
					<div  className={styles['form-label']}>Ваш email</div></label>
				<Input placeholder='Email' name= 'email' className={styles['input']}></Input>	
			</div>
			<div>
				<label htmlFor ="password" className={styles['form-label']}>
					<div  className={styles['form-label']} >Ваш пароль</div></label>
				<Input placeholder='Пароль' name= 'password' className={styles['input']}></Input>
			</div>
			<div>
				<label htmlFor ="name" className={styles['form-label']}>
					<div  className={styles['form-label']} >Ваше имя</div></label>
				<Input placeholder='Имя' name= 'name' className={styles['input']}></Input>
			</div>
			<div className={styles['button']}>
				<Button appearence='big' className={styles['button_element']}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>			
			</div>	
			<div className={styles['button_element_info']}>
				<div className={styles['button_info']}>Есть аккаунт?</div>
				<Link to={'/auth/login'} className={styles['button_link']}>Войти</Link>
			</div>
		</form>
	</div>;
}