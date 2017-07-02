/**
 * 
 */
package com.fixxar.appyTailor.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.web.builder.AppUserBuilder;


/**
 * @author Muthu
 */
@Controller
public class AppUserController
{

	public AppUserController(){
	}
	
	//private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	AppUserBuilder appUserBuilder;
	
	@RequestMapping(value = "/loadAllAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse  getLoadAllAppUser(HttpServletRequest request) {
		
		RestResponse res = new RestResponse();
		res.setMessage(appUserBuilder.getAllAppUser());
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAllActiveAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse  getLoadAllActiveAppUser(HttpServletRequest request) {
		
		RestResponse res = new RestResponse();
		res.setMessage(appUserBuilder.getAllAppUser());
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/saveAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse saveAppUser(@RequestBody AppUserTO itemTO) {
		
		RestResponse res = new RestResponse();
		appUserBuilder.saveAppUser(itemTO, res);
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditAppUser(@RequestBody AppUserTO itemTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(appUserBuilder.addEditAppUser(itemTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/deleteAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse deleteAppUser(@RequestBody AppUserTO itemTO) {
		
		RestResponse res = new RestResponse();
		/*if(appUserBuilder.deleteAppUser(itemTO)){
			res.setMessage("AppUser Deleted Successfully");
			res.setAckType("Success");	
		} else {
			res.setAckType("Failure");
		}*/
		return res;
	}
	
	@RequestMapping(value = "/viewAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse itemDetails(@RequestBody AppUserTO itemTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(appUserBuilder.appUserDetails(itemTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/getAppUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse getAppUser(@RequestBody AppUserTO itemTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(appUserBuilder.appUserDetails(itemTO));
		res.setAckType("Success");
		return res;
	}

	@RequestMapping(value = "/sendNotification",  method = RequestMethod.POST)
	public @ResponseBody RestResponse sendNotification(@RequestBody AppUserTO appUserTO) {
		
		RestResponse res = new RestResponse();
		//appUserBuilder.sendNotification(appUserTO, res);
		return res;
	}
	
}