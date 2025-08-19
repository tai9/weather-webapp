import { ROUTES } from '@/constants';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-6'>
      <Link to={ROUTES.HOME} className='text-5xl font-bold'>
        WEATHER APP
      </Link>
      <Outlet />
    </div>
  );
};
export default MainLayout;
