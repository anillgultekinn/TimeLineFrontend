import React, { useState } from 'react'
import "./WorkHour.css"
import SideProfileMenu from '../../components/SideProfileMenu/SideProfileMenu'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import TextInput from '../../utilities/customFormControls/textInput';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

export default function WorkHour() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialValues = {
        startHour: "",
        endHour: "",
        studyDate: "",
    };

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

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mesai Saati Ekleme</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    console.log(values);

                                }}>

                                <Form className="workhour-page-form" >
                                    <Row >

                                        <Col md={6} className=' mb-5 mt-4'>

                                            <TextInput
                                                type="time"
                                                name="startHour"
                                                className=" workhour-select"
                                                component="select"
                                            >

                                            </TextInput>
                                        </Col>
                                        <Col md={6} className='mb-5 mt-4 '>
                                            <TextInput
                                                type="time"
                                                name="endHour"
                                                className=" workhour-select"
                                                component="select"
                                            >

                                            </TextInput>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col md={12} className='mb-5'>
                                            <TextInput
                                                type="date"
                                                name="studyDate"
                                                className=" workhour-select"
                                                component="select"
                                            >
                                            </TextInput>
                                        </Col>
                                    </Row>
                                </Form>
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" className='workhour-modal-footer-button' onClick={handleClose}>
                                Kapat
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <table className="ui celled table mt-3">
                        <thead>
                            <tr><th>Name</th>
                                <th>Age</th>
                                <th>Job</th>
                            </tr></thead>
                        <tbody>
                            <tr>
                                <td data-label="Name">James</td>
                                <td data-label="Age">24</td>
                                <td data-label="Job">Engineer</td>
                            </tr>
                            <tr>
                                <td data-label="Name">Jill</td>
                                <td data-label="Age">26</td>
                                <td data-label="Job">Engineer</td>
                            </tr>
                            <tr>
                                <td data-label="Name">Elyse</td>
                                <td data-label="Age">24</td>
                                <td data-label="Job">Designer</td>
                            </tr>
                        </tbody>
                    </table>

                    <Table singleLine className='mt-4'>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>İsim</TableHeaderCell>
                                <TableHeaderCell>Başlangıç Saati</TableHeaderCell>
                                <TableHeaderCell>Bitiş Saati</TableHeaderCell>
                                <TableHeaderCell>Gün</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>Anıl Gültekin</TableCell>
                                <TableCell>09:00</TableCell>
                                <TableCell>18:00</TableCell>
                                <TableCell>9 Temmuz 2024</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
