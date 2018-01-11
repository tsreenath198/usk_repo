package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Evaluation;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class EvaluationRowMapper implements RowMapper<Evaluation> {

	@Override
	public Evaluation mapRow(ResultSet resultSet, int i) throws SQLException {
		Evaluation evaluation = new Evaluation();

		evaluation.setId(resultSet.getInt("id"));
		evaluation.setEmployeeId(resultSet.getInt("employee_id"));
		evaluation.setDetails(resultSet.getString("details"));
		evaluation.setCount(resultSet.getInt("count"));
		evaluation.setRate(resultSet.getInt("rate"));
		evaluation.setDate(ResultSetUtil.getDate(resultSet, "date"));
		evaluation.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		evaluation.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		evaluation.setActiveFlag(resultSet.getInt("active_flag"));
		evaluation.setDescription(resultSet.getString("description"));
		evaluation.setName(resultSet.getString("name"));
		return evaluation;
	}
}
