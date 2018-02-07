package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Pipeline;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class PipelinePreparedStatementSetter implements PreparedStatementSetter {

	private Pipeline pipeline;
	private boolean isInsert;

	public PipelinePreparedStatementSetter(Pipeline a, boolean isInsert) {
		this.pipeline = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, pipeline.getCandidateName());
		arg0.setString(2, pipeline.getEmail());
		arg0.setLong(3, pipeline.getPhone());
		arg0.setString(4, pipeline.getRequirements());
		arg0.setDate(5, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(6, pipeline.getDescription());
		if (!isInsert) {
			arg0.setInt(7, pipeline.getId());
		}
	}
}