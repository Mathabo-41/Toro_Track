// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { reportMetricsData, recentActivitiesData, adminMenuData } from '../reportsService/page';

//manage state and logic for this screen
export const useReports = () => {
  // Where we will use React Query to fetch data
  const reports = reportMetricsData;
  const activities = recentActivitiesData;
  const menu = adminMenuData;
  
  /**
   * Handles the export action for a selected format.
   * @param {string} format - The file format to export ('CSV', 'PDF').
   */
  const handleExport = (format) => {
    alert(`Downloading report in ${format} format...`);
  };

  // This is where we call the data that we are sending anf fetching from the database. We call it so that it can be displayed
  return {
    reports,
    activities,
    menu,
    handleExport,
  };
};