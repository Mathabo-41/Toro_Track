import { useQuery } from 'react-query'
import {
  fetchProjectDetails,
  fetchProjectComments
} from './projectDetailsService'

export function useProjectDetails(projectId) {
  return useQuery(['client:projectDetails', projectId], () =>
    fetchProjectDetails(projectId)
  )
}

export function useProjectComments(projectId) {
  return useQuery(['client:projectComments', projectId], () =>
    fetchProjectComments(projectId)
  )
}
