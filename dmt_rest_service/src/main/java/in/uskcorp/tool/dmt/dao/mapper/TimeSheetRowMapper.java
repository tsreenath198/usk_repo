package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.TimeSheet;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class TimeSheetRowMapper implements RowMapper<TimeSheet> {

	@Override
	public TimeSheet mapRow(ResultSet resultSet, int i) throws SQLException {
		TimeSheet timeSheet = new TimeSheet();
		timeSheet.setId(resultSet.getInt("id"));
		timeSheet.setDate(ResultSetUtil.getDate(resultSet, "date"));
		timeSheet.setEmployeeId(resultSet.getInt("emploee_id"));
		timeSheet.setCategory(resultSet.getString("category"));
		timeSheet.setCategoryRefNo(resultSet.getInt("category_ref_no"));
		timeSheet.setDurationInHours(resultSet.getFloat("duration_in_hours"));
		timeSheet.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		timeSheet.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		timeSheet.setDescription(resultSet.getString("description"));
		timeSheet.setActiveFlag(resultSet.getInt("active_flag"));
		return timeSheet;
	}
}
