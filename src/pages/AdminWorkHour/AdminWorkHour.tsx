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
import WorkHourFilterRequest from '../../models/requests/filter/workHourFilterRequest';

export default function AdminWorkHour() {

    const [workHours, setWorkHours] = useState<Paginate<GetListWorkHourResponse>>();
    const [accounts, setAccounts] = useState<Paginate<GetListAccountResponse>>();

    const [filterParametersState, setFilterParametersState] = useState<WorkHourFilterRequest>({
        requestingAccountId: "-1",
        month: "-1"
    });
    const [show, setShow] = useState(false);
    const user = authService.getUserInfo();
    const userId = user?.id;

    const [pageIndexState, setPageIndexState] = useState<any>(0)

    useEffect(() => {
        accountService.getAll(0, 100).then(result => {
            setAccounts(result.data);
        });
    }, []);

    const handleFilter = async (values: any) => {
        setPageIndexState(0);
        const filterRequest: WorkHourFilterRequest = {
            requestingAccountId: values.requestingAccountId,
            month: values.month
        }

        const response = await workHourService.getByFilter(filterRequest, pageIndexState, 10);
        if (response.data) {
            setWorkHours(response.data);
        }
    }

    useEffect(() => {
        getAllWorkHour();
    }, [filterParametersState])

    useEffect(() => {
        getAllWorkHour();
    }, [pageIndexState, userId])


    const getAllWorkHour = async () => {
        if (userId) {
            const response = await workHourService.getByFilter(filterParametersState, pageIndexState, 10);
            if (response.data) {
                setWorkHours(response.data);
            }
        }
    }

    const initialValues = {
        month: "-1",
        requestingAccountId: "-1"
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
                            Çalışma Saati Bilgileri
                        </h5>
                    </div>

                    <div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                handleFilter(values)
                            }}>
                            <Form className="admin-workhour-page-form" >
                                <Row>
                                    <Col md={3} className=' mb-3'>
                                        <SelectInput
                                            name="requestingAccountId"
                                            className="account-select"
                                            component="select"

                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                const selectedAccount = e.target.value;
                                                console.log(selectedAccount);
                                                setFilterParametersState(prevState => ({
                                                    ...prevState,
                                                    requestingAccountId: selectedAccount
                                                }));
                                                console.log(filterParametersState);
                                                handleFilter({ ...filterParametersState, requestingAccountId: selectedAccount });
                                            }}
                                        >
                                            <option value="-1">Kişiyi seçiniz</option>
                                            {accounts && accounts.items
                                                .filter(account => account.firstName !== 'Admin')
                                                .map((account, index) => (
                                                    <option key={index} value={String(account.id)}>
                                                        {account.firstName}
                                                    </option>
                                                ))}

                                        </SelectInput>
                                    </Col>

                                    <Col md={3} className='mb-3'>
                                        <SelectInput
                                            name="month"
                                            className="account-select"
                                            component="select"

                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                const selectedMonth = e.target.value;
                                                setFilterParametersState(prevState => ({
                                                    ...prevState,
                                                    month: selectedMonth
                                                }));
                                                handleFilter({ ...filterParametersState, month: selectedMonth });
                                            }}
                                        >
                                            <option value="-1">Ay seçiniz</option>
                                            <option value="1">Ocak</option>
                                            <option value="2">Şubat</option>
                                            <option value="3">Mart</option>
                                            <option value="4">Nisan</option>
                                            <option value="5">Mayıs</option>
                                            <option value="6">Haziran</option>
                                            <option value="7">Temmuz</option>
                                            <option value="8">Ağustos</option>
                                            <option value="9">Eylül</option>
                                            <option value="10">Ekim</option>
                                            <option value="11">Kasım</option>
                                            <option value="12">Aralık</option>

                                        </SelectInput>
                                    </Col>
                                </Row>
                            </Form>
                        </Formik>
                    </div>




                    <table className="ui celled table mt-3">
                        <thead>
                            <tr>
                                <th> Adı</th>
                                <th> Soyadı</th>
                                <th scope="col">Tarih</th>
                                <th scope="col">Başlangıç Saati</th>
                                <th scope="col">Bitiş Saati</th>
                                <th scope="col">Toplam Saat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workHours?.items.map((workHour: any) => (
                                <tr >
                                    <td >{workHour.firstName}</td>
                                    <td >{workHour.lastName}</td>
                                    <td>{formatDate(workHour.studyDate)}</td>
                                    <td>{workHour.startHour}</td>
                                    <td>{workHour.endHour}</td>
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
