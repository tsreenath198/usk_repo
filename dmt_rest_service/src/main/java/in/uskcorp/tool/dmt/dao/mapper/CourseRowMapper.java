package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Course;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CourseRowMapper implements RowMapper<Course> {

	@Override
	public Course mapRow(ResultSet resultSet, int i) throws SQLException {
		Course course = new Course();
		course.setId(resultSet.getInt("id"));
		course.setTechnologyId(resultSet.getInt("technology_id"));
		course.setName(resultSet.getString("name"));
		course.setEstHrs(resultSet.getInt("est_hrs"));
		course.setCreatedDate(resultSet.getDate("created_date"));
		course.setUpdatedDate(resultSet.getDate("updated_date"));
		course.setDescription(resultSet.getString("description"));
		return course;
	}

}
