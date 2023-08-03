import { AdminBreadCrumb } from "../../../components/admin/breadcrumb/admin-breadcrumb.component";
import "./change-pwd.css";
import { Button, Col, Form } from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import * as Yup from "yup"
import { changePassword } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

let default_fields = {
    password: "",
    re_password: ""
};
const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be of atleast 8 characters';
    }

    if (!values.re_password) {
        errors.re_password = 'Re-Password is Required';
    } else if (values.re_password.length < 8) {
        errors.re_password = 'Must be of atleast 8 characters';
    } else if (values.re_password !== values.password) {
        errors.re_password = "Password and re-password must match"
    }


    return errors;
};

const ChangePwd = () => {
    let password_schema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Password must be of atleast 8 character long!')
            .required('Password is required Required'),
        re_password: Yup.string()
            .min(8, 'Re-Password must be of atleast 8 character long!')
            .required('Re-Password is required Required')
            .oneOf([Yup.ref('password'), null], "Password and re-password must match"),
    });

    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('stack_8_token');
        localStorage.removeItem('stack_8_user');
        navigate("/login");
    }

    const handleSubmit = async (values) => {
        try{
            let success = await changePassword(values)
            toast.success(success.msg)
            logout()
        } catch(error) {
            toast.error(error)
        }
    }
    const formik = useFormik({
        initialValues: default_fields,
        // validate,
        validationSchema: password_schema,
        onSubmit: handleSubmit
    })
    // const change = (e) => {
    //     let {name, value, checked} = e.target
    // }
    return (<>
        <ToastContainer />
        <div className="container-fluid px-4">
            <h1 className="mt-4">Change Password</h1>
            <AdminBreadCrumb
                title="Change Password"
            />
            <div className="card mb-4">
                <div className="card-body">
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Password: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password"
                                    name="password"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                >
                                </Form.Control>
                                {
                                    formik.errors.password && formik.touched.password ?
                                        <span className="text-danger">{formik.errors.password}</span>
                                        :
                                        ""
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Re-Password: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password"
                                    name="re_password"
                                    size="sm"
                                    value={formik.values.re_password}
                                    onChange={formik.handleChange}></Form.Control>
                                {
                                    formik.errors.re_password && formik.touched.re_password ?
                                        <span className="text-danger">{formik.errors.re_password}</span>
                                        :
                                        ""
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{ span: 9, offset: 3 }}>
                                <Button type="submit" className="btn btn-sm btn-success">
                                    Change Password
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    </>);
}

export default ChangePwd;