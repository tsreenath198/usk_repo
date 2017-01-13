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
		System.out.println(batch.toString());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(batch.getStartDate()));
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(batch.getEndDate()));
		arg0.setInt(5, batch.getDuration());
		arg0.setString(6, batch.getStatus());
		arg0.setString(7, batch.getPaidStatus());
		arg0.setString(8, batch.getReceivedStatus());
		arg0.setDate(9, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(10, batch.getDescription());
		arg0.setString(11, batch.getBatchTime());
		arg0.setString(12, batch.getInvoice());
		if (!isInsert) {
			arg0.setInt(13, batch.getId());
		}
	}
}
