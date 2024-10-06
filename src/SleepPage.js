import React from 'react';
import { SvgIcon } from '@mui/material'; // Importing SvgIcon from Material UI

const SleepPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sweet Dreams!</h2>
      <p style={styles.message}>Enjoy your sleep time. Rest well to recharge for the day ahead.</p>
      <div style={styles.iconContainer}>
        <SvgIcon style={styles.icon} viewBox="0 0 24 24">
          <path d="M12 2C10.35 2 9 3.35 9 5C9 6.65 10.35 8 12 8C13.65 8 15 6.65 15 5C15 3.35 13.65 2 12 2zM5 8C4.45 8 4 8.45 4 9V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V9C20 8.45 19.55 8 19 8H5z" />
        </SvgIcon>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    animation: 'fadeIn 1s', // Adding fadeIn animation
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
  },
  message: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    animation: 'float 3s infinite ease-in-out', // Floating animation for the icon
  },
  icon: {
    width: '100px', // Icon size
    height: '100px', // Icon size
    animation: 'float 3s infinite ease-in-out',
  },
};

export default SleepPage;
