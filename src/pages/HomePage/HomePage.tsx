import React from 'react'
import SideProfileMenu from '../../components/SideProfileMenu/SideProfileMenu'

export default function HomePage() {
    return (
        <div className='homepage container'>

            <div className="row">

                <div className="col-md-3 mt-5">
                    <SideProfileMenu />
                </div>
                <div className="col-md-9 mt-5">

                </div>

            </div>
        </div>
    )
}
