package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Course;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.COURSES)
public class CourseController extends APIController<Course> {
	@Autowired
	@Qualifier("courseServiceImpl")
	CourseService courseService;

	@Override
	protected APIService<Course> getService() {
		return courseService;
	}

}
