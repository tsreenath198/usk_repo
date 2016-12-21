package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class SupportSummary {
	private Date startDate;
	private Date endDate;
	private String traineeName;
	private String supportedBy;

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getTraineeName() {
		return traineeName;
	}

	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}

	public String getSupportedBy() {
		return supportedBy;
	}

	public void setSupportedBy(String supportedBy) {
		this.supportedBy = supportedBy;
	}
}