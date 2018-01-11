package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.SupportSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class SupportSummaryRowMapper implements RowMapper<SupportSummary> {

	@Override
	public SupportSummary mapRow(ResultSet rs, int i)
			throws SQLException {
		SupportSummary supportSummary = new SupportSummary();
		
		supportSummary.setTrainerName(rs.getString("trainer_name"));
		supportSummary.setTraineeName(rs.getString("trainee_name"));
		supportSummary.setStartDate(ResultSetUtil.getDate(rs, "start_date"));
		supportSummary.setTechnology(rs.getString("technology"));
		supportSummary.setStatus(rs.getString("status"));
		//supportSummary.setStatus(resultSet.getString("status"));
	//	supportSummary.setEndDate(ResultSetUtil.getDate(resultSet, "end"));
		
		return supportSummary;
	}

}


