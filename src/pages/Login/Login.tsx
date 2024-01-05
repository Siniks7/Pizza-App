import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {

	function submit(e: FormEvent) {
		e.preventDefault();
		console.log(e);
	}

	return <div className={styles.login}>
		<Headling className={styles['headling']}>Вход</Headling>
		<form className={styles['login_form']}  onSubmit={submit}>
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
			<div className={styles['button']}>
				<Button appearence='big' className={styles['button_element']}>ВХОД</Button>			
			</div>	
			<div className={styles['button_element_info']}>
				<div className={styles['button_info']}>Нет акканута?</div>
				<Link to={'/auth/register'} className={styles['button_link']}>Зарегистрироваться</Link>
			</div>
		</form>
	</div>;
}