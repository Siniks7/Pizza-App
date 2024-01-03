import styles from './Headling.module.css';
import { HeadlingProps } from './Headling.props';
import cn from 'classnames';

function Headling({ children, className, ...props }: HeadlingProps) {
	return (
		<h1 className={cn(styles['headling'], className, {
			
		})} {...props}>{children}</h1>
	);
}

export default Headling;