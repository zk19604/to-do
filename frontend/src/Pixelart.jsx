import React from 'react';

const WalkingCharacter = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/assets/little-man-1.gif" className="walking-gif" alt="Walking character" 
       width={250}  // increase this
       height={250}/>
       <img src="/assets/little-woman-1.gif" className="walking2-gif" alt="Walking character" 
       width={250}  // increase this
       height={250}/>
    </div>
  );
};

export default WalkingCharacter;
