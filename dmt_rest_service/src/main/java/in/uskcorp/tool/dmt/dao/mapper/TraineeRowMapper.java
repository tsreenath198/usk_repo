package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class TraineeRowMapper implements RowMapper<Trainee> {

	@Override
	public Trainee mapRow(ResultSet resultSet, int i) throws SQLException {
		Trainee trainee = new Trainee();
		trainee.setId(resultSet.getInt("id"));
		trainee.setName(resultSet.getString("name"));
		trainee.setEmail(resultSet.getString("email"));
		trainee.setAlternatePhone(resultSet.getString("alternate_phone"));
		trainee.setClientId(resultSet.getInt("client_id"));
		trainee.setSkypeId(resultSet.getString("skype_id"));
		trainee.setTimezone(resultSet.getString("timezone"));
		trainee.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		trainee.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		trainee.setBatchId(resultSet.getInt("batch_id"));
		trainee.setDescription(resultSet.getString("description"));
		trainee.setPhone(resultSet.getString("phone"));
		trainee.setTraineeFeeStatus(resultSet.getString("trainee_fee_status"));
		trainee.setPaidStatus(resultSet.getString("paid_status"));
		trainee.setReceivedStatus(resultSet.getString("received_status"));
		trainee.setTechnologyId(resultSet.getInt("technology_id"));
		trainee.setTechnologyName(resultSet.getString("technology_name"));
		return trainee;
	}

}
