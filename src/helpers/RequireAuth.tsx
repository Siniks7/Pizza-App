import { RootState } from '../store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
	const jwt = useSelector((s: RootState) => s.user.jwt);

	if (!jwt) {
		return <Navigate to="/auth/login" replace />;
	}
	return children;
};