import { useForm } from "react-hook-form";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { handleExportToPDF } from "../../utils/exportToPdf";
import { usePartyWinLoss } from "../../hooks/partyWinLoss";

const PartyWinLoss = () => {
  const { exportPdf } = handleExportToPDF();
  const tableRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const { mutate, data } = usePartyWinLoss();

  const onSubmit = (data) => {
    mutate(data);
  };

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
                className="col-md-2 fv-plugins-icon-container"
              >
                <div style={{ width: "100%" }}>
                  <select
                    {...register("type", { required: true })}
                    className="form-control"
                  >
                    <option value="all">All</option>
                    <option value="user">User</option>
                  </select>
                </div>
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
          <h5>Party Win Loss</h5>
          <div className="d-inline-block mr-2">
            <DownloadTableExcel
              filename="Party Win Loss"
              sheet="Party Win Loss"
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
              onClick={() => exportPdf("#party-win-loss", "party-win-loss.pdf")}
              type="button"
              className="btn btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-file-pdf"></i>
            </button>
          </div>
        </div>

        <div className="table-responsive text-nowrap">
          <table
            id="party-win-loss"
            ref={tableRef}
            className="table table-hover table-sm"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
                <th>Level</th>
                <th>Casino Pts</th>
                <th>Sport Pts</th>
                <th>Third Party Pts</th>
                <th>Profit/Loss</th>
                <th>Ptype</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.result?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item?.username}</td>
                    <td>{item?.level}</td>
                    <td>{item?.casinoPTS}</td>
                    <td>{item?.sportPTS}</td>
                    <td>{item?.thirdPartyPTS}</td>
                    <td>{item?.profitLoss}</td>
                    <td>{item?.ptype}</td>
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

export default PartyWinLoss;
