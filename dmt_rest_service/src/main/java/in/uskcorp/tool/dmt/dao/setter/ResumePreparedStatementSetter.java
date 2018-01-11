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

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		System.out.println("Date::" + resume.getDate());
		System.out.println("Updated Date::"
				+ ResultSetUtil.converttoSQLDate(resume.getDate()));
		arg0.setInt(1, resume.getTraineeId());
		arg0.setInt(2, resume.getPreparedBy());
		arg0.setString(3, resume.getPaid());
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setDate(5, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(6, resume.getReceivedStatus());
		arg0.setString(7, resume.getDetails());
		arg0.setInt(8, resume.getCount());
		arg0.setInt(9, resume.getRate());
		arg0.setString(10, resume.getDescription());
		if (!isInsert) {
			arg0.setInt(11, resume.getId());
		}
	}
}
