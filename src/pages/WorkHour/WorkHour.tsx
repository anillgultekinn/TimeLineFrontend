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

export default function WorkHour() {
    const [workHours, setWorkHours] = useState<Paginate<GetListWorkHourResponse>>();
    const [selectedWorkHourId, setSelectedWorkHourId] = useState<string>("");

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
        };

        const response = await workHourService.update(updateWorkHour);
        if (response.data) {
            toast.success("Güncellendi");
            handleCloseUpdateModal();
            getWorkHourByAccountId();
        }
    };

    const handleDeleteWorkHour = async (selectedWorkHourId: any) => {
        await workHourService.delete(selectedWorkHourId);
        getWorkHourByAccountId();
    };

    const handleOpenUpdateModal = (selectedWorkHourId: string) => {
        setShowUpdateModal(true);
        setSelectedWorkHourId(selectedWorkHourId);
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

                    {/* Add Work Hour Modal */}
                    <Modal show={showAddModal} onHide={handleCloseAddModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mesai Saati Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
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
                                    <Button className="mb-2" type="submit">
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
                                initialValues={initialValues}
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
                                    <Button className="mb-2" type="submit">
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
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleOpenUpdateModal(String(workHour.id))}
                                        >
                                            Güncelle
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteWorkHour(workHour.id)}
                                        >
                                            Sil
                                        </Button>
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
