package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ExpenseDAO;
import in.uskcorp.tool.dmt.domain.Expense;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("expenseServiceImpl")
public class ExpenseServiceImpl extends ExpenseService {
	@Autowired
	@Qualifier("expenseDaoImpl")
	ExpenseDAO expenseDAO;

	@Override
	protected APIDAO<Expense> getDao() {
		return expenseDAO;
	}

}
