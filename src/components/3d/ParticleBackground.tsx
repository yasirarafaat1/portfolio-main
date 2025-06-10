
import { Suspense } from 'react';

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Temporary animated background particles using CSS */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-accent rounded-full animate-ping"></div>
        <div className="absolute bottom-10 left-20 w-3 h-3 bg-primary/50 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/50 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ParticleBackground;
