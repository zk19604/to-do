import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Progress({ progress }) {
  return (
    <ProgressBar 
      now={progress} 
      style={{ height: '10px', borderRadius: '5px' }} 
      variant="success" 
      animated 
    />
  );
}
