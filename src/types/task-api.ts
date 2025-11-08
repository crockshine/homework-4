import type {paths} from './api.ts'

// tasks
// get
export type FetchTasksQueryParams = paths['/tasks']['get']['parameters']['query']

// post
export type CreateTaskRequestBody = paths['/tasks']['post']['requestBody']['content']['application/json']

// tasks/id
// get
export type FetchTaskParams = paths['/tasks/{id}']['get']['parameters']['path']

// delete
export type DeleteTaskParams = paths['/tasks/{id}']['delete']['parameters']['path']

// patch
export type PatchTaskParams = paths['/tasks/{id}']['patch']['parameters']['path']
export type PatchTaskRequestBody = paths['/tasks/{id}']['patch']['requestBody']['content']['application/json']

