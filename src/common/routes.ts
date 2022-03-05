import LoginContainer from '../containers/LoginContainer';
import MyResultsContainer from '../containers/MyResultsContainer';
import RegisterContainer from '../containers/RegisterContainer';

const routes = [
    {
        path: '/login',
        element: LoginContainer,
        exact: true
    },
    {
        path: '/signup',
        element: RegisterContainer,
        exact: true
    },
    {
        path: '/',
        element: MyResultsContainer,
        exact: true
    }
];

export default routes;