import axios from 'axios';
import { useState,useEffect,Fragment } from 'react'; 
import "./productList.css";
import './audit.css';
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";

const Audit = () => {

    const [audits,setAudits] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchAudits = async() => {
            try {
                const data = await axios.get('/api/v1/admin/audit',{ signal:abortCont.signal });
                setAudits(data.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchAudits();

        return () => abortCont.abort();
    },[audits])

    const columns = [
        { 
          field: "id", 
          headerName: "ID", 
          minWidth: 100, 
          flex: 0.5 
        },
        {
          field: "email",
          headerName: "Email",
          minWidth: 150,
          flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            flex: 1,
          },
        {
          field: "time",
          headerName: "Time",
          type: "string",
          minWidth: 150,
          flex: 0.3,
        },
        {
          field: "date",
          headerName: "Date",
          type: "number",
          minWidth: 100,
          flex: 0.5,
        }
    ]
    const rows = [];

  audits &&
    audits.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.name,
        time: item.action_time,
        date: item.action_date,
        action: item.user_action
      });
    });

  return (
    <Fragment>
    <MetaData title={`Audits - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">AUDITS</h1>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
        />
        
      </div>
    </div>
  </Fragment>
  )
}

export default Audit