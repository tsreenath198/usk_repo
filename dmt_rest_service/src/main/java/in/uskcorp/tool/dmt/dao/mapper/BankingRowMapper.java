package in.uskcorp.tool.dmt.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import in.uskcorp.tool.dmt.domain.Banking;

import org.springframework.jdbc.core.RowMapper;

public class BankingRowMapper implements RowMapper<Banking> {

	@Override
	public Banking mapRow(ResultSet resultSet, int i) throws SQLException {
		Banking banking = new Banking();
		banking.setId(resultSet.getInt("id"));
		banking.setAccountNo(resultSet.getInt("accountNo"));
		banking.setName(resultSet.getString("name"));
		banking.setFatherName(resultSet.getString("fatherName"));
		banking.setAddress(resultSet.getString("address"));
		banking.setIfsc_Code(resultSet.getString("ifsc_Code"));
		banking.setPhoneNo(resultSet.getInt("phoneNo"));
		banking.setEmail(resultSet.getString("email"));
		banking.setBalance(resultSet.getDouble("balance"));

		return banking;
	}

}
