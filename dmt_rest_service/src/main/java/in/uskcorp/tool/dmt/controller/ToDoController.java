package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.ToDo;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ToDoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TODOS)
public class ToDoController extends APIController<ToDo> {
	@Autowired
	@Qualifier("toDoServiceImpl")
	ToDoService toDoService;

	@Override
	protected APIService<ToDo> getService() {
		return toDoService;
	}

}
