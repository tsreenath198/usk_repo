package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Client;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class ClientPreparedStatementSetter implements PreparedStatementSetter {
	private Client client;
	private boolean isInsert;

	public ClientPreparedStatementSetter(Client a, boolean isInsert) {
		this.client = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, client.getName());
		arg0.setString(2, client.getAddress());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(4, client.getDescription());
		if (!isInsert) {
			arg0.setInt(5, client.getId());
		}

	}
}
