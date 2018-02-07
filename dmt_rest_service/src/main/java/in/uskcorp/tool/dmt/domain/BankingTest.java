package in.uskcorp.tool.dmt.domain;

import java.util.Scanner;

public class BankingTest {
	private static final String id = null;

	@SuppressWarnings({ "unused", "resource" })
	public static void main(String[] args) {

		Banking mybanking = new Banking();
		int choice;

		int debit;

		int credit;      
		int balance;
		double amount = 0;
		double methodOutput;

		Scanner input = new Scanner(System.in);

		do {
			System.out.println("1. Withdrawal");
			System.out.println("2. Deposit");
			System.out.println("3. Get Balance");
			System.out.println("4. Exit");

			choice = input.nextInt();

			if (choice == 1) {
				System.out
						.println("Enter the amount you want to withdraw, please: ");

				choice = input.nextInt();
				methodOutput = withdrawal(amount);
			}

			if (choice == 2) {
				System.out.println("Enter the amount you will deposit: ");
				choice = input.nextInt();
				methodOutput = deposit(amount);
			}

			if (choice == 3) {
				System.out
						.println("The available amount of cash to take from me is: ");
			}

			if (choice == 4) {
				System.out.println("See ya later ");
			}
		} while (choice != 4);

	}

	private static double deposit(double amount) {
		// TODO Auto-generated method stub
		return 0;
	}

	private static double withdrawal(double amount) {
		// TODO Auto-generated method stub
		return 0;
	}

	public static String getId() {
		return id;
	}
}
