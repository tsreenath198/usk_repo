package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Resume;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class ResumePreparedStatementSetter implements PreparedStatementSetter {

	private Resume resume;
	private boolean isInsert;

	public ResumePreparedStatementSetter(Resume a, boolean isInsert) {
		this.resume = a;
		this.isInsert = isInsert;
	}

	// end_client, question,answers,created_date,description

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		// arg0.setString(1, resume.getTraineeName());
		arg0.setInt(1, resume.getTraineeId());
		arg0.setString(2, resume.getPreparedBy());
		arg0.setString(3, resume.getPaid());
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(resume.getDate()));
		arg0.setDate(5,
				ResultSetUtil.converttoSQLDate(new Date()));
		/*arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(resume.getUpdated_date()));*/
		arg0.setString(6, resume.getReceivedStatus());
		arg0.setString(7, resume.getDescription());

		if (!isInsert) {
			arg0.setInt(8, resume.getId());
		}

	}
}