import {NavLink, useNavigate} from "react-router-dom";
export const AdminTopNav = () => {
    const navigate = useNavigate()
    const onSidebarClick = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        //    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
    let user = JSON.parse(localStorage.getItem("stack_8_user"));

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('stack_8_token');
        localStorage.removeItem('stack_8_user');
        navigate("/login");
    }
    return (<>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="navbar-brand ps-3" to="/admin">Admin Panel</NavLink>
            <button onClick={onSidebarClick} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            user && user.image ?
                             <img src={process.env.REACT_APP_IMAGE_URL+user.image} className="img img-fluid" style={{"maxWidth": "40px"}} />
                            :
                            <span style={{"color": "#ffffff"}}>{user.name[0]}</span>
                        }
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><NavLink className="dropdown-item" to="/admin/pwd-change">Password Change</NavLink></li>
                        <li><a className="dropdown-item" href="#!">Profile Update</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!" onClick={logout}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </>)
}