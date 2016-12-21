package in.uskcorp.tool.dmt.dao;

import java.util.List;

import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.domain.TrainingSummary;

public abstract class TraineeDAO extends APIDAO<Trainee> {
	public abstract List<TrainingSummary> getSummary();
}
