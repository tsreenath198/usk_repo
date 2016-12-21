package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Technology;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class TechnologyRowMapper implements RowMapper<Technology> {
	
	@Override
	public Technology mapRow(ResultSet resultSet, int i) throws SQLException {
		Technology technology = new Technology();
		technology.setId(resultSet.getInt("id"));
		technology.setName(resultSet.getString("name"));
		technology.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		technology.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		technology.setDescription(resultSet.getString("description"));
		technology.setActiveFlag(resultSet.getInt("active_flag"));
		return technology;
	}

}
