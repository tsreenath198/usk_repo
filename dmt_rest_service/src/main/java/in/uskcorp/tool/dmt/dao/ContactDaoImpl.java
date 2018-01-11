package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.ContactRowMapper;

import in.uskcorp.tool.dmt.dao.setter.ContactPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Contact;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("contactDaoImpl")
public class ContactDaoImpl extends ContactDAO {

	@Override
	protected RowMapper<Contact> getRowMapper(Boolean isReadAll) {
		return new ContactRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.CONTACT_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.CONTACT_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.CONTACT_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.CONTACT_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.CONTACT_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Contact a,
			boolean isInsert) {
		return new ContactPreparedStatementSetter(a, isInsert);
	}
}
