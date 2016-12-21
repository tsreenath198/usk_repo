package in.uskcorp.tool.dmt.domain;

import java.util.Date;

public class ClientSummary {
	private int id;
	private String name;
	private Date startDate;
	private String amount;
	private String rec;
	private String balance;
	private int invNo;

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

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
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

	public int getInvNo() {
		return invNo;
	}

	public void setInvNo(int invNo) {
		this.invNo = invNo;
	}
}
