import { Service } from "./service";
import type { APIResponse } from "@/models/APIResponse";
import type { UpdateCompanyRequest, UpdateCompanyResponse } from "@/models/companies";

class CompaniesService extends Service {
  updateCompanyById(id: string, data: UpdateCompanyRequest): Promise<APIResponse<UpdateCompanyResponse>> {
    return this.client.put(`/${id}`, { json: data }).json();
  }
}

export const companiesService = new CompaniesService("/api/companies")
