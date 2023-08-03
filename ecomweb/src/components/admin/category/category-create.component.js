
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { CategoryForm } from "./category-form.component";
import { addCategory } from "../../../services/category";
import { useNavigate } from "react-router-dom";


export const CategoryCreate = (props) => {
    let navigate = useNavigate();
    let def_vals = {
        title: '',
        summary: '',
        image: '',
        status: '',
        parent_id: '',
        brand: '',
        sel_status: '',
        sel_parent_id: '',
        sel_brands: ''
    };

    const addCategoryContent = async (values) => {
        // 
        if (values.sel_status) {
            delete values.sel_status;
        }

        if(values.sel_parent_id){
            delete values.sel_parent_id
        }

        if(values.sel_brands){
            delete values.sel_brands
        }

        try {
            let response = await addCategory(values);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/category");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Category Create: ", error);
        }

    }

    return (<>
        <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">Category Create</h1>
            <AdminBreadCrumb
                title="Category Create"
            />
            <div className="card mb-4">
                <div className="card-body">
                    <CategoryForm
                        onSubmitCategory={addCategoryContent}
                        initialVals={def_vals}
                    />
                </div>
            </div>
        </div>
    </>)
}