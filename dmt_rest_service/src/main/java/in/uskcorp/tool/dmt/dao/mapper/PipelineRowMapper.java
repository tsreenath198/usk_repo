package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Pipeline;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PipelineRowMapper implements RowMapper<Pipeline> {

	@Override
	public Pipeline mapRow(ResultSet resultSet, int i) throws SQLException {
		Pipeline pipeline = new Pipeline();

		pipeline.setId(resultSet.getInt("id"));
		pipeline.setCandidateName(resultSet.getString("candidate_name"));
		pipeline.setEmail(resultSet.getString("email"));
		pipeline.setPhone(resultSet.getLong("phone"));
		pipeline.setRequirements(resultSet.getString("requirements"));
		pipeline.setCreatedDate(ResultSetUtil
				.getDate(resultSet, "created_date"));
		pipeline.setUpdatedDate(ResultSetUtil
				.getDate(resultSet, "updated_date"));
		
		pipeline.setDescription(resultSet.getString("description"));

		return pipeline;

	}

}
