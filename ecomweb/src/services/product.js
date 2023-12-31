import { httpGet, httpPost, httpDelete, httpPut } from "./axios";
export const addProduct = async (data) => {
    try{
        let formData = new FormData();
        let file = data.uploaded_images;
        delete data.uploaded_images;
        
        Object.keys(data).forEach((key, index) => {
            if(Array.isArray(data[key])){
                data[key].map((i, index) => {
                    formData.append(`${key}[`+[index]+"]", i)
                })
            } else {
                formData.append(key, data[key])
            }
        })

        if(file) {
            file.map((o) => {
                formData.append('image', o, o.filename);
            })
        }

        let response = await httpPost('/product', formData, true, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateProductById = async (data, id) => {
    try{
        
        let formData = new FormData();
        let file = data.uploaded_images;
        delete data.uploaded_images;
        
        Object.keys(data).forEach((key, index) => {
            if(Array.isArray(data[key])){
                data[key].map((i, index) => {
                    formData.append(`${key}[`+[index]+"]", i)
                })
            } else {
                formData.append(key, data[key])
            }
        })
        console.log(file);
        if(file) {
            
            file.map((o) => {
                formData.append('image', o, o.filename);
                return
            })
        }

        let response = await httpPut('/product/'+id, formData, true, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const getProduct = async() => {
    try {
        let response = await httpGet('/product',{}, true);
        return response;
    }catch(error) {
        throw error;
    }
}

export const deleteProductById = async (id) => {
    try{
        let response = await httpDelete('/product/'+id, true);
        return response;
    } catch(error) {
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        let response = await httpGet('/product/'+id, true);
        return response;
    }catch(error) {
        throw error;
    }
}