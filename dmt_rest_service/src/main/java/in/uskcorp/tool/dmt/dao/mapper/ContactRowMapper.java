package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Contact;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ContactRowMapper implements RowMapper<Contact> {
	
	@Override
	public Contact mapRow(ResultSet resultSet, int i) throws SQLException {
		Contact contact = new Contact();
		contact.setId(resultSet.getInt("id"));
		contact.setClientId( (long) resultSet.getInt("client_id"));
		contact.setEmail(resultSet.getString("email"));
		contact.setTelephone(resultSet.getString("phone"));
		contact.setPoc(resultSet.getString("poc"));
		contact.setDesignation(resultSet.getString("designation"));
		contact.setActiveFlag(resultSet.getInt("active_flag"));
		contact.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		contact.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
	
		return contact;
	}

}
