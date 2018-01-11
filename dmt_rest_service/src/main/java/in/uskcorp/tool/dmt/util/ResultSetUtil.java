package in.uskcorp.tool.dmt.util;

import java.sql.Date;
import java.sql.ResultSet;

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

	public static java.sql.Date converttoUtilDate(Date utilDate) {
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		return sqlDate;
	}

	public static Date getDate1(ResultSet rs, String columnName) {
		try {
			return rs.getDate(columnName);
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return null;
	}

	public static java.sql.Date converttoSQLDate(java.util.Date date) {
		java.sql.Date sqlDate = new java.sql.Date(date.getTime());
		return sqlDate;
	}

}
