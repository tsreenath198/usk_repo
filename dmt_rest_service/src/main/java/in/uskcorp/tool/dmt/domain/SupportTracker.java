package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class SupportTracker {
	private int id;
	private String supportBy;
	private String supportTo;
	private String description;
	private String hours;
	private Date date;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSupportBy() {
		return supportBy;
	}

	public void setSupportBy(String supportBy) {
		this.supportBy = supportBy;
	}

	public String getSupportTo() {
		return supportTo;
	}

	public void setSupportTo(String supportTo) {
		this.supportTo = supportTo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHours() {
		return hours;
	}

	public void setHours(String hours) {
		this.hours = hours;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
