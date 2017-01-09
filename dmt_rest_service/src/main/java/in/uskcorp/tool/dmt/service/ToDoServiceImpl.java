package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ToDoDAO;
import in.uskcorp.tool.dmt.domain.ToDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("toDoServiceImpl")
public class ToDoServiceImpl extends ToDoService {
	@Autowired
	@Qualifier("toDoDaoImpl")
	ToDoDAO toDoDAO;

	@Override
	protected APIDAO<ToDo> getDao() {
		return toDoDAO;
	}

}
