import React from 'react';
import heroImage from '../logo.svg';

const About = () => {
  return (
    <div>
      <div className="hero">
        <img src={heroImage} alt="Hero" />
        <div className="overlay"></div>
        <div className="content">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, elit id venenatis accumsan, tellus risus suscipit lectus, id pretium magna nisi a odio.</p>
        </div>
      </div>
      <div className="container">
        <h3>Our Mission</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, elit id venenatis accumsan, tellus risus suscipit lectus, id pretium magna nisi a odio. Donec pretium orci vel semper luctus.</p>
        <h3>Our Vision</h3>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In interdum purus id neque convallis, id efficitur sapien fermentum. Nulla nec efficitur risus.</p>
      </div>
    </div>
  );
};

export default About;
