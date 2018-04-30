package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class Expense {

	private int id;
	private Date date;
	private String purposeOfExpense;
	private long balance;
	private int amount;
	private int credit;
	private int debit;
	private Date createdDate;
	private Date updatedDate;
	private String description;
	private int activeFlag;
	private boolean typeOfExpense;
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public long getBalance() {
		return balance;
	}

	public void setBalance(long balance) {
		this.balance = balance;
	}



	public int getId() {
		return id;
	}

	public boolean isTypeOfExpense() {
		return typeOfExpense;
	}

	public void setTypeOfExpense(boolean typeOfExpense) {
		this.typeOfExpense = typeOfExpense;
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

	public String getPurposeOfExpense() {
		return purposeOfExpense;
	}

	public void setPurposeOfExpense(String purposeOfExpense) {
		this.purposeOfExpense = purposeOfExpense;
	}

	public int getCredit() {
		return credit;
	}

	public void setCredit(int credit) {
		this.credit = credit;
	}

	public int getDebit() {
		return debit;
	}

	public void setDebit(int debit) {
		this.debit = debit;
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
