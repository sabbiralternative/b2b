import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../utils/exportToPdf";
import { useCurrentBets } from "../../hooks/currentBets";

const CurrentSportsBets = () => {
  const [filterData, setFilterData] = useState([]);
  const [filterBetsType, setFilterBetsType] = useState("all");
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const { handleSubmit } = useForm();

  const { mutate: getCurrentBets, data } = useCurrentBets();

  const onSubmit = () => {
    const payload = {
      type: "sports",
    };
    getCurrentBets(payload);
  };

  useEffect(() => {
    if (data?.result?.length > 0) {
      if (filterBetsType !== "all" && filterBetsType !== "") {
        const filterLayBack = data?.result?.filter(
          (game) => game.betType === filterBetsType
        );
        setFilterData(filterLayBack);
      } else if (filterBetsType === "all") {
        setFilterData(data?.result);
      }
    }
  }, [filterBetsType, data]);

  let totalAmount = 0;
  if (data?.result?.length > 0) {
    for (const sport of data.result) {
      totalAmount = totalAmount + sport?.amount;
    }
  }

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
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
                className="col-md-12 fv-plugins-icon-container"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                  }}
                >
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      onClick={(e) => setFilterBetsType(e.target.value)}
                      type="radio"
                      id="soda-all"
                      name="bettype"
                      value="all"
                      className="custom-control-input"
                      style={{ cursor: "pointer" }}
                    />
                    <label htmlFor="soda-all" className="custom-control-label">
                      All
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      onClick={(e) => setFilterBetsType(e.target.value)}
                      type="radio"
                      id="soda-back"
                      name="bettype"
                      value="Back"
                      className="custom-control-input"
                      style={{ cursor: "pointer" }}
                    />
                    <label htmlFor="soda-back" className="custom-control-label">
                      Back
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      onClick={(e) => setFilterBetsType(e.target.value)}
                      type="radio"
                      id="soda-lay"
                      name="bettype"
                      value="Lay"
                      className="custom-control-input"
                    />
                    <label htmlFor="soda-lay" className="custom-control-label">
                      Lay
                    </label>
                  </div>
                </div>
                <h5>
                  Total Soda: <span className="mr-2">{filterData?.length}</span>{" "}
                  Total Amount: <span>{totalAmount?.toFixed(2)}</span>
                </h5>
              </div>

              <div className="col-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Load"
                />
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
          <h5>Current Sports Bets</h5>
          <div className="d-inline-block mr-2">
            <DownloadTableExcel
              filename="Current Sports Bets"
              sheet="Current Sports Bets"
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
                exportPdf("#current-sports-bets", "current-sports-bets.pdf")
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
            id="current-sports-bets"
            ref={tableRef}
            className="table table-hover table-sm"
          >
            <thead>
              <tr>
                <th>Type</th>
                <th>Event Name</th>
                <th>User Name</th>
                <th>M Name</th>
                <th>Nation</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Place Date</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {filterData?.map((item, i) => {
                return (
                  <tr
                    className={`${item?.betType === "Lay" ? "lay" : "back"}`}
                    key={i}
                  >
                    <td>
                      <strong>{item?.sports}</strong>
                    </td>

                    <td>
                      <strong>{item?.eventName}</strong>
                    </td>
                    <td>{item?.username}</td>
                    <td>{item?.marketName}</td>
                    <td>{item?.nation}</td>
                    <td>{item?.userRate}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.placeDate}</td>
                    <td>{item?.ipAddress}</td>
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

export default CurrentSportsBets;
