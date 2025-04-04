import { useBalance } from "../../hooks/balance";

const Home = () => {
  const { data } = useBalance();

  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "white";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-sm-6 col-12 mb-4">
              <a>
                <div className="card">
                  <div className="card-body text-center">
                    <h2
                      className="mb-1"
                      style={{
                        color: `${defineBalanceColor(
                          data?.downLevelCreditReferance
                        )}`,
                      }}
                    >
                      {data?.downLevelCreditReferance}
                    </h2>
                    <span className="text-muted">
                      Upper Level Credit Reference
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.downLevelOccupyBalance}</h2>
                  <span className="text-muted">Down level occupy balance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.downLevelCreditReferance}</h2>
                  <span className="text-muted">Down level Cred. Reference</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.totalMasterBalance}</h2>
                  <span className="text-muted">Total Master Balance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.upperLevel}</h2>
                  <span className="text-muted">Upper Level</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.downLevelProfitLoss}</h2>
                  <span className="text-muted">Downlevel Profit/Loss</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{data?.availableBalance}</h2>
                  <span className="text-muted">Available Balance</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2
                    style={{
                      color: `${defineBalanceColor(
                        data?.availableBalanceWithProfitLoss
                      )}`,
                    }}
                    className="mb-1"
                  >
                    {data?.availableBalanceWithProfitLoss}
                  </h2>
                  <span className="text-muted">Available Balance with P/L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
