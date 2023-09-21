import { useState, useEffect } from 'react';

const Loader = () => {
    const [dots, setDots] = useState('.');
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
      }, 500);
  
      return () => clearInterval(interval);
    }, []);
    
    return <div className='loader'>{`Generating Plan${dots}`}</div>;
};

export default Loader;
