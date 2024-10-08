import { Formik, Form } from 'formik';
import { Button, Tab, Tabs } from 'react-bootstrap';
import TextInput from '../../utilities/customFormControls/textInput';
import "./LoginRegister.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/authSlice';
import { userActions } from '../../store/user/userSlice';
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import { REQUIRED_MESSAGE } from '../../environment/messages';
import * as Yup from 'yup';
import tokenService from '../../core/services/tokenService';

export default function LoginRegister() {
    const loginInitialValues = { email: "", password: "" }
    const registerInitialValues = { email: "", password: "", firstName: "", lastName: "" }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = authService.getUserInfo();


    const redisterValidationSchema = Yup.object().shape({
        email: Yup.string().required(REQUIRED_MESSAGE),
        password: Yup.string().required(REQUIRED_MESSAGE),
        firstName: Yup.string().required(REQUIRED_MESSAGE),
        lastName: Yup.string().required(REQUIRED_MESSAGE),

    });

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required(REQUIRED_MESSAGE),
        password: Yup.string().required(REQUIRED_MESSAGE),

    });

    return (
        <div className='login-register-page container' >
            <div className="login-register-tab">
                <div className="col-md-6">
                    <Tabs
                        defaultActiveKey="login"
                        id="justify-tab-example"
                        className="mt-4"
                        justify
                    >
                        <Tab eventKey="login" title="Giriş Yap">
                            <Formik
                                validationSchema={loginValidationSchema}
                                initialValues={loginInitialValues}
                                onSubmit={(values) => {
                                    authService.login(values).then(response => {
                                        if (response.data !== undefined) {
                                            dispatch(authActions.addToken({ token: response.data.token }));
                                            dispatch(userActions.getUserInfo());
                                            navigate("/anasayfa");
                                            toast.success("Giriş yapıldı");
                                        }
                                    })
                                }}>
                                <Form className='login-form mt-5'>
                                    <span >E-Posta</span>
                                    <TextInput name="email" placeholder="E-Posta" />
                                    <span className='login-form-password'>Şifre</span>

                                    <TextInput name="password" className="mb-4" type="password" placeholder="Şifre" />
                                    <Button className="mb-4" type="submit">Giriş Yap</Button>

                                </Form>
                            </Formik>
                        </Tab>
                        <Tab eventKey="register" title="Üye Ol">
                            <Formik
                                validationSchema={redisterValidationSchema}
                                initialValues={registerInitialValues}
                                onSubmit={(values) => {
                                    authService.register(values).then(response => {
                                        if (response.data !== undefined) {
                                            tokenService.setToken(response.data);
                                            authService.getUserInfo();
                                            navigate("/anasayfa");
                                            toast.success("Kayıt Olundu");
                                        }
                                    })
                                }}
                            >
                                <Form className='register-form mt-5'>
                                    <span >Ad</span>
                                    <TextInput name="firstName" placeholder=" Ad" />

                                    <span >Soyad</span>
                                    <TextInput name="lastName" placeholder=" Soyad" />

                                    <span >E Posta</span>
                                    <TextInput name="email" placeholder="E-Posta" />

                                    <span >Şifre</span>
                                    <TextInput name="password" type="password" placeholder="Şifre" />

                                    <Button className="mb-4" type="submit">Üye Ol</Button>
                                </Form>
                            </Formik>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}