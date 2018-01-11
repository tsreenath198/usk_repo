package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Miscellaneous;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class MiscellaneousRowMapper implements RowMapper<Miscellaneous> {

	@Override
	public Miscellaneous mapRow(ResultSet resultSet, int i) throws SQLException {
		Miscellaneous miscellaneous = new Miscellaneous();

		miscellaneous.setId(resultSet.getInt("id"));
		miscellaneous.setEmployeeId(resultSet.getInt("employee_id"));
		miscellaneous.setDetails(resultSet.getString("details"));
		miscellaneous.setCount(resultSet.getInt("count"));
		miscellaneous.setRate(resultSet.getInt("rate"));
		miscellaneous.setDate(ResultSetUtil.getDate(resultSet, "date"));
		miscellaneous.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		miscellaneous.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		miscellaneous.setActiveFlag(resultSet.getInt("active_flag"));
		miscellaneous.setDescription(resultSet.getString("description"));
		miscellaneous.setName(resultSet.getString("name"));

		return miscellaneous;
	}
}
