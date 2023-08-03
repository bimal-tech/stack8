import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import { LabelForm } from "./label-form.component";
import { useEffect, useState } from "react";
import { ucFirst } from "../../../helpers/functions";
import { useParams, useNavigate } from "react-router-dom";
import { getLabelById, updateLabelById } from "../../../services/label";


export const LabelEdit = (props) => {

    const [label, setLabel]= useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateLabel = async (data) => {
        let updated_data = {
            title: data.title,
            link: data.link,
            status: data.status,
            type: data.type
        }

        if(typeof(data.image) === 'object') {
            updated_data.image = data.image
        }

        try {
            let response = await updateLabelById(updated_data, data._id);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/"+props.type);
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Label Update: ", error);
        }
    }
    const getLabelByLabelId = async () => {
        try{
            let data = await getLabelById(params.id)
            if(data.status) {
                setLabel(data.result);
            } else {
                toast.error(data.msg);
            }
        } catch(error) {
            console.error("Label Edit: ", error)
        }
    }

    useEffect(() => {
        getLabelByLabelId()
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
                    <LabelForm
                        onSubmitLabel={updateLabel}
                        initialVals={label}
                        type={props.type}
                    />
                </div>
            </div>
        </div>
    </>)
}