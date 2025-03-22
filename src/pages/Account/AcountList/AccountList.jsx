import { useForm } from "react-hook-form";
import useDownLine from "../../../hooks/downLine";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../../utils/exportToPdf";

const AccountList = () => {
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user = params.get("user");
  const { register, handleSubmit, watch, reset } = useForm();
  const searchId = watch("searchId");
  const { mutate: handleSearchUser, data } = useDownLine();

  const searchDownLine = () => {
    const payload = { downlineId: "", searchId: searchId || "" };
    if (user) {
      payload.downlineId = user;
    }
    handleSearchUser(payload);
  };

  useEffect(() => {
    const payload = { downlineId: "", searchId: searchId || "" };
    if (user) {
      payload.downlineId = user;
    }
    console.log(payload);
    handleSearchUser(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSearchUser]);

  const handleOpenUserNewTab = (downLine) => {
    if (downLine.hasDownline) {
      reset();
      window.open(`?user=${downLine?.username}`, "_blank");
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleSubmit(searchDownLine)}
            >
              <div className="col-md-6 fv-plugins-icon-container">
                <input
                  {...register("searchId")}
                  type="text"
                  className="form-control"
                  placeholder="Search User"
                  value={searchId}
                />
                <div className="fv-plugins-message-container invalid-feedback"></div>
              </div>

              <div className="col-12">
                <input
                  disabled={searchId?.length < 2}
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
                <button
                  onClick={() => reset()}
                  style={{ marginLeft: "3px" }}
                  className="btn btn-primary"
                  type="button"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>All Clients</h5>
          <div className="d-inline-block mr-2">
            <DownloadTableExcel
              filename="Account List"
              sheet="Account"
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
              onClick={() => exportPdf("#account-list", "accountList.pdf")}
              type="button"
              className="btn btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-file-pdf"></i>
            </button>

            <Link
              to="/create-account"
              className="btn btn-success  btn-sm "
              style={{ marginLeft: "5px" }}
            >
              <i aria-hidden="true" className="fa fa-plus"></i>CREATE ACCOUNT
            </Link>
          </div>
        </div>

        <div className="table-responsive text-nowrap">
          <table
            id="account-list"
            ref={tableRef}
            className="table table-hover table-sm"
          >
            <thead>
              <tr>
                <th>User Name</th>
                <th>CR</th>
                <th>Pts</th>
                <th>Client(p/l)</th>
                <th>Exposure</th>
                <th>available pts</th>
                <th>b st</th>
                <th>u st</th>
                <th>pname</th>
                <th>account type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.map((downLine, i) => {
                return (
                  <tr key={i}>
                    <td
                      onClick={() => handleOpenUserNewTab(downLine)}
                      style={{
                        cursor: downLine?.hasDownline ? "pointer" : "default",
                      }}
                    >
                      <strong>{downLine?.username}</strong>
                    </td>

                    <td>
                      <strong>{downLine?.creditReferance}</strong>
                    </td>
                    <td>{downLine?.balance}</td>
                    <td>{downLine?.pnl}</td>
                    <td>{downLine?.exposure}</td>
                    <td>{downLine?.availableBalance}</td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          downLine?.bettingStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {downLine?.bettingStatus === 1 ? "Active" : "InActive"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          downLine?.userStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {downLine?.userStatus === 1 ? "Active" : "InActive"}
                      </span>
                    </td>
                    <td>{downLine?.pt}</td>
                    <td>{downLine?.accountType}</td>
                    <td style={{ display: "flex", gap: "2px" }}>
                      <a
                        style={{ color: "white" }}
                        className="btn btn-icon btn-sm btn-warning"
                      >
                        CR
                      </a>

                      <a
                        style={{ color: "white" }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        C
                      </a>
                      <a
                        style={{ color: "white" }}
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        W
                      </a>
                      <a
                        style={{ color: "white" }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        M
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
