import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import { ProductForm } from "./product-form.component";
import { useEffect, useState } from "react";
import { ucFirst } from "../../../helpers/functions";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProductById } from "../../../services/product";


export const ProductEdit = (props) => {

    const [product, setProduct]= useState({});
    let params = useParams();
    let navigate = useNavigate();
    // let def_vals = {
    //     title: '',
    //     price: '',
    //     images: '',
    //     status: '',
    //     discount: '',
    //     category: '',
    //     description: '',
    //     brand: '',
    //     seller: '',
    //     is_featured: '',
    //     tag: '',
    //     stock: '',

    //     sel_category: '',
    //     sel_status: '',
    //     sel_brand: '',
    //     sel_seller: ''
    // };


    const updateProduct = async (data) => {
        let updated_data = {
                title: data.title,
                price: data.price,
                images: data.images,
                status: data.sel_status.value,
                discount: data.discount,
                category: data.sel_category.value,
                description: data.description,
                brand: data.sel_brand.value,
                seller: data.sel_seller.value,
                is_featured: data.is_featured,
                tag: data.tag,
                stock: data.stock,
                uploaded_images: data.uploaded_images
        }

        try {
            let response = await updateProductById(updated_data, data._id);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/product");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Product Update: ", error);
        }
    }
    const getProductByProductId = async () => {
        try{
            let data = await getProductById(params.id)
            if(data.status) {
                let default_data = data.result;
                
                if(default_data.brand) {
                    default_data = {
                        ...default_data,
                        
                        sel_brand: {
                            label: default_data.brand.title,
                            value: default_data.brand._id
                        },

                        sel_category: {
                            label: default_data.category.title,
                            value: default_data.category._id
                        },

                        sel_status: {
                            label: default_data.status === 'active' ? 'Published' : "Un-Published",
                            value: default_data.status
                        },

                        sel_seller: {
                            label: default_data.seller.name,
                            value: default_data.seller._id
                        }

                    }

                }

                setProduct(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch(error) {
            console.error("Product Edit: ", error)
        }
    }

    useEffect(() => {
        getProductByProductId()
    },[])
    return (<>
    <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">{ucFirst(props.type)} Update</h1>
            <AdminBreadCrumb
                title={ucFirst(props.type)+" Update"}
            />
            <div className="card mb-4">
                <div className="card-body">
                    <ProductForm
                        onSubmitProduct={updateProduct}
                        initialVals={product}
                    />
                </div>
            </div>
        </div>
    </>)
}