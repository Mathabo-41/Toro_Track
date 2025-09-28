// This file handles all data-related tasks for this feature by calling database functions.
import { createSupabaseClient } from '@/lib/supabase/client';

export const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

/*
* Fetches audit trail data by calling the 'get_audit_trail_data' RPC function.
*/
export const getAuditTrailData = async () => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('get_audit_trail_data');

    if (error) {
        console.error('Error fetching audit trail data:', error);
        return [];
    }
    
    return data.map(log => ({
        ...log,
        timestamp: new Date(log.timestamp).toLocaleString()
    }));
};

/*
* Creates a new asset and audit log entry by calling the 'add_asset_and_log' RPC function.
*/
export const createAuditLogEntry = async (newLog) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('add_asset_and_log', {
        p_order_sign_off: newLog.signOff,
        p_delivery_status: newLog.status,
        p_order_receiver: newLog.receiver,
        p_asset_serial_number: newLog.serial,
        p_asset_type: newLog.type
    });

    if (error) {
        console.error('Error creating audit log entry:', error);
        return null;
    }

    return data;
};

/*
* Updates an existing audit log entry by calling the 'update_audit_log' RPC function.
*/
export const updateAuditLogEntry = async (updatedLog) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('update_audit_log', {
        p_log_id: updatedLog.id,
        p_sign_off: updatedLog.signOff,
        p_receiver: updatedLog.receiver,
        p_status: updatedLog.status,
        p_serial_number: updatedLog.serial
    });

    if (error) {
        console.error('Error updating audit log entry:', error);
        return null;
    }

    return data;
};

/*
* Deletes an audit log entry by calling the 'delete_audit_log' RPC function.
*/
export const deleteAuditLogEntry = async (logId) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('delete_audit_log', {
        p_log_id: logId
    });

    if (error) {
        console.error('Error deleting audit log entry:', error);
        return null;
    }

    return data;
};

/*
* Uploads a document to the 'asset_documents' storage bucket.
*/
export const uploadDocument = async (file) => {
    const supabase = createSupabaseClient();
    const filePath = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('asset_documents')
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading document:', error);
        return null;
    }

    return data.path;
};

/*
* Creates a database record for an uploaded document.
*/
export const addDocumentRecord = async (logId, docData) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('add_asset_document', {
        p_log_id: logId,
        p_doc_name: docData.name,
        p_doc_url: docData.url,
        p_doc_type: docData.type
    });

    if (error) {
        console.error('Error adding document record:', error);
        return null;
    }

    return data;
};