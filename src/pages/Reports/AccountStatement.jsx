import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../utils/exportToPdf";
import { useAccountStatement } from "../../hooks/accountStatement.hook";
import { DateRangePicker } from "rsuite";

const AccountStatement = () => {
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user = params.get("user");
  const { register, handleSubmit, watch, reset } = useForm();
  const searchId = watch("searchId");
  const type = watch("type");
  const { mutate: getAccountStatement, data } = useAccountStatement();

  console.log(type);

  const searchDownLine = () => {
    const payload = { downlineId: "", searchId: searchId || "" };
    if (user) {
      payload.downlineId = user;
    }
    getAccountStatement(payload);
  };

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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                className="col-md-12 fv-plugins-icon-container"
              >
                <div>
                  <label htmlFor="searchByName"> Search By Name</label>
                  <input
                    {...register("searchId")}
                    type="text"
                    className="form-control"
                    placeholder="Search User"
                    value={searchId}
                  />
                </div>
                <div>
                  <label htmlFor="searchByName"> Select Date Range</label>
                  <DateRangePicker
                    format="dd-MM-yyyy"
                    editable
                    defaultValue={[
                      new Date(new Date().setDate(new Date().getDate() - 7)),
                      new Date(),
                    ]}
                    block
                  />
                </div>
                <div>
                  <label htmlFor="searchByName"> Type</label>
                  <select {...register("type")} className="form-control" id="">
                    <option value="1">All</option>
                    <option value="2">Deposit/Withdraw Report</option>
                    <option value="3">Game Report</option>
                  </select>
                </div>
                {type === "2" && (
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Statement</label>
                      <select
                        className="form-control"
                        {...register("statement")}
                      >
                        <option value="all">All</option>
                        <option value="allcredit">Credit - All</option>
                        <option value="creditupper">Credit - Upper</option>
                        <option value="creditdown">Credit - Down</option>
                        <option value="allbalance">Pts - All</option>
                        <option value="balanceupper">Pts - Upper</option>
                        <option value="balancedown">Pts - Down</option>
                      </select>
                    </div>
                  </div>
                )}
                {type === "3" && (
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Statement</label>{" "}
                      <select
                        {...register("statement")}
                        className="form-control"
                      >
                        <option value="all">All</option>{" "}
                        <option value="sport">Sports</option>{" "}
                        <option value="casino">Casino</option>
                      </select>
                    </div>
                  </div>
                )}
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
                <th>Date</th>
                <th>Sr No</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Pts</th>
                <th>Remark</th>
                <th>FromTo</th>
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

export default AccountStatement;
