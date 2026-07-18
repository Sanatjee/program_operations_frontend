import React, { useEffect, useState } from 'react'
import GreetUser from '../../components/GreetUser'
import StatsCard from '../../components/StatsCard'

import dashboardStats from '../../utils/dashboardStats'
import dashboardService from '../../services/dashboardService'

const DashBoard = () => {
  const [metrics, setMetrics] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await dashboardService.getMetrics();
      setMetrics( response.data.data );
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
            metric={metrics[stats.res_key] ?? 0} 
            loading={ loading }
            />
          })
        }

        {/*/ Statistics */}
      </div>
    </div>
  )
}

export default DashBoard