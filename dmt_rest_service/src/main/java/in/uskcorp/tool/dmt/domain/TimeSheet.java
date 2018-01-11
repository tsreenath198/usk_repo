package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class TimeSheet {
	private int id;
	private Date date;
	private int employeeId;
	private String category;
	private int categoryRefNo;
	private Float durationInHours;
	private Date createdDate;
	private Date updatedDate;
	private String description;
	private int activeFlag;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getCategoryRefNo() {
		return categoryRefNo;
	}

	public void setCategoryRefNo(int categoryRefNo) {
		this.categoryRefNo = categoryRefNo;
	}

	public Float getDurationInHours() {
		return durationInHours;
	}

	public void setDurationInHours(Float durationInHours) {
		this.durationInHours = durationInHours;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(int activeFlag) {
		this.activeFlag = activeFlag;
	}
}
