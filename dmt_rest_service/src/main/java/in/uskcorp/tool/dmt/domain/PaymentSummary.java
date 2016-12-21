package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class PaymentSummary {
	private int id;
	private String name;
	private Date startDate;
	private int month;
	private int amount;
	private String rec;
	private String balance;
	private int inr;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getRec() {
		return rec;
	}

	public void setRec(String rec) {
		this.rec = rec;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public int getInr() {
		return inr;
	}

	public void setInr(int inr) {
		this.inr = inr;
	}
}
