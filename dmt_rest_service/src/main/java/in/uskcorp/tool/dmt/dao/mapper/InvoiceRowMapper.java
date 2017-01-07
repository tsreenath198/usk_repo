package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Invoice;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class InvoiceRowMapper implements RowMapper<Invoice> {

	@Override
	public Invoice mapRow(ResultSet resultSet, int i) throws SQLException {
		Invoice invoice = new Invoice();
		invoice.setId(resultSet.getInt("id"));
		invoice.setInvoiceDate(ResultSetUtil.getDate(resultSet, "invoice_date"));
		invoice.setInvoiceType(resultSet.getString("invoice_type"));
		invoice.setActualAmount(resultSet.getFloat("actual_amount"));
		invoice.setReceivedAmount(resultSet.getFloat("received_amount"));
		invoice.setReceivedDate(ResultSetUtil.getDate(resultSet,
				"received_date"));
		invoice.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		invoice.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		invoice.setDescription(resultSet.getString("description"));
		return invoice;
	}
}
