import { Vortex } from 'react-loader-spinner';

const LoaderDiet = () => {
  return (
    <div className='loader-inner-container'>
      <span className='loader'>Generating Diet Plan</span>
      <div className='vortex-container'>
        <Vortex
          visible={true}
          height={80}
          width={80}
          ariaLabel='vortex-loading'
          colors={['#1f7a8c', '#9af5d1', '#022b3a', '#1f7a8c', '#9af5d1', '#022b3a']}
        />
      </div>
    </div>
  );
};

export default LoaderDiet;