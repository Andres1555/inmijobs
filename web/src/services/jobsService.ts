import { Service } from "./service";
import type { Job, UpdateJobRequest } from "@/models/jobs";
import type { APIResponse } from "@/models/APIResponse";
import type { CompanyApplication, CreateApplicationRequest, CreateApplicationResponse } from "@/models/applications";

class JobsService extends Service {
  getJobs(): Promise<APIResponse<Array<Job>>> {
    return this.client.get("").json();
  }

  getJobById(id: string): Promise<APIResponse<Job>> {
    return this.client.get(`/${id}`).json();
  }

  updateJobById(id: string, data: UpdateJobRequest): Promise<APIResponse<Job>> {
    return this.client.put(`/${id}`, { json: data }).json();
  }

  deleteJobById(id: string): Promise<APIResponse<Job>> {
    return this.client.delete(`/${id}`).json();
  }

  applyToJob(id: string, data: CreateApplicationRequest): Promise<APIResponse<CreateApplicationResponse>> {
    return this.client.post(`/${id}/applications`, { json: data }).json();
  }

  getApplicationsForJob(id: string): Promise<APIResponse<Array<CompanyApplication>>> {
    return this.client.get(`/${id}/applications`).json();
  }
}

export const jobsService = new JobsService("/api/jobs")
