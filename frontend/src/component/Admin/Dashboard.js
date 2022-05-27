import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import html2canvas from "html2canvas"
import saveAs from 'file-saver'


const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products && products.forEach((item) => {
    if (item.Stock === 0) { outOfStock += 1; }
  });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    if (item.orderStatus === "Delivered" || item.paymentInfo.status === "COMPLETED") {
      totalAmount += item.totalPrice;
    }
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["#837777"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: products.map(product => product.name),
    datasets: [
      {
        backgroundColor: ["#2B2B2B","#6D5E5E","#C4C4C4","#E8E5E5"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: products.map(product => product.Stock),
      },
    ],
  };

  const submit = (id) => {
    html2canvas(document.getElementById("capture")).then(function (canvas) {
      const image = canvas.toDataURL("image/jpeg", 0.9);
      console.log(image)
      const dataURI = image;
      saveAs(dataURI, 'Report.png');
    });
  }
  return (
    <div id="capture" className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div id="capture" className="dashboardContainer">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₱{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Bar data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        <button className="buttonDownload" onClick={submit}>Screenshot</button>
      </div>
    </div>
  );
};

export default Dashboard;
