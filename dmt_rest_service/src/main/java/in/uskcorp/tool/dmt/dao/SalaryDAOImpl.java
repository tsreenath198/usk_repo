package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.SalaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.SalaryPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Salary;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("salaryDaoImpl")
public class SalaryDAOImpl extends SalaryDAO {

	@Override
	protected RowMapper<Salary> getRowMapper(Boolean isReadAll) {
		return new SalaryRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.SALARY_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.SALARY_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.SALARY_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.SALARY_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.SALARY_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Salary a,
			boolean isInsert) {
		return new SalaryPreparedStatementSetter(a, isInsert);
	}

}
