import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="notification w-[300px] sm:w-[600px] bg-green-400 rounded-md text-center px-4">
          {message}
        </div>
      )}
    </>
  );
};

export default Notification;
