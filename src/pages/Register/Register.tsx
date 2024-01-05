import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Headling from '../../components/Headling/Headling';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { RegForm }  from '../../interfaces/validation';


export function Register() {

	let emailValidity = true;
	let passwordValidity = true;
	let nameValidity = true;
	const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
	const [nameIsValid, setNameIsValid] = useState<boolean>(true);
	const [isValid, setIsValid] = useState<boolean>(true);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const nameRef = useRef<HTMLInputElement | null>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function focusError() {
		switch(true) {
		case !emailIsValid:
			if (emailRef.current === null) {
				'';
			} else {
				emailRef.current.focus();
			}		
			break;
		case !passwordIsValid:
			passwordRef.current !== null ? passwordRef.current.focus() : '';
			break;
		case !nameIsValid:
			nameRef.current !== null ? nameRef.current.focus() : '';
			break;
		}
	}

	useEffect(() => {
		let timerId : number;
		if (!emailIsValid || !passwordIsValid || !nameIsValid) {
			focusError();
			timerId = setTimeout(() => {
				setEmailIsValid(true);
				setPasswordIsValid(true);
				setNameIsValid(true);
			}, 2000);
		}
		return () =>
			clearTimeout(timerId);
	}, [emailIsValid, focusError, isValid, passwordIsValid, nameIsValid]);

	function submit(e: FormEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & RegForm;
		const { email, password, name } = target;
		const emailVal = email.value.trim().length;
		emailVal > 0 ? emailValidity = true : emailValidity = false;
		const passwordVal = password.value.trim().length;
		passwordVal > 0 ? passwordValidity = true : passwordValidity = false;
		const nameVal = name.value.trim().length;
		nameVal > 0 ? nameValidity = true : nameValidity = false;
		setEmailIsValid(emailValidity);
		setPasswordIsValid(passwordValidity);
		setNameIsValid(nameValidity);
		if (!passwordValidity || !emailValidity || !nameValidity) {
			setIsValid(false);
			return;
		}
		setIsValid(true);
	}

	return <div className={styles.login}>
		<Headling className={styles['headling']}>Регистрация</Headling>
		<form className={styles['login_form']} onSubmit={submit} >
			<div>
				<label htmlFor ="email" className={styles['form-label']} >
					<div  className={styles['form-label']}>Ваш email</div></label>
				<Input ref={emailRef} placeholder='Email' name= 'email' className={styles['input']}></Input>	
			</div>
			<div>
				<label htmlFor ="password" className={styles['form-label']}>
					<div  className={styles['form-label']} >Ваш пароль</div></label>
				<Input ref={passwordRef} placeholder='Пароль' name= 'password' className={styles['input']}></Input>
			</div>
			<div>
				<label htmlFor ="name" className={styles['form-label']}>
					<div  className={styles['form-label']} >Ваше имя</div></label>
				<Input ref={nameRef} placeholder='Имя' name= 'name' className={styles['input']}></Input>
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