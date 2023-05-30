import { Routes, Route, useNavigate } from 'react-router-dom';

import MainView from "./containers/mainView/mainView";
import UserIdentity from "./components/userIdentity/userIdentity";
import EditProfile from './components/editProfile/editProfile';
import AuthContainer from './containers/authContainer/authContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KEEPAUTHENTICATED, LOGOUT } from './store/authenticate';
import ConnectView from './containers/connectView/connectView';
import RightMenu from './containers/rightMenu/rightMenu';
import BottomMenu from './containers/bottomMenu/bottomMenu';
import UserFollowCenter from './containers/userFollowCenter/userFollowCenter';
import TwitterInput from './components/twitterInput/twitterInput';
import TweetView from './containers/tweetView/tweetView';
import InBuilding from './containers/inBuilding/inBuilding';
import Notification from './containers/notification/notification';
import io from './utility/socket';
import { PUSHNEWTWEET } from './store/tweets';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keptToken = localStorage.getItem('token');
  const token = useSelector(state => state.authenticate.token);
  const userId = useSelector(state => state.authenticate.userId);
  const expiryDate = localStorage.getItem('expiryDate');

useEffect(() => {
  if(token) {
    // if(!io.getIO) {
      const socket = io.init(process.env.REACT_APP_BACKEND_URL);
      socket.emit('setup', userId);

      socket.on('connection', () => {
        console.log('socket is connected');
      })
    // }
  } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

useEffect(() => {
  if(io.getIO()) {
    io.getIO().on('gotNewTweet', tweet => {
      console.log(tweet);
      dispatch(PUSHNEWTWEET(tweet));
    })
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(LOGOUT());
    }

    if(!token && keptToken) {
      const newTimeout = new Date(expiryDate).getTime() - new Date().getTime();
      dispatch(KEEPAUTHENTICATED());
      console.log('expires in ' + newTimeout);
      OperateLogout(newTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!token && !keptToken) {
      navigate('/');
      console.log('there was no token');
    } else {
      navigate('/main');
      console.log('there was a token');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, keptToken]);

  const OperateLogout = (milliseconds) => {
    setTimeout(() => {
      dispatch(LOGOUT());
      console.log('we logged out');
    }, milliseconds);
  }

  return (
    <div className="mx-auto w-[100%] xl:w-[80%] text-white">
      <Routes>
        <Route path='/' element={<AuthContainer/>} /> 
        <Route path="/main">
          <Route index  element={<MainView/>} />
          <Route path='editProfile' element={<EditProfile/>}/>
          <Route path='connect' element={<ConnectView/>} />
          <Route path=':id' element={<UserIdentity/>}/>
          <Route path=':id/followCenter' element={<UserFollowCenter/>}/>
          <Route path='innerTweet/:id' element={<TweetView/>} />
        </Route>
        { window.innerWidth <= 500 ? <Route path='search' element={<RightMenu/>} /> : null}
        { window.innerWidth <= 500 ? <Route path='newTweet' element={<TwitterInput/>} /> : null}
        <Route path='/underConst/:route' element={<InBuilding/>} />
        <Route path='/notification' element={<Notification/>} />
        <Route path='*' element={token ? <MainView/> : <AuthContainer/>}/>
      </Routes>
      { window.innerWidth <= 500 && token ? <BottomMenu/> : null}
    </div>
  );
}

export default App;
