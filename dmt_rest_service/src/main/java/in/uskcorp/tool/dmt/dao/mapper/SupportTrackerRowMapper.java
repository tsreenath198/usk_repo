package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.SupportTracker;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class SupportTrackerRowMapper implements RowMapper<SupportTracker> {
	@Override
	public SupportTracker mapRow(ResultSet resultSet, int i)
			throws SQLException {
		SupportTracker supportTracker = new SupportTracker();
		supportTracker.setId(resultSet.getInt("id"));
		supportTracker.setSupportBy(resultSet.getString("support_by"));
		supportTracker.setDescription(resultSet.getString("description"));
		supportTracker.setDate(ResultSetUtil.getDate(resultSet, "date"));
		supportTracker.setHours(resultSet.getString("hours"));
		supportTracker.setSupportTo(resultSet.getString("support_to"));
		return supportTracker;
	}
}
