package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Batch;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
import org.springframework.jdbc.core.PreparedStatementSetter;

public class BatchPreparedStatementSetter implements PreparedStatementSetter {
	private Batch batch;
	private boolean isInsert;

	public BatchPreparedStatementSetter(Batch a, boolean isInsert) {
		this.batch = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setInt(1, batch.getTechnologyId());
		arg0.setInt(2, batch.getTrainerId());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(batch.getStartDate()));
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(batch.getEndDate()));
		arg0.setInt(5, batch.getDuration());
		arg0.setString(6, batch.getStatus());
		arg0.setDate(7, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(8, batch.getDescription());
		arg0.setString(9, batch.getBatchTime());
		if (!isInsert) {
			arg0.setInt(10, batch.getId());
		}
	}
}
