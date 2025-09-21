"use client";
// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
import { useState, useEffect } from 'react';
import * as service from '../overviewService/page'; 

//manage state and logic for this screen
export default function useOverview() {
  const [metrics,   setMetrics]   = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading,    setLoading]    = useState({ metrics: false, activities: false });
  const [error,      setError]      = useState({ metrics: null, activities: null });

  // Where we will use React Query to fetch data from database
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
