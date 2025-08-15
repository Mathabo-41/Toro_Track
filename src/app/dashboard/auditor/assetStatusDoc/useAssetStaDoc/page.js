import { useQuery } from 'react-query'
import {
  fetchAssetStatus,
  fetchDocuments,
  fetchDigitalSignatures
} from './assetStaDocService'

export const useAssetStatus = () =>
  useQuery('auditor:assetStatus', fetchAssetStatus)

export const useDocuments = () =>
  useQuery('auditor:documents', fetchDocuments)

export const useDigitalSignatures = () =>
  useQuery('auditor:signatures', fetchDigitalSignatures)
