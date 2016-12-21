package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.TrainingSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class TrainingSummaryRowMapper implements RowMapper<TrainingSummary> {

	@Override
	public TrainingSummary mapRow(ResultSet resultSet, int i)
			throws SQLException {
		TrainingSummary trainingSummary = new TrainingSummary();
		trainingSummary.setId(resultSet.getInt("batch_id"));
		trainingSummary.setName(resultSet.getString("name"));
		trainingSummary.setStatus(resultSet.getString("status"));
		trainingSummary.setCount(resultSet.getInt("count_batch"));
		trainingSummary.setStartDate(ResultSetUtil.getDate(resultSet,
				"start_date"));
		return trainingSummary;
	}
}
