import { toast } from 'react-toastify';

export const showErrorToast = (message: string): void => {
    if(message !== 'Invalid refresh-token')
        toast.error(message);
}