
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { UserForm } from "./user-form.component";
import { addUser } from "../../../services/user";
import { useNavigate } from "react-router-dom";


export const UserCreate = (props) => {
    let navigate = useNavigate();
    let def_vals = {
        name: '',
        email: '',
        image: '',
        status: '',
        role: '',
        date_of_birth: '',
        billing_location: '',
        shipping_location: '',
        password: '',
        sel_status: '',
        sel_role: ''
    };

    const addUserContent = async (values) => {
        // 
        if (values.sel_status) {
            delete values.sel_status;
        }

        if(values.sel_role){
            delete values.sel_role
        }

        try {
            let response = await addUser(values);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/user");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("User Create: ", error);
        }

    }

    return (<>
        <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">User Create</h1>
            <AdminBreadCrumb
                title="User Create"
            />
            <div className="card mb-4">
                <div className="card-body">
                    <UserForm
                        onSubmitUser={addUserContent}
                        initialVals={def_vals}
                    />
                </div>
            </div>
        </div>
    </>)
}