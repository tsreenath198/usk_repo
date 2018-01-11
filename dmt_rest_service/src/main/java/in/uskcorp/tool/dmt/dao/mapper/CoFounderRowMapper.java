package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.CoFounder;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CoFounderRowMapper implements RowMapper<CoFounder> {

	@Override
	public CoFounder mapRow(ResultSet resultSet, int i) throws SQLException {
		CoFounder coFounder = new CoFounder();
		coFounder.setId(resultSet.getInt("id"));
		coFounder.setName(resultSet.getString("name"));
		coFounder.setEmail(resultSet.getString("email"));
		coFounder.setAddress(resultSet.getString("address"));
		coFounder.setDob(resultSet.getString("dob"));

		return coFounder;
	}
}
