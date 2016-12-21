package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Trainer;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class TrainerRowMapper implements RowMapper<Trainer> {
	private Boolean isReadAll;

	public TrainerRowMapper(boolean isReadAll) {
		this.isReadAll = isReadAll;
	}

	@Override
	public Trainer mapRow(ResultSet resultSet, int i) throws SQLException {
		Trainer trainer = new Trainer();
		trainer.setId(resultSet.getInt("id"));
		trainer.setName(resultSet.getString("name"));
		trainer.setEmail(resultSet.getString("email"));
		if (isReadAll) {
			trainer.setTechnologyName(resultSet.getString("technology_name"));
			trainer.setTrainerName(resultSet.getString("employee_name"));
		}
		trainer.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		trainer.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		trainer.setDescription(resultSet.getString("description"));
		trainer.setPhone(resultSet.getString("phone"));
		trainer.setTechnologyId(resultSet.getInt("technology_id"));
		trainer.setReferredBy(resultSet.getString("referred_by"));
		return trainer;
	}

}
