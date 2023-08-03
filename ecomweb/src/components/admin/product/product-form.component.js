import { useFormik } from "formik"
import { Form, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getCategory } from "../../../services/category";
import { getLabelByType } from "../../../services/label";
import { getUser } from "../../../services/user";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getProductById } from "../../../services/product";
export const ProductForm = (props) => {
    
    let params = useParams();
    const [statuses, setStatuses] = useState([
        { value: 'active', label: 'Published' },
        { value: 'inactive', label: 'Un-Published' }
    ])

    let [loading, setLoading] = useState(true);

    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [seller, setSeller] = useState([]);

    const getAllCategories = async () => {
        try {
            let all_cats = await getCategory()
            if (all_cats.status) {
                setCategory(all_cats.result);
            }
        } catch (error) {
            console.error("CatFetchErr: ", error);
        }
    }

    const getAllBrands = async () => {
        try {
            let all_brands = await getLabelByType('brand');
            if (all_brands.status) {
                setBrands(all_brands.result);
            }
        } catch (error) {
            console.error("BrandFetchError: ", error);
        }
    }

    const getAllSellers = async () => {
        try {
            let all_user = await getUser();
            if (all_user.status) {
                let seller = all_user.result.filter((o) => o.role === 'seller');
                setSeller(seller);
            }
        } catch (error) {
            console.error("SellerFetchErr: ", error);
        }
    }

    const getProductData = async () => {
        try {
            let product = await getProductById(params.id);
            if (product.status) {
                formik.setValues({
                    ...product.result,
                    sel_brand: {
                        label: product.result.brand.title,
                        value: product.result.brand._id
                    },

                    sel_category: {
                        label: product.result.category.title,
                        value: product.result.category._id
                    },

                    sel_status: {
                        label: product.result.status === 'active' ? 'Published' : "Un-Published",
                        value: product.result.status
                    },

                    sel_seller: {
                        label: product.result.seller.name,
                        value: product.result.seller._id
                    },
                    uploaded_images: []
                });
            }
        } catch (error) {
            console.error("SellerFetchErr: ", error);
        }
    }

    let validate_obj = {
        title: Yup.string()
            .required('Name is required Required'),
        price: Yup.number().min(1, 'Price must be greater than 1').required("price is required"),
        status: Yup.string().required("Status is required"),
    }
    let product_schema = Yup.object().shape(validate_obj);

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: product_schema,
        onSubmit: (values) => {
            props.onSubmitProduct(values);
        }
    })


    useEffect(() => {
        getAllCategories()
        getAllBrands()
        getAllSellers()
        if(params.id) {
            getProductData();
        }
        setLoading(false)
    }, [loading]);

    return (<>

        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name: </Form.Label>
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
                <Form.Label className="col-sm-3">Description: </Form.Label>
                <Col sm={9}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={formik.values.description}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            if(!data) {
                                formik.setErrors({
                                    ...formik.errors,
                                    description: "Description is required"
                                })
                            } else {
                                formik.setValues({
                                    ...formik.values,
                                    description: data
                                })
                            }
                        } }
                        
                    />
                    {
                        formik.errors.description && formik.touched.description ?
                            <span className="text-danger">{formik.errors.description}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>


            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Price(NPR.): </Form.Label>
                <Col sm={9}>
                    <Form.Control type="number"
                        name="price"
                        required
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    >
                    </Form.Control>
                    {
                        formik.errors.price && formik.touched.price ?
                            <span className="text-danger">{formik.errors.price}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>


            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Discount(%): </Form.Label>
                <Col sm={9}>
                    <Form.Control type="number"
                        name="discount"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                    >
                    </Form.Control>
                    {
                        formik.errors.discount && formik.touched.discount ?
                            <span className="text-danger">{formik.errors.discount}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Category: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={category.map((o) => ({
                            label: o.title,
                            value: o._id
                        }))}
                        className="form-control-sm"
                        name="category"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                category: val,
                                sel_category: e
                            })
                        }}
                        value={formik.values.sel_category}
                    />

                    {
                        formik.errors.category && formik.touched.category ?
                            <span className="text-danger">{formik.errors.category}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Brand: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={brands.map((o) => ({
                            label: o.title,
                            value: o._id
                        }))}
                        className="form-control-sm"
                        name="brand"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                brand: val,
                                sel_brand: e
                            })
                        }}
                        value={formik.values.sel_brand}
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
                <Form.Label className="col-sm-3">Seller: </Form.Label>
                <Col sm={9}>
                    <Select
                        options={seller.map((o) => ({
                            label: o.name,
                            value: o._id
                        }))}
                        className="form-control-sm"
                        name="seller"
                        onChange={(e) => {
                            let val = e.value;
                            formik.setValues({
                                ...formik.values,
                                seller: val,
                                sel_seller: e
                            })
                        }}
                        value={formik.values.sel_seller}
                    />

                    {
                        formik.errors.seller && formik.touched.seller ?
                            <span className="text-danger">{formik.errors.seller}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3" controlId="is_featured">
                <Form.Label className="col-sm-3">Is Featured: </Form.Label>
                <Col sm={9}>

                    <Form.Check 
                        type="checkbox"
                        label="Yes"
                        id="is_featured"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                is_featured: e.target.checked
                            })
                        }}
                    />
                    
                    {
                        formik.errors.name && formik.touched.name ?
                            <span className="text-danger">{formik.errors.name}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Stock: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="number"
                        name="stock"
                        size="sm"
                        onChange={formik.handleChange}
                        value={formik.values.stock}
                    >
                    </Form.Control>
                    {
                        formik.errors.stock && formik.touched.stock ?
                            <span className="text-danger">{formik.errors.stock}</span>
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
                        multiple
                        accept="image/*"
                        onChange={
                            (e) => {
                                let files = Object.values(e.target.files);
                                let allowed_images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
                                let images = [];
                                files.map((img) => {
                                    let parts = img.name.split('.');
                                    let ext = parts[parts.length - 1];
                                    if (!allowed_images.includes(ext.toLowerCase())) {
                                        formik.setErrors({
                                            ...formik.errors,
                                            images: "Invalid image format"
                                        })
                                    } else {
                                        images.push(img);
                                    }
                                })

                                if(images.length){
                                    let def_values = {
                                        ...formik.values,
                                        uploaded_images: images
                                    }

                                    formik.setValues(def_values)
                                }
                            }
                        } />
                    {
                        formik.errors.images && formik.touched.images ?
                            <span className="text-danger">{formik.errors.images}</span>
                            :
                            ""
                    }
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                    {
                        formik.values.uploaded_images && typeof (formik.values.uploaded_images) !== 'string' && formik.values.uploaded_images.map((o, i) => {
                            {
                                return typeof(o) === 'object' ? 
                                    <Col key={i} sm={1}>
                                        <img src={URL.createObjectURL(o)} className="img img-fluid img-thumbnail" />
                                    </Col>
                                : <></>
                            }
                        })
                    }
                    {
                        formik.values.images && typeof (formik.values.images) !== 'string' && formik.values.images.map((o, i) => 
                        { 
                        return         <Col key={i} sm={1}>
                                    <img src={process.env.REACT_APP_IMAGE_URL+o} className="img img-fluid img-thumbnail" />
                                </Col>
                            
                        })
                    }
            </Form.Group>
            <Form.Group className="row mb-3">
                <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-sm btn-success">
                        Product Create
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    </>)
}