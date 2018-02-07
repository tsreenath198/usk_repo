package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.PayrollDAO;
import in.uskcorp.tool.dmt.domain.Payroll;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("payrollServiceImpl")
public class PayrollServiceImpl extends PayrollService {
	@Autowired
	@Qualifier("payrollDaoImpl")
	PayrollDAO payrollDAO;

	@Override
	protected APIDAO<Payroll> getDao() {
		return payrollDAO;
	}

	@Override
	public Payroll readByValues(int employeeId) {
		return payrollDAO.read(employeeId);
	}

	@Override
	public Payroll readByMonthAndId(int employeeId, Date fromDate, Date toDate) {
		return payrollDAO.readByMonthAndId(employeeId, fromDate, toDate);
	}

}
