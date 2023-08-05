import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify(message, type = 'default') {
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
      // More cases...
      default:
        toast(message, options);
    }
  };