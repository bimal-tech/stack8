import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { AboutUs } from "../pages/about/about.page";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import AdminLayout from "../pages/layout/admin.layout";

import {
    AdminDashboard,
    AdminProfile,
    ChangePwd,

    LabelPage,
    CategoryPage,
    UserPage,
    ProductPage
} from "../pages/admin";

import {
    LabelCreate, LabelList, LabelEdit,
    CategoryCreate, CategoryList, CategoryEdit,
    UserCreate, UserList, UserEdit,
    ProductCreate, ProductList, ProductEdit,
} from "../components";

import CategoryDetail from "../pages/cateory/category-detail.page";
import HomeLayout from "../pages/layout/home.layout";
import HomeComponent from "../components/app.component";

const ErrorPage = () => {
    return (<>
        404 Not found
    </>)
}

const AdminPrivateRoutes = ({ component }) => {
    // API => login => token => valid => true, false
    let token = localStorage.getItem('stack_8_token');

    let is_logged_in = token ? true : false;
    return is_logged_in ? component : <Navigate to='/login'></Navigate>
}

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<HomeComponent />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />}>

                    </Route>
                    <Route path="category/:slug" element={<CategoryDetail />}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>

                <Route path="/admin" element={<AdminPrivateRoutes component={<AdminLayout />} />}>
                    <Route index element={<AdminDashboard />}></Route>
                    <Route path="me" element={<AdminProfile />}></Route>

                    <Route path="banner" element={<LabelPage />}>
                        <Route index element={<LabelList type="banner" />}></Route>
                        <Route path="create"
                            element={<LabelCreate type="banner" />} />
                        <Route path=":id/edit" element={<LabelEdit type="banner" />}></Route>
                    </Route>

                    <Route path="brands" element={<LabelPage />}>
                        <Route index element={<LabelList type="brand" />}></Route>
                        <Route path="create"
                            element={<LabelCreate type="brand" />} />
                        <Route path=":id/edit" element={<LabelEdit type="brand" />}></Route>
                    </Route>

                    <Route path="category" element={<CategoryPage />}>
                        <Route index element={<CategoryList />}></Route>
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path=":id/edit" element={<CategoryEdit />}></Route>
                    </Route>

                    <Route path="user" element={<UserPage />}>
                        <Route index element={<UserList />}></Route>
                        <Route path="create" element={<UserCreate />} />
                        <Route path=":id/edit" element={<UserEdit />}></Route>
                    </Route>
                    <Route path="product" element={<ProductPage />}>
                        <Route index element={<ProductList />}></Route>
                        <Route path="create" element={<ProductCreate />} />
                        <Route path=":id/edit" element={<ProductEdit />}></Route>
                    </Route>


                    <Route path="pwd-change" element={<ChangePwd />} ></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Routing;