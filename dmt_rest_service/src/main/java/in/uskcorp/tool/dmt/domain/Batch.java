package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class Batch {
	@Override
	public String toString() {
		return "Batch [id=" + id + ", technologyId=" + technologyId + ", trainerId=" + trainerId + ", duration="
				+ duration + ", startDate=" + startDate + ", endDate=" + endDate + ", status=" + status
				+ ", paidStatus=" + paidStatus + ", receivedStatus=" + receivedStatus + ", trainerName=" + trainerName
				+ ", technologyName=" + technologyName + ", description=" + description + ", activeFlag=" + activeFlag
				+ ", batchTime=" + batchTime + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + "]";
	}
	private int id;
	private int technologyId;
	private int trainerId;
	private int duration;
	private Date startDate;
	private Date endDate;
	private String status;
	private String paidStatus;
	private String receivedStatus;
	private String trainerName;
	private String technologyName;
	private String description;
	private int activeFlag;
	private String batchTime;
	private Date createdDate;
	private Date updatedDate;
	
	
	
	public String getReceivedStatus() {
		return receivedStatus;
	}

	public void setReceivedStatus(String receivedStatus) {
		this.receivedStatus = receivedStatus;
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

	public String getBatchTime() {
		return batchTime;
	}
	
	public void setBatchTime(String batchTime) {
		this.batchTime = batchTime;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTechnologyId() {
		return technologyId;
	}
	public void setTechnologyId(int technologyId) {
		this.technologyId = technologyId;
	}
	public int getTrainerId() {
		return trainerId;
	}
	public void setTrainerId(int trainerId) {
		this.trainerId = trainerId;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPaidStatus() {
		return paidStatus;
	}
	public void setPaidStatus(String paidStatus) {
		this.paidStatus = paidStatus;
	}
	public String getTrainerName() {
		return trainerName;
	}
	public void setTrainerName(String trainerName) {
		this.trainerName = trainerName;
	}
	public String getTechnologyName() {
		return technologyName;
	}
	public void setTechnologyName(String technologyName) {
		this.technologyName = technologyName;
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
