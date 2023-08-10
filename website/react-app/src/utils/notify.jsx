// define a notify tool to prompt users
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify(message, type = 'default') {
  if (!message) {
    message = "Unexpected error occured!";
  }
  const options = {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  };
  switch (type) {
    case 'error':
      toast.error(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warn':
      toast.warn(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    // More cases...
    default:
      // toast(message, options);
      toast(message, {...options, autoClose: false});
  }
};