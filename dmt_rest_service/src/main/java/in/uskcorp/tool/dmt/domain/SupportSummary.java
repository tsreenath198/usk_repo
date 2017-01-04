package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class SupportSummary {
	private String supportedBy;
	private String traineeName;
	private Date startDate;
	private String technology;
	private String status;
	
	//private String status;

	public String getSupportedBy() {
		return supportedBy;
	}

	public void setSupportedBy(String supportedBy) {
		this.supportedBy = supportedBy;
	}

	public String getTraineeName() {
		return traineeName;
	}

	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getTechnology() {
		return technology;
	}

	public void setTechnology(String technology) {
		this.technology = technology;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	 
	
/*	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}*/

	/*
	 * public Date getEndDate() { return endDate; }
	 * 
	 * public void setEndDate(Date endDate) { this.endDate = endDate; }
	 */

}