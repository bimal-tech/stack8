import { Outlet } from "react-router-dom"
import "../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import { AdminSidebar, AdminTopNav } from "../../components";




const AdminLayout = () => {

   


    return (<>
        <ToastContainer />
        <AdminTopNav />

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <AdminSidebar />
            </div>

            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </div>

    </>)
}

export default AdminLayout;