
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Function to create staggered animation for multiple elements
export const createStaggeredAnimation = (
  elements: Element[],
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  staggerAmount: number = 0.1,
  scrollTriggerOptions?: ScrollTrigger.Vars
) => {
  const timeline = gsap.timeline({
    scrollTrigger: scrollTriggerOptions
  });
  
  timeline.fromTo(elements, from, {
    ...to,
    stagger: staggerAmount
  });
  
  return timeline;
};

// Function to animate text split by characters
export const animateCharsInElement = (
  element: Element,
  duration: number = 0.8,
  staggerAmount: number = 0.03,
  scrollTriggerOptions?: ScrollTrigger.Vars
) => {
  // Split text into spans for individual character animation
  const text = element.textContent || '';
  element.textContent = '';
  
  const chars = text.split('');
  chars.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  
  const timeline = gsap.timeline({
    scrollTrigger: scrollTriggerOptions
  });
  
  timeline.fromTo(
    element.children,
    {
      y: 20,
      opacity: 0,
      rotateX: 90
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: staggerAmount,
      duration: duration,
      ease: 'power3.out'
    }
  );
  
  return timeline;
};

// Function to create a reveal animation with overlay
export const createRevealAnimation = (
  element: Element,
  duration: number = 1,
  delay: number = 0,
  scrollTriggerOptions?: ScrollTrigger.Vars
) => {
  // Create overlay element
  const parent = element.parentElement;
  if (!parent) return;
  
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#8B5CF6';
  overlay.style.transformOrigin = 'left';
  
  // Setup relative positioning on parent
  const currentPosition = window.getComputedStyle(parent).position;
  if (currentPosition === 'static') {
    parent.style.position = 'relative';
  }
  
  parent.appendChild(overlay);
  
  // Hide the target element initially
  gsap.set(element, { opacity: 0 });
  
  const timeline = gsap.timeline({
    scrollTrigger: scrollTriggerOptions,
    delay: delay,
    onComplete: () => {
      // Clean up
      parent.removeChild(overlay);
    }
  });
  
  timeline.to(overlay, {
    scaleX: 0,
    transformOrigin: 'right',
    duration: duration / 2,
    ease: 'power3.inOut'
  }).to(element, {
    opacity: 1,
    duration: duration / 4,
    ease: 'power2.out'
  }, `-=${duration / 4}`);
  
  return timeline;
};

// Enhanced magnetic effect for professional interactions
export const createMagneticEffect = (element: Element, intensity: number = 0.3) => {
  const boundingRect = element.getBoundingClientRect();
  const centerX = boundingRect.left + boundingRect.width / 2;
  const centerY = boundingRect.top + boundingRect.height / 2;
  
  document.addEventListener('mousemove', (e) => {
    const distance = getDistance(e.clientX, e.clientY, centerX, centerY);
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 0.3;
    
    if (distance < maxDistance) {
      const magnetismX = (e.clientX - centerX) * intensity;
      const magnetismY = (e.clientY - centerY) * intensity;
      
      gsap.to(element, {
        x: magnetismX,
        y: magnetismY,
        duration: 1,
        ease: 'power3.out'
      });
    } else {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  });
  
  function getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
};

// Professional parallax scroll effect
export const createParallaxEffect = (
  element: Element, 
  scrollSpeed: number = 0.2,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      if (direction === 'vertical') {
        gsap.to(element, {
          y: self.progress * 100 * scrollSpeed,
          ease: 'none',
          overwrite: 'auto',
          duration: 0.1
        });
      } else {
        gsap.to(element, {
          x: self.progress * 100 * scrollSpeed,
          ease: 'none',
          overwrite: 'auto',
          duration: 0.1
        });
      }
    }
  });
};

// Professional typewriter effect
export const createTypewriterEffect = (
  element: Element,
  text: string,
  speed: number = 50,
  startDelay: number = 0,
  cursorDuration: number = 700
) => {
  element.textContent = '';
  
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.opacity = '1';
  cursor.style.marginLeft = '2px';
  cursor.style.animation = `blink ${cursorDuration}ms infinite`;
  
  if (!document.getElementById('cursor-blink')) {
    const style = document.createElement('style');
    style.id = 'cursor-blink';
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  element.appendChild(cursor);
  
  const timeline = gsap.timeline({ delay: startDelay / 1000 });
  
  let currentText = '';
  
  for (let i = 0; i < text.length; i++) {
    timeline.add(() => {
      currentText += text[i];
      element.textContent = currentText;
      element.appendChild(cursor);
    }, i * (speed / 1000));
  }
  
  return timeline;
};

// Enhanced 3D hover animation for professional cards
export const create3DHoverEffect = (element: Element, intensity: number = 10) => {
  element.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / intensity;
    const rotateY = (centerX - x) / intensity;
    
    gsap.to(element, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1.1, 0.6)"
    });
  });
};

// Professional glitch effect
export const createGlitchEffect = (element: Element, duration: number = 0.5) => {
  const timeline = gsap.timeline();
  
  timeline
    .to(element, {
      skewX: 5,
      duration: duration / 10,
      ease: "power2.inOut"
    })
    .to(element, {
      skewX: -5,
      duration: duration / 10,
      ease: "power2.inOut"
    })
    .to(element, {
      skewX: 0,
      duration: duration / 5,
      ease: "elastic.out(1, 0.3)"
    });
    
  return timeline;
};

// Morphing animation for tech logos
export const createMorphAnimation = (element: Element, scale: number = 1.2) => {
  return gsap.to(element, {
    scale: scale,
    duration: 0.3,
    ease: "back.out(1.7)",
    yoyo: true,
    repeat: 1
  });
};
