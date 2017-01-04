package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.BatchSummary;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class BatchSummaryRowMapper implements RowMapper<BatchSummary> {

	@Override
	public BatchSummary mapRow(ResultSet resultSet, int i) throws SQLException {
		BatchSummary batchSummary = new BatchSummary();
		batchSummary.setBatchId(resultSet.getInt("batchId"));
		batchSummary.setNumberOfStudents(resultSet.getInt("numberOfStudents"));
		batchSummary.setTrainerName(resultSet.getString("trainerName"));
		batchSummary.setTechnology(resultSet.getString("technology"));
		return batchSummary;
	}
}
