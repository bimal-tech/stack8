import { httpGet, httpPost, httpDelete, httpPut } from "./axios";
export const addUser = async (data) => {
    try{
        let formData = new FormData();
        let file = data.image;
        delete data.image;
        
        Object.keys(data).forEach((key, index) => {
            if(Array.isArray(data[key])){
                data[key].map((i, index) => {
                    formData.append(`${key}[`+[index]+"]", i)
                    return;
                })
            } else {
                formData.append(key, data[key])
            }
        })

        formData.append('image', file, file.name);

        let response = await httpPost('/user', formData, true, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateUserById = async (data, id) => {
    try{
        let formData = new FormData();
        let file = data.image;
        delete data.image;
        
        Object.keys(data).forEach((key, index) => {
            if(Array.isArray(data[key])){
                data[key].map((i, index) => {
                    formData.append(`${key}[`+[index]+"]", i)
                    return;
                })
            } else {
                formData.append(key, data[key])
            }
        })
        if(file) {
            formData.append('image', file, file.name);
        }

        let response = await httpPut('/user/'+id, formData, true, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const getUser = async() => {
    try {
        let response = await httpGet('/user',{}, true);
        return response;
    }catch(error) {
        throw error;
    }
}

export const deleteUserById = async (id) => {
    try{
        let response = await httpDelete('/user/'+id, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        let response = await httpGet('/user/'+id, true);
        return response;
    }catch(error) {
        throw error;
    }
}