import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { deleteLabelById, getLabelByType } from "../../../services/label";
import { StatusBadge } from "../../common/badge/status-badge.component";
import { formatDate, ucFirst } from "../../../helpers/functions";
import { ActionButtons } from "../../common/table-btns/action-btns.component";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { SingleImageView } from "../../common/image-view/image-view.component";
import { useParams } from "react-router-dom";

const LabelList = (props) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let params = useParams();
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Image',
            selector: row => <SingleImageView image={row.image} width={props.type==='brand' ? '45' : '75'}/>,
        },
        {
            name: 'Status',
            selector: row => <StatusBadge value={row.status} />,
        },
        {
            name: 'Created At',
            selector: row => formatDate(row.createdAt),
        },
        {
            name: 'Action',
            selector: row => <ActionButtons dataId={row._id} onDelete={deleteLabel} onEdit={`/admin/banner/${row._id}/edit`} />,
        },
    ];

    const getListsBytype = async () => {
        try{
            let data = await getLabelByType(props.type);
            if(data) {
                setData(data.result);
            }
        } catch(error) {
            console.log("Label: ", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteLabel = async (data) => {
        try{
            let success = await deleteLabelById(data);
            if(success.status){
                setLoading(true);
                getListsBytype();
                toast.success(success.msg)
            } else {
                toast.error(success.msg);
            }
        } catch(error) {
            console.error("Label Error: ", error);
        }
    }
    useEffect(() => {
        getListsBytype();
    }, [params]);
    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">{ucFirst(props.type)} List</h1>
            <AdminBreadCrumb 
                title={ucFirst(props.type) + " Listing"}
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
export default LabelList;