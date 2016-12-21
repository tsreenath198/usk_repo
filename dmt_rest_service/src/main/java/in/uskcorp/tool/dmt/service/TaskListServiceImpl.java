package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.TaskListDAO;
import in.uskcorp.tool.dmt.domain.TaskList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("taskListServiceImpl")
public class TaskListServiceImpl extends TaskListService {
	@Autowired
	@Qualifier("taskListDaoImpl")
	TaskListDAO taskListDAO;

	@Override
	protected APIDAO<TaskList> getDao() {
		return taskListDAO;
	}

}
