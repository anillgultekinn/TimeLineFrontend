import { Route, Routes } from "react-router-dom"

import LoginRegister from "../../pages/LoginRegister/LoginRegister";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../../pages/HomePage/HomePage";
import WorkHour from "../../pages/WorkHour/WorkHour";
type Props = {}

const RouteDefinitions = (props: Props) => {
    return (
        <Routes>
            <Route path="/" Component={LoginRegister} />
            <Route path="/sifre-degistir" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/mesai-saati" element={<ProtectedRoute><WorkHour /></ProtectedRoute>} />
            <Route path="/anasayfa" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            {/* <Route path="/mesai-saati" Component={WorkHour} /> */}
            {/* <Route path="/sifre-degistir" element={<><ChangePassword /></>} /> */}
            {/* <Route path="/anasayfa" Component={HomePage} /> */}

        </Routes>
    )
}
export default RouteDefinitions;