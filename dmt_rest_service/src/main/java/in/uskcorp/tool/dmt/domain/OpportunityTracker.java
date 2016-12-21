package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class OpportunityTracker {
	private int id;
	private String type;
	private String providedBy;
	private String providedFor;
	private Date opportunityDate;
	private String category;
	private String paid;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getProvidedBy() {
		return providedBy;
	}
	public void setProvidedBy(String providedBy) {
		this.providedBy = providedBy;
	}
	public String getProvidedFor() {
		return providedFor;
	}
	public void setProvidedFor(String providedFor) {
		this.providedFor = providedFor;
	}
	public Date getOpportunityDate() {
		return opportunityDate;
	}
	public void setOpportunityDate(Date opportunityDate) {
		this.opportunityDate = opportunityDate;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPaid() {
		return paid;
	}
	public void setPaid(String paid) {
		this.paid = paid;
	}

}
