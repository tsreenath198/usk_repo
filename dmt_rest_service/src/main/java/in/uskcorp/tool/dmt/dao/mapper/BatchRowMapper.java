package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Batch;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class BatchRowMapper implements RowMapper<Batch> {

	private Boolean isReadAll;

	public BatchRowMapper(boolean isReadAll) {
		this.isReadAll = isReadAll;
	}

	@Override
	public Batch mapRow(ResultSet resultSet, int i) throws SQLException {
		Batch batch = new Batch();
		batch.setId(resultSet.getInt("id"));
		batch.setTechnologyId(resultSet.getInt("technology_id"));
		batch.setTrainerId(resultSet.getInt("trainer_id"));
		if (isReadAll) {
			batch.setTechnologyName(resultSet.getString("technology_name"));
			batch.setTrainerName(resultSet.getString("trainer_name"));
		}
		batch.setDuration(resultSet.getInt("duration"));
		batch.setStartDate(ResultSetUtil.getDate(resultSet, "start_date"));
		batch.setEndDate(ResultSetUtil.getDate(resultSet, "end_date"));
		batch.setBatchTime(resultSet.getString("time"));
		batch.setActiveFlag(resultSet.getInt("active_flag"));
		batch.setDescription(resultSet.getString("description"));
		batch.setStatus(resultSet.getString("status"));
		return batch;
	}
}
