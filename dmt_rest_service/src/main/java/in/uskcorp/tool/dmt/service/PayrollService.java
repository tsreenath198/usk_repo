package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.domain.Payroll;

import java.util.Date;

public abstract class PayrollService extends APIService<Payroll> {
	public abstract Payroll readByValues(int employeeId);

	public abstract Payroll readByMonthAndId(int employeeId, Date fromDate,
			Date toDate);

}
