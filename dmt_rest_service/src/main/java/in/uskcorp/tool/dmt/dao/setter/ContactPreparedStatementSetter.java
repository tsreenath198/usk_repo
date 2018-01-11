package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Contact;
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
		if (isInsert) {
			
		} else {
			arg0.setInt(0, contact.getId());
		}
	}
}
