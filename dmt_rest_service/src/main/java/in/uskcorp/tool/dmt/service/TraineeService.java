package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.domain.Trainee;

import java.util.List;

public abstract class TraineeService extends APIService<Trainee> {
	public abstract List<Trainee> readByValues(int batchId);

}
