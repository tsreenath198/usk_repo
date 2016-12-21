package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Client;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ClientRowMapper implements RowMapper<Client> {
	
	@Override
	public Client mapRow(ResultSet resultSet, int i) throws SQLException {
		Client client = new Client();
		client.setId(resultSet.getInt("id"));
		client.setName(resultSet.getString("name"));
		client.setAddress(resultSet.getString("address"));
		client.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		client.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		client.setDescription(resultSet.getString("description"));
		client.setActiveFlag(resultSet.getInt("active_flag"));
		return client;
	}
}
