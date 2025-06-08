
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  style,
}) => {
  return (
    <Player
      src={src}
      className={className}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      style={style}
    />
  );
};

export default LottieAnimation;
