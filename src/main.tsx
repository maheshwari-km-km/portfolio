import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init({
  publicKey: 'T9t0SqwKl2KRez2cI',
  limitRate: {
    // Set rate limiting
    throttle: 2000, // 2 seconds between each request
  }
});

createRoot(document.getElementById("root")!).render(<App />);
