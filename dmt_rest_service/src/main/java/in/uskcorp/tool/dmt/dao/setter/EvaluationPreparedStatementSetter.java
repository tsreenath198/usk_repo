package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Evaluation;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class EvaluationPreparedStatementSetter implements
		PreparedStatementSetter {
	private Evaluation evaluation;
	private boolean isInsert;

	public EvaluationPreparedStatementSetter(Evaluation a, boolean isInsert) {
		this.evaluation = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, evaluation.getEmployeeId());
		arg0.setString(2, evaluation.getDetails());
		arg0.setInt(3, evaluation.getCount());
		arg0.setInt(4, evaluation.getRate());
		arg0.setDate(5, evaluation.getDate());
		arg0.setDate(6, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, evaluation.getDescription());
		arg0.setInt(8, evaluation.getActiveFlag());
		if (!isInsert) {
			arg0.setInt(9, evaluation.getId());
		}
	}

}
