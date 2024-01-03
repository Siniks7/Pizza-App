import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import { InputProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input ref={ref} className={cn(styles['input'], className, {
				[styles['invalid']]: !isValid
			})} {...props} />
			<img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
		</div>
	);
});

export default Search;