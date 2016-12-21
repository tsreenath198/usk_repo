package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.CourseRowMapper;
import in.uskcorp.tool.dmt.dao.setter.CoursePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Course;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("courseDaoImpl")
public class CourseDaoImpl extends CourseDAO {

	@Override
	protected RowMapper<Course> getRowMapper(Boolean isReadAll) {
		return new CourseRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.COURSE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.COURSE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.COURSE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.COURSE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.COURSE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Course a,
			boolean isInsert) {
		return new CoursePreparedStatementSetter(a, isInsert);
	}

}