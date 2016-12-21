package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Invoice;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;

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
		arg0.setInt(1, invoice.getInvoiceNo());
		arg0.setString(2, invoice.getCategory());
		arg0.setInt(3, invoice.getAmount());
		arg0.setString(4, invoice.getCurrency());
		arg0.setString(5, invoice.getStatus());
		arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(invoice.getCreatedDate()));
		arg0.setString(7, invoice.getCustomer());
		arg0.setString(8, invoice.getDescription());
		arg0.setDate(9,
				ResultSetUtil.converttoSQLDate(invoice.getInvoiceDate()));
		arg0.setDouble(10, invoice.getPaid());
		if (!isInsert) {
			arg0.setInt(11, invoice.getId());
		}

	}
}
