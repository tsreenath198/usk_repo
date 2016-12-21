package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Question;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class QuestionRowMapper implements RowMapper<Question> {

	@Override
	public Question mapRow(ResultSet resultSet, int i) throws SQLException {
		Question question = new Question();
		question.setId(resultSet.getInt("id"));
		question.setEndClient(resultSet.getString("end_client"));
		question.setQuestion(resultSet.getString("question"));
		question.setAnswers(resultSet.getString("answers"));
		question.setDescription(resultSet.getString("description"));
		question.setCreatedDate(resultSet.getDate("created_date"));
		question.setUpdatedDate(resultSet.getDate("updated_date"));
		return question;
	}

}
