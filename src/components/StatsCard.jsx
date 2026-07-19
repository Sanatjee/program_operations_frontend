import React from 'react';

const StatsCard = ({ title, metric, symbol }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body py-3 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted d-block mb-1">
                {title}
              </small>

              <h4 className="mb-0 fw-bold">
                {symbol} {metric}
              </h4>
            </div>

            <div
              className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
                fontSize: "20px",
              }}
            >
              📊
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;