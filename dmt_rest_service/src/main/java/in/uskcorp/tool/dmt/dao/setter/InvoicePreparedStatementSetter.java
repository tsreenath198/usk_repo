package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Invoice;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class InvoicePreparedStatementSetter implements PreparedStatementSetter {
	private Invoice invoice;
	private boolean isInsert;

	public InvoicePreparedStatementSetter(Invoice a, boolean isInsert) {
		this.invoice = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setDate(1,
				ResultSetUtil.converttoSQLDate(invoice.getInvoiceDate()));
		arg0.setString(2, invoice.getInvoiceType());
		arg0.setFloat(3, invoice.getActualAmount());
		arg0.setFloat(4, invoice.getReceivedAmount());
		arg0.setDate(5,
				ResultSetUtil.converttoSQLDate(invoice.getReceivedDate()));
		arg0.setDate(6, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, invoice.getDescription());

		if (!isInsert) {
			arg0.setInt(8, invoice.getId());
		}

	}
}
