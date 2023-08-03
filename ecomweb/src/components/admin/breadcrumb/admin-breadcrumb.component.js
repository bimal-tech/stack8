import {NavLink} from "react-router-dom";
export const AdminBreadCrumb = ({title}) => {
    return (<>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item active">{title}</li>
        </ol>
    </>)
}