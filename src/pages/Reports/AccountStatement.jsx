import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../utils/exportToPdf";
import { useAccountStatement } from "../../hooks/accountStatement.hook";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import { useSearchUser } from "../../hooks/searchUser";

const AccountStatement = () => {
  const [date, setDate] = useState({
    fromDate: defaultDate(7),
    toDate: new Date(),
  });
  const { mutate: searchUser, data: searchUserData } = useSearchUser();
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const { register, handleSubmit, watch, reset } = useForm();
  const searchId = watch("searchId");
  const type = watch("type");
  const { mutate: getAccountStatement, data } = useAccountStatement();

  useEffect(() => {
    if (searchId?.length > 0) {
      searchUser({ type: searchId });
    }
  }, [searchId, searchUser]);

  const handleFormatDate = (date) => {
    setDate({
      fromDate: date[0],
      toDate: date[1],
    });
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      fromdate: moment(date?.fromDate).format("DD-MM-YYYY"),
      todate: moment(date?.toDate).format("DD-MM-YYYY"),
    };
    getAccountStatement(payload);
  };

  console.log(data);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
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
                  {searchUserData?.result?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        border: "1px solid gray",
                      }}
                    >
                      {searchUserData?.result?.map((user) => (
                        <button
                          type="button"
                          onClick={() => reset({ searchId: user })}
                          style={{
                            background: "transparent",
                            border: "none",
                          }}
                          key={user}
                        >
                          {user}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="searchByName"> Select Date Range</label>
                  <DateRangePicker
                    onChange={(date) => handleFormatDate(date)}
                    format="dd-MM-yyyy"
                    editable
                    defaultValue={[defaultDate(7), new Date()]}
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
              filename="Account Statement"
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
              onClick={() =>
                exportPdf("#account-statement", "accountStatement.pdf")
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
            id="account-statement"
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
              {data?.result?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{item?.date}</strong>
                    </td>

                    <td>
                      <strong>{item?.credit}</strong>
                    </td>
                    <td>{item?.debit}</td>
                    <td>{item?.pts}</td>
                    <td>{item?.remark}</td>
                    <td>{item?.fromto}</td>
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

export default AccountStatement;
