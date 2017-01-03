package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class InterviewSummary {
	private Date interview_date;
	private String traineeName;
	private String supported_By;
	private String status;

	

	public Date getInterview_date() {
		return interview_date;
	}

	public void setInterview_date(Date interview_date) {
		this.interview_date = interview_date;
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
	public String getSupported_By() {
		return supported_By;
	}

	public void setSupported_By(String supported_By) {
		this.supported_By = supported_By;
	}

	
}