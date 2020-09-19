import React, { useEffect, useState } from "react";
import { cancelBooking, fetchMyBookings } from "../../service";
import { Bookingcard } from "../components/BookingCard";
import { Card, Modal } from "antd";

const tabList = [
  {
    key: "activeBookings",
    tab: "Active Bookings",
  },
  {
    key: "canceledBookings",
    tab: "Canceled Bookings",
  },
];

export function Mybookings() {
  const [fetchedMyBookings, setFetchedMyBookings] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [state, setState] = useState({
    key: "activeBookings",
    noTitleKey: "app",
  });

  const cancelSelectedBookingBooking = async (id) => {
    try {
      const token = localStorage.getItem("JWT");
      await cancelBooking(id, token);
      alert("Booking Canceled");
    } catch (error) {
      alert("Something went wrong. Please try again");
    }
  };

  const onOk = async () => {
    try {
      setVisible(false);
      await cancelSelectedBookingBooking(deleteId);
      myBookings();
    } catch (error) {}
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const contentList = {
    activeBookings: (
      <>
        {fetchedMyBookings
          ?.filter((booking) => booking.bookingStatus === "active")
          .map((booking) => (
            <Bookingcard
              bookingData={booking}
              cancelSelectedBookingBooking={showModal}
              setDeleteId={setDeleteId}
            />
          ))}
      </>
    ),
    canceledBookings: (
      <>
        {fetchedMyBookings
          ?.filter((booking) => booking.bookingStatus === "canceled")
          .map((booking) => (
            <Bookingcard
              bookingData={booking}
              cancelSelectedBookingBooking={showModal}
              setDeleteId={setDeleteId}
            />
          ))}
      </>
    ),
  };

  useEffect(() => {
    myBookings();
  }, []);

  const onTabChange = (key, type) => {
    setState({ [type]: key });
  };

  const myBookings = async () => {
    const token = localStorage.getItem("JWT");
    setFetchedMyBookings(await fetchMyBookings(token));
  };

  return (
    <>
      <>
        <Card
          style={{ width: "100%" }}
          title="All bookings"
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={state.key}
          onTabChange={(key) => {
            onTabChange(key, "key");
          }}
        >
          {contentList[state.key]}
        </Card>
        <Modal
          title="Confirmation"
          visible={visible}
          onOk={onOk}
          onCancel={handleCancel}
        >
          <p>Are you sure, you want to cancel this booking. </p>
          <p>Select ok to proceed. </p>
        </Modal>
      </>
    </>
  );
}
