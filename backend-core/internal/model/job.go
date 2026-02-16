package model

type Job struct {
    ID             string
    Title          string
    Description    string
    Location       string
    SalaryMin      *int     
    SalaryMax      *int    
    EmploymentType string   
    IsActive       bool
    CompanyID      string
    Company        Company
    Applications   []Application
}
