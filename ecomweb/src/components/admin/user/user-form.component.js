import { useFormik } from "formik"
import { Form, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { useParams } from "react-router-dom";
import {ucFirst} from "../../../helpers/functions"
export const UserForm = (props) => {

    let params = useParams();

    const [statuses, setStatuses] = useState([
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Suspended' }
    ])

    const [roles, setRoles] = useState([
        { value: 'admin', label: 'Admin' },
        { value: 'seller', label: 'Seller' },
        { value: 'customer', label: 'Buyer' }
    ])

    let validate_obj = {
        name: Yup.string()
            .required('Name is required Required'),
        email: Yup.string().required("Email is required"),
        status: Yup.string().required("Status is required"),
        role: Yup.string().required("Role is required"),
        date_of_birth: Yup.date().required("Date of Birth is required"),
        billing_location: Yup.string(),
        shipping_location: Yup.string(),
    }

    if(!params.id) {
        validate_obj['password'] = Yup.string().required("Password is required")
    }

    let user_schema = Yup.object().shape(validate_obj);

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: user_schema,
        onSubmit: (values) => {
            props.onSubmitUser(values);
        }
    })

    useEffect(() => {
        let sel_status = {
            label: props.initialVals.status === 'active' ? "Active" : "Suspended",
            value: props.initialVals.status
        }
        let sel_roles = {
            label: ucFirst(props.initialVals.role),
            value: props.initialVals.role
        }
        formik.setValues({
            ...props.initialVals,
            sel_status: sel_status,
            sel_role: sel_roles
        })
    }, [props.initialVals])


    // console.log(formik.values);
    return (<>

        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text"
                        name="name"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    >
                    </Form.Control>
                    {
                        formik.errors.name && formik.touched.name ?
                            <span className="text-danger">{formik.errors.name}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="email"
                        name="email"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        readOnly={params.id ? true: false}
                    >
                    </Form.Control>
                    {
                        formik.errors.email && formik.touched.email ?
                            <span className="text-danger">{formik.errors.email}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Billing Address: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        as="textarea"
                        name="billing_location"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.billing_location}
                    >
                    </Form.Control>
                    {
                        formik.errors.billing_location && formik.touched.billing_location ?
                            <span className="text-danger">{formik.errors.billing_location}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Shipping Address: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        as="textarea"
                        name="shipping_location"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.shipping_location}
                    >
                    </Form.Control>
                    {
                        formik.errors.shipping_location && formik.touched.shipping_location ?
                            <span className="text-danger">{formik.errors.shipping_location}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Role: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={roles}
                        className="form-control-sm"
                        name="role"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                role: val,
                                sel_role: e,
                            })
                        }}
                        value={formik.values.sel_role}
                    />

                    {
                        formik.errors.role && formik.touched.role ?
                            <span className="text-danger">{formik.errors.role}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>


            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={statuses}
                        className="form-control-sm"
                        name="status"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                status: val,
                                sel_status: e
                            })
                        }}
                        value={formik.values.sel_status}
                    />

                    {
                        formik.errors.status && formik.touched.status ?
                            <span className="text-danger">{formik.errors.status}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group controlId="formFileSm" className="row mb-3">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={3}>
                    <Form.Control
                        type="file"
                        size="sm"
                        name="image"
                        accept="image/*"
                        onChange={
                            (e) => {
                                let files = e.target.files[0];
                                let parts = files.name.split('.');
                                let ext = parts[parts.length - 1];
                                let allowed_images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

                                if (!allowed_images.includes(ext.toLowerCase())) {
                                    formik.setErrors({
                                        ...formik.errors,
                                        image: "Invalid image format"
                                    })
                                } else {
                                    formik.setValues({
                                        ...formik.values,
                                        image: files
                                    })
                                }
                            }
                        } />
                    {
                        formik.errors.image && formik.touched.image ?
                            <span className="text-danger">{formik.errors.image}</span>
                            :
                            ""
                    }
                </Col>
                <Col sm="3">
                    {
                        formik.values.image && typeof (formik.values.image) !== 'string' ?
                            <img className="img img-fluid" src={URL.createObjectURL(formik.values.image)} />
                            :
                            <>
                                <img className="img img-fluid" src={process.env.REACT_APP_IMAGE_URL + formik.values.image} />
                            </>
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-sm btn-success">
                        User Create
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    </>)
}