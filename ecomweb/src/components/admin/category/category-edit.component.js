import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import { CategoryForm } from "./category-form.component";
import { useEffect, useState } from "react";
import { ucFirst } from "../../../helpers/functions";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById, updateCategoryById } from "../../../services/category";


export const CategoryEdit = (props) => {

    const [category, setCategory]= useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateCategory = async (data) => {
        let updated_data = {
            summary: data.summary,
            parent_id: data.parent_id,
            brand: data.brand,
            title: data.title,
            status: data.status,
            type: data.type
        }

        if(typeof(data.image) === 'object') {
            updated_data.image = data.image
        }
        try {
            updated_data.brand = updated_data.brand.map((o) => o._id)
            let response = await updateCategoryById(updated_data, data._id);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/category");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Category Update: ", error);
        }
    }
    const getCategoryByCategoryId = async () => {
        try{
            let data = await getCategoryById(params.id)
            if(data.status) {
                let default_data = data.result;
                if(default_data.brand) {
                    default_data = {
                        ...default_data,
                        sel_brands: default_data.brand.map((o) => ({
                            label: o.title,
                            value: o._id
                        }))
                    }

                }

                setCategory(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch(error) {
            console.error("Category Edit: ", error)
        }
    }

    useEffect(() => {
        getCategoryByCategoryId()
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
                    <CategoryForm
                        onSubmitCategory={updateCategory}
                        initialVals={category}
                    />
                </div>
            </div>
        </div>
    </>)
}