// React Hook 
// state hook 
// effect or side-effect hook

import { useEffect, useState } from "react";
import {  Container, Row, Col } from "react-bootstrap";
import { HomeMenu } from "../../../components/home/menu.component";
import InputComponent from "../../../components/common/input/input.component";
import CustomLabel from "../../../components/common/label/custom-label.component";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth";

const LoginPage = (props) => {

    // state hook
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState();

    let navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        try{
            let response = await login(username, password)
            // dashboard
            navigate('/admin');
            toast.success(response.data.msg)
        } catch(error) {            
            toast.error(error.msg);
        }
    }


    useEffect(() => {
        let token = localStorage.getItem("stack_8_token");
        if(token){
            navigate("/admin");
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <HomeMenu />
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <h4 className="text-center">Login page</h4>
                    </div>
                </div>
            </div>

            <Container>
                <Row>
                    <Col sm={9}>
                        
                        <form onSubmit={submitForm}>    
                            <div className="form-group row mb-3">
                                <CustomLabel 
                                    title="Email "
                                    isRequired={true}
                                />
                                <div className="col-sm-9">
                                    <InputComponent 
                                        type="email"
                                        name="email"
                                        required={true}
                                        placeholder="Enter your email"
                                        handleChange={setUsername}
                                    />
                                </div>
                            </div>


                            <div className="form-group row mb-3">
                                <CustomLabel 
                                    title="Password "
                                    isRequired={true}
                                /><div className="col-sm-9">
                                    <InputComponent 
                                        type="password"
                                        name="password"
                                        required={true}
                                        placeholder="Enter your Password"
                                        handleChange={setPassword}
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <div className="offset-sm-3 col-sm-9">
                                    <label>
                                        <input type="checkbox" name="remember_me" value="1" onChange={(e)=>{
                                            let is_checked = e.target.checked;

                                        }} ></input> Remember Me
                                    </label>
                                </div>
                            </div>


                            <div className="form-group row mb-3">
                                <div className="offset-sm-3 col-sm-9">
                                    <button className="btn btn-sm btn-danger mx-3" type="reset">
                                        Reset
                                    </button>
                                    <button className="btn btn-sm btn-success" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                            
                        
                        </form>
                        OR 
                        <NavLink to="/register"> Register Your Account</NavLink>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginPage;