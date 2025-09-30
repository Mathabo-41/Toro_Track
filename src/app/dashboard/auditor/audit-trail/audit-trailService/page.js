// This file handles all data-related tasks for the audit trail feature.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
 * Menu for the auditor dashboard navigation
 */
export const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

/*
 * Fetches all audit trail data using the 'get_audit_trail_data' RPC function.
 * Returns an array of logs with formatted timestamps.
 */
export const getAuditTrailData = async () => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.rpc('get_audit_trail_data');
    if (error) throw error;

    return data.map(log => ({
      ...log,
      timestamp: new Date(log.timestamp).toLocaleString()
    }));
  } catch (err) {
    console.error('Error fetching audit trail data:', err);
    throw new Error(err.message || 'Unable to fetch audit trail data.');
  }
};

/*
 * Creates a new audit log entry using the 'add_asset_and_log' RPC function.
 * Returns the inserted data on success.
 */
export const createAuditLogEntry = async (newLog) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.rpc('add_asset_and_log', {
      p_order_sign_off: newLog.signOff,
      p_delivery_status: newLog.status,
      p_order_receiver: newLog.receiver,
      p_asset_serial_number: newLog.serial,
      p_asset_type: newLog.type
    });

    if (error) {
      // Log full error object for debugging
      console.error('Supabase RPC error:', JSON.stringify(error, null, 2));
      throw new Error(error.message || JSON.stringify(error));
    }

    return data;
  } catch (err) {
    // If err is a Supabase object without message, log entire object
    console.error('Error creating audit log entry:', err);
    throw new Error(err.message || JSON.stringify(err) || 'Failed to create audit log entry.');
  }
};


/*
 * Updates an existing audit log entry using the 'update_audit_log' RPC function.
 * Returns the updated record on success.
 */
export const updateAuditLogEntry = async (updatedLog) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.rpc('update_audit_log', {
      p_log_id: updatedLog.id,
      p_sign_off: updatedLog.signOff,
      p_receiver: updatedLog.receiver,
      p_status: updatedLog.status,
      p_serial_number: updatedLog.serial
    });

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Error updating audit log entry:', err);
    throw new Error(err.message || 'Failed to update audit log entry.');
  }
};

/*
 * Deletes an audit log entry using the 'delete_audit_log' RPC function.
 * Returns the deleted record or a success confirmation.
 */
export const deleteAuditLogEntry = async (logId) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.rpc('delete_audit_log', { p_log_id: logId });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error deleting audit log entry:', err);
    throw new Error(err.message || 'Failed to delete audit log entry.');
  }
};

/*
 * Uploads a document to the 'asset_documents' storage bucket.
 * Returns the storage path of the uploaded file.
 */
export const uploadDocument = async (file) => {
  const supabase = createSupabaseClient();
  try {
    const filePath = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('asset_documents').upload(filePath, file);
    if (error) throw error;

    return data.path;
  } catch (err) {
    console.error('Error uploading document:', err);
    throw new Error(err.message || 'Failed to upload document.');
  }
};

/*
 * Creates a database record for an uploaded document using the 'add_asset_document' RPC function.
 * Returns the record on success.
 */
export const addDocumentRecord = async (logId, docData) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase.rpc('add_asset_document', {
      p_log_id: logId,
      p_doc_name: docData.name,
      p_doc_url: docData.url,
      p_doc_type: docData.type
    });
    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Error adding document record:', err);
    throw new Error(err.message || 'Failed to add document record.');
  }
};
