package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class InterviewSummary {
	private Date interviewDate;
	private String status;
	private String consultancyName;
	private String traineeName;
	private String employeeName;
	private String client;

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

	public String getConsultancyName() {
		return consultancyName;
	}

	public void setConsultancyName(String consultancyName) {
		this.consultancyName = consultancyName;
	}

	public String getTraineeName() {
		return traineeName;
	}

	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}
}