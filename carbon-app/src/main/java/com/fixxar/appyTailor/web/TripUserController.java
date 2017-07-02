/**
 * 
 */
package com.fixxar.appyTailor.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fixxar.appyTailor.model.TripUserTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.web.builder.TripUserBuilder;


/**
 * @author Muthu
 */
@Controller
@Scope("session")
public class TripUserController
{

	public TripUserController(){
	}
	
	//private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	TripUserBuilder tripUserBuilder;
		
	@RequestMapping(value = "/loadAllTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse  getLoadAllTripUser(HttpServletRequest request, @RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.getAllTripUser(tripUserTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/searchTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse searchTripUser(HttpServletRequest request, @RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.searchTripUser(tripUserTO));
		res.setAckType("Success");
		return res;
	}
	
	/**
	 * 
	 * @param tripUserTO
	 * @return
	 */
	@RequestMapping(value = "/saveTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse saveTripUser(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		int id = tripUserBuilder.saveTripUser(tripUserTO);
		if(id < 0){
			res.setAckType("Failure");
			res.setMessage("TripUser Mobile Number Already exists");
		} else if(id > 0){
			res.setAckType("Success");
			res.setObject(id);
			res.setMessage("TripUser Saved Successfully");
		} else {
			res.setAckType("Failure");
			res.setMessage("Unable to save tripUser, contact support");
		}
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTripUser(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.addEditTripUser(tripUserTO, false));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditTripUserImage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTripUserImage(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.addEditTripUserImage(tripUserTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/deleteTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse deleteTripUser(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		return res;
	}
	
	@RequestMapping(value = "/viewTripUser",  method = RequestMethod.POST)
	public @ResponseBody RestResponse tripUserDetails(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.tripUserDetails(tripUserTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditTripUserForOrder",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTripUserForOrder(@RequestBody TripUserTO tripUserTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripUserBuilder.addEditTripUser(tripUserTO, true));
		res.setAckType("Success");
		return res;
	}
	
}
