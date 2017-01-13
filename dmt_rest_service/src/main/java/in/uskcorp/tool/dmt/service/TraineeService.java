package in.uskcorp.tool.dmt.service;

import java.util.List;

import in.uskcorp.tool.dmt.domain.Trainee;

public abstract class TraineeService extends APIService<Trainee> {
	public abstract List<Trainee> readAllById(Integer id);
}
