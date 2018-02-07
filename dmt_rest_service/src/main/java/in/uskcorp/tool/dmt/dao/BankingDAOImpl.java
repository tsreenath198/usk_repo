package in.uskcorp.tool.dmt.dao;
import in.uskcorp.tool.dmt.dao.mapper.BankingRowMapper;
import in.uskcorp.tool.dmt.dao.setter.BankingPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Banking;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


	@Repository("bankingDAOImpl")
	public class BankingDAOImpl extends BankingDAO {

		@Override
		protected RowMapper<Banking> getRowMapper(Boolean isReadAll) {
			return new BankingRowMapper();
		}

		@Override
		protected String getReadAllQuery() {

			return SQLConstants.BANKING_SELECT;
		}

		@Override
		protected String getReadQuery() {
			return SQLConstants.BANKING_SELECT_BY_ID;
		}

		@Override
		protected String getInsertQuery() {
			return SQLConstants.BANKING_INSERT;
		}

		@Override
		protected String getUpdateQuery() {
			return SQLConstants.BANKING_UPDATE;
		}

		@Override
		protected String getDeleteQuery() {
			return SQLConstants.BANKING_DELETE;
		}

		@Override
		protected PreparedStatementSetter getPreparedStatementSetter(Banking a,
				boolean isInsert) {
			return new BankingPreparedStatementSetter(a, isInsert);
		}

	

	}


