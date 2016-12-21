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
		invoice.setInvoiceNo(resultSet.getInt("invoice_no"));
		invoice.setCategory(resultSet.getString("category"));
		invoice.setAmount(resultSet.getInt("amount"));
		invoice.setCurrency(resultSet.getString("currency"));
		invoice.setStatus(resultSet.getString("status"));
		invoice.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		invoice.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		invoice.setCustomer(resultSet.getString("customer"));
		invoice.setDescription(resultSet.getString("description"));
		invoice.setInvoiceDate(ResultSetUtil.getDate(resultSet, "invoice_date"));
		invoice.setPaid(resultSet.getDouble("paid"));
		return invoice;
	}
}
