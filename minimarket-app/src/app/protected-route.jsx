import { redirect } from 'react-router-dom';
import { requireRole } from '../services/auth-service';

export const protect = (roles = []) => async () => {
  const user = requireRole(roles);
  if (!user) return redirect('/login');
  return { user };
};

export const adminOnly = protect(['admin']);
export const clientOnly = protect(['client']);

