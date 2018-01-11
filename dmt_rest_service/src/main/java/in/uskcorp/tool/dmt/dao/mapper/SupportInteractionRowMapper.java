package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.SupportInteraction;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class SupportInteractionRowMapper implements
		RowMapper<SupportInteraction> {

	@Override
	public SupportInteraction mapRow(ResultSet rs, int arg1)
			throws SQLException {
		SupportInteraction supIntr = new SupportInteraction();
		supIntr.setCount(rs.getInt("count"));
		supIntr.setDate(ResultSetUtil.getDate(rs, "date"));
		supIntr.setLead(rs.getString("lead"));
		supIntr.setLeadId(rs.getInt("lead_id"));
		supIntr.setTraineeId(rs.getInt("trainee_id"));
		supIntr.setTrainerId(rs.getInt("trainer_id"));
		// supIntr.setTraineeName(rs.getString("trainee_name"));
		// supIntr.setTrainerName(rs.getString("trainer_name"));
		supIntr.setCreatedDate(ResultSetUtil.getDate(rs, "created_date"));
		supIntr.setUpdatedDate(ResultSetUtil.getDate(rs, "updated_date"));
		supIntr.setDescription(rs.getString("description"));

		supIntr.setDetails(rs.getString("details"));
		supIntr.setRate(rs.getInt("rate"));
		supIntr.setMonth(rs.getString("month"));

		return supIntr;
	}
}
