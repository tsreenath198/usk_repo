package in.uskcorp.tool.dmt.domain;

public class Banking {
	private int id;
	private int accountNo;
	private String name;
	private String fatherName;
	private String address;
	private String ifsc_Code;
	private int conformAccountNo;
	private int phoneNo;
	private String email;
	private double balance;
	private double initialBalance;

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public double getBalance() {
		return balance;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(int accountNo) {
		this.accountNo = accountNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIfsc_Code() {
		return ifsc_Code;
	}

	public void setIfsc_Code(String ifsc_Code) {
		this.ifsc_Code = ifsc_Code;
	}

	public int getConformAccountNo() {
		return conformAccountNo;
	}

	public void setConformAccountNo(int conformAccountNo) {
		this.conformAccountNo = conformAccountNo;
	}

	public int getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(int phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	{
		if (initialBalance > 0.0)
        balance = initialBalance;
}
public double getInitialBalance() {
		return initialBalance;
	}

	public void setInitialBalance(double initialBalance) {
		this.initialBalance = initialBalance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

public void withdrawal(double newBalance, double amount)
{
newBalance = balance - amount;
System.out.println("You withdrew: " + amount);
System.out.println("Your balance is: " + newBalance);
}

// Deposit

public void deposit (double newBalance, double amount)
{
newBalance = balance + amount;
System.out.println("You gave me: $ " + amount);
System.out.println("I now have all your money that is worth: " + newBalance);
}


private Double withdrawal(int amount)
{
double withdrawal;
balance = balance - amount;
return balance;
}

private Double deposit(int amount)
{
double deposit;
balance = balance + amount;
return balance;
}
}

