import React from 'react';
import useStatus from '../../../hooks/useStatus';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile';

const Profile = () => {
  const {role, userLoading} = useStatus();


  if(userLoading){
    return <LoadingSpinner/>;
  }
  
  if(role==="admin"){
    return <AdminProfile/>
  }else{
    return <UserProfile/>
  }
};

export default Profile;