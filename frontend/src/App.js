import {  createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Home from './Components/Home/Home';
import Admindashboard from './Layouts/Adminlayouts/Dashboard/Admindashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminactions, useractions, workeractions } from './store/store';
import AdminLogin from './Layouts/Adminlayouts/Login/AdminLogin';
import Signupform from './Layouts/Userlayouts/SignupForm/Signupform';
import Users from './Layouts/Adminlayouts/users/Users';
import Services from './Layouts/Userlayouts/Services/Services';
import Loader from './Loaders/Loader';
import Workers from './Layouts/Adminlayouts/Workers/Workers';
import AdminServices from './Layouts/Adminlayouts/services/services';
import Loginform from './Layouts/Userlayouts/Loginform/Loginform';
import Workerregister from "./Layouts/WorkerLayouts/Workerregister"
import Forgotpassword from './Layouts/Userlayouts/Forgot Password/Forgotpassword';
import Resetpassword from './Layouts/WorkerLayouts/Resetpassword';
import Modal from './Layouts/Modal';
import Workerprofile from './Layouts/WorkerLayouts/Workerprofile';
import Workerstatus from './Layouts/WorkerLayouts/Workerstatus';
import Messages from './Layouts/Adminlayouts/Messages/Messages';
import Workerlogin from './Layouts/WorkerLayouts/Workerlogin';
import Requestpassword from './Layouts/WorkerLayouts/Requestpassword';
import Serviceworkers from './Layouts/Userlayouts/Workerslist/workerslist';
import Errorpage from './Layouts/errorpage/Errorpage';
import AddCategory from './Layouts/Adminlayouts/Category/Category';
import Workermessages from './Layouts/WorkerLayouts/Workermessages';
import Workerduty from './Layouts/WorkerLayouts/Workerduty';
import Workerpayment from './Layouts/WorkerLayouts/Workerpayment';
import Userprofile from './Layouts/Userlayouts/Profile/Userprofile';
import Sample from './Layouts/Sample';
import Successpage from './Layouts/Userlayouts/Success/Successpage';
import Bookings from './Layouts/Adminlayouts/bookings/Bookings';
function App() {
  const dispatch = useDispatch()
/*   const navigate=useNavigate() */
  const { userList, workerProfile,userProfile, workerList, serviceList,homeserviceList,WorkersList,workerDuties } = Loader()
  const admin = useSelector((state) => state.AdminAuth.admin)
  useEffect(() => {
    const userexist = localStorage.getItem("user")
    const admin = localStorage.getItem('Admin')
    const worker = localStorage.getItem('worker')
    const adminT = JSON.parse(admin)
    const userT=JSON.parse(userexist)
    const workerT=JSON.parse(worker)
    if (userexist) {
      dispatch(useractions.login(userT))
    }
    if (admin) {
      dispatch(adminactions.Admlogin(adminT))
    }if(worker){
      dispatch(workeractions.login(workerT))
    }
  }, [dispatch])
  const router = createBrowserRouter([{
    path: '/',
    errorElement:<Errorpage/>,
    children: [
      {
        index: true, element: <Home />
      }, {path:'workerlogin',element: <Workerlogin/>},
  /*     {path:'api/user/paymentverification',element: <Successpage/>} */
      {path:'sample',element: <Sample/>},
      {path:'profile',element: <Userprofile/>,loader:userProfile},
      {path:'workerregister',element: <Workerregister/> ,loader:homeserviceList},
       {path:'worker/forgotpassword',element: <Requestpassword/> },
       {path:'worker/resetpassword/:id',element: <Resetpassword/>},
      { path: '/signup', element: <Signupform /> },
      { path: 'services', element: <Services /> ,loader:homeserviceList},
      {path:"workers/:id",element:<Serviceworkers/>,loader:WorkersList},
      { path: 'login', element: <Loginform /> },
      { path: 'forgotpassword', element: <Forgotpassword/> },
      { path: 'resetpassword/:id', element: <Resetpassword/> },
      { path: '/worker',
    children:[
      {index:true,element:<Workerstatus/>,loader:workerProfile},
      {path:'profile',element: <Workerprofile/>,loader:workerProfile},
           {path:'profile',element: <Workerprofile/>},
           {path:'works',element: <Workerduty/>,loader:workerProfile},
           {path:'messages',element: <Workermessages/>,loader:workerProfile},
           {path:"payment",element:<Workerpayment/> ,loader:workerProfile}
    ]},
      { path: 'modal', element: <Modal/> },
      {
        path: '/admin',
        children: [
         { index: true, element: <Admindashboard /> },
          { path: 'users', element: <Users />, loader: userList },
          { path: 'auth', element: <AdminLogin /> },
          { path: 'workerlist', element: <Workers />, loader: workerList },
          { path: 'services', element: <AdminServices />, loader: serviceList },
          { path: 'messages', element: <Messages />,loader: workerList },
          {path:'category',element:<AddCategory/>},
          {path:'booking',element:<Bookings/>}
        ]

      }

    ]

  }])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
