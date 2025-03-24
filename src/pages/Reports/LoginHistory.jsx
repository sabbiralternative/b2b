import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../utils/exportToPdf";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import { useSearchUser } from "../../hooks/searchUser";
import { useUserHistory } from "../../hooks/userHistory";

const LoginHistory = () => {
  const [date, setDate] = useState({
    fromDate: defaultDate(7),
    toDate: new Date(),
  });
  const { mutate: searchUser, data: searchUserData } = useSearchUser();
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const { register, handleSubmit, watch, reset } = useForm();
  const searchId = watch("searchId");
  const { mutate, data } = useUserHistory();

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
      type: "login",
      fromdate: moment(date?.fromDate).format("DD-MM-YYYY"),
      todate: moment(date?.toDate).format("DD-MM-YYYY"),
    };
    mutate(payload);
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
          <h5>Login History</h5>
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
                <th>Username</th>
                <th>Date</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.result?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{item?.username}</strong>
                    </td>

                    <td>
                      <strong>{item?.date}</strong>
                    </td>
                    <td>{item?.ip}</td>
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

export default LoginHistory;
