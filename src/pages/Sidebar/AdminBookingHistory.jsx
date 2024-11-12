import React, { useState, useEffect } from "react";
import {
  adminGetAllBooking,
  adminGetBookingByRoom,
  adminGetBookingByDate,
} from "../../services/BookingService";
import { FaEye } from "react-icons/fa";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import ReactPaginate from "react-paginate";
import CheckIn from "../../components/CheckIn/CheckIn";
import CheckOut from "../../components/CheckOut/CheckOut";
import {
  FaWifi,
  FaCheck,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";

// Debounce Hook for Search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const AdminBookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const result = debouncedSearch
          ? await adminGetBookingByRoom(debouncedSearch, page)
          : checkInDate && checkOutDate
          ? await adminGetBookingByDate(checkInDate, checkOutDate, page)
          : await adminGetAllBooking(page);

        console.log(result);
        console.log(checkInDate);
        console.log(checkOutDate);
        setHistory(result.bookingList);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookingHistory();
  }, [page, debouncedSearch, checkInDate, checkOutDate]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <section className="p-8">
      <h2 className="font-medium text-3xl">Booking History</h2>
      <hr className="my-5" />

      <div className="flex items-center mb-6 space-x-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search booking by room ID..."
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-400 p-2 rounded-md w-[250px]"
          />
        </div>

        <div className="w-[200px] flex items-center border border-gray-400">
          <CheckIn setCheckInDate={setCheckInDate}></CheckIn>
        </div>
        <div className="w-[200px] flex items-center border border-gray-400">
          <CheckOut setCheckOutDate={setCheckOutDate}></CheckOut>
        </div>
      </div>

      {history.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          {debouncedSearch
            ? "No results found."
            : "There is no booking history."}
        </p>
      ) : (
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Room Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Room ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-in
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-out
                </th>
                <th scope="col" className="px-6 py-3">
                  Guests
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.room.roomType}</td>
                  <td className="px-6 py-4">{item.room.id}</td>
                  <td className="px-6 py-4">{item.bookingCode}</td>
                  <td className="px-6 py-4">{item.checkInDate}</td>
                  <td className="px-6 py-4">{item.checkOutDate}</td>
                  <td className="px-6 py-4">{item.totalNumOfGuest}</td>
                  <td className="px-6 py-4">{item.user.email}</td>
                  <td className="px-6 py-4">${item.room.roomPrice}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="font-medium text-indigo-500"
                        onClick={() => handleViewDetails(item)}
                      >
                        <FaEye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal hiển thị chi tiết đặt phòng */}
      {selectedBooking && (
        <ModalConfirm
          open={isModalOpen}
          onClose={handleCloseModal} // Đảm bảo đóng modal đúng cách
          title={`Booking Details - ${selectedBooking.room.roomType}`}
          message={
            <div className="text-gray-700">
              <div className="overflow-hidden w-[400px] h-[300px] my-4">
                <img
                  src={selectedBooking.room.roomPhotoUrl}
                  alt="Room"
                  className="w-full object-cover"
                />
              </div>
              <p>
                <strong>Room ID:</strong> {selectedBooking.room.id}
              </p>
              <p>
                <strong>Email:</strong> {selectedBooking.user.email}
              </p>
              <p>
                <strong>Check-in:</strong> {selectedBooking.checkInDate}
              </p>
              <p>
                <strong>Check-out:</strong> {selectedBooking.checkOutDate}
              </p>
              <p className="flex space-x-4">
                <strong>Adults:</strong> {selectedBooking.numOfAdults}{" "}
                <strong>-</strong> <strong>Children:</strong>{" "}
                {selectedBooking.numOfChildren}
              </p>
              <p>
                <strong>Booking Code:</strong> {selectedBooking.bookingCode}
              </p>
              <p>
                <strong>Price:</strong> ${selectedBooking.room.roomPrice}
              </p>
              <p>
                <strong>Facilities:</strong>
              </p>
              {/* Render facilities if they exist */}
              <div className="flex flex-wrap mt-4 ml-10">
                {selectedBooking.room?.facility ? (
                  <>
                    {selectedBooking.room.facility.drinkInfo && (
                      <div className="w-1/4 mb-8">
                        <FaCocktail
                          className="text-yellow-500 text-2xl"
                          title="Drink Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.gymInfo && (
                      <div className="w-1/4 mb-8">
                        <FaStopwatch
                          className="text-yellow-500 text-2xl"
                          title="Gym Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.breakfastInfo && (
                      <div className="w-1/4 mb-8">
                        <FaHotdog
                          className="text-yellow-500 text-2xl"
                          title="Breakfast Included"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.poolInfo && (
                      <div className="w-1/4 mb-8">
                        <FaSwimmingPool
                          className="text-yellow-500 text-2xl"
                          title="Pool Access"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.parkingInfo && (
                      <div className="w-1/4 mb-8">
                        <FaParking
                          className="text-yellow-500 text-2xl"
                          title="Parking Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.bathInfo && (
                      <div className="w-1/4 mb-8">
                        <FaBath
                          className="text-yellow-500 text-2xl"
                          title="Bath Included"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.coffeeInfo && (
                      <div className="w-1/4 mb-8">
                        <FaCoffee
                          className="text-yellow-500 text-2xl"
                          title="Coffee Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.wifiInfo && (
                      <div className="w-1/4 mb-8">
                        <FaWifi
                          className="text-yellow-500 text-2xl"
                          title="WiFi Included"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <span>No facilities</span>
                )}
              </div>
            </div>
          }
        />
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white" // Active page style
        previousClassName="page-item"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextClassName="page-item"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
        containerClassName="pagination"
      />
    </section>
  );
};

export default AdminBookingHistory;
