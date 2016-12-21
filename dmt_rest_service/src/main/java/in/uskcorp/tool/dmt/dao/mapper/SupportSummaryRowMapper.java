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
		supportSummary.setStartDate(ResultSetUtil.getDate(resultSet, "start"));
		supportSummary.setEndDate(ResultSetUtil.getDate(resultSet, "end"));
		supportSummary.setTraineeName(resultSet.getString("trainee_name"));
		supportSummary.setSupportedBy(resultSet.getString("supported_by"));
		return supportSummary;
	}

}
