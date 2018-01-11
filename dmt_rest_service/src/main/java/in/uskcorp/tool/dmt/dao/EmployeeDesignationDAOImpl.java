package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.EmployeeDesignationRowMapper;
import in.uskcorp.tool.dmt.dao.setter.EmployeeDesignationPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.EmployeeDesignation;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("employeeDesignationDaoImpl")
public class EmployeeDesignationDAOImpl extends EmployeeDesignationDAO {
	@Override
	protected RowMapper<EmployeeDesignation> getRowMapper(Boolean isReadAll) {
		return new EmployeeDesignationRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.EMPLOYEE_DESIGNATION_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.EMPLOYEE_DESIGNATION_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.EMPLOYEE_DESIGNATION_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.EMPLOYEE_DESIGNATION_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.EMPLOYEE_DESIGNATION_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			EmployeeDesignation a, boolean isInsert) {
		return new EmployeeDesignationPreparedStatementSetter(a, isInsert);
	}
}
