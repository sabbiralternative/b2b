import { DownloadTableExcel } from "react-export-table-to-excel";
import { useDownLineEditForm } from "../../../hooks/downLineEditForm";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { handleExportToPDF } from "../../../utils/exportToPdf";

const AccountHistory = () => {
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = params.get("userName");
  const { data } = useDownLineEditForm({
    downlineId: userName,
    type: "accountHistory",
  });

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>Account History</h5>
          <div className="d-inline-block mr-2">
            <DownloadTableExcel
              filename="Account History"
              sheet="Account History"
              currentTableRef={tableRef.current}
            >
              <button
                title="Export To Excel"
                type="button"
                className="btn mr-1 btn-success btn-icon btn-sm"
              >
                <i className="fas fa-file-excel"></i>
              </button>
            </DownloadTableExcel>

            <button
              title="Export To PDF"
              onClick={() =>
                exportPdf("#account-history", "account-history.pdf")
              }
              type="button"
              className="btn btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-file-pdf"></i>
            </button>
          </div>
        </div>

        <div className="table-responsive text-nowrap">
          <table
            id="user-authentication"
            ref={tableRef}
            className="table table-hover table-sm"
          >
            <thead>
              <tr>
                <th>Super User</th>
                <th>User</th>
                <th>Transfer From</th>
                <th>Amount </th>
                <th>Date </th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.result?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item?.superUser}</td>
                    <td>{item?.user}</td>
                    <td>{item?.transferFrom}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.date}</td>
                  </tr>
                );
              })}
              {data?.result?.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={12}>
                    <strong>There are no records to show</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;
