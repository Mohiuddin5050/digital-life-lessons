import React from 'react';
import Container from '../../components/Container';
import { Link } from 'react-router';

const Settings = () => {
  return (
    <Container>
      <div className='my-50  text-center'>
      <h2 className='text-2xl lg:text-4xl font-bold'>All Ok!!</h2>
      <h4 className="text-xl font-semibold mt-4">
          No Settings Needed
        </h4>

        <Link to="/" className='btn btn-primary mt-5'> Back to Home
        </Link>
    </div>
    </Container>
  );
};

export default Settings;