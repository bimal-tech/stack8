import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { HomeMenu } from "../../../components/home/menu.component"
import { register } from "../../../services/auth";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    let default_data = {
        name: "",
        email: '',
        password: '',
        billing_location: "",
        shipping_location: "",
        role: '',
        image: "",
        date_of_birth: ''
    }
    let [error, setError] = useState(default_data);
    let [data, setData] = useState(default_data);

    let navigate = useNavigate();
    const handleChange = (e) => {
        let {name, type, file, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
        validateFormData(name, value);
    }

    const validateFormData = (field, value) => {
        let msg = "";
        switch(field){
            case "name":
                msg = !value ? "Name is required." : "";
                break;
            case "email":
                msg = !value ? "Email is required." : (value.includes('@') ? '' : 'Invalid Email Format');
                break;
            case "password":
                msg = !value ? "Password is required." : (value.length < 8 ? 'Password must be 8 character long': "");
                break;
            case "re_password":
                msg = !value ? "Re-Password is required." : (value === data.password ? "" : "Password and re-password does not match.");
                break;
        }
        setError({
            ...error,
            [field]: msg
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try{
            let response = await register(data);
            if(response.status) {
                toast.success(response.msg);
                navigate("/login")
            } else {
                toast.error(response.msg);
            }
        } catch(error) {
            console.error("Register: ", error);
            // error.response.msg
            toast.error(error.msg);
        }

    }
    return (<>
        <HomeMenu />
        <ToastContainer />
        <Container className="mt-3">

            <Row>

                <Col sm={12} >
                    <h4 className="text-center">Register your Account!!</h4>
                    <hr />
                </Col>

            </Row>

            <Row>
                <Col>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3 row" controlId="name">
                            <Form.Label className="col-sm-3">Full Name:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    required
                                    name="name"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value
                                        })
                                        validateFormData('name', e.target.value);
                                    }}
                                />
                                <span className="text-danger">{error.name}</span>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="email">
                            <Form.Label className="col-sm-3">Email:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="email"
                                    size="sm"
                                    required
                                    name="email"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row" controlId="password">
                            <Form.Label className="col-sm-3">Password:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="password"
                                    size="sm"
                                    required
                                    name="password"
                                    onChange={handleChange}
                                />
                                <small className="text-danger"><em>{error.password}</em></small>
                            </Col>
                            
                        </Form.Group>
                        <Form.Group className="mb-3 row" controlId="re_password">
                            <Form.Label className="col-sm-3">Re-Password:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="password"
                                    size="sm"
                                    required
                                    name="re_password"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            password_confirmation: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="address_biling">
                            <Form.Label className="col-sm-3">Address (Billing):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    size="sm"
                                    required
                                    name="address[billing][location]"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            billing_location: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="address_shipping">
                            <Form.Label className="col-sm-3">Address (Shipping):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    size="sm"
                                    name="address[shipping][location]"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            shipping_location: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="dob">
                            <Form.Label className="col-sm-3">Date Of Birth:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    required
                                    name="date_of_birth"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            date_of_birth: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="role">
                            <Form.Label className="col-sm-3">Role:</Form.Label>
                            <Col sm={9}>
                                <Form.Select aria-label="Default select example"
                                name="role" 
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        role: e.target.value
                                    })
                                }}>
                                    <option>Open this select menu</option>
                                    <option value="customer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formFileSm" className="row mb-3">
                            <Form.Label className="col-sm-3">Profile Image: </Form.Label>
                            <Col sm={3}>
                                <Form.Control type="file" size="sm" name="image" accept="image/*" onChange={
                                    (e) => {
                                        let files = e.target.files[0];
                                        let parts = files.name.split('.');
                                        let ext = parts[parts.length-1];
                                        let allowed_images = ['jpg','jpeg','png','gif','bmp','webp','svg'];

                                        if(!allowed_images.includes(ext.toLowerCase())){
                                            setError({
                                                ...error,
                                                image:"Invalid File Format"
                                            });
                                        } else {
                                            setError({
                                                ...error, 
                                                image: null
                                            })
                                            setData({
                                                ...data,
                                                image: files
                                            })
                                        }
                                    }
                                }  />
                                <span className="text-danger">
                                    {
                                       error.image ?? null
                                    }
                                </span>
                            </Col>
                            <Col sm="3">
                                    {
                                        data.image ?
                                        <img className="img img-fluid" src={URL.createObjectURL(data.image)} />
                                        :
                                        <>
                                            <div style={{
                                                "background": "#cccccc",
                                                "height": "100px",
                                                "width": "120px",
                                                "borderRadius": "50%"
                                            }}>
                                                <span>{
                                                    data.name[0] ?? ""
                                                }</span>
                                            </div>
                                        </>
                                    }
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3 row" controlId="role">
                            <Col sm={{span: 9, offset:3}}>
                                <Button type="reset" className="btn btn-sm btn-danger me-3">
                                    Cancel
                                </Button>
                                <Button type="submit" className="btn btn-sm btn-success">
                                    Register
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

        </Container>
    </>)
}

export default RegisterPage;