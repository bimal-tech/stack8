import { useFormik } from "formik"
import { Form, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { ucFirst } from "../../../helpers/functions";

export const LabelForm = (props) => {

    const [statuses, setStatuses] = useState([
        { value: 'active', label: 'Published' },
        { value: 'inactive', label: 'Un-Published' }
    ])
    const [loading, setLoading] = useState(true);

    let label_schema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required Required'),
        link: Yup.string().url(),
        status: Yup.string().required("Status is required")
    });

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: label_schema,
        onSubmit: (values) => {
            props.onSubmitLabel(values);
        }
    })

    useEffect(() => {
        let sel_status = {
            label: props.initialVals.status === 'active' ? "Published" : "Un-Published",
            value: props.initialVals.status
        }
        formik.setValues({
            ...props.initialVals,
            sel_status: sel_status
        })
    }, [props.initialVals])

    
    return (<>

            <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text"
                        name="title"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    >
                    </Form.Control>
                    {
                        formik.errors.title && formik.touched.title ?
                            <span className="text-danger">{formik.errors.title}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>
            {
                props.type === 'banner' ? 
                <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Link: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="url"
                        name="link"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.link}
                    >
                    </Form.Control>
                    {
                        formik.errors.link && formik.touched.link ?
                            <span className="text-danger">{formik.errors.link}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>
            
            : <></>
            }
            

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
                <Form.Label className="col-sm-3">Profile Image: </Form.Label>
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
                        formik.values.image && typeof(formik.values.image)!=='string' ?
                            <img className="img img-fluid" src={URL.createObjectURL(formik.values.image)} />
                            :
                            <>
                            <img className="img img-fluid" src={process.env.REACT_APP_IMAGE_URL+formik.values.image} />
                            </>
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-sm btn-success">
                        {ucFirst(props?.type)} Create
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    </>)
}