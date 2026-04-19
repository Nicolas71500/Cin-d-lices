import { toast } from 'react-toastify';
import { axiosLoggedPostInstance } from '../../../services/generalAxiosInstance';
import { IDataForm } from '../models';

export function handleRegistration(data: IDataForm) {
    return axiosLoggedPostInstance
        .post('/register', data)
        .then((response) => {
            console.log(response.data.message);
            if (response.status === 201) {
                const message = response.data.message;
                toast.success(message);
                return response;
            } else if (response.status === 400) {
                const message = response.data.message;

                toast.error(message);
            } else if (response.status === 500) {
                const message = response.data.message;

                toast.error(message);
            }

            // return response;
        })
        .catch((error) => {
            console.error("erreur lors de l'enregistrement", error);
            return error;
        });
}
