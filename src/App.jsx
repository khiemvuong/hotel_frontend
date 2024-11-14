import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import RoomPage from "./pages/RoomPage/RoomPage";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Sidebar/Dashboard";
import DashboardLayout from "./components/Layout/DashBoardLayout";
import UserList from "./pages/Sidebar/UserList";
import UserProfile from "./pages/Sidebar/UserProfile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AdminRoomList from "./components/AdminRoomList/AdminRoomList";
import PrivateRoute from "./admin/PrivateRoute";
import PublicRoute from "./public/PublicRoute"; // Import PublicRoute
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"; // Import NotFoundPage
import AddRoom from "./pages/Sidebar/AddRoom";
import AdminBookingHistory from "./pages/Sidebar/AdminBookingHistory";
import Report from "./pages/Sidebar/Report";
import DiscountEvents from "./pages/Sidebar/DiscountEvents";
import Contact from "./pages/Contact/Contact";
import RecentBooking from "./pages/Sidebar/RecentBooking";
import BookingHistory from "./pages/Sidebar/BookingHistory";
import UpdateRoom from "./components/UpdateRoom/updateRoom";
import ViewRoom from "./components/ViewRoom/viewRoom";
import RoomById from "./pages/Sidebar/RoomById";
import BookingByUserId from "./pages/Sidebar/BookingByUserId";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Các route khác */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* Route cho RoomPage và RoomDetails */}
        <Route
          path="rooms"
          element={
            <PrivateRoute>
              <Layout>
                <RoomPage />
              </Layout>
            </PrivateRoute>
          }
        >
          <Route path=":id" element={<RoomDetails />} />
        </Route>

        {/* Route cho Login và Register */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Route cho Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/recent-booking"
          element={
            <PrivateRoute userOnly={true}>
              <DashboardLayout>
                <RecentBooking />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/booking-history"
          element={
            <PrivateRoute userOnly={true}>
              <DashboardLayout>
                <BookingHistory />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho Profile */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho Admin */}
        <Route
          path="/admin/userlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <UserList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/userlist/booking/:id"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <BookingByUserId />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/roomlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AdminRoomList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/roomlist/booking/:id"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <RoomById />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/booking-history"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AdminBookingHistory></AdminBookingHistory>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/addroom"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AddRoom />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/updateRoom/:roomId"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <UpdateRoom />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/viewRoom"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <ViewRoom />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/report"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <Report />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <DiscountEvents />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho 404 - Bất kỳ đường dẫn nào không khớp */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
