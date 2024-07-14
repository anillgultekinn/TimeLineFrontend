import React, { useState } from 'react'
import "./SideProfileMenu.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { ADMIN_ROLE } from '../../environment/environment';


export default function SideProfileMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    const user = authService.getUserInfo();


    const handleLogout = () => {
        authService.logoutUser();
        navigate("/");
    }


    return (
        <div className='side-profile-menu'>
            {/* <h6>{loginStatusService.getLoginStatus() ? userMail : 'Email bulunamadı...'}</h6> */}
            <div className='left-container'>
                <div className='process'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                        <path d="M15 10.75C15 12.4069 13.6569 13.75 12 13.75C10.3431 13.75 9 12.4069 9 10.75C9 9.09315 10.3431 7.75 12 7.75C13.6569 7.75 15 9.09315 15 10.75Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M20.0684 6.49188L19.6381 5.74236C19.3127 5.17551 19.1499 4.89208 18.8731 4.77906C18.5962 4.66604 18.2831 4.75522 17.6569 4.93359L16.5931 5.23432C16.1933 5.32686 15.7738 5.27437 15.4087 5.08611L15.1151 4.91603C14.802 4.71479 14.5612 4.41808 14.4279 4.06931L14.1368 3.1966C13.9454 2.61908 13.8497 2.33033 13.6218 2.16516C13.3939 2 13.0913 2 12.4859 2H11.5141C10.9087 2 10.6061 2 10.3782 2.16516C10.1503 2.33033 10.0546 2.61908 9.8632 3.1966L9.57206 4.06931C9.43878 4.41808 9.198 4.71479 8.88495 4.91603L8.59126 5.08611C8.2262 5.27437 7.80673 5.32686 7.40693 5.23432L6.34313 4.93359C5.71689 4.75522 5.40377 4.66604 5.12691 4.77906C4.85005 4.89208 4.68734 5.17551 4.3619 5.74236L3.93159 6.49188C3.62655 7.02323 3.47402 7.2889 3.50362 7.57172C3.53323 7.85453 3.73741 8.08244 4.14579 8.53827L5.04464 9.54689C5.26433 9.82603 5.4203 10.3125 5.4203 10.7499C5.4203 11.1875 5.26438 11.6738 5.04467 11.953L4.14579 12.9617C3.73742 13.4175 3.53323 13.6454 3.50363 13.9282C3.47402 14.211 3.62655 14.4767 3.9316 15.008L4.36189 15.7575C4.68732 16.3244 4.85005 16.6078 5.12691 16.7209C5.40378 16.8339 5.7169 16.7447 6.34315 16.5663L7.40689 16.2656C7.80677 16.173 8.22631 16.2255 8.59142 16.4139L8.88506 16.584C9.19804 16.7852 9.43878 17.0819 9.57204 17.4306L9.8632 18.3034C10.0546 18.8809 10.1503 19.1697 10.3782 19.3348C10.6061 19.5 10.9087 19.5 11.5141 19.5H12.4859C13.0913 19.5 13.3939 19.5 13.6218 19.3348C13.8497 19.1697 13.9454 18.8809 14.1368 18.3034L14.428 17.4306C14.5612 17.0819 14.802 16.7852 15.1149 16.584L15.4086 16.4139C15.7737 16.2255 16.1932 16.173 16.5931 16.2656L17.6569 16.5663C18.2831 16.7447 18.5962 16.8339 18.8731 16.7209C19.15 16.6078 19.3127 16.3244 19.6381 15.7575L20.0684 15.008C20.3735 14.4767 20.526 14.211 20.4964 13.9282C20.4668 13.6454 20.2626 13.4175 19.8542 12.9617L18.9553 11.953C18.7356 11.6738 18.5797 11.1875 18.5797 10.7499C18.5797 10.3125 18.7357 9.82603 18.9554 9.54689L19.8542 8.53827C20.2626 8.08244 20.4668 7.85453 20.4964 7.57172C20.526 7.2889 20.3735 7.02323 20.0684 6.49188Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M22 18C22 18.93 22 19.395 21.8978 19.7765C21.6204 20.8117 20.8117 21.6204 19.7765 21.8978C19.395 22 18.93 22 18 22H6C5.07003 22 4.60504 22 4.22354 21.8978C3.18827 21.6204 2.37962 20.8117 2.10222 19.7765C2 19.395 2 18.93 2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <h5 >İşlemlerim</h5>
                </div>

                <hr />
                <ul>
                    <li onClick={() => navigate("/sifre-degistir")} className={lastPathSegment === "sifre-degistir" ? 'active-item active-edit' : ''}>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75334 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75334 2.5 12 2.5C15.8956 2.5 19.2436 4.84478 20.7095 8.2M21.5 5.5L21.025 8.675L18 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 11V9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5V11M11.25 16.5H12.75C13.9228 16.5 14.5092 16.5 14.9131 16.19C15.0171 16.1102 15.1102 16.0171 15.19 15.9131C15.5 15.5092 15.5 14.9228 15.5 13.75C15.5 12.5772 15.5 11.9908 15.19 11.5869C15.1102 11.4829 15.0171 11.3898 14.9131 11.31C14.5092 11 13.9228 11 12.75 11H11.25C10.0772 11 9.49082 11 9.08686 11.31C8.98286 11.3898 8.88977 11.4829 8.80997 11.5869C8.5 11.9908 8.5 12.5772 8.5 13.75C8.5 14.9228 8.5 15.5092 8.80997 15.9131C8.88977 16.0171 8.98286 16.1102 9.08686 16.19C9.49082 16.5 10.0772 16.5 11.25 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                            <span>Şifremi Değiştir</span>
                        </div>
                    </li>


                    <li onClick={() => navigate("/mesai-saati")} style={{ display: user?.role === ADMIN_ROLE ? "none" : "block" }} className={lastPathSegment === "mesai-saati" ? 'active-item active-edit' : ''}>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12.0078 10.5082C11.1794 10.5082 10.5078 11.1798 10.5078 12.0082C10.5078 12.8366 11.1794 13.5082 12.0078 13.5082C12.8362 13.5082 13.5078 12.8366 13.5078 12.0082C13.5078 11.1798 12.8362 10.5082 12.0078 10.5082ZM12.0078 10.5082V6.99902M15.0147 15.0198L13.0661 13.0712" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span>Mesai Saatleri</span>
                        </div>
                    </li>


                    <li onClick={() => navigate("/admin-panel")} style={{ display: user?.role === ADMIN_ROLE ? "block" : "none" }} className={lastPathSegment === "mesai-saati" ? 'active-item active-edit' : ''}>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12.0078 10.5082C11.1794 10.5082 10.5078 11.1798 10.5078 12.0082C10.5078 12.8366 11.1794 13.5082 12.0078 13.5082C12.8362 13.5082 13.5078 12.8366 13.5078 12.0082C13.5078 11.1798 12.8362 10.5082 12.0078 10.5082ZM12.0078 10.5082V6.99902M15.0147 15.0198L13.0661 13.0712" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span>Admin Panel</span>
                        </div>
                    </li>


                    <li onClick={() => handleLogout()} className={lastPathSegment === "" ? 'active-item active-edit' : ''}>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span>Çıkış Yap</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    )
}
