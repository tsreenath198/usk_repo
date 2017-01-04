package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.SupportSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class SupportSummaryRowMapper implements RowMapper<SupportSummary> {

	@Override
	public SupportSummary mapRow(ResultSet resultSet, int i)
			throws SQLException {
		SupportSummary supportSummary = new SupportSummary();
		supportSummary.setSupportedBy(resultSet.getString("supported_by"));
		supportSummary.setTraineeName(resultSet.getString("trainee_name"));
		supportSummary.setStartDate(ResultSetUtil.getDate(resultSet, "start_date"));
		supportSummary.setTechnology(resultSet.getString("technology"));
		supportSummary.setStatus(resultSet.getString("status"));
		//supportSummary.setStatus(resultSet.getString("status"));
	//	supportSummary.setEndDate(ResultSetUtil.getDate(resultSet, "end"));
		
		return supportSummary;
	}

}
