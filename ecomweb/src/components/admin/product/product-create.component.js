
import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { ProductForm } from "./product-form.component";
import { addProduct } from "../../../services/product";
import { useNavigate } from "react-router-dom";


export const ProductCreate = (props) => {
    let navigate = useNavigate();
    let def_vals = {
        title: '',
        price: '',
        images: '',
        status: '',
        discount: '',
        category: '',
        description: '',
        brand: '',
        seller: '',
        is_featured: '',
        tag: '',
        stock: '',

        sel_category: '',
        sel_status: '',
        sel_brand: '',
        sel_seller: ''
    };

    const addProductContent = async (values) => {
        // 
        if (values.sel_status) {
            delete values.sel_status;
        }

        if(values.sel_category){
            delete values.sel_category
        }


        if(values.sel_brand){
            delete values.sel_brand
        }

        if(values.sel_seller){
            delete values.sel_seller
        }

        try {
            let response = await addProduct(values);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/product");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Product Create: ", error);
        }

    }

    return (<>
        <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">Product Create</h1>
            <AdminBreadCrumb
                title="Product Create"
            />
            <div className="card mb-4">
                <div className="card-body">
                    <ProductForm
                        onSubmitProduct={addProductContent}
                        initialVals={def_vals}
                    />
                </div>
            </div>
        </div>
    </>)
}