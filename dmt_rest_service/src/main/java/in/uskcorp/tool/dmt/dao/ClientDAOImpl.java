package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.ClientRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.ClientSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ClientPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Client;
import in.uskcorp.tool.dmt.domain.ClientSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("clientDaoImpl")
public class ClientDAOImpl extends ClientDAO {

	@Override
	protected RowMapper<Client> getRowMapper(Boolean isReadAll) {
		return new ClientRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.CLIENT_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.CLIENT_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.CLIENT_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.CLIENT_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.CLIENT_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Client a,
			boolean isInsert) {
		return new ClientPreparedStatementSetter(a, isInsert);
	}
/*
	@Override
	public List<ClientSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.CLIENT_SELECT,
				new ClientSummaryRowMapper());
	}*/
}
