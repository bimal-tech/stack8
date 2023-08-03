import { useFormik } from "formik"
import { Form, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { ucFirst } from "../../../helpers/functions";
import { getLabelByType } from "../../../services/label";
import { getCategory } from "../../../services/category";

export const CategoryForm = (props) => {

    const [statuses, setStatuses] = useState([
        { value: 'active', label: 'Published' },
        { value: 'inactive', label: 'Un-Published' }
    ])

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    let category_schema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required Required'),
        summary: Yup.string(),
        brand: Yup.array(),
        status: Yup.string().required("Status is required")
    });

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: category_schema,
        onSubmit: (values) => {
            props.onSubmitCategory(values);
        }
    })

    let getAllParentCats = async () => {
        try{
            let cats = await getCategory();
            if(cats.result) {
                let cat_opt = cats.result.map((o) => ({
                    label: o.title,
                    value: o._id
                }))
                setCategories(cat_opt);
            }
        } catch(error) {
            console.error("Cat fetch: ", error);
        }
    }

    let getAllBrands = async () => {
        try{
            let result = await getLabelByType('brand');
            if(result.result) {
                let brand_opt = result.result.map((o) => (
                    {
                        label: o.title,
                        value: o._id
                    }
                ))
                setBrands(brand_opt);
            }
        } catch(error) {
            console.log("Brand Err: ", error)
        }
    }

    useEffect(() => {
        getAllParentCats();
        getAllBrands();
        let sel_status = {
            label: props.initialVals.status === 'active' ? "Published" : "Un-Published",
            value: props.initialVals.status
        }
        formik.setValues({
            ...props.initialVals,
            sel_status: sel_status
        })
    }, [props.initialVals])


    // console.log(formik.values);
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

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Summary: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        as="textarea"
                        name="summary"
                        size="sm"
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.summary}
                    >
                    </Form.Control>
                    {
                        formik.errors.summary && formik.touched.summary ?
                            <span className="text-danger">{formik.errors.summary}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Parent: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={categories}
                        className="form-control-sm"
                        name="parent_id"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                parent_id: val,
                                sel_parent_id: e,
                            })
                        }}
                        value={formik.values.sel_parent_id}
                    />

                    {
                        formik.errors.parent_id && formik.touched.parent_id ?
                            <span className="text-danger">{formik.errors.parent_id}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Brands: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={brands}
                        className="form-control-sm"
                        name="brand"
                        isMulti
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                brand: (e.map((o) => o.value)),
                                sel_brands: e,
                            })
                        }}
                        value={formik.values.sel_brands}
                    />

                    {
                        formik.errors.brand && formik.touched.brand ?
                            <span className="text-danger">{formik.errors.brand}</span>
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
                        Category Create
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    </>)
}