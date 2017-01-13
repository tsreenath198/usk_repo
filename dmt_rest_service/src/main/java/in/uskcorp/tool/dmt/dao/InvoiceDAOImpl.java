package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.InvoiceRowMapper;
import in.uskcorp.tool.dmt.dao.setter.InvoicePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Invoice;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("invoiceDaoImpl")
public class InvoiceDAOImpl extends InvoiceDAO {

	@Override
	protected RowMapper<Invoice> getRowMapper(Boolean isReadAll) {
		return new InvoiceRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.INVOICE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.INVOICE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.INVOICE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.INVOICE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.INVOICE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Invoice a,
			boolean isInsert) {
		return new InvoicePreparedStatementSetter(a, isInsert);
	}

	

}