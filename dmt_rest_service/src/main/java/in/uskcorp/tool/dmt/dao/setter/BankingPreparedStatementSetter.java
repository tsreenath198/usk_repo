package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Banking;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class BankingPreparedStatementSetter implements PreparedStatementSetter {

	private Banking banking;
	private boolean isInsert;

	public BankingPreparedStatementSetter(Banking a, boolean isInsert) {
		this.banking = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setInt(1, banking.getAccountNo());
		arg0.setString(2, banking.getName());
		// arg0.setDate(3, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(3, banking.getFatherName());
		arg0.setString(4, banking.getAddress());
		arg0.setString(5, banking.getIfsc_Code());
		arg0.setInt(6, banking.getConformAccountNo());
		arg0.setInt(7, banking.getPhoneNo());
		arg0.setString(8, banking.getEmail());
		arg0.setDouble(10, banking.getBalance());

		if (!isInsert) {
			arg0.setInt(9, banking.getId());
		}
		
	}

}
