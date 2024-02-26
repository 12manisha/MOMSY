import React, { useEffect, useState } from 'react';
import Header from './Header';

const Home = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('http://localhost:8000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(err => console.error("Error fetching data: ", err));
    }
  }, []);
  
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: 'center'  }}>
        Welcome {user && <span style={{color:'red'}} >{user.username}</span>} !
      </h1>
    </div>
  );
};

export default Home;
