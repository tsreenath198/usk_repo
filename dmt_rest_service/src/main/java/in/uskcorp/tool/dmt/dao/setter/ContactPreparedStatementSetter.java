package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Contact;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.springframework.jdbc.core.PreparedStatementSetter;

public class ContactPreparedStatementSetter implements PreparedStatementSetter {
	private Contact contact;
	private boolean isInsert;

	// INSERT INTO contact (client_id,poc,email,phone,designation,created_date)
	// values(?,?,?,?,?,?)";

	public ContactPreparedStatementSetter(Contact a, boolean isInsert) {
		this.contact = a;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setFloat(1,contact.getClientId());
		arg0.setString(2, contact.getEmail());
		arg0.setString(3, contact.getTelephone());
		arg0.setString(4, contact.getPoc());
		arg0.setString(5, contact.getDesignation());
	
		arg0.setInt(6, contact.getActiveFlag());
		arg0.setDate(7, ResultSetUtil.converttoSQLDate(contact.getCreatedDate()));
		
		if (isInsert) {

		} else {
			arg0.setInt(8, contact.getId());
		}
	}
}
