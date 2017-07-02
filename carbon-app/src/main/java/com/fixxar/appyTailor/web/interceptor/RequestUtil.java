/**
 * 
 */
package com.fixxar.appyTailor.web.interceptor;

import javax.servlet.http.HttpServletRequest;

import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.session.ApplicationUser;


/**
 * 
 * Util class to perform operations with HttpServletRequest
 * 
 * @author Samy
 *
 */
public class RequestUtil
{
	public static final String APP_USER = "APP_USER";

	public static ApplicationUser getUserFromSession(HttpServletRequest request) {
		ApplicationUser applicationUser = null;
		if (request.getSession().getAttribute(APP_USER) != null) {
			applicationUser = (ApplicationUser) request.getSession().getAttribute(APP_USER);
		} else {
			applicationUser = new ApplicationUser();
			applicationUser.setLanguageId(1);
			request.getSession().setAttribute(APP_USER, applicationUser);
		}
		return applicationUser;
	}
	
	public static ApplicationUser setUserLanguage(HttpServletRequest request, int languageId) {
		ApplicationUser applicationUser = null;
		if (request.getSession().getAttribute(APP_USER) != null) {
			applicationUser = (ApplicationUser) request.getSession().getAttribute(APP_USER);
			applicationUser.setLanguageId(languageId);
			request.getSession().setAttribute(APP_USER, applicationUser);
		} else {
			applicationUser = new ApplicationUser();
			applicationUser.setLanguageId(languageId);
			request.getSession().setAttribute(APP_USER, applicationUser);
		}
		return applicationUser;
	}
	
	public static void createUserSession(HttpServletRequest request, AppUserTO userTO) {
		ApplicationUser applicationUser = null;
		if (request.getSession().getAttribute(APP_USER) != null) {
			applicationUser = (ApplicationUser) request.getSession().getAttribute(APP_USER);
		} 
		if(applicationUser.getAppUserTO() != null){
			request.getSession().removeAttribute(APP_USER);
			clearUserSession(request);
		} else {
			applicationUser = getUserFromSession(request);
			applicationUser.setAppUserTO(userTO);
			applicationUser.setAuthenticated(true);
			applicationUser.setSessionKey(System.currentTimeMillis() + "$" + userTO.getId());
			applicationUser.setLanguageId(1);
			request.getSession().setAttribute(APP_USER, applicationUser);
		}
	}

	public static void clearUserSession(HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
}