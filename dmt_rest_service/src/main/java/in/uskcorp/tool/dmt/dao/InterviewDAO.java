package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Interview;
import in.uskcorp.tool.dmt.domain.InterviewSummary;
import java.util.List;

public abstract class InterviewDAO extends APIDAO<Interview> {
	public abstract List<InterviewSummary> getSummary();

}
