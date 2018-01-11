package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class InterviewSummary {
	private Date interviewDate;
	private String traineeName;
	private String EmployeeName;
	private String status;

	

	public Date getInterviewDate() {
		return interviewDate;
	}

	public void setInterviewDate(Date interviewDate) {
		this.interviewDate = interviewDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
/*
	public String getConsultancy() {
		return consultancy;
	}

	public void setConsultancy(String consultancy) {
		this.consultancy = consultancy;
	}*/

	public String getTraineeName() {
		return traineeName;
	}

	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}

	public String getEmployeeName() {
		return EmployeeName;
	}

	public void setEmployeeName(String employeeName) {
		EmployeeName = employeeName;
	}

	/*public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
*/
/*	public String getClient() {
		return client;
	}
*/


	
}