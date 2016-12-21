package in.uskcorp.tool.dmt.util;

import java.sql.ResultSet;
import java.util.Date;

public final class ResultSetUtil {

	private ResultSetUtil() {
		// Restrict Object Creation
	}

	public static Date getDate(ResultSet rs, String columnName) {
		try {
			return rs.getDate(columnName);
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return null;
	}

	public static java.sql.Date converttoSQLDate(Date utilDate) {
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		return sqlDate;
	}
}
