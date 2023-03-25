import axios from 'axios';

export const loginDoctor = async (username: string, password: string) => {
    const loginPostResponse = await axios.post('api/Login', {
        username: username,
        password: password
    });
    return loginPostResponse;
}