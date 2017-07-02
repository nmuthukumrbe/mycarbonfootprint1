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

import com.fixxar.appyTailor.model.MessageTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.web.builder.MessageBuilder;


/**
 * @author Muthu
 */
@Controller
@Scope("session")
public class MessageController
{

	public MessageController(){
	}
	
	//private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	MessageBuilder messageBuilder;
		
	@RequestMapping(value = "/loadAllMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse  getLoadAllMessage(HttpServletRequest request, @RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.getAllMessage(messageTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/readMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse readMessage(HttpServletRequest request, @RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.getReadMessage(messageTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/unreadMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse unreadMessage(HttpServletRequest request, @RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.getReadMessage(messageTO));
		res.setAckType("Success");
		return res;
	}
	
	/**
	 * 
	 * @param messageTO
	 * @return
	 */
	@RequestMapping(value = "/saveMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse saveMessage(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		int id = messageBuilder.saveMessage(messageTO);
		if(id < 0){
			res.setAckType("Failure");
			res.setMessage("Message Mobile Number Already exists");
		} else if(id > 0){
			res.setAckType("Success");
			res.setObject(id);
			res.setMessage("Message Saved Successfully");
		} else {
			res.setAckType("Failure");
			res.setMessage("Unable to save message, contact support");
		}
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditMessage(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.addEditMessage(messageTO, false));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditMessageImage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditMessageImage(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.addEditMessageImage(messageTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/deleteMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse deleteMessage(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		return res;
	}
	
	@RequestMapping(value = "/viewMessage",  method = RequestMethod.POST)
	public @ResponseBody RestResponse messageDetails(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.messageDetails(messageTO));
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/loadAddEditMessageForOrder",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadAddEditMessageForOrder(@RequestBody MessageTO messageTO) {
		
		RestResponse res = new RestResponse();
		res.setMessage(messageBuilder.addEditMessage(messageTO, true));
		res.setAckType("Success");
		return res;
	}
	
}
