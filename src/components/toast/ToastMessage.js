export const ToastMessage = ({ toastMessage, toastType }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '170px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: toastType === 'success' ? 'green' :
        toastType === 'warning' ? 'orange' : "red", // success, warning, error
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold',
      zIndex: 1001,
      maxWidth: '80%',
      textAlign: 'center',
    }}>
      {toastMessage}
    </div>
  );
};
