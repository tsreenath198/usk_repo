package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.EmployeeRowMapper;
import in.uskcorp.tool.dmt.dao.setter.EmployeePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Employee;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("employeeDaoImpl")
public class EmployeeDAOImpl extends EmployeeDAO {

	@Override
	protected RowMapper<Employee> getRowMapper(Boolean isReadAll) {
		return new EmployeeRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.EMPLOYEE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.EMPLOYEE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.EMPLOYEE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.EMPLOYEE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.EMPLOYEE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Employee a,
			boolean isInsert) {
		return new EmployeePreparedStatementSetter(a, isInsert);
	}

}
