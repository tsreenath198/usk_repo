package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class Payroll {
	private int id;
	private int employeeId;
	private Date date;
	private Date from;
	private Date to;
	private String employeeName;

	private String evaDetails;
	private int evaCount;
	private int evaRate;

	private String misDetails;
	private int misCount;
	private int misRate;

	private String resDetails;
	private int resCount;
	private int resRate;

	private String supDetails;
	private int supCount;
	private int supRate;

	private int baseSalary;
	private int trainingCount;
	private int total;

	private String description;
	private Date createdDate;
	private Date updatedDate;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public String getSupDetails() {
		return supDetails;
	}

	public void setSupDetails(String supDetails) {
		this.supDetails = supDetails;
	}

	public int getSupCount() {
		return supCount;
	}

	public void setSupCount(int supCount) {
		this.supCount = supCount;
	}

	public int getSupRate() {
		return supRate;
	}

	public void setSupRate(int supRate) {
		this.supRate = supRate;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEvaDetails() {
		return evaDetails;
	}

	public void setEvaDetails(String evaDetails) {
		this.evaDetails = evaDetails;
	}

	public int getEvaCount() {
		return evaCount;
	}

	public void setEvaCount(int evaCount) {
		this.evaCount = evaCount;
	}

	public int getEvaRate() {
		return evaRate;
	}

	public void setEvaRate(int evaRate) {
		this.evaRate = evaRate;
	}

	public String getMisDetails() {
		return misDetails;
	}

	public void setMisDetails(String misDetails) {
		this.misDetails = misDetails;
	}

	public int getMisCount() {
		return misCount;
	}

	public void setMisCount(int misCount) {
		this.misCount = misCount;
	}

	public int getMisRate() {
		return misRate;
	}

	public void setMisRate(int misRate) {
		this.misRate = misRate;
	}

	public String getResDetails() {
		return resDetails;
	}

	public void setResDetails(String resDetails) {
		this.resDetails = resDetails;
	}

	public int getResCount() {
		return resCount;
	}

	public void setResCount(int resCount) {
		this.resCount = resCount;
	}

	public int getResRate() {
		return resRate;
	}

	public void setResRate(int resRate) {
		this.resRate = resRate;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getBaseSalary() {
		return baseSalary;
	}

	public void setBaseSalary(int baseSalary) {
		this.baseSalary = baseSalary;
	}

	public int getTrainingCount() {
		return trainingCount;
	}

	public void setTrainingCount(int trainingCount) {
		this.trainingCount = trainingCount;
	}

}
