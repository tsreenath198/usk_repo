package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ExpenseDAO;
import in.uskcorp.tool.dmt.domain.Expense;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.oracle.jrockit.jfr.InvalidValueException;

@Service("expenseServiceImpl")
public class ExpenseServiceImpl extends ExpenseService {
	@Autowired
	@Qualifier("expenseDaoImpl")
	ExpenseDAO expenseDAO;

	@Override
	protected APIDAO<Expense> getDao() {
		return expenseDAO;
	}

	@Override
	public void insert(Expense expense) throws Exception {
		long avlBal = expenseDAO.findBalance();
//		System.out.println("avalBal:" + avlBal);
//		System.out.println(expense.isAmount());
		if (expense.isTypeOfExpense()) {
			//long amount = expense.getCredit();
			long amount = expense.getAmount();
			expenseDAO.insert(expense, amount, "credit");
		} else {
			//long amount = expense.getDebit();
			long amount = expense.getAmount();
			if (amount < avlBal) {
				expenseDAO.insert(expense, amount, "debit");
			} else {
				throw new Exception("balance not available");
			}
		}
	}

	@Override
	public void edit(Expense expense) throws Exception {
		long avlBal = expenseDAO.findBalance();
		if (expense.isTypeOfExpense()) {
			//long amount = expense.getCredit();
			long amount = expense.getAmount();
			expenseDAO.edit(expense, amount, "credit");
		}
		else {
			//long amount = expense.getDebit();
			long amount = expense.getAmount();
			if (amount < avlBal) {
				expenseDAO.edit(expense, amount, "debit");
			} else {
				throw new Exception("debit amount not more than available balance");
			}
		}
	}
	
}
