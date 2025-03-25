import { Link } from "react-router-dom";
import useMarketAnalysis from "../../hooks/marketAnalysis";
const MarketAnalysis = () => {
  const { data, refetch, isFetching } = useMarketAnalysis();

  const refetchMarketAnalysisData = () => {
    refetch();
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div data-v-b00d14ae="">
        <div data-v-b00d14ae="" className="market-analysis">
          <div style={{ marginBottom: "20px" }} className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">
                  Market Analysis
                  <a
                    onClick={refetchMarketAnalysisData}
                    title="Refresh Data"
                    className="text-dark pl-2"
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  >
                    <i
                      className={`fa fa-sync ${isFetching ? "fa-spin" : ""}`}
                    ></i>
                  </a>
                </h4>
                <div className="page-title-right">
                  <input
                    type="text"
                    name="searchMarktetText"
                    placeholder="Search Event"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          {data?.result?.length > 0 &&
            data?.result?.map((data, i) => {
              return (
                <div
                  style={{
                    boxShadow: "0 0 5px",
                    marginBottom: "10px",
                  }}
                  key={i}
                  className="market-analysis-container"
                >
                  <div className="market-analysis-container">
                    <div
                      style={{
                        backgroundColor: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 5px",
                      }}
                      className="market-analysis-title"
                    >
                      <div>
                        <Link
                          to={`/game-details/${data?.eventTypeId}/${data?.eventId}`}
                          className="ma-link"
                        >
                          {data?.eventName}
                        </Link>
                      </div>
                      <div>{data?.eventDate}</div>
                    </div>
                    <div className="market-analysis-content">
                      <div className="row row5">
                        <div className="col-lg-4">
                          <div>
                            <div
                              className="simplebar-wrapper"
                              style={{ margin: "0px" }}
                            >
                              <div style={{ right: "0px", bottom: "0px" }}>
                                <div
                                  className="simplebar-content-wrapper"
                                  tabIndex="0"
                                  role="region"
                                  aria-label="scrollable content"
                                  style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div
                                    className="simplebar-content"
                                    style={{ padding: "0px" }}
                                  >
                                    <table className="table">
                                      <tbody>
                                        {data?.markets?.map(
                                          ({ marketName, amount }, i) => {
                                            return (
                                              <tr
                                                style={{
                                                  backgroundColor: "#e1e1e1",
                                                  color: "black",
                                                }}
                                                key={i}
                                              >
                                                <td>{marketName}</td>
                                                <td className="text-right">
                                                  {amount}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
