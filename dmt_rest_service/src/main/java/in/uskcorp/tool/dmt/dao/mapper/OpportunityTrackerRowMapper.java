package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.OpportunityTracker;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class OpportunityTrackerRowMapper implements
		RowMapper<OpportunityTracker> {
	
	@Override
	public OpportunityTracker mapRow(ResultSet resultSet, int i)
			throws SQLException {
		OpportunityTracker opportunityTracker = new OpportunityTracker();
		opportunityTracker.setId(resultSet.getInt("id"));
		opportunityTracker.setType(resultSet.getString("type"));
		opportunityTracker.setCategory(resultSet.getString("category"));
		opportunityTracker.setPaid(resultSet.getString("paid"));
		opportunityTracker.setOpportunityDate(ResultSetUtil.getDate(resultSet,
				"date"));
		opportunityTracker.setProvidedBy(resultSet.getString("provided_by"));
		opportunityTracker.setProvidedFor(resultSet.getString("provided_for"));
		return opportunityTracker;
	}
}
