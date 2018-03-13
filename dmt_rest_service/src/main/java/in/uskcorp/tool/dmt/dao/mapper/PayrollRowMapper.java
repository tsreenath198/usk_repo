package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Payroll;
//import in.uskcorp.tool.dmt.util.ResultSetUtil;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PayrollRowMapper implements RowMapper<Payroll> {

	@Override
	public Payroll mapRow(ResultSet resultSet, int i) throws SQLException {
		Payroll payroll = new Payroll();
		payroll.setId(resultSet.getInt("id"));
		payroll.setEmployeeId(resultSet.getInt("employee_id"));
		payroll.setEmployee(resultSet.getString("employee"));
		payroll.setEvaDetails(resultSet.getString("eva_details"));
		payroll.setEvaRate(resultSet.getInt("eva_rate"));
		payroll.setEvaCount(resultSet.getInt("eva_count"));
		payroll.setMisDetails(resultSet.getString("mis_details"));
		payroll.setMisRate(resultSet.getInt("mis_rate"));
		payroll.setMisCount(resultSet.getInt("mis_count"));
		payroll.setResDetails(resultSet.getString("res_details"));
		payroll.setResRate(resultSet.getInt("res_rate"));
		payroll.setResCount(resultSet.getInt("res_count"));
		payroll.setSupDetails(resultSet.getString("sup_details"));
		payroll.setSupRate(resultSet.getInt("sup_rate"));
		payroll.setSupCount(resultSet.getInt("sup_count"));
		payroll.setTotal(resultSet.getInt("total"));
		payroll.setBaseSalary(resultSet.getInt("base_salary"));
		payroll.setTrainingCount(resultSet.getInt("training_count"));
		payroll.setDate(ResultSetUtil.getDate(resultSet, "date"));
		payroll.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		payroll.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		payroll.setDescription(resultSet.getString("description"));

		int total = (resultSet.getInt("eva_rate")
				* resultSet.getInt("eva_count") + (resultSet.getInt("mis_rate")
				* resultSet.getInt("mis_count") + (resultSet.getInt("res_rate")
				* resultSet.getInt("res_count") + (resultSet.getInt("sup_rate") * resultSet
				.getInt("sup_count")))));

		payroll.setTotal(total);
		return payroll;
	}
}
