// The hook that loads metrics + activities, manages loading/error flags, and display error messages to the user interface.
import { useState, useEffect } from 'react';
import * as service from '../overviewService/page'; 

export default function useOverview() {
  const [metrics,   setMetrics]   = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading,    setLoading]    = useState({ metrics: false, activities: false });
  const [error,      setError]      = useState({ metrics: null, activities: null });

  useEffect(() => {
    setLoading((l) => ({ ...l, metrics: true }));
    service.fetchMetrics()
      .then(setMetrics)
      .catch((err) => setError((e) => ({ ...e, metrics: err })))
      .finally(() => setLoading((l) => ({ ...l, metrics: false })));

    setLoading((l) => ({ ...l, activities: true }));
    service.fetchActivities()
      .then(setActivities)
      .catch((err) => setError((e) => ({ ...e, activities: err })))
      .finally(() => setLoading((l) => ({ ...l, activities: false })));
  }, []);

  return { metrics, activities, loading, error };
}
