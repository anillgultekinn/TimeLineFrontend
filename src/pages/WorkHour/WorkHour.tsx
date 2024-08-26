import React, { useEffect, useState } from 'react';
import "./WorkHour.css";
import SideProfileMenu from '../../components/SideProfileMenu/SideProfileMenu';
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
import UpdateWorkHourRequest from '../../models/requests/workHour/updateWorkHourRequest';
import { REQUIRED_MESSAGE } from '../../environment/messages';
import * as Yup from 'yup';

export default function WorkHour() {
    const [workHours, setWorkHours] = useState<Paginate<GetListWorkHourResponse>>();
    const [selectedWorkHourId, setSelectedWorkHourId] = useState<string>("");
    const [selectedWorkHour, setSelectedWorkHour] = useState<GetListWorkHourResponse>();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const user = authService.getUserInfo();

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const userId = user?.id;

    const [pageIndexState, setPageIndexState] = useState<any>(0);

    useEffect(() => {
        getWorkHourByAccountId();
    }, [pageIndexState, userId]);

    const getWorkHourByAccountId = () => {
        if (userId) {
            workHourService.getByAccountId(userId, pageIndexState, 10).then(result => {
                setWorkHours(result.data);
            });
        }
    };

    const initialValues = {
        startHour: "",
        endHour: "",
        studyDate: "",
    };

    const updateInitialValues = {
        startHour: selectedWorkHour?.startHour,
        endHour: selectedWorkHour?.endHour,
        // studyDate: selectedWorkHour?.studyDate,
        studyDate: selectedWorkHour?.studyDate ? formatLocalDate(selectedWorkHour.studyDate) : "",

    };
    function formatLocalDate(date: any) {
        const localDate = new Date(date);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleAddWorkHour = async (values: any) => {
        const addWorkHour: AddWorkHourRequest = {
            accountId: user.id,
            startHour: values.startHour,
            endHour: values.endHour,
            studyDate: values.studyDate
        };

        if (addWorkHour.startHour > addWorkHour.endHour) {
            toast.error("Başlangıç saati bitiş saatinden küçük olmalı");
        } else {
            const response = await workHourService.add(addWorkHour);
            if (response.data) {
                toast.success("Çalışma Saati Eklendi.");
                handleCloseAddModal();
                getWorkHourByAccountId();
            }
        }
    };

    const handleUpdateWorkHour = async (values: any) => {

        const updateWorkHour: UpdateWorkHourRequest = {
            id: selectedWorkHourId,
            accountId: user.id,
            startHour: values.startHour,
            endHour: values.endHour,
            studyDate: values.studyDate
        }
        const response = await workHourService.update(updateWorkHour);
        if (response.data) {
            toast.success("Güncellendi");
            handleCloseUpdateModal();
            getWorkHourByAccountId();
        }
    };


    const handleDeleteWorkHour = async (selectedWorkHourId: any) => {
        toast.success("Çalışma Saati Silindi.");
        await workHourService.delete(selectedWorkHourId);
        getWorkHourByAccountId();
    };

    const handleOpenUpdateModal = (selectedWorkHourId: string) => {
        setShowUpdateModal(true);
        setSelectedWorkHourId(selectedWorkHourId);
        workHourService.getById(selectedWorkHourId).then((response) => {
            setSelectedWorkHour(response.data);
        })
    };

    const formatDate = (date: any) => {
        const inputDate = new Date(date);
        const formattedDate = inputDate.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formattedDate;
    };

    useEffect(() => {
        if (pageIndexState !== undefined) {
            workHourService.getByAccountId(userId, pageIndexState, 10).then(result => {
                setWorkHours(result.data);
            });
        }
    }, [pageIndexState]);

    function changePageIndex(pageIndex: any) {
        setPageIndexState(pageIndex);
    }

    const pages = [];

    if (workHours?.pages) {
        for (let pageIndex = 0; pageIndex < workHours?.pages; pageIndex++) {
            pages.push(
                <Pagination.Item onClick={() => changePageIndex(pageIndex)} key={pageIndex} active={pageIndex === pageIndexState}> {pageIndex + 1} </Pagination.Item>
            );
        }
    }

    function calculateWorkHours(startHour: string, endHour: string) {
        const start = new Date(`2000-01-01T${startHour}`);
        const end = new Date(`2000-01-01T${endHour}`);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return `${diffHours.toFixed(2)} saat`;
    }


    const validationSchema = Yup.object({
        startHour: Yup.string().required(REQUIRED_MESSAGE),
        endHour: Yup.string().required(REQUIRED_MESSAGE),
        studyDate: Yup.date().required(REQUIRED_MESSAGE),
    });



    return (
        <div className='workhour-page container'>
            <div className="row">
                <div className="col-md-3 mt-5">
                    <SideProfileMenu />
                </div>
                <div className="col-md-9 mt-5">
                    <div className="workhour-page-info">
                        <h5>Mesai Saati Bilgilerim</h5>
                        <p onClick={handleShowAddModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Yeni Mesai Saati Ekle
                        </p>
                    </div>

                    <Modal show={showAddModal} onHide={handleCloseAddModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mesai Saati Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    handleAddWorkHour(values);
                                }}
                            >
                                <Form className="workhour-page-form">
                                    <Row>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Başlangıç Saati</span>
                                            <TextInput
                                                type="time"
                                                name="startHour"
                                                className="workhour-select"
                                            />
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Bitiş Saati</span>
                                            <TextInput
                                                type="time"
                                                name="endHour"
                                                className="workhour-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className='mb-5'>
                                            <span>Tarih</span>
                                            <TextInput
                                                type="date"
                                                name="studyDate"
                                                className="workhour-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Button className="mb-2" type="submit" variant='warning' >
                                        Kaydet
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                    </Modal>

                    {/* Update Work Hour Modal */}
                    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mesai Saati Güncelleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={updateInitialValues}
                                enableReinitialize
                                onSubmit={(values) => {
                                    handleUpdateWorkHour(values);
                                }}
                            >
                                <Form className="workhour-page-form">
                                    <Row>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Başlangıç Saati</span>
                                            <TextInput
                                                type="time"
                                                name="startHour"
                                                className="workhour-select"
                                            />
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4'>
                                            <span>Bitiş Saati</span>
                                            <TextInput
                                                type="time"
                                                name="endHour"
                                                className="workhour-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className='mb-5'>
                                            <span>Tarih</span>
                                            <TextInput
                                                type="date"
                                                name="studyDate"
                                                className="workhour-select"
                                            />
                                        </Col>
                                    </Row>
                                    <Button className="mb-2" type="submit" variant='warning'>
                                        Güncelle
                                    </Button>
                                </Form>
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                    </Modal>

                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th> Adı</th>
                                <th> Soyadı</th>
                                <th scope="col">Tarih</th>
                                <th scope="col">Başlangıç Saati</th>
                                <th scope="col">Bitiş Saati</th>
                                <th scope="col">Toplam Saat</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workHours?.items.map(workHour => (
                                <tr >
                                    <td >{workHour.firstName}</td>
                                    <td >{workHour.lastName}</td>
                                    <td>{formatDate(workHour.studyDate)}</td>
                                    <td>{workHour.startHour}</td>
                                    <td>{workHour.endHour}</td>
                                    <td>{calculateWorkHours(workHour.startHour, workHour.endHour)}</td>
                                    <td onClick={() => handleOpenUpdateModal(String(workHour.id))}>
                                        <svg className='process-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </td>
                                    <td onClick={() => handleDeleteWorkHour(workHour.id)}>
                                        <svg className='process-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={5}><strong>Toplam Çalışılan Saat</strong></td>
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
        </div>
    );
}