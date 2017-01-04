package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.InterviewSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class InterviewSummaryRowMapper implements RowMapper<InterviewSummary> {

	@Override
	public InterviewSummary mapRow(ResultSet resultSet, int i)
			throws SQLException {
		InterviewSummary interviewSummary = new InterviewSummary();

		interviewSummary.setInterviewDate(ResultSetUtil.getDate(resultSet,
				"interview_date"));
		interviewSummary.setTraineeName(resultSet.getString("trainee_name"));
		interviewSummary.setSupportedBy(resultSet.getString("supported_By"));
		interviewSummary.setStatus(resultSet.getString("status"));

		// interviewSummary.setConsultancyName(resultSet.getString("consultancy"));
		// interviewSummary.setEmployeeName(resultSet.getString("employee_name"));
		// interviewSummary.setSupported_By(resultSet.getString("supported_By"));
		// interviewSummary.setTraineeName(resultSet.getString("trainee_name"));
		// interviewSummary.setClient(resultSet.getString("client"));
		
		return interviewSummary;
	}
}
