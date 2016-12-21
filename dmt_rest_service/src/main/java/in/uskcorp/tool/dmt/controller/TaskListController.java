package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.TaskList;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TaskListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TASKLISTS)
public class TaskListController extends APIController<TaskList> {
	@Autowired
	@Qualifier("taskListServiceImpl")
	TaskListService taskListService;

	@Override
	protected APIService<TaskList> getService() {
		return taskListService;
	}

}
