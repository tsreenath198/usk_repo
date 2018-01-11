package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Payroll;

import java.util.Date;

public abstract class PayrollDAO extends APIDAO<Payroll> {
	public abstract Payroll readByValues(int employeeId);

	public abstract Payroll readByMonthAndId(Date month, Integer employeeId);

}
