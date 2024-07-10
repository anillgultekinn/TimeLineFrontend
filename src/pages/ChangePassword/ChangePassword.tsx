import "./ChangePassword.css"
import { Form, Formik } from 'formik'
import TextInput from '../../utilities/customFormControls/textInput';
import SideProfileMenu from "../../components/SideProfileMenu/SideProfileMenu";
import authService from "../../services/authService";
import ChangePasswordRequest from "../../models/requests/auth/changePasswordRequest";
import { PASSWORD_IS_CHANGED, REQUIRED_MESSAGE } from "../../environment/messages";
import * as Yup from 'yup';
import { toast } from "react-toastify";



export default function ChangePassword() {

    const user = authService.getUserInfo();

    const handleChangePassword = async (values: any, resetForm: any) => {
        const changePasswordRequest: ChangePasswordRequest = {
            userId: user.id,
            newPassword: values.newPassword,
            oldPassword: values.oldPassword
        }
        const result = await authService.changePassword(changePasswordRequest)
        if (result.data) {

            toast.success(PASSWORD_IS_CHANGED)
        }
        resetForm();


    }

    const validationSchema = Yup.object({
        newPassword: Yup.string().required(REQUIRED_MESSAGE),
        oldPassword: Yup.string().required(REQUIRED_MESSAGE),
        confirmPassword: Yup.string().required(REQUIRED_MESSAGE)
    })


    return (
        <div className='change-password container' >
            <div className="row">
                <div className="col-md-3 mb-5 mt-5">
                    <SideProfileMenu />
                </div>

                <div className="col-md-9">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                        onSubmit={(values, { resetForm }) => {
                            if (values.newPassword === values.confirmPassword) handleChangePassword(values, resetForm)
                                ;
                        }}>

                        <Form className="change-password-form mt-5">
                            <div className="col-md-12">
                                <div className='change-password-content'>
                                    <div className=" col-md-6 mb-6">
                                        <label className="input-title">Eski Şifre</label>
                                        <TextInput name="oldPassword" className='tbt-input' type="password" placeholder='Eski Şifre' />
                                    </div>
                                    <div className="  col-md-6 mb-6">
                                        <label className="input-title">Yeni Şifre</label>
                                        <TextInput name="newPassword" className='tbt-input' type="password" placeholder='Yeni Şifre' />
                                    </div>
                                    <div className=" col-md-6 mb-6">
                                        <label className="input-title">Yeni Şifre Tekrar</label>
                                        <TextInput name="confirmPassword" className='tbt-input' type="password" placeholder='Yeni Şifre Tekrar' />
                                    </div>
                                    <div className=' col-md-6'>
                                        <button className=" w-100" type='submit'>Şifre Değiştir
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}