import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import { UserForm } from "./user-form.component";
import { useEffect, useState } from "react";
import { ucFirst } from "../../../helpers/functions";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../../services/user";


export const UserEdit = (props) => {

    const [user, setUser]= useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateUser = async (data) => {
        let updated_data = {
            name: data.name,
            status: data.status,
            role: data.role,
            date_of_birth: data.data_of_birth,
            billing_location: data.billing_location,
            shipping_location: data.shipping_location
        }

        if(!updated_data.date_of_birth){
            delete updated_data.date_of_birth;
        }

        if(typeof(data.image) === 'object') {
            updated_data.image = data.image
        }
        try {
            let response = await updateUserById(updated_data, data._id);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/user");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("User Update: ", error);
        }
    }
    const getUserByUserId = async () => {
        try{
            let data = await getUserById(params.id)
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

                setUser(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch(error) {
            console.error("User Edit: ", error)
        }
    }

    useEffect(() => {
        getUserByUserId()
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
                    <UserForm
                        onSubmitUser={updateUser}
                        initialVals={user}
                    />
                </div>
            </div>
        </div>
    </>)
}