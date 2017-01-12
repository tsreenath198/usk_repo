package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Question;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class QuestionPreparedStatementSetter implements PreparedStatementSetter {
	private Question question;
	private boolean isInsert;

	public QuestionPreparedStatementSetter(Question a, boolean isInsert) {
		this.question = a;
		this.isInsert = isInsert;
	}

	// end_client, question,answers,created_date,description

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, question.getEndClient());
		arg0.setString(2, question.getQuestion());
		arg0.setString(3, question.getAnswers());
		arg0.setDate(4,
				ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(5, question.getDescription());

		if (!isInsert) {
			arg0.setInt(6, question.getId());
		}

	}
}