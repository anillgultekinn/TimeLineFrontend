import React, { useEffect, useState } from 'react'
import "./AdminWorkHour.css"
import SideProfileMenu from '../../components/SideProfileMenu/SideProfileMenu'
import { Button, Col, Modal, Pagination, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextInput from '../../utilities/customFormControls/textInput';
import AddWorkHourRequest from '../../models/requests/workHour/addWorkHourRequest';
import authService from '../../services/authService';
import workHourService from '../../services/workHourService';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import GetListWorkHourResponse from '../../models/responses/workHour/getListWorkHourResponse';
import { Paginate } from '../../models/paginate';
import SelectInput from '../../utilities/customFormControls/selectInput';
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';
import accountService from '../../services/accountService';

export default function AdminWorkHour() {

    const [workHours, setWorkHours] = useState<Paginate<GetListWorkHourResponse>>();
    const [accounts, setAccounts] = useState<Paginate<GetListAccountResponse>>();


    const [show, setShow] = useState(false);
    const user = authService.getUserInfo();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userId = user?.id;

    const [pageIndexState, setPageIndexState] = useState<any>(0)


    useEffect(() => {
        accountService.getAll(0, 100).then(result => {
            setAccounts(result.data)
            console.log(result.data);
        });
    }, []);



    useEffect(() => {
        getAllWorkHour();
    }, [pageIndexState, userId])


    const getAllWorkHour = () => {
        if (userId) {
            workHourService.getAll(0, 10).then(result => {
                setWorkHours(result.data);
            })
        }
    }

    const addWorkHourInitialValues = {
        startHour: "",
        endHour: "",
        studyDate: "",
    };

    const initialValues = {
        startHour: "",
        endHour: "",
        studyDate: "",
    };

    const handleAddWorkHour = async (values: any) => {
        console.log("workHour" + values);

        const addWorkHour: AddWorkHourRequest = {
            accountId: user.id,
            startHour: values.startHour,
            endHour: values.endHour,
            studyDate: values.studyDate
        }
        const response = await workHourService.add(addWorkHour);

        if (response.data) {
            toast.success("Mesai Saati Eklendi.");
            handleClose();
            getAllWorkHour();
        }
    }

    const formatDate = (date: any) => {
        const inputDate = new Date(date);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = inputDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    useEffect(() => {
        if (pageIndexState !== undefined) {
            workHourService.getAll(pageIndexState, 10).then(result => {
                setWorkHours(result.data);
            });
        }
    }, [pageIndexState]);

    function changePageIndex(pageIndex: any) {
        setPageIndexState(pageIndex);
    }

    const pages = [];

    if (workHours?.pages)
        for (let pageIndex = 0; pageIndex < workHours?.pages; pageIndex++) {
            pages.push(
                <Pagination.Item onClick={() => changePageIndex(pageIndex)} key={pageIndex} active={pageIndex === pageIndexState}> {pageIndex + 1} </Pagination.Item>
            );
        }


    function calculateWorkHours(startHour: string, endHour: string) {
        const start = new Date(`2000-01-01T${startHour}`);
        const end = new Date(`2000-01-01T${endHour}`);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return `${diffHours.toFixed(2)} saat`;
    }


    return (
        <div className='workhour-page container'>
            <div className="row">
                <div className="col-md-3 mt-5">
                    <SideProfileMenu />
                </div>

                <div className="col-md-9 mt-5">
                    <div className="workhour-page-info" >
                        <h5>
                            Mesai Saati Bilgilerim
                        </h5>
                        <p onClick={handleShow} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Yeni Mesai Saati Ekle
                        </p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            handleAddWorkHour(values)

                        }}>
                        <Form className="admin-worhour-page-form" >
                            <Row>

                                <Col md={3} className=' mb-3'>

                                    <SelectInput
                                        name="accountId"
                                        className="account-select"
                                        component="select"
                                    >
                                        <option value="account">Kişiyi seçiniz</option>
                                        {accounts && accounts.items.map((account, index) => (
                                            <option key={index} value={account.firstName}>
                                                {account.firstName}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </Col>

                                <Col md={3} className='mb-3'>
                                    <SelectInput
                                        name="accountId"
                                        className="account-select"
                                        component="select"
                                    >
                                        <option value="account">Ay seçiniz</option>
                                        {workHours && [...new Set(workHours.items.map(workHour => new Date(workHour.studyDate).getMonth()))].map((monthIndex, index) => {
                                            const monthName = new Date(2024, monthIndex).toLocaleString('default', { month: 'long' }); // Get month name
                                            return (
                                                <option key={index} value={monthName}>
                                                    {monthName}
                                                </option>
                                            );
                                        })}
                                    </SelectInput>

                                </Col>
                            </Row>
                        </Form>


                    </Formik>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mesai Saati Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Formik
                                initialValues={addWorkHourInitialValues}
                                onSubmit={(values) => {
                                    handleAddWorkHour(values)

                                }}>

                                <Form className="admin-worhour-page-form" >
                                    <Row >
                                        <Col md={6} className=' mb-5 mt-4'>
                                            <span>Başlangıç Saati</span>
                                            <TextInput
                                                type="time"
                                                name="startHour"
                                                className=" admin-worhour-select"
                                                component="select"
                                            >

                                            </TextInput>
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4 '>
                                            <span>Bitiş Saati</span>

                                            <TextInput
                                                type="time"
                                                name="endHour"
                                                className=" admin-worhour-select"
                                                component="select"
                                            >

                                            </TextInput>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col md={12} className='mb-5'>
                                            <span>Tarih</span>
                                            <TextInput
                                                type="date"
                                                name="studyDate"
                                                className=" admin-worhour-select"
                                                component="select"
                                            >
                                            </TextInput>
                                        </Col>
                                    </Row>
                                    <Button className="mb-2" type="submit">
                                        Kaydet
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>






                    <table className="ui celled table mt-3">
                        <thead>
                            <tr>
                                <th> Adı</th>
                                <th> Soyadı</th>
                                <th>Giriş Saati</th>
                                <th>Çıkış Saati</th>
                                <th>Çalışılan Tarih</th>
                                <th>Çalışılan Saat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workHours?.items.map((workHour: any) => (
                                <tr >
                                    <td data-label="firstName">{workHour.firstName}</td>
                                    <td data-label="firstName">{workHour.lastName}</td>
                                    <td data-label="startHour">{workHour.startHour}</td>
                                    <td data-label="endHour">{workHour.endHour}</td>
                                    <td data-label="email">{formatDate(workHour.studyDate)}</td>
                                    <td>{calculateWorkHours(workHour.startHour, workHour.endHour)}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tbody>
                            <tr>
                                <td colSpan={5}><strong>Toplam Çalışılan Saatler</strong></td>
                                <td colSpan={5}>
                                    {workHours?.items.reduce((totalHours, workHour) => {
                                        const start = new Date(`2000-01-01T${workHour.startHour}`);
                                        const end = new Date(`2000-01-01T${workHour.endHour}`);
                                        const diffMs = end.getTime() - start.getTime();
                                        const diffHours = diffMs / (1000 * 60 * 60);
                                        return totalHours + diffHours;
                                    }, 0).toFixed(2)} saat
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <Col className="pagination-area" md={12}>
                        <Pagination style={{ display: workHours && workHours.pages > 1 ? 'flex' : 'none' }}>
                            <Pagination.Prev className="pagination-prev-next" disabled={pageIndexState === 0} onClick={() => changePageIndex(pageIndexState - 1)} >
                                <span aria-hidden="true"> &lt; </span>
                            </Pagination.Prev>
                            {pages}
                            <Pagination.Next className="pagination-prev-next" disabled={pageIndexState + 1 === workHours?.pages} onClick={() => changePageIndex(pageIndexState + 1)}>
                                <span aria-hidden="true"> &gt; </span>
                            </Pagination.Next>
                        </Pagination>
                    </Col>
                </div>
            </div>
        </div >
    )
}