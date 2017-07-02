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

import com.fixxar.appyTailor.model.TripTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.web.builder.TripBuilder;


/**
 * @author Muthu
 */
@Controller
@Scope("session")
public class TripController
{

	public TripController(){
	}
	
	//private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	TripBuilder tripBuilder;
		
	@RequestMapping(value = "/loadAllTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse  getLoadAllTrip(HttpServletRequest request, @RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripBuilder.getAllTrip(tripTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/searchTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse searchTrip(HttpServletRequest request, @RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripBuilder.searchTrip(tripTO));
		res.setAckType("Success");
		return res;
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	@RequestMapping(value = "/saveTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse saveTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		int id = tripBuilder.saveTrip(tripTO);
		if(id < 0){
			res.setAckType("Failure");
			res.setMessage("Trip Mobile Number Already exists");
		} else if(id > 0){
			res.setAckType("Success");
			res.setObject(id);
			res.setMessage("Trip Saved Successfully");
		} else {
			res.setAckType("Failure");
			res.setMessage("Unable to save trip, contact support");
		}
		return res;
	}
	
	@RequestMapping(value = "/startTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse startTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		int id = tripBuilder.startTrip(tripTO);
		if(id < 0){
			res.setAckType("Failure");
			res.setMessage("Unable to start trip, contact support");
		} else if(id > 0){
			res.setAckType("Success");
			res.setObject(id);
			res.setMessage("Trip Saved Successfully");
		} else {
			res.setAckType("Failure");
			res.setMessage("Unable to start trip, contact support");
		}
		return res;
	}
	
	@RequestMapping(value = "/stopTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse stopTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		int id = tripBuilder.stopTrip(tripTO);
		if(id < 0){
			res.setAckType("Failure");
			res.setMessage("Unable to stop trip, contact support");
		} else if(id > 0){
			res.setAckType("Success");
			res.setObject(id);
			res.setMessage("Trip Saved Successfully");
		} else {
			res.setAckType("Failure");
			res.setMessage("Unable to stop trip, contact support");
		}
		return res;
	}
	@RequestMapping(value = "/loadAddEditTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripBuilder.addEditTrip(tripTO, false));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditTripImage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTripImage(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripBuilder.addEditTripImage(tripTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/deleteTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse deleteTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		return res;
	}
	
	@RequestMapping(value = "/viewTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse tripDetails(@RequestBody TripTO tripTO) {
		
		RestResponse res = tripBuilder.tripDetails(tripTO);
		return res;
	}
	
	@RequestMapping(value = "/findTrip",  method = RequestMethod.POST)
	public @ResponseBody RestResponse findTrip(@RequestBody TripTO tripTO) {
		
		RestResponse res = tripBuilder.findTrip(tripTO);
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditTripForOrder",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditTripForOrder(@RequestBody TripTO tripTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(tripBuilder.addEditTrip(tripTO, true));
		res.setAckType("Success");
		return res;
	}
	
}
