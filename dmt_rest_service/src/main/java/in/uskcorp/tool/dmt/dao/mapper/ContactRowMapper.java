package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Contact;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ContactRowMapper implements RowMapper<Contact> {
	
	@Override
	public Contact mapRow(ResultSet resultSet, int i) throws SQLException {
		Contact contact = new Contact();
		contact.setId(resultSet.getInt("id"));
		contact.setEmail(resultSet.getString("email"));
		contact.setTelephone(resultSet.getString("phone"));
		contact.setPoc(resultSet.getString("poc"));
		contact.setDesignation(resultSet.getString("designation"));
		return contact;
	}

}
