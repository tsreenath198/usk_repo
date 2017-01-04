package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Pipeline;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class PipelinePreparedStatementSetter implements PreparedStatementSetter {

	private Pipeline pipeline;
	private boolean isInsert;

	public PipelinePreparedStatementSetter(Pipeline a, boolean isInsert) {
		this.pipeline = a;
		this.isInsert = isInsert;
	}

	// end_client, question,answers,created_date,description

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, pipeline.getCandidateName());
		arg0.setLong(4, pipeline.getPhone());
		arg0.setString(3, pipeline.getEmail());
		arg0.setString(5, pipeline.getRequirements());
		arg0.setDate(2,
				ResultSetUtil.converttoSQLDate(pipeline.getCreatedDate()));
		/*arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(pipeline.getUpdated_date()));*/
		arg0.setString(6, pipeline.getDescription());

		if (!isInsert) {
			arg0.setInt(7, pipeline.getId());
		}
	}
}