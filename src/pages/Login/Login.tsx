import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginForm }  from '../../interfaces/validation';
import { LoginResponse } from '../../interfaces/auth.Interface';

export function Login() {
	let emailValidity = true;
	let passwordValidity = true;
	const [error, setError] = useState<string | null>();
	const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
	const [isValid, setIsValid] = useState<boolean>(true);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
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
		}
	}

	useEffect(() => {
		let timerId : number;
		if (!emailIsValid || !passwordIsValid) {
			focusError();
			timerId = setTimeout(() => {
				setEmailIsValid(true);
				setPasswordIsValid(true);	
			}, 2000);
		}
		return () =>
			clearTimeout(timerId);
	}, [emailIsValid, focusError, isValid, passwordIsValid]);
	

	async function submit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		const emailVal = email.value.trim().length;
		emailVal > 0 ? emailValidity = true : emailValidity = false;
		const passwordVal = password.value.trim().length;
		passwordVal > 0 ? passwordValidity = true : passwordValidity = false;
		setEmailIsValid(emailValidity);
		setPasswordIsValid(passwordValidity);
		if (!passwordValidity || !emailValidity) {
			setIsValid(false);
			return;
		}
		setIsValid(true);
		await sendLogin(email.value, password.value);
	}

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
			console.log(data);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}

	};

	return <div className={styles.login}>
		<Headling className={styles['headling']}>Вход</Headling>
		{error && <div className={styles['error']}>{error}</div>}
		<form className={styles['login_form']}  onSubmit={submit}>
			<div>
				<label htmlFor ="email" className={styles['form-label']}>
					<div  className={styles['form-label']}>Ваш email</div></label>
				<Input ref={emailRef} isValid = {emailIsValid} placeholder='Email' name= 'email' className={styles['input']}></Input>	
			</div>
			<div>
				<label htmlFor ="password" className={styles['form-label']}>
					<div  className={styles['form-label']} >Ваш пароль</div></label>
				<Input ref={passwordRef} isValid = {passwordIsValid} placeholder='Пароль' name= 'password' className={styles['input']}></Input>
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