import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { deleteProductById, getProduct } from "../../../services/product";
import { StatusBadge } from "../../common/badge/status-badge.component";
import { ucFirst } from "../../../helpers/functions";
import { ActionButtons } from "../../common/table-btns/action-btns.component";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { SingleImageView } from "../../common/image-view/image-view.component";
import { useParams } from "react-router-dom";

const ProductList = (props) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let params = useParams();
    const columns = [
        {
            name: 'Name',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Category',
            selector: row => row.category.title,
            sortable: true
        },
        {
            name: 'Image',
            selector: row => <SingleImageView image={row.images[0]} width={props.type==='brand' ? '45' : '75'}/>,
        },

        {
            name: 'Price',
            selector: row => (row.price),
        },
        {
            name: 'Status',
            selector: row => <StatusBadge value={row.status} />,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons dataId={row._id} onDelete={deleteProduct} onEdit={`/admin/product/${row._id}/edit`} />,
        },
    ];

    const getProducts = async () => {
        try{
            let data = await getProduct(props.type);
            if(data) {
                setData(data.result);
            }
        } catch(error) {
            console.log("Product: ", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (data) => {
        try{
            let success = await deleteProductById(data);
            if(success.status){
                setLoading(true);
                getProducts();
                toast.success(success.msg)
            } else {
                toast.error(success.msg);
            }
        } catch(error) {
            console.error("Product Error: ", error);
        }
    }
    useEffect(() => {
        getProducts();
    }, [params]);
    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Product List</h1>
            <AdminBreadCrumb 
                title="Product Listing"
            />
            <ToastContainer />
            <div className="card mb-4">
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        dense
                        highlightOnHover
                        progressPending={loading}
                    />
                </div>
            </div>
        </div>
    </>)
}
export default ProductList;