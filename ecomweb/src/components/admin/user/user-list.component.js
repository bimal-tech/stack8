import { AdminBreadCrumb } from "../breadcrumb/admin-breadcrumb.component";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { deleteUserById, getUser } from "../../../services/user";
import { StatusBadge } from "../../common/badge/status-badge.component";
import { formatDate, ucFirst } from "../../../helpers/functions";
import { ActionButtons } from "../../common/table-btns/action-btns.component";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { SingleImageView } from "../../common/image-view/image-view.component";
import { useParams } from "react-router-dom";

const UserList = (props) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let params = useParams();
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Image',
            selector: row => <SingleImageView image={row.image} width={props.type==='brand' ? '45' : '75'}/>,
        },

        {
            name: 'Role',
            selector: row => ucFirst(row.role),
        },
        {
            name: 'Status',
            selector: row => <StatusBadge value={row.status} />,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons dataId={row._id} onDelete={deleteUser} onEdit={`/admin/user/${row._id}/edit`} />,
        },
    ];

    const getCategories = async () => {
        try{
            let data = await getUser(props.type);
            if(data) {
                let current_user = JSON.parse(localStorage.getItem('stack_8_user'));

                let all_users = data.result.filter((o) => current_user.email != o.email)
                let admin = all_users.filter((o) => o.role === 'admin');
                
                setData(all_users);
            }
        } catch(error) {
            console.log("User: ", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (data) => {
        try{
            let success = await deleteUserById(data);
            if(success.status){
                setLoading(true);
                getCategories();
                toast.success(success.msg)
            } else {
                toast.error(success.msg);
            }
        } catch(error) {
            console.error("User Error: ", error);
        }
    }
    useEffect(() => {
        getCategories();
    }, [params]);
    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">User List</h1>
            <AdminBreadCrumb 
                title="User Listing"
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
export default UserList;