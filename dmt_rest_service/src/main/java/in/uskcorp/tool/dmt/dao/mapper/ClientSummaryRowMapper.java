package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.ClientSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ClientSummaryRowMapper implements RowMapper<ClientSummary> {

	@Override
	public ClientSummary mapRow(ResultSet resultSet, int i) throws SQLException {
		ClientSummary clientSummary = new ClientSummary();
		clientSummary.setName(resultSet.getString("name"));
		clientSummary.setStartDate(ResultSetUtil.getDate(resultSet,
				"start_date"));
		clientSummary.setAmount(resultSet.getString("amount"));
		clientSummary.setRec(resultSet.getString("rec"));
		clientSummary.setBalance(resultSet.getString("balance"));
		clientSummary.setInvNo(resultSet.getInt("invNo"));
		return clientSummary;
	}

}
