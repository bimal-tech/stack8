
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { LabelForm } from "./label-form.component";
import { addLabel } from "../../../services/label";
import { useNavigate } from "react-router-dom";
import { ucFirst } from "../../../helpers/functions";


export const LabelCreate = (props) => {
    let navigate = useNavigate();
    let def_vals = {
        title: '',
        link: '',
        image: '',
        status: '',
        type: props.type,
        sel_status: ''
    };

    const addLabelContent = async (values) => {
        // 
        if (values.sel_status) {
            delete values.sel_status;
        }

        try {
            let response = await addLabel(values);
            if (response.status) {
                toast.success(response.msg);
                let type = props.type;
                if(type === 'brand') {
                    type= 'brands';
                }
                navigate("/admin/"+type);
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Label Create: ", error);
        }

    }
    return (<>
        <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">{ucFirst(props.type)} Create</h1>
            <AdminBreadCrumb
                title={ucFirst(props.type)+  " Create"}
            />
            <div className="card mb-4">
                <div className="card-body">
                    <LabelForm
                        onSubmitLabel={addLabelContent}
                        initialVals={def_vals}
                        type={props.type}
                    />
                </div>
            </div>
        </div>
    </>)
}