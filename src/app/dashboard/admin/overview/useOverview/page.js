"use client";
// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
import { useState, useEffect, useCallback } from 'react';
import * as service from '../overviewService/page';

//manage state and logic for this screen
export default function useOverview() {
  const [metrics, setMetrics] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState({ metrics: false, queries: false });
  const [error, setError] = useState({ metrics: null, queries: null });

  const fetchAllData = useCallback(async () => {
    setLoading({ metrics: true, queries: true });
    try {
      const [metricsData, queriesData] = await Promise.all([
        service.fetchMetrics(),
        service.fetchQueries()
      ]);
      setMetrics(metricsData);
      setQueries(queriesData || []);
    } catch (err) {
      console.error("Failed to fetch overview data:", err);
      setError({ metrics: err, queries: err });
    } finally {
      setLoading({ metrics: false, queries: false });
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleResponseSubmit = async (queryId, responseText) => {
    try {
      await service.postQueryResponse(queryId, responseText);
      // Refetch queries to show the new response and updated status
      await fetchAllData();
    } catch (err) {
      setError((e) => ({ ...e, queries: err }));
    }
  };

  return { metrics, queries, loading, error, handleResponseSubmit };
}