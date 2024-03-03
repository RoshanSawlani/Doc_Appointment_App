import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    // handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/get-all-notification",
                {
                    userId: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong in notification")
        }
    };

    const items = [
        {
            label: 'unRead', key: 0, children: (
                <> <div className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                    <h4 onClick={handleMarkAllRead}>Mark All Read</h4>
                    {user?.notification.map((notificationMgs) => (
                        <div className="card" style={{ cursor: "pointer" }} key={notificationMgs.key}>
                            <div
                                className="card-text"
                                onClick={() => navigate(notificationMgs.onClickPath)}
                            >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )
        },
        {
            label: 'Read',
            key: 1,
            children: (
                <><div className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                    <h4 className="p-2 text-primary" onClick={handleDeleteAllRead}>
                        Delete All Read
                    </h4>
                    {user?.seennotification.map((notificationMgs) => (
                        <div className="card" style={{ cursor: "pointer" }} key={notificationMgs.key}>
                            <div
                                className="card-text"
                                onClick={() => navigate(notificationMgs.onClickPath)}
                            >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))}
                </div>
                </>
            ),
        },
    ];

    return (
        <Layout>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs items={items} />
        </Layout>
    );
};

export default NotificationPage;
