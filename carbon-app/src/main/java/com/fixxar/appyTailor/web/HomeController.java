/**
 * 
 */
package com.fixxar.appyTailor.web;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fixxar.appyTailor.common.DBFactory;
import com.fixxar.appyTailor.common.LogUtils;
import com.fixxar.appyTailor.common.StartupListener;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.session.ApplicationUser;
import com.fixxar.appyTailor.web.builder.HomeBuilder;
import com.fixxar.appyTailor.web.interceptor.RequestUtil;


/**
 * @author Muthu
 */
@Controller
public class HomeController
{

	public HomeController(){
	}

	@Autowired StartupListener startupListener;
	
	@Autowired HomeBuilder homeBuilder;

	@Autowired DBFactory dbFactory;
	
	@Autowired
	private HttpServletRequest context;
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value = {"/"}, method = RequestMethod.GET)
	public ModelAndView renderHomePage(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("web/index");
		return mv;
	}
	
	@RequestMapping(value = {"/about"}, method = RequestMethod.GET)
	public ModelAndView renderAbout(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("web/about");
		return mv;
	}
	
	@RequestMapping(value = {"/contact"}, method = RequestMethod.GET)
	public ModelAndView renderContact(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("web/contact");
		return mv;
	}
	
	@RequestMapping(value = {"/codes"}, method = RequestMethod.GET)
	public ModelAndView renderStory(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("web/codes");
		return mv;
	}
	
	@RequestMapping(value = {"/products"}, method = RequestMethod.GET)
	public ModelAndView renderProducts(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("web/products");
		return mv;
	}
	
	@RequestMapping(value = {"/company/{c}"}, method = RequestMethod.GET)
	public ModelAndView getLoginPage(HttpServletRequest request, @PathVariable(value = "c") String company) {
		
		ModelAndView mv = new ModelAndView("login");
		mv.addObject( "isLicensedValidated", startupListener.isLicensedValidated());
		
		try {
			
			ApplicationUser appUser = RequestUtil.getUserFromSession(request);
			if(appUser!=null){
				mv.addObject("company", company);
				mv.addObject("appUserId", appUser.getAppUserTO()!=null?appUser.getAppUserTO().getId():0);
				mv.addObject("userName", appUser.getAppUserTO().getName());
			}
		} catch (Exception e) {
			log.error(e);
			LogUtils.getInstance().log(log, "SUPER_CRITICAL", e, "Error occurred while building the billing layout page");
		}
		
		return mv;
	}
	
	@RequestMapping(value = "/login/{u}/{p}/{c}", method = RequestMethod.GET)
	public @ResponseBody RestResponse login(@PathVariable(value = "u") String u, @PathVariable(value = "p") String p,
			@PathVariable(value = "c") String company,
			HttpServletRequest request) {
		
		RestResponse response = new RestResponse();
		AppUserTO user = new AppUserTO();
		user.setName(u);
		user.setPassword(p);
		if(homeBuilder.validateLogin(user, request,company)){
			ApplicationUser applicationUser = RequestUtil.getUserFromSession(context);
			AppUserTO appUserTO = applicationUser.getAppUserTO();
			response.setMessage(applicationUser.getSessionKey());
			response.setAckType("Success");
			response.setObject(appUserTO.getName());
		} else {
			response.setAckType("Failure");
		}
		
		return response;
	}
	
	@RequestMapping(value = "/logout-action", method = { RequestMethod.POST, RequestMethod.GET })
	public @ResponseBody RestResponse loginoutAction(HttpServletRequest request) {
		
		RestResponse response = new RestResponse();
		homeBuilder.logoutAction(request);
		response.setAckType("Success");
		return response;
	}

	@RequestMapping(value = "/loadUpload",  method = RequestMethod.POST)
	public @ResponseBody RestResponse loadUpload() {
		
		RestResponse res = new RestResponse();
		res.setMessage(homeBuilder.loadUploadPage());
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/mySaving",  method = RequestMethod.POST)
	public @ResponseBody RestResponse mySaving() {
		
		RestResponse res = new RestResponse();
		res.setMessage(homeBuilder.mySaving());
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/myInfo",  method = RequestMethod.POST)
	public @ResponseBody RestResponse myInfo() {
		
		RestResponse res = new RestResponse();
		res.setMessage(homeBuilder.myInfo());
		res.setAckType("Success");
		return res;
	}
	
	@RequestMapping(value = "/leadershipBoard",  method = RequestMethod.POST)
	public @ResponseBody RestResponse leadershipBoard() {
		
		RestResponse res = new RestResponse();
		res.setMessage(homeBuilder.leadershipBoard());
		res.setAckType("Success");
		return res;
	}
	
}
