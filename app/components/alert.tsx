import React, { useEffect, useState } from 'react';

interface AlertProps {
  temp: number;
  threshold: number;
}

const Alert: React.FC<AlertProps> = ({ temp, threshold }) => {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (temp > threshold) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [temp, threshold]);

  return (
    <div className="alert">
      {alert && <p>Alert: Temperature exceeded {threshold}°C!</p>}
    </div>
  );
};

export default Alert;
