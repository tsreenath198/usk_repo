package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Course;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class CoursePreparedStatementSetter implements PreparedStatementSetter {
	private Course course;
	private boolean isInsert;

	public CoursePreparedStatementSetter(Course a, boolean isInsert) {
		this.course = a;
		this.isInsert = isInsert;
	}

	/*
	 * technology_id,name,est_hrs,created_date,description
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, course.getTechnologyId());
		arg0.setString(2, course.getName());
		arg0.setInt(3, course.getEstHrs());
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(course.getCreatedDate()));
		arg0.setString(5, course.getDescription());

		if (!isInsert) {
			arg0.setInt(6, course.getId());
		}

	}
}