package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.service.APIService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public abstract class APIController<T> {

	@RequestMapping(value = DMTRestURIConstants.READ_ALL, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<List<T>> readAll() {
		try {
			List<T> list = getService().readAll();
			return new ResponseEntity<List<T>>(list, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<T>>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}
	@RequestMapping(value = DMTRestURIConstants.READ, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<T> read(@RequestParam Integer id) {
		try {
			T t = getService().read(id);
			return new ResponseEntity<T>(t, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<T>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}
	

	@RequestMapping(value = DMTRestURIConstants.CREATE, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<String> create(@RequestBody T a) {
		try {
			getService().create(a);
			return new ResponseEntity<String>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

	@RequestMapping(value = DMTRestURIConstants.UPDATE, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<String> update(@RequestBody T a) {
		try {
			getService().update(a);
			return new ResponseEntity<String>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

	@RequestMapping(value = DMTRestURIConstants.DELETE, method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<String> delete(@RequestParam Integer id) {
		try {
			getService().delete(id);
			return new ResponseEntity<String>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

	protected abstract APIService<T> getService();
}
