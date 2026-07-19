import React, { useEffect, useState } from 'react'
import GreetUser from '../../components/GreetUser'
import StatsCard from '../../components/StatsCard'

import dashboardStats from '../../utils/dashboardStats'
import dashboardService from '../../services/dashboardService'
import MonthlyRegistrationChart from '../../components/MonthlyRegistrationChart'
import ProgramRegistrationChart from '../../components/ProgramRegistrationChart '
import MonthlyRevenueChart from '../../components/MonthlyRevenueChart'
import PaymentStatusChart from '../../components/PaymentStatusChart'
import UpcomingProgramsTable from '../../components/UpcomingProgramsTable'

const DashBoard = () => {
  const [metrics, setMetrics] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await dashboardService.getMetrics();
      console.log(response);
      console.log(response.data.data.monthly_registrations);
      setMetrics(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-xxl-12 mb-6 order-0">
          <GreetUser />
        </div>

      </div>
      <div className="row">
        {/* Statistics */}
        {
          dashboardStats.map((stats) => {
            return <StatsCard
              key={stats.res_key}
              title={stats.title}
              symbol={stats?.symbol}
              metric={metrics[stats.res_key] ?? 0}
              loading={loading}
            />
          })
        }

        {/*/ Statistics */}
      </div>
      <div className="row mt-4">

        <div className="col-lg-6 mb-4">
          <ProgramRegistrationChart
            data={metrics.program_wise_registrations ?? []}
          />

        </div>

        <div className="col-lg-6 mb-4">
          <MonthlyRevenueChart
            data={metrics.monthly_revenue_collection ?? []}
          />


        </div>
        <div className="row mt-4">
          <div className="col-lg-6 mb-4">
            <MonthlyRegistrationChart
              data={metrics.monthly_registrations ?? []}
            />
          </div>

          <div className="col-lg-6 mb-4">
            <PaymentStatusChart
              data={
                metrics.payment_status_distribution ?? {}
              }
            />
          </div>
        </div>
        <div className="row mt-4">

          <div className="col-12">

            <UpcomingProgramsTable
              programs={metrics.upcoming_programs || []}
            />

          </div>

        </div>
      </div>
    </div>
  )
}

export default DashBoard